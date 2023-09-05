package com.studentssocialnetwork.controller;

import com.studentssocialnetwork.dto.GroupDTO;
import com.studentssocialnetwork.dto.PostDTO;
import com.studentssocialnetwork.model.persistence.Group;
import com.studentssocialnetwork.model.persistence.GroupImage;
import com.studentssocialnetwork.model.persistence.Post;
import com.studentssocialnetwork.model.persistence.enums.GroupType;
import com.studentssocialnetwork.model.persistence.enums.Visibility;
import com.studentssocialnetwork.service.GroupService;
import com.studentssocialnetwork.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@RequestMapping("/api/group")
@RestController
public class GroupController {

	@Autowired
	private UserService userAccessObj;

	@Autowired
	private GroupService groupAccessObj;

	@GetMapping
	public ResponseEntity<List<GroupDTO>> getAllGroupsForUser() {
		Set<Group> groupsObj = groupAccessObj.getGroupsForCurrentUser();
		return ResponseEntity.ok(GroupDTO.convertEntityListToGroupDTOList(groupsObj, userAccessObj.getCurrentUser()));
	}

	@GetMapping("/{postId}/post")
	public ResponseEntity<List<PostDTO>> getAllCurrentGroupPosts(@PathVariable("postId") long groupIdNum) {
		Set<Post> postsObj = groupAccessObj.getAllCurrentGroupPosts(groupIdNum);
		return ResponseEntity.ok(PostDTO.convertEntityListToPostDTOList(postsObj));
	}

	@GetMapping("/{groupId}")
	public ResponseEntity<GroupDTO> getGroupById(@PathVariable("groupId") long groupIdNum) {
		Group groupObj = groupAccessObj.getGroupById(groupIdNum);
		return ResponseEntity.ok(GroupDTO.convertEntityToGroupDTO(groupObj, userAccessObj.getCurrentUser()));
	}

	@GetMapping("/{imageId}/image")
	public ResponseEntity<ByteArrayResource> getImage(@PathVariable("imageId") long imageIdNum) {
		GroupImage imageObj = groupAccessObj.getGroupImageById(imageIdNum);
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(imageObj.getContentType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename= " + imageObj.getFilename())
				.body(new ByteArrayResource(imageObj.getData()));
	}

	@PostMapping
	public ResponseEntity<GroupDTO> createGroup(@RequestParam String groupName, @RequestParam String desc,
			@RequestParam GroupType groupType, @RequestParam(required = false) MultipartFile image,
			@RequestParam Visibility groupVisibility) throws IOException {

		Group groupObj = groupAccessObj.createGroup(groupName, desc, groupType, groupVisibility, image);
		return ResponseEntity.ok(GroupDTO.convertEntityToGroupDTO(groupObj, userAccessObj.getCurrentUser()));
	}

	@PostMapping("/{postId}/post")
	public ResponseEntity<PostDTO> createPostForCurrentUser(@PathVariable("postId") long groupIdNum,
			@RequestParam String postContent, @RequestParam(required = false) MultipartFile postImage)
			throws IOException {

		Post postObj = groupAccessObj.createPostForCurrentGroup(groupIdNum, postContent, postImage);
		return ResponseEntity.ok(PostDTO.convertEntityToPostDTO(postObj));
	}

	@PostMapping("/{groupId}/leave")
	public ResponseEntity<GroupDTO> leaveGroup(@PathVariable("groupId") long groupIdNum) {
		Group groupObj = groupAccessObj.leaveGroupByGroupId(groupIdNum);
		return ResponseEntity.ok(GroupDTO.convertEntityToGroupDTO(groupObj, userAccessObj.getCurrentUser()));
	}

	@PostMapping("/{groupId}/join")
	public ResponseEntity<GroupDTO> joinGroup(@PathVariable("groupId") long groupIdNum) {
		Group groupObj = groupAccessObj.joinGroupByGroupId(groupIdNum);
		return ResponseEntity.ok(GroupDTO.convertEntityToGroupDTO(groupObj, userAccessObj.getCurrentUser()));
	}

	@PutMapping("/{groupId}")
	public ResponseEntity<GroupDTO> createGroup(@PathVariable("groupId") long groupIdNum, @RequestParam String groupName,
			@RequestParam String desc, @RequestParam(required = false) MultipartFile image) throws IOException {

		Group groupObj = groupAccessObj.editGroup(groupIdNum, groupName, desc, image);
		return ResponseEntity.ok(GroupDTO.convertEntityToGroupDTO(groupObj, userAccessObj.getCurrentUser()));
	}

}

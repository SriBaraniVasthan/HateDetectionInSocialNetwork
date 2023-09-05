package com.studentssocialnetwork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.studentssocialnetwork.dto.PostDTO;
import com.studentssocialnetwork.model.persistence.Post;
import com.studentssocialnetwork.model.persistence.PostImage;
import com.studentssocialnetwork.model.requests.CreateCommentRequest;
import com.studentssocialnetwork.model.requests.CreatePostRequest;
import com.studentssocialnetwork.service.PostService;
import java.io.IOException;
import java.util.List;
import java.util.Set;

@RequestMapping("/api/post")
@RestController
public class PostController {

	@Autowired
	private PostService postAccessObj;

	@GetMapping
	public ResponseEntity<List<PostDTO>> getAllPostForCurrentUser() {
		Set<Post> postsObj = postAccessObj.getAllPostsForCurrentUser();
		return ResponseEntity.ok(PostDTO.convertEntityListToPostDTOList(postsObj));
	}

	@GetMapping("/{id}/image")
	public ResponseEntity<ByteArrayResource> getImage(@PathVariable("id") long imageIdNum) {
		PostImage imageObj = postAccessObj.getImageByImageId(imageIdNum);
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(imageObj.getContentType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename= " + imageObj.getFilename())
				.body(new ByteArrayResource(imageObj.getData()));
	}

	@PostMapping
	public ResponseEntity<PostDTO> createPostForCurrentUser(@RequestParam String postContent,
			@RequestParam(required = false) MultipartFile postImage) throws IOException {

		Post postObj = postAccessObj.createPostForCurrentUser(postContent, postImage);
		return ResponseEntity.ok(PostDTO.convertEntityToPostDTO(postObj));
	}

	@PostMapping("/{id}/comment")
	public ResponseEntity<PostDTO> addComment(@PathVariable("id") long postIdNum,
			@RequestBody CreateCommentRequest createRequest) {
		Post postObj = postAccessObj.addCommentForPost(postIdNum, createRequest.getComment());
		return ResponseEntity.ok(PostDTO.convertEntityToPostDTO(postObj));
	}

	@PostMapping("/{id}/unlike")
	public ResponseEntity<PostDTO> unlikePost(@PathVariable("id") long postIdNum) {
		Post postObj = postAccessObj.unlikePostById(postIdNum);
		return ResponseEntity.ok(PostDTO.convertEntityToPostDTO(postObj));
	}

	@PostMapping("/{id}/like")
	public ResponseEntity<PostDTO> likePost(@PathVariable("id") long postIdNum) {
		Post postObj = postAccessObj.likePostById(postIdNum);
		return ResponseEntity.ok(PostDTO.convertEntityToPostDTO(postObj));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity deletePost(@PathVariable("id") long postIdNum) {
		postAccessObj.deletePostById(postIdNum);
		return ResponseEntity.accepted().build();
	}

}

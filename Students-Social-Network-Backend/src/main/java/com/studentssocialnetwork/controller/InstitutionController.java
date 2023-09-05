package com.studentssocialnetwork.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.studentssocialnetwork.dto.InstitutionDTO;
import com.studentssocialnetwork.dto.UserDTO;
import com.studentssocialnetwork.model.persistence.Institution;
import com.studentssocialnetwork.model.persistence.User;
import com.studentssocialnetwork.model.requests.CreateInstitutionRequest;
import com.studentssocialnetwork.service.InstitutionService;
import java.util.List;
import java.util.Set;

@RequestMapping("/api/institute")
@RestController
public class InstitutionController {

	@Autowired
	private InstitutionService instiAccessObj;

	private static Logger logger = LoggerFactory.getLogger(InstitutionController.class);

	@GetMapping
	public ResponseEntity<List<InstitutionDTO>> getInstitutions() {
		List<Institution> institutionsObj = instiAccessObj.getAllInstitutions();
		return ResponseEntity.ok(InstitutionDTO.convertEntityListToInstitutionDTOList(institutionsObj));
	}

	private boolean isPasswordStrong(String pwd, String confirmPwd) {
		return (pwd.length() >= 8 && confirmPwd.equals(pwd));
	}

	@GetMapping("/students")
	public ResponseEntity<List<UserDTO>> getCurrentInstitutionStudents() {
		Set<User> studentsObj = instiAccessObj.getCurrentInstitutionStudents();
		return ResponseEntity.ok(UserDTO.convertEntityListToUserDTOList(studentsObj));
	}

	@GetMapping("/current")
	public ResponseEntity<InstitutionDTO> getCurrentInstitution() {
		Institution institutionsObj = instiAccessObj.getCurrentInstitution();
		return ResponseEntity.ok(InstitutionDTO.convertEntityToInstitutionDTO(institutionsObj));
	}

	@GetMapping("/staff")
	public ResponseEntity<List<UserDTO>> getCurrentInstitutionStaffs() {
		Set<User> staffObj = instiAccessObj.getCurrentInstitutionStaffs();
		return ResponseEntity.ok(UserDTO.convertEntityListToUserDTOList(staffObj));
	}

	@PostMapping("/create")
	public ResponseEntity<InstitutionDTO> createUser(@RequestBody CreateInstitutionRequest createRequest) {
		String pwd = createRequest.getPassword();
		if (!isPasswordStrong(pwd, createRequest.getConfirmPassword())) {
			logger.info(" Bad password entered while creating Institution -> "
					+ createRequest.getAdminMail());
			return ResponseEntity.badRequest().build();
		}
		Institution institutionObj = instiAccessObj.createInstitution(createRequest.getName(),
				createRequest.getAdminMail(), pwd);
		logger.info("Institution has been successfully created, Institution -> " + institutionObj.getName());
		return ResponseEntity.ok(InstitutionDTO.convertEntityToInstitutionDTO(institutionObj));
	}

	@PostMapping("/students/{id}/disable")
	public ResponseEntity<UserDTO> disableUser(@PathVariable("id") long studentId) {
		User userObj = instiAccessObj.disableUserAccount(studentId);
		return ResponseEntity.ok(UserDTO.convertEntityToUserDTO(userObj));
	}

	@PostMapping("/students/{id}/enable")
	public ResponseEntity<UserDTO> enableUser(@PathVariable("id") long studentId) {
		User userObj = instiAccessObj.enableUserAccount(studentId);
		return ResponseEntity.ok(UserDTO.convertEntityToUserDTO(userObj));
	}
}

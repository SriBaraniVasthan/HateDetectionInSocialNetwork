package com.studentssocialnetwork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.studentssocialnetwork.model.persistence.Course;
import com.studentssocialnetwork.model.persistence.Department;
import com.studentssocialnetwork.model.persistence.User;
import com.studentssocialnetwork.model.requests.CreateCourseRequest;
import com.studentssocialnetwork.model.requests.CreateDepartmentRequest;
import com.studentssocialnetwork.dto.CourseDTO;
import com.studentssocialnetwork.dto.DepartmentDTO;
import com.studentssocialnetwork.dto.UserDTO;
import com.studentssocialnetwork.service.DepartmentService;
import java.util.List;
import java.util.Set;

@RequestMapping("/api/department")
@RestController
public class DepartmentController {

	@Autowired
	private DepartmentService departmentAccessObj;

	@PostMapping
	public ResponseEntity<DepartmentDTO> createDepartment(
			@RequestBody CreateDepartmentRequest createRequest) {

		String dName = createRequest.getName();
		Department dept = departmentAccessObj.createDepartmentForCurrentInstitution(dName);
		return ResponseEntity.ok(DepartmentDTO.convertEntityToDepartmentDTO(dept));
	}

	@GetMapping
	public ResponseEntity<List<DepartmentDTO>> getAllDepartment() {
		Set<Department> deptObj = departmentAccessObj.getAllDepartmentofCurrentInstitute();
		return ResponseEntity.ok(DepartmentDTO.convertEntityListToDepartmentDTOList(deptObj));
	}

	@GetMapping("/{deptId}")
	public ResponseEntity<DepartmentDTO> getDepartmentByID(@PathVariable Long deptId) {
		Department dept = departmentAccessObj.getDepartmentByID(deptId);
		return ResponseEntity.ok(DepartmentDTO.convertEntityToDepartmentDTO(dept));
	}

	@PostMapping("/{deptId}/course")
	public ResponseEntity<CourseDTO> createCourse(@PathVariable Long deptId,
			@RequestBody CreateCourseRequest createRequest) {
		String cName = createRequest.getName();
		Course course = departmentAccessObj.createCourseInDepartment(deptId, cName);
		return ResponseEntity.ok(CourseDTO.convertEntityToCourseDTO(course));
	}

	@PutMapping("/{deptId}")
	public ResponseEntity<DepartmentDTO> editDepartmentName(@PathVariable Long deptId,
			@RequestBody CreateDepartmentRequest createRequest) {
		String newName = createRequest.getName();
		Department dept = departmentAccessObj.editDepartmentName(deptId, newName);
		return ResponseEntity.ok(DepartmentDTO.convertEntityToDepartmentDTO(dept));
	}

	@DeleteMapping("/{deptId}")
	public ResponseEntity deleteDepartment(@PathVariable Long deptId) {
		departmentAccessObj.deleteDepartmentById(deptId);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/{deptId}/course}")
	public ResponseEntity<List<CourseDTO>> getAllCoursesOfDepartment(@PathVariable Long deptId) {
		Set<Course> courses = departmentAccessObj.getAllCoursesOfDepartment(deptId);
		return ResponseEntity.ok(CourseDTO.convertEntityListToCourseDTOList(courses));
	}

	@PutMapping("/{deptId}/course/{cId}")
	public ResponseEntity<CourseDTO> getCourse(@PathVariable Long deptId, @PathVariable Long cId,
			@RequestBody CreateCourseRequest createRequest) {
		Course courseName = departmentAccessObj.editCourseName(cId, createRequest.getName());
		return ResponseEntity.ok(CourseDTO.convertEntityToCourseDTO(courseName));
	}

	@GetMapping("/{deptId}/course/{cId}")
	public ResponseEntity<CourseDTO> getCourse(@PathVariable Long deptId, @PathVariable Long cId) {
		Course courseName = departmentAccessObj.getCourseById(cId);
		return ResponseEntity.ok(CourseDTO.convertEntityToCourseDTO(courseName));
	}

	@DeleteMapping("/{deptId}/course/{cId}")
	public ResponseEntity deleteCourse(@PathVariable Long deptId, @PathVariable Long cId) {
		departmentAccessObj.deleteCourse(cId);
		return ResponseEntity.accepted().build();
	}

	@GetMapping("/staffs")
	public ResponseEntity<List<UserDTO>> getCurrentDepartmentStaffs() {
		Set<User> usersObj = departmentAccessObj.getCurrentDepartmentStaffs();
		return ResponseEntity.ok(UserDTO.convertEntityListToUserDTOList(usersObj));
	}

	@GetMapping("/peers")
	public ResponseEntity<DepartmentDTO> getCurrentDepartmentPeers() {
		Department deptObj = departmentAccessObj.getCurrentUserPeers();
		return ResponseEntity.ok(DepartmentDTO.convertEntityToDepartmentDTO(deptObj));
	}

}

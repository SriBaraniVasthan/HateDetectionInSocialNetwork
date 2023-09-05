package com.studentssocialnetwork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import com.studentssocialnetwork.dto.EventDTO;
import com.studentssocialnetwork.model.persistence.Event;
import com.studentssocialnetwork.model.persistence.EventImage;
import com.studentssocialnetwork.model.persistence.enums.Visibility;
import com.studentssocialnetwork.service.EventService;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RequestMapping("/api/event")
@RestController
public class EventController {

	@Autowired
	private EventService eventAccessObj;
	
	@GetMapping
	public ResponseEntity<List<EventDTO>> getEvents() {
		Set<Event> eventsObj = eventAccessObj.getEventsForCurrentUser();
		return ResponseEntity.ok(EventDTO.convertEntityListToEventDTOList(eventsObj));
	}

	@GetMapping("/{id}/image")
	public ResponseEntity<ByteArrayResource> getImage(@PathVariable("id") long image) {
		EventImage imageObj = eventAccessObj.getEventImageById(image);
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(imageObj.getContentType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename= " + imageObj.getFilename())
				.body(new ByteArrayResource(imageObj.getData()));
	}

	@PostMapping
	public ResponseEntity<EventDTO> createEvent(@RequestParam String eventName, @RequestParam String eventPlace,
			@RequestParam String desc, @RequestParam Date time,
			@RequestParam(required = false) MultipartFile eventImage, @RequestParam Visibility eventVisibility)
			throws IOException {

		Event eventObj = eventAccessObj.createEvent(eventName, eventPlace, desc, time, eventVisibility, eventImage);
		return ResponseEntity.ok(EventDTO.convertEntityToEventDTO(eventObj));
	}

	@PutMapping("/{id}")
	public ResponseEntity<EventDTO> createEvent(@PathVariable("id") long eventId, @RequestParam String eventName,
			@RequestParam String eventPlace, @RequestParam String desc, @RequestParam Date time,
			@RequestParam(required = false) MultipartFile eventImage, @RequestParam Visibility eventVisibility)
			throws IOException {

		Event eventObj = eventAccessObj.editEvent(eventId, eventName, eventPlace, desc, time, eventVisibility, eventImage);
		return ResponseEntity.ok(EventDTO.convertEntityToEventDTO(eventObj));
	}

	

}

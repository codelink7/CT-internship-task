package com.controlpoint.task;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.scheduling.annotation.EnableScheduling;




@RestController
@SpringBootApplication
@EnableScheduling
public class TaskApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskApplication.class, args);
	}



	@GetMapping("/hello")
	public String hello(@RequestParam(defaultValue = "Spring") String name) {
		return "Hello, " + name + "!";
	}

}

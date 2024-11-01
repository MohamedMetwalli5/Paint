package com.painter.backendpaint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@SpringBootApplication
@RestController
public class BackendPaintApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendPaintApplication.class, args);
	}
}


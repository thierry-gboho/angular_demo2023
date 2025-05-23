package com.example.ngcourse.recipebook;

import com.example.ngcourse.recipebook.service.DataInitializerService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RecipebookApplication {

  @Autowired
  DataInitializerService dataInitializerService;

	public static void main(String[] args) {
		SpringApplication.run(RecipebookApplication.class, args);
	}

  @PostConstruct
  public void init() {
    dataInitializerService.initializeData();
  }
}

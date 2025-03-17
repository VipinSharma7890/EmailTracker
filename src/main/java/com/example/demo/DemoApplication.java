package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication{
	public String PORT = System.getenv("PORT");
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}

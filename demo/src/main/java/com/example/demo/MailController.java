package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
public class MailController {
	
	@Autowired
	MailRepository mailRepository;
	@Autowired
	JavaMailSender javaMailSender;
	
	@GetMapping("/open/{mailAddress}")
	public void isOpen(@PathVariable String mailAddress) {
		mailRepository.save(new MailEntity(mailAddress));
		
	}
	@GetMapping("/send")
//	@ExceptionHandler(Exception.class)
	public String send() {
		
		
		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
			helper.setTo("vipinsharmarsbv@gmail.com");
			helper.setText("<h1>okay</h1>"
					+ "<img src='http:localhost:8080/open/vipin'>",true);
			helper.setSubject("temp");
			javaMailSender.send(mimeMessage);
		} catch (Exception e) {
			//e.printStackTrace();
//			return new ResponseEntity<String>("mail sent unsuccessfull.", HttpStatus.BAD_REQUEST) ;
			return "mail sent unsuccessfull.";
		}
		
		
		
//		return  new ResponseEntity<String>("mail sent successfully", HttpStatus.ACCEPTED);
		return "mail sent successfully";
	}
	

}

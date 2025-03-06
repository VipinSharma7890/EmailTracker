package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "mail_table")
public class MailEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String mailAddress;
	
	public MailEntity() {
		
	}
	public MailEntity(String mailAddress) {
		this.mailAddress=mailAddress;
	}
	
	public String getMailAddress() {
		return mailAddress;
	}
	public void setMailAddress(String mailAddress) {
		this.mailAddress = mailAddress;
	}
	public int getId() {
		return id;
	}
	
}

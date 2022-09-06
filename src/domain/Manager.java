package domain;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import enums.Role;

public class Manager extends User {

	private UUID sportsObjectID;
	@JsonIgnore
	private SportsObject sportsObject;
	
	
	public Manager() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Manager(UUID id, String firstName, String lastName, String birthday, String username, String gender,
			String password, Role role) {
		super(id, firstName, lastName, birthday, username, gender, password, role);
		// TODO Auto-generated constructor stub
	}
	public UUID getSportsObjectID() {
		return sportsObjectID;
	}
	public void setSportsObjectID(UUID sportsObjectID) {
		this.sportsObjectID = sportsObjectID;
	}
	public SportsObject getSportsObject() {
		return sportsObject;
	}
	public void setSportsObject(SportsObject sportsObject) {
		this.sportsObject = sportsObject;
	}
	
	
}

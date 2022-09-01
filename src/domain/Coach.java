package domain;

import java.util.UUID;

import enums.Role;

public class Coach extends User{

	public Coach() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Coach(UUID id, String firstName, String lastName, String birthday, String username, String gender,
			String password) {
		super(id, firstName, lastName, birthday, username, gender, password, Role.COACH);
		// TODO Auto-generated constructor stub
	}

	
}

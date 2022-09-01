package domain;

import java.util.UUID;

import enums.Role;

public class Admin extends User {

	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Admin(UUID id, String firstName, String lastName, String birthday, String username, String gender,
			String password) {
		super(id, firstName, lastName, birthday, username, gender, password, Role.ADMIN);
		// TODO Auto-generated constructor stub
	}
	
}

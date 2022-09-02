package daos;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import domain.Admin;
import domain.User;
import dtos.LoginParams;

public class UserDAO implements Serializable<List<User>> {
	
	private List<User> users = new ArrayList<>();
	private String fileName = "users.json";

	public UserDAO() {
		super();		
//		users.add(new Admin(UUID.randomUUID(), "Marko", "Makrovic", "10-10-2010", "marko", "Muski", "marko123"));
//		saveToJson(fileName, users);
		this.users = loadFromJson(fileName, users);
	}

	public User login(LoginParams params) {
		for(User u: users) {
			if(u.getUsername().equals(params.getUsername()) && u.getPassword().equals(params.getPassword())) {
				return u;
			}
		}
		return null;
	}

	public User addUser(User newUser) {
		// TODO Auto-generated method stub
		for(User u: users) {
			if(u.getUsername().equals(newUser.getUsername())) {
				return null;
			}
		}
		users.add(newUser);
		saveToJson(fileName, users);
		
		return newUser; 
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}
	
	
}

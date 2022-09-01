package daos;

import java.util.ArrayList;
import java.util.List;

import domain.User;
import dtos.LoginParams;

public class UserDAO implements Serializable<List<User>> {
	
	private List<User> users = new ArrayList<>();
	private String fileName = "users.json";

	public UserDAO() {
		super();
		loadFromJson(fileName, users);
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
		
		return newUser; 
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}
	
	
}

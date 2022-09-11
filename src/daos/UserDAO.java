package daos;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.google.gson.JsonElement;

import domain.Coach;
import domain.Customer;
import domain.CustomerType;
import domain.Fee;
import domain.Manager;
import domain.Training;
import domain.User;
import dtos.LoginParams;
import enums.Role;

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
		List<User> ret = new ArrayList<>();
		for (User user : this.users) {
			if(!user.isDeleted()) {
				ret.add(user);
			}
		}
		return ret;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public User update(User c) {
		for(User u: users) {
			if(u.getUsername().equals(c.getUsername())) {
				u.setFirstName(c.getFirstName());
				u.setLastName(c.getLastName());
				u.setPassword(c.getPassword());
				u.setBirthday(c.getBirthday());
				u.setGender(c.getGender());
				saveToJson(fileName, users);
				return u;
			}
		}
		return null;
	}

	public List<Manager> getFreeManagers() {
		List<Manager> ret = new ArrayList<>();
		for (User user : getUsers()) {
			if(user instanceof Manager) {
				Manager manager = (Manager) user;
				if(manager.getSportsObjectID() == null) {
					ret.add(manager);
				}
			}
		}
		return ret;
	}

	public User delete(UUID id) {
		User user = getUserByID(id);
		if(user != null) {
			user.setDeleted(true);
			saveToJson(fileName, users);
		}
		return user;
	}
	
	public User getUserByID(UUID id) {
		for (User user : users) {
			if(user.getId().equals(id)) {
				return user;
			}
		}
		return null;
	}

	public Customer getCustomerByID(UUID id) {
		for (User user : getUsers()) {
			if(user instanceof Customer) {
				Customer customer = (Customer) user;
				if(customer.getId().equals(id)) {
					return customer;
				}
			}
		}
		return null;
	}

	public List<Coach> getCoaches() {
		List<Coach> ret = new ArrayList<>();
		for (User user : getUsers()) {
			if(user instanceof Coach) {
				Coach coach = (Coach) user;
				ret.add(coach);
			}
		}
		return ret;
	}

	public Customer addTraining(Training c, UUID id) {
		Customer customer = getCustomerByID(id);
		customer.getHistory().add(c);
		customer.setNumberOfTrainings(customer.getNumberOfTrainings() - 1);
		saveToJson(fileName, users);
		return customer;
	}

	public Customer addFee(Fee c, UUID id) {
		Customer customer = getCustomerByID(id);
		customer.setNumberOfTrainings(c.getTrainings());
		customer.setActiveFee(c);	
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		customer.setStartOfFee(LocalDate.now().format(formatter));
		saveToJson(fileName, users);
		return customer;
	}

	public void setCustomerPoints(Customer customer, Integer points) {
		customer.setPoints(customer.getPoints()+points);
		customer.setNumberOfTrainings(0);
		customer.setStartOfFee(null);
		customer.setActiveFee(null);
		saveToJson(fileName, users);
		
	}
}

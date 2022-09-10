package domain;

import java.util.UUID;

import enums.Role;

public class Customer extends User {

	private Fee activeFee;
	private Integer points;
	private CustomerType customerType;
	private Training history;

	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	


	public Customer(UUID id, String firstName, String lastName, String birthday, String username, String gender,
			String password, Role role) {
		super(id, firstName, lastName, birthday, username, gender, password, role);
		// TODO Auto-generated constructor stub
	}






	public Customer(Fee activeFee, Integer points, CustomerType customerType, Training history) {
		super();
		this.activeFee = activeFee;
		this.points = points;
		this.customerType = customerType;
		this.history = history;
	}






	public Fee getActiveFee() {
		return activeFee;
	}

	public void setActiveFee(Fee activeFee) {
		this.activeFee = activeFee;
	}



	public Integer getPoints() {
		return points;
	}



	public void setPoints(Integer points) {
		this.points = points;
	}



	public CustomerType getCustomerType() {
		return customerType;
	}



	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}






	public Training getHistory() {
		return history;
	}






	public void setHistory(Training history) {
		this.history = history;
	}
	
	
	
	
}

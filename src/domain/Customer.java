package domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import enums.Role;

public class Customer extends User {

	private Fee activeFee;
	private Integer points;
	private CustomerType customerType;
	private List<Training> history = new ArrayList<>();
	private Integer NumberOfTrainings;
	private String startOfFee;

	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Customer(UUID id, String firstName, String lastName, String birthday, String username, String gender,
			String password, Role role) {
		super(id, firstName, lastName, birthday, username, gender, password, role);
		// TODO Auto-generated constructor stub
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






	public List<Training> getHistory() {
		return history;
	}


	

	public void setHistory(List<Training> history) {
		this.history = history;
	}

	public Integer getNumberOfTrainings() {
		return NumberOfTrainings;
	}

	public void setNumberOfTrainings(Integer numberOfTrainings) {
		NumberOfTrainings = numberOfTrainings;
	}

	public String getStartOfFee() {
		return startOfFee;
	}

	public void setStartOfFee(String startOfFee) {
		this.startOfFee = startOfFee;
	}

	
	

	
	
}

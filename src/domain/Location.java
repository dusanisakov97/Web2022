package domain;

public class Location {
	
	private String street;
	private String city;
	private Integer zipCode;
	
	
	
	
	public Location() {
		super();
		// TODO Auto-generated constructor stub
	}






	public Location(String street, String city, Integer zipCode) {
		super();
		this.street = street;
		this.city = city;
		this.zipCode = zipCode;
	}






	public String getStreet() {
		return street;
	}




	public void setStreet(String street) {
		this.street = street;
	}


	public String getCity() {
		return city;
	}




	public void setCity(String city) {
		this.city = city;
	}






	public Integer getZipCode() {
		return zipCode;
	}






	public void setZipCode(Integer zipCode) {
		this.zipCode = zipCode;
	}



	
	

}

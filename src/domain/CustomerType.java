package domain;

import java.util.UUID;

import enums.CustomerLevel;


public class CustomerType {

	private UUID id;
	private Double discount;
	private CustomerLevel level;
	private Integer limit;
	public CustomerType() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CustomerType(UUID id, Double discount, CustomerLevel level, Integer limit) {
		super();
		this.id = id;
		this.discount = discount;
		this.level = level;
		this.limit = limit;
	}
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public Double getDiscount() {
		return discount;
	}
	public void setDiscount(Double discount) {
		this.discount = discount;
	}
	public CustomerLevel getLevel() {
		return level;
	}
	public void setLevel(CustomerLevel level) {
		this.level = level;
	}
	public Integer getLimit() {
		return limit;
	}
	public void setLimit(Integer limit) {
		this.limit = limit;
	}
	
	
	
}

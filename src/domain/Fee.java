package domain;

import java.util.UUID;

public class Fee {

	private UUID id;
	private Integer months;
	private Double price;
	private String name;
	private Integer trainings;
	public Fee() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Fee(UUID id, Integer months, Double price, String name, Integer trainings) {
		super();
		this.id = id;
		this.months = months;
		this.price = price;
		this.name = name;
		this.trainings = trainings;
	}
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public Integer getMonths() {
		return months;
	}
	public void setMonths(Integer months) {
		this.months = months;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Integer getTrainings() {
		return trainings;
	}
	public void setTrainings(Integer trainings) {
		this.trainings = trainings;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}

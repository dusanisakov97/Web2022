package domain;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class SportsObject {
	private UUID id;
	private String name;
	private String type;
	private boolean working;
	private Location location;
	private String image;
	private Double averageMark;
	private Double sum;
	private Integer counter;
	private String startWorking;
	private String endWorking;
	private boolean deleted;
	
	private List<Training> trainings = new ArrayList<>();
	
	
	public SportsObject() {
		
	}
	

	public SportsObject(UUID id, String name, String type, boolean working, Location location, String image,
			Double averageMark, String startWorking, String endWorking) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.working = working;
		this.location = location;
		this.image = image;
		this.averageMark = averageMark;
		this.startWorking = startWorking;
		this.endWorking = endWorking;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public boolean isWorking() {
		return working;
	}


	public void setWorking(boolean working) {
		this.working = working;
	}


	public Location getLocation() {
		return location;
	}


	public void setLocation(Location location) {
		this.location = location;
	}


	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}


	public Double getAverageMark() {
		return averageMark;
	}


	public void setAverageMark(Double averageMark) {
		this.averageMark = averageMark;
	}


	public String getStartWorking() {
		return startWorking;
	}


	public void setStartWorking(String startWorking) {
		this.startWorking = startWorking;
	}


	public String getEndWorking() {
		return endWorking;
	}


	public void setEndWorking(String endWorking) {
		this.endWorking = endWorking;
	}


	public List<Training> getTrainings() {
		return trainings;
	}


	public void setTrainings(List<Training> trainings) {
		this.trainings = trainings;
	}


	public Double getSum() {
		return sum;
	}


	public void setSum(Double sum) {
		this.sum = sum;
	}


	public Integer getCounter() {
		return counter;
	}


	public void setCounter(Integer counter) {
		this.counter = counter;
	}


	public boolean isDeleted() {
		return deleted;
	}


	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	
	
}

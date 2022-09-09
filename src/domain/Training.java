package domain;

import java.util.UUID;

public class Training {
	private UUID id;
	private UUID coachID;
	private UUID sportsObjectID;
	private	String name;
	private String type;
	private String duration;
	private String description;
	private String image;
	private Double extraPrice;
	
	public Training(UUID id, UUID coachID, UUID sportsObjectID, String name, String type, String duration,
			String description, String image, Double extraPrice) {
		super();
		this.id = id;
		this.coachID = coachID;
		this.sportsObjectID = sportsObjectID;
		this.name = name;
		this.type = type;
		this.duration = duration;
		this.description = description;
		this.image = image;
		this.extraPrice = extraPrice;
	}
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public UUID getCoachID() {
		return coachID;
	}
	public void setCoachID(UUID coachID) {
		this.coachID = coachID;
	}
	public UUID getSportsObjectID() {
		return sportsObjectID;
	}
	public void setSportsObjectID(UUID sportsObjectID) {
		this.sportsObjectID = sportsObjectID;
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
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public Double getExtraPrice() {
		return extraPrice;
	}
	public void setExtraPrice(Double extraPrice) {
		this.extraPrice = extraPrice;
	}
	
}

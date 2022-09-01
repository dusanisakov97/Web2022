package domain;

import java.util.UUID;

public class Training {
	private UUID id;
	
	
	private UUID coachID;
	private UUID sportsObjectID;
	
	
	
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
	
	
}

package daos;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.google.gson.JsonElement;

import domain.Manager;
import domain.SportsObject;
import domain.Training;

public class SportsObjectDAO implements Serializable<List<SportsObject>> {
	
	private List<SportsObject> sportsObjects = new ArrayList<>();
	private String fileName = "sports-objects.json";

	public SportsObjectDAO() {
		super();
		this.sportsObjects = loadFromJson(fileName, sportsObjects);
	}


	public SportsObject getSportsObjectByID(UUID id) {
		for (SportsObject sportsObject : sportsObjects) {
			if (sportsObject.getId().equals(id)) {
				return sportsObject;
			}
		}
		return null;
	}


	public List<SportsObject> getSportsObjects() {
		List<SportsObject> ret = new ArrayList<>();
		for (SportsObject sportsObject : this.sportsObjects) {
			if(!sportsObject.isDeleted()) {
				ret.add(sportsObject);
			}
		}
		return ret;
	}


	public void setSportsObjects(List<SportsObject> sportsObjects) {
		this.sportsObjects = sportsObjects;
	}


	public String getFileName() {
		return fileName;
	}


	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


	public SportsObject add(SportsObject c) {
		this.sportsObjects.add(c);
		saveToJson(fileName, sportsObjects);
		return c;
	}


	public SportsObject addTraining(Training training) {
		SportsObject sportsObject = getSportsObjectByID(training.getSportsObjectID());
		sportsObject.getTrainings().add(training);
		saveToJson(fileName, sportsObjects);
		return sportsObject;
	}

	
}

package daos;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import domain.SportsObject;

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
		return sportsObjects;
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
		return c;
	}
	
}

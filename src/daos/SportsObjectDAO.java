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
}

package daos;

import java.util.ArrayList;
import java.util.List;

import domain.Fee;

public class FeeDAO implements Serializable<List<Fee>>{

	private List<Fee> fees = new ArrayList<>();
	private String fileName = "fees.json";

	public FeeDAO() {
		super();
//		fees.add(new Fee(UUID.randomUUID(), 1, 3499.0, 20));
//		fees.add(new Fee(UUID.randomUUID(), 1, 2000.0, 10));
//		fees.add(new Fee(UUID.randomUUID(), 3, 4000.0, 40));
//		fees.add(new Fee(UUID.randomUUID(), 6, 5000.0, 60));
//		saveToJson(fileName, fees);
		this.fees = loadFromJson(fileName, fees);
	}

	public List<Fee> getFees() {
		return fees;
	}

	public void setFees(List<Fee> fees) {
		this.fees = fees;
	}
	
	
	
	
}

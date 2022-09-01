package daos;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import domain.Training;

public class TrainingDAO implements Serializable<List<Training>> {

	private List<Training> trainings = new ArrayList<>();
	private String fileName = "trainings.json";

	public TrainingDAO() {
		super();
		this.trainings = loadFromJson(fileName, trainings);
	}
	
	public List<Training> getTrainingsForCoach(UUID coachID) {
		List<Training> output = new ArrayList<>();
		for (Training training : trainings) {
			if( training.getCoachID().equals(coachID)) {
				output.add(training);
			}
		}
		return trainings;
	}
	
	public List<Training> getTrainingsForSportsObject(UUID objectID) {
		List<Training> output = new ArrayList<>();
		for (Training training : trainings) {
			if( training.getSportsObjectID().equals(objectID)) {
				output.add(training);
			}
		}
		return trainings;
	}
	
}

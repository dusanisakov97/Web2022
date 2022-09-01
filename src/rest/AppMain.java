package rest;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.util.UUID;

import com.google.gson.Gson;

import daos.FeeDAO;
import daos.SportsObjectDAO;
import daos.TrainingDAO;
import daos.UserDAO;
import domain.Coach;
import domain.Customer;
import domain.Manager;
import domain.SportsObject;
import domain.User;
import dtos.LoginParams;
import spark.Session;

public class AppMain {

	
	static public UserDAO userDAO = new UserDAO();
	static public FeeDAO feeDAO = new FeeDAO();
	static public TrainingDAO trainingDAO = new TrainingDAO();
	static public SportsObjectDAO sportsObjectDAO = new SportsObjectDAO();
	
	static public Gson g = new Gson(); 

	
	public static void main(String[] args) throws Exception {
		port(9001);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		post("/login", (req, res) -> {
			res.type("application/json");
			
			LoginParams params = g.fromJson(req.body(), LoginParams.class);
			User u = userDAO.login(params);
			if (u != null) {
				Session session = req.session(true);
				session.attribute("user", u);
			
			} else {
				res.status(400);
			}
			return g.toJson(u);
		});
		
		post("/customer", (req, res) -> {
			res.type("applicaton/json");
			Customer c = g.fromJson(req.body(), Customer.class);

			User u = userDAO.addUser(c);
			if(u == null) {
				res.status(409);
			} else {
				res.status(201);
				res.body(g.toJson(u));
			}
			
			return res;
		});
		
		post("/manager", (req, res) -> {
			res.type("applicaton/json");
			Manager c = g.fromJson(req.body(), Manager.class);

			User u = userDAO.addUser(c);
			if(u == null) {
				res.status(409);
			} else {
				res.status(201);
				res.body(g.toJson(u));
			}
			
			return res;
		});
		
		post("/coach", (req, res) -> {
			res.type("applicaton/json");
			Coach c = g.fromJson(req.body(), Coach.class);

			User u = userDAO.addUser(c);
			if(u == null) {
				res.status(409);
			} else {
				res.status(201);
				res.body(g.toJson(u));
			}
			
			return res;
		});
		
		get("/fees", (req, res) -> {
			res.type("application/json");
			return g.toJson(feeDAO.getFees());
		});
		
		
		get("/sports-object", (req, res) -> {
			res.type("application/json");
			UUID id = UUID.fromString(req.params("id"));
			SportsObject o = sportsObjectDAO.getSportsObjectByID(id);
			if(o == null) {
				res.status(400);
			} else {
				res.status(200);
			}
			return o;
		});
	}

}

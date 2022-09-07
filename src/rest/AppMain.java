package rest;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.delete;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.util.UUID;

import com.google.gson.Gson;

import daos.FeeDAO;
import daos.SportsObjectDAO;
import daos.UserDAO;
import domain.Coach;
import domain.Customer;
import domain.Fee;
import domain.Manager;
import domain.SportsObject;
import domain.User;
import dtos.LoginParams;
import enums.Role;
import spark.Session;

public class AppMain {

	
	static public UserDAO userDAO = new UserDAO();
	static public FeeDAO feeDAO = new FeeDAO();
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
		
		get("/logout", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			session.invalidate();
			return true;
		});
		
		post("/customer", (req, res) -> {
			res.type("applicaton/json");
			Customer c = g.fromJson(req.body(), Customer.class);
			c.setRole(Role.CUSTOMER);
			c.setId(UUID.randomUUID());
			c.setCustomerType(null);
			c.setPoints(0);
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
			c.setRole(Role.MANAGER);
			c.setId(UUID.randomUUID());

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
			c.setRole(Role.COACH);
			c.setId(UUID.randomUUID());

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
			return g.toJson(o);
		});
		
		get("/session", (req, res)  -> {
			res.type("application/json");
			Session session = req.session(true);
			User user = session.attribute("user");
			return g.toJson(user);
		});
		
		get("/admin/users", (req, res) -> {
			res.type("application/json");
			return g.toJson(userDAO.getUsers());
			
		});
	
		put("/user", (req, res) -> {
			res.type("applicaton/json");
			User c = g.fromJson(req.body(), User.class);
			User user = userDAO.update(c);
			return g.toJson(user);
			
		});
		
		post("/sports-object", (req, res) -> {
			res.type("applicaton/json");
			SportsObject c = g.fromJson(req.body(), SportsObject.class);
			c.setId(UUID.randomUUID());
			c.setAverageMark(Double.valueOf(0));
			c.setCounter(0);
			c.setSum(Double.valueOf(0));
			c = sportsObjectDAO.add(c);
			res.status(201);
			return g.toJson(c);
		});
		
		get("/sports-objects", (req, res) -> {
			res.type("applicaton/json");
			return g.toJson(sportsObjectDAO.getSportsObjects());
		});
		
		get("/fees", (req, res) -> {
			res.type("applicaton/json");
			return g.toJson(feeDAO.getFees());
		});
		
		get("/managers/sports-object", (req, res) -> {
			res.type("applicaton/json");
			return g.toJson(userDAO.getFreeManagers());
		});
		
		delete("/user", (req, res) -> {
			res.type("applicaton/json");
			UUID id = UUID.fromString(req.queryParams("id"));
			return g.toJson(userDAO.delete(id));
		});
		
		post("/customer/fee", (req, res) -> {
			res.type("applicaton/json");
			Fee c = g.fromJson(req.body(), Fee.class);
			Session session = req.session(true);
			
			Customer cus = session.attribute("user");
			if(c == null) {
				res.status(403);
			} else {
				Customer customer = userDAO.getCustomerByID(c.getId());
				customer.setActiveFee(c);
			}

			return g.toJson(cus);
		});
	}
}

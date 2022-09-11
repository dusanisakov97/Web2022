package rest;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.delete;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import javax.servlet.MultipartConfigElement;
import javax.servlet.http.Part;

import com.google.gson.Gson;

import daos.FeeDAO;
import daos.SportsObjectDAO;
import daos.UserDAO;
import domain.Coach;
import domain.Customer;
import domain.Fee;
import domain.Manager;
import domain.SportsObject;
import domain.Training;
import domain.User;
import dtos.LoginParams;
import enums.Role;
import spark.Session;
import spark.utils.IOUtils;

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
				
				if(u.getRole().equals(Role.CUSTOMER)) {
					Customer customer = (Customer) u;
					if (customer.getActiveFee() != null) {
						LocalDate now = LocalDate.now();
						DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
						LocalDate fee = LocalDate.parse(customer.getStartOfFee(), formatter).plusMonths(customer.getActiveFee().getMonths());
						if (now.isAfter(fee)) {
							if(customer.getActiveFee().getTrainings() / 3 > (customer.getActiveFee().getTrainings() - customer.getNumberOfTrainings())) {
								Integer points =  (int) (customer.getActiveFee().getPrice()/1000*3*4);
								userDAO.setCustomerPoints(customer, 0-points);

							} else {
								Integer points =  (int) (customer.getActiveFee().getPrice()/1000 * customer.getNumberOfTrainings());
								userDAO.setCustomerPoints(customer, points);

							}
							
						}
					}
					
				}
			
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
			UUID id = UUID.fromString(req.queryParams("id"));
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
			Manager manager = (Manager) userDAO.getUserByID(c.getManagerID());
			manager.setSportsObjectID(c.getId());
			userDAO.update(manager);
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
			
			User cus = session.attribute("user");
			if(cus == null) {
				res.status(403);
			} else {
				Customer customer = userDAO.addFee(c, cus.getId());
				res.status(201);
			}

			return g.toJson(cus);
		});
		

		post("/image", (request, response) -> {
			request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("static/data/profile"));					
			Session ss = request.session(true);			
			Part uploadedFile = request.raw().getPart("image");
			String id = UUID.randomUUID().toString();
			Path out = Paths.get("static/data/img/" + id + ".jpg");

		    try(final java.io.InputStream in = uploadedFile.getInputStream()){

		    	OutputStream outStream = new FileOutputStream(out.toString());		 
		    	IOUtils.copy(in, outStream);
		    	
		    	outStream.close();
		    	uploadedFile.delete();
		    	in.close();
		    	 	
		    } catch (Exception e) {
		    	e.printStackTrace();
		    }
		       
		    return "data/img/" + id + ".jpg";
			
		});
		
		post("/training", (req, res) -> {
			res.type("applicaton/json");
			Training c = g.fromJson(req.body(), Training.class);
			c.setId(UUID.randomUUID());
			
			SportsObject sportsObject = sportsObjectDAO.addTraining(c);
			if(sportsObject == null) {
				res.status(409);
			} else {
				res.status(201);
			}
			return g.toJson(sportsObject);

		});
		
		get("/coaches", (req, res) -> {
			res.type("application/json");
			return g.toJson(userDAO.getCoaches());
		});
		
		post("/customer/training", (req, res) -> {
			res.type("applicaton/json");
			Training c = g.fromJson(req.body(), Training.class);
			
			Session session = req.session(true);
			
			Customer cus = session.attribute("user");
			if(cus == null ) {
				res.status(403);
			} else if (cus.getNumberOfTrainings() <= 0) {
				res.status(400);
			} else {
				Customer customer = userDAO.addTraining(c, cus.getId());
				res.status(201);
			}

			return g.toJson(cus);
		});
	}
}

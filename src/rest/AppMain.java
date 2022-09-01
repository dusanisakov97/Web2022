package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;

public class AppMain {

	public static void main(String[] args) throws Exception {
		port(9001);

		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		
		// End-points
		// Test
		get("/test", (request, response) ->{	
			return "Test";	
		});
		
	}

}

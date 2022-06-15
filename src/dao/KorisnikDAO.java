package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Administrator;
import beans.Korisnik;
import beans.Korisnik.Uloga;

public class KorisnikDAO {

	private ArrayList<Korisnik> korisnici = new ArrayList<Korisnik>();
	
	public static Administrator glavniAdmin;
	
	private String contextPath;
	
	public KorisnikDAO(String path) {	
		
		contextPath = path;
		
		try {
			loadAdministratorUsers();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		Administrator glavniAdministrator = new Administrator("admin","admin");
		korisnici.add(glavniAdministrator);
		
		glavniAdmin = glavniAdministrator;		
	}
	
	//ucitavanje korisnika iz .json datoteka
	private void loadAdministratorUsers() throws IOException {
			
		ObjectMapper mapper = new ObjectMapper();
			
		//zadajemo putanju do fajla iz kog citamo admina
		File file = new File(this.contextPath + "data" + java.io.File.separator + "admin.json");
			
		String json = ""; 
		String temp = "";
			
		//ukoliko fajl postoji, citaj iz njega
		if(file.exists()) {
			try(BufferedReader br = new BufferedReader(new FileReader(file))){
				while ((temp = br.readLine()) != null) {
					json += temp;
				}
			}	
				
		//procitane administratore smestamo u listu
		List<Administrator> admini = mapper.readValue(json,
			new TypeReference<ArrayList<Administrator>>() {});
				
			korisnici.clear();
			for(Administrator admin : admini) {
				korisnici.add(admin);
				System.out.println(admin.toString());
			}
		}	
	}
	
	//da li korisnicko ime postoji?
	public boolean postojiKorisnickoIme(String korisnickoIme) {
		for(Korisnik korisnik : korisnici) {
				if(korisnik.getKorisnicko_ime() == korisnickoIme) {
					return true;
				}
		}
		
		return false;
	}
	
	//vraca korisnika sa zadatim korisnickim imenom
	public Korisnik getOneKorisnik(String korisnickoIme) {		
		for(Korisnik korisnik : korisnici) {
			if(korisnik.getKorisnicko_ime() == korisnickoIme) {
				return korisnik;
			}
		}
		return null;
	}
	
}

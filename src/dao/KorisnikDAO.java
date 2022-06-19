package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Administrator;
import beans.Kupac;
import beans.Menadzer;
import beans.Trener;
import beans.Korisnik;
import beans.Korisnik.Uloga;

public class KorisnikDAO {

	private HashMap<String, Korisnik> korisnici = new HashMap<String, Korisnik>();
	
	public static Administrator glavniAdmin;
	
	private String contextPath;
	
	public KorisnikDAO(String path) {	
		
		contextPath = path;
		
		try {
			loadUsers();
		}catch(IOException e) {
			e.printStackTrace();
		}		
		
		Administrator a = new Administrator("admin","admin","Admir","Admirovic","muski");
		korisnici.put(a.getKorisnicko_ime(), a);
		
		glavniAdmin = a;		
	}
	
	//dodaj korisnika
	public void dodajKorisnik(Korisnik korisnik) {
		korisnici.put(korisnik.getKorisnicko_ime(), korisnik);
		System.out.println(korisnik.toString() + " " + "dodat u listu korisnika!");
	}
	
	//da li korisnicko ime postoji?
	public boolean postojiKorisnickoIme(String korisnickoIme) {
		return korisnici.containsKey(korisnickoIme);
	}
	
	//da li postoji korisnik?
	public boolean postojiKorisnik(String korisnickoIme, String lozinka) {
		for(Korisnik korisnik : korisnici.values()) {
			if(korisnik.getKorisnicko_ime().equals(korisnickoIme) && korisnik.getLozinka().equals(lozinka)) {
				return true;
			}
		}
		return false;
	}
	
	//vraca korisnika sa zadatim korisnickim imenom
	public Korisnik getOneKorisnik(String ki) {
		
		Korisnik value = korisnici.get(ki);
		
		if(value != null) {
			return value;
		}else {
			return null;
		}
		
	}
	
	//vraca sve korisnike
	public ArrayList<Korisnik> getKorisnici(){
		
		ArrayList<Korisnik> lista = new ArrayList<Korisnik>();
		
		for(Korisnik k : korisnici.values()) {
			lista.add(k);
		}
		
		return lista;
	}
	
	//kod zamene uloge
	public void zameniKorisnika(String korisnickoIme, Korisnik k)
	{
		korisnici.put(korisnickoIme, k);
	}
	
	//ucitavanje korisnika iz .json datoteka
	private void loadUsers() throws IOException {
		
		ObjectMapper mapper = new ObjectMapper();
		
		//zadajemo putanju do fajla iz kog citamo admina
		File file = new File(this.contextPath + "data" + java.io.File.separator + "admin.json");
		
		String json = ""; 
		String temp;
		
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
			
			this.korisnici.clear();
			for(Administrator a : admini) {
				this.korisnici.put(a.getKorisnicko_ime(), a);
				System.out.println(a.toString());
			}
		}
		
		file = new File(this.contextPath + "data"+ java.io.File.separator +"menadzer.json");
		json = "";
		
		if(file.exists()) {
			try(BufferedReader br = new BufferedReader(new FileReader(file))) { 
				while ((temp = br.readLine()) != null) {
					json += temp;
				}
			}
			
			ArrayList<Menadzer> list3 = mapper.readValue(json, 
					new TypeReference<ArrayList<Menadzer>>() {});
			
			for(Menadzer menadzer: list3) {
				this.korisnici.put(menadzer.getKorisnicko_ime(), menadzer);
				System.out.println(menadzer.toString());
			}
				
		}
		
		file = new File(this.contextPath + "data"+ java.io.File.separator +"trener.json");
		json = "";
		
		if(file.exists()) {
			try(BufferedReader br = new BufferedReader(new FileReader(file))) { 
				while ((temp = br.readLine()) != null) {
					json += temp;
				}
			}
			
			ArrayList<Trener> list4 = mapper.readValue(json, 
					new TypeReference<ArrayList<Trener>>() {});
			
			for(Trener trener: list4) {
				this.korisnici.put(trener.getKorisnicko_ime(), trener);
				System.out.println(trener.toString());
			}
				
		}
		
		file = new File(this.contextPath + "data"+ java.io.File.separator +"kupac.json");
		json = "";
		
		if(file.exists()) {
			try(BufferedReader br = new BufferedReader(new FileReader(file))) { 
				while ((temp = br.readLine()) != null) {
					json += temp;
				}
			}
			
			ArrayList<Kupac> list22 = mapper.readValue(json, 
					new TypeReference<ArrayList<Kupac>>() {});
			
			for(Kupac kupac: list22) {
				this.korisnici.put(kupac.getKorisnicko_ime(), kupac);
				System.out.println(kupac.toString());
			}
				
		}
	}
	
	public void sacuvajKorisnika() {
		ObjectMapper mapper = new ObjectMapper();
		
		ArrayList<Kupac> list = new ArrayList<Kupac>();
		for (Korisnik korisnik: this.korisnici.values()) {
			if (korisnik.getUloga().equals(Uloga.Kupac)) {
				list.add( (Kupac)korisnik );
			}
		}
		File file = new File(this.contextPath + "data"+ java.io.File.separator +"kupac.json");
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, list);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		ArrayList<Trener> list2 = new ArrayList<Trener>();		
		for (Korisnik korisnik: this.korisnici.values()) {
			if (korisnik.getUloga().equals(Uloga.Trener)) {
				list2.add((Trener)korisnik );
			}
		}
		File file2 = new File(this.contextPath + "data"+ java.io.File.separator +"trener.json");
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file2, list2);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		ArrayList<Menadzer> list3 = new ArrayList<Menadzer>();		
		for (Korisnik korisnik: this.korisnici.values()) {
			if (korisnik.getUloga().equals(Uloga.Menadzer)) {
				list3.add((Menadzer)korisnik );
			}
		}
		File file3 = new File(this.contextPath + "data"+ java.io.File.separator +"menadzer.json");
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file3, list3);
		} catch (IOException e) {
			e.printStackTrace();
		}		
		
	}
}
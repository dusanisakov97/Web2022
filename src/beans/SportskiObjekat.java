package beans;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class SportskiObjekat {
	
	public enum Tip {
		Teretana, Bazen, Sportski_Centar, Plesni_studio
	}
	
	public enum Status {
		Radi, Ne_radi
	}
	
	private String naziv;
	private Tip tip;
	private ArrayList<SadrzajObjekta> sadrzaj;
	private Status status;
	private Lokacija lokacija;
	private String slika;
	private double ocena;
	private String radno_vreme;
	
	private Boolean uklonjen = false;
	private String idObjekta = UUID.randomUUID().toString();
	
	public SportskiObjekat() {
		super();
		this.status = Status.Ne_radi;
	}
	
	public SportskiObjekat(String naziv, Tip tip, ArrayList<SadrzajObjekta> sadrzaj,Lokacija lokacija,
			String slika, double ocena, String radno_vreme, Boolean uklonjen, String id) {
		super();
		this.naziv = naziv;
		this.tip = tip;
		this.sadrzaj = new ArrayList<SadrzajObjekta>();
		this.lokacija = lokacija;
		this.slika = slika;
		this.ocena = ocena;
		this.radno_vreme = radno_vreme;
		this.uklonjen = uklonjen;
		this.idObjekta = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public Tip getTip() {
		return tip;
	}

	public void setTip(Tip tip) {
		this.tip = tip;
	}

	public ArrayList<SadrzajObjekta> getSadrzaj() {
		return sadrzaj;
	}

	public void setSadrzaj(ArrayList<SadrzajObjekta> sadrzaj) {
		this.sadrzaj = sadrzaj;
	}

	public Lokacija getLokacija() {
		return lokacija;
	}

	public void setLokacija(Lokacija lokacija) {
		this.lokacija = lokacija;
	}

	public String getSlika() {
		return slika;
	}

	public void setSlika(String slika) {
		this.slika = slika;
	}

	public double getOcena() {
		return ocena;
	}

	public void setOcena(double ocena) {
		this.ocena = ocena;
	}

	public String getRadno_vreme() {
		return radno_vreme;
	}

	public void setRadno_vreme(String radno_vreme) {
		this.radno_vreme = radno_vreme;
	}

	public Boolean getUklonjen() {
		return uklonjen;
	}

	public void setUklonjen(Boolean uklonjen) {
		this.uklonjen = uklonjen;
	}

	public String getIdObjekta() {
		return idObjekta;
	}

	public void setIdObjekta(String idObjekta) {
		this.idObjekta = idObjekta;
	}

}

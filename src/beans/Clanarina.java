package beans;

import java.sql.Date;
import java.util.UUID;

public class Clanarina {

	public enum Tip {
		Dnevna, Mesecna, Godisnja
	}
	
	public enum Status {
		Aktivan, Neaktivan
	}
	
	private String id = UUID.randomUUID().toString();
	private Tip tip;
	private Date datum_placanja;
	private Date datum_vazenja;
	private double cena;
	private Kupac kupac;
	private Status status;
	private double broj_termina;
	
	public Clanarina() {
		super();
		this.status = Status.Neaktivan;
	}
	
	public Clanarina(String id, Tip tip, Date datum_placanja, Date datum_vazenja, double cena, Kupac kupac,
			Status status, double broj_termina) {
		super();
		this.id = id;
		this.tip = tip;
		this.datum_placanja = datum_placanja;
		this.datum_vazenja = datum_vazenja;
		this.cena = cena;
		this.kupac = kupac;
		this.status = status;
		this.broj_termina = broj_termina;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Tip getTip() {
		return tip;
	}

	public void setTip(Tip tip) {
		this.tip = tip;
	}

	public Date getDatum_placanja() {
		return datum_placanja;
	}

	public void setDatum_placanja(Date datum_placanja) {
		this.datum_placanja = datum_placanja;
	}

	public Date getDatum_vazenja() {
		return datum_vazenja;
	}

	public void setDatum_vazenja(Date datum_vazenja) {
		this.datum_vazenja = datum_vazenja;
	}

	public double getCena() {
		return cena;
	}

	public void setCena(double cena) {
		this.cena = cena;
	}

	public Kupac getKupac() {
		return kupac;
	}

	public void setKupac(Kupac kupac) {
		this.kupac = kupac;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public double getBroj_termina() {
		return broj_termina;
	}

	public void setBroj_termina(double broj_termina) {
		this.broj_termina = broj_termina;
	}
}

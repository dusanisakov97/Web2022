package beans;

public class Trening {

	public enum Tip {
		Grupni, Personalni, Teretana
	}
	
	private String naziv;
	private Tip tip;
	private SportskiObjekat objekat;
	private double trajanje;
	private Trener trener;
	private String opis;
	private String slika;
	
	public Trening() {
		super();
	}
	
	public Trening(String naziv, Tip tip, SportskiObjekat objekat, double trajanje, Trener trener, String opis,
			String slika) {
		super();
		this.naziv = naziv;
		this.tip = tip;
		this.objekat = objekat;
		this.trajanje = trajanje;
		this.trener = trener;
		this.opis = opis;
		this.slika = slika;
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

	public SportskiObjekat getObjekat() {
		return objekat;
	}

	public void setObjekat(SportskiObjekat objekat) {
		this.objekat = objekat;
	}

	public double getTrajanje() {
		return trajanje;
	}

	public void setTrajanje(double trajanje) {
		this.trajanje = trajanje;
	}

	public Trener getTrener() {
		return trener;
	}

	public void setTrener(Trener trener) {
		this.trener = trener;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public String getSlika() {
		return slika;
	}

	public void setSlika(String slika) {
		this.slika = slika;
	}
}

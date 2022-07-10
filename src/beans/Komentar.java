package beans;

import java.util.UUID;

public class Komentar {

	private String kupac;
	private String objekat;
	private String tekst;
	private double ocena;
	private boolean komentarVidljiv = true;
	private String idKomentara = UUID.randomUUID().toString();
	
	public Komentar() {
		super();
	}
	
	public Komentar(String kupac, String objekat, String tekst, double ocena, boolean vidljiv, String id) {
		super();
		this.kupac = kupac;
		this.objekat = objekat;
		this.tekst = tekst;
		this.ocena = ocena;
		this.komentarVidljiv = vidljiv;
		this.idKomentara = id;
	}

	public String getKupac() {
		return kupac;
	}

	public void setKupac(String kupac) {
		this.kupac = kupac;
	}

	public String getObjekat() {
		return objekat;
	}

	public void setObjekat(String objekat) {
		this.objekat = objekat;
	}

	public String getTekst() {
		return tekst;
	}

	public void setTekst(String tekst) {
		this.tekst = tekst;
	}

	public double getOcena() {
		return ocena;
	}

	public void setOcena(double ocena) {
		this.ocena = ocena;
	}

	@Override
	public String toString() {
		return "Komentar [kupac=" + kupac + ", objekat=" + objekat + ", tekst=" + tekst + ", ocena=" + ocena + ", vidljiv= " + komentarVidljiv + ", idKomentara= " + idKomentara + "]";
	}

	public boolean isKomentarVidljiv() {
		return komentarVidljiv;
	}

	public void setKomentarVidljiv(boolean komentarVidljiv) {
		this.komentarVidljiv = komentarVidljiv;
	}

	public String getIdKomentara() {
		return idKomentara;
	}

	public void setIdKomentara(String idKomentara) {
		this.idKomentara = idKomentara;
	}
}

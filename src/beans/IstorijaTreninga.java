package beans;

import java.sql.Date;

public class IstorijaTreninga {

	private Date datum_prijave;
	private Trening trening;
	private Kupac kupac;
	private Trener trener;
	
	public IstorijaTreninga() {
		super();
	}
	
	public IstorijaTreninga(Date datum_prijave, Trening trening, Kupac kupac, Trener trener) {
		super();
		this.datum_prijave = datum_prijave;
		this.trening = trening;
		this.kupac = kupac;
		this.trener = trener;
	}

	public Date getDatum_prijave() {
		return datum_prijave;
	}

	public void setDatum_prijave(Date datum_prijave) {
		this.datum_prijave = datum_prijave;
	}

	public Trening getTrening() {
		return trening;
	}

	public void setTrening(Trening trening) {
		this.trening = trening;
	}

	public Kupac getKupac() {
		return kupac;
	}

	public void setKupac(Kupac kupac) {
		this.kupac = kupac;
	}

	public Trener getTrener() {
		return trener;
	}

	public void setTrener(Trener trener) {
		this.trener = trener;
	}
}

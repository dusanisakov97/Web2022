package beans;

import beans.Korisnik.Uloga;

public class Trener extends Korisnik {

	public Trener(String korisnickoIme, String lozinka) {
		super(korisnickoIme, lozinka);
		//iznajmljeniAp = new ArrayList<Apartman>();
	//	rezervacije = new ArrayList<Rezervacija>();
	}
	
	public Trener(String ki, String loz, String ime, String prz, String pol) {
		super(ki, loz, ime, prz, pol, Uloga.Trener);
	//	iznajmljeniAp = new ArrayList<Apartman>();
	//	rezervacije = new ArrayList<Rezervacija>();
	}
	
	public Trener(Korisnik k) {
		super(k.getKorisnicko_ime(), k.getLozinka(), k.getIme(), k.getPrezime(), k.getPol(), Uloga.Trener);
	}
	
}
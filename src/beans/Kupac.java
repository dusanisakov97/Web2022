package beans;

import beans.Korisnik.Uloga;

public class Kupac extends Korisnik {

	public Kupac(String korisnickoIme, String lozinka) {
		super(korisnickoIme, lozinka);
		//iznajmljeniAp = new ArrayList<Apartman>();
	//	rezervacije = new ArrayList<Rezervacija>();
	}
	
	public Kupac(String ki, String loz, String ime, String prz, String pol) {
		super(ki, loz, ime, prz, pol, Uloga.Kupac);
	//	iznajmljeniAp = new ArrayList<Apartman>();
	//	rezervacije = new ArrayList<Rezervacija>();
	}
	
	public Kupac(Korisnik k) {
		super(k.getKorisnicko_ime(), k.getLozinka(), k.getIme(), k.getPrezime(), k.getPol(), Uloga.Kupac);
	}
	
}

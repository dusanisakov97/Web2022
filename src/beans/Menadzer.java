package beans;

import beans.Korisnik.Uloga;

public class Menadzer extends Korisnik {
	
	public Menadzer() {
		super();
	}

	public Menadzer(String korisnickoIme, String lozinka) {
		super(korisnickoIme, lozinka);
	}
	
	public Menadzer(String ki, String loz, String ime, String prz, String pol) {
		super(ki, loz, ime, prz, pol, Uloga.Menadzer);
	}
	
	public Menadzer(Korisnik k) {
		super(k.getKorisnicko_ime(), k.getLozinka(), k.getIme(), k.getPrezime(), k.getPol(), Uloga.Menadzer);
	}
	
}
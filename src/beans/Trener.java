package beans;

import beans.Korisnik.Uloga;

public class Trener extends Korisnik {
	
	public Trener() {
		super();
	}

	public Trener(String korisnickoIme, String lozinka) {
		super(korisnickoIme, lozinka);
	}
	
	public Trener(String ki, String loz, String ime, String prz, String pol) {
		super(ki, loz, ime, prz, pol, Uloga.Trener);
	}
	
	public Trener(Korisnik k) {
		super(k.getKorisnicko_ime(), k.getLozinka(), k.getIme(), k.getPrezime(), k.getPol(), Uloga.Trener);
	}
	
}
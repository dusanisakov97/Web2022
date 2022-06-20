package beans;

public class Kupac extends Korisnik {
	
	public Kupac() {
		super();
	}

	public Kupac(String korisnickoIme, String lozinka) {
		super(korisnickoIme, lozinka);
	}
	
	public Kupac(String ki, String loz, String ime, String prz, String pol) {
		super(ki, loz, ime, prz, pol, Uloga.Kupac);
	}
	
	public Kupac(Korisnik k) {
		super(k.getKorisnicko_ime(), k.getLozinka(), k.getIme(), k.getPrezime(), k.getPol(), Uloga.Kupac);
	}
	
}

package beans;

public class TipKupca {

	public enum ImeTipa {Zlatni, Srebrni, Bronzani}
	
	private ImeTipa imeTipa;
	private int popust;
	private int brBodova;
	
	public TipKupca() {
		super();
	}

	public TipKupca(ImeTipa imeTipa, int popust, int brBodova) {
		super();
		this.imeTipa = imeTipa;
		this.popust = popust;
		this.brBodova = brBodova;
	}

	public ImeTipa getImeTipa() {
		return imeTipa;
	}

	public void setImeTipa(ImeTipa imeTipa) {
		this.imeTipa = imeTipa;
	}

	public int getPopust() {
		return popust;
	}

	public void setPopust(int popust) {
		this.popust = popust;
	}

	public int getBrBodova() {
		return brBodova;
	}

	public void setBrBodova(int brBodova) {
		this.brBodova = brBodova;
	}

	@Override
	public String toString() {
		return "TipKupca [imeTipa=" + imeTipa + ", popust=" + popust + ", brBodova=" + brBodova + "]";
	}
	
}

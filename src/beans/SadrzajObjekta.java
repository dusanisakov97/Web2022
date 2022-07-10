package beans;

public class SadrzajObjekta {

	private String item;
	private Boolean uklonjen = false;
	
	public SadrzajObjekta() {
		super();
	}
	
	public SadrzajObjekta(String item, Boolean uklonjen) {
		super();
		this.item = item;
		this.uklonjen = uklonjen;
	}
	
	public String getItem() {
		return item;
	}
	
	public void setItem(String nazivItema) {
		this.item = nazivItema;
	}
	
	public Boolean getUklonjen() {
		return uklonjen;
	}
	
	public void setUklonjen(Boolean uklonjen) {
		this.uklonjen = uklonjen;
	}

	@Override
	public String toString() {
		return "SadrzajObjekta [item=" + item + ", uklonjen=" + uklonjen + "]";
	}
	
}

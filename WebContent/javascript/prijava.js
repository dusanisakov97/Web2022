$(document).ready(function(){

//odustajanje od prijave korisnika
	$("#odustani").click(function(event){
		event.preventDefault();
		window.location.href = "index.html";
	})
	
	let allTds = $("td");
	
	//validacija za korisnicko ime
	let tag = document.createElement("p");
	tag.setAttribute("id", "prvi");
	let text = document.createTextNode("Polje ne sme biti prazno!");
	tag.append(text);	
	tag.style.color = 'white';
	let obojeniTekst = tag;
	allTds[1].after(obojeniTekst);
	document.getElementById("prvi").hidden = true;
		
	//validacija za lozinku
	let tag2 = document.createElement("p");
	tag2.setAttribute("id", "drugi");
	let text2 = document.createTextNode("Polje ne sme biti prazno!");
	tag2.append(text2);	
	tag2.style.color = 'white';
	let obojeniTekst2 = tag2;
	allTds[3].after(obojeniTekst2);
	document.getElementById("drugi").hidden = true;
	
	$("#prijavi").click(function(event) {
		event.preventDefault();
		
		let kor_ime = $("#korIme").val();
		let loz = $("#loz").val();

		if(kor_ime == ""){
			document.getElementById("prvi").hidden = false;
		}else {
			document.getElementById("prvi").hidden = true;
		}

		if(loz == ""){
			document.getElementById("drugi").hidden = false;
		}else {
			document.getElementById("drugi").hidden = true;
		}
	})
	
});
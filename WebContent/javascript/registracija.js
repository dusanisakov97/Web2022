$(document).ready(function(){
	
	$('#greskaKorImePor').hide();
	$('#greskaLozPor').hide();
	$('#greskaPonLozPor').hide();
	$('#greskaImePor').hide();
	$('#greskaPrzPor').hide();

	var greskaKorIme = false;
	var greskaLoz = false;
	var greskaPonLoz = false;
	var greskaIme = false;
	var greskaPrz = false;

	$('#korIme').focusout(function() {
		proveriKorIme();
	});

	$('#loz').focusout(function() {
		proveriLozinku();		
	});

	$('#ponLoz').focusout(function() {
		proveriPonLozinku();
	});

	$('#imeKorisnika').focusout(function() {
		proveriIme();
	});

	$('#przKorisnika').focusout(function() {
		proveriPrezime();
	});

	function proveriKorIme() {
		var korImeDuz = $('#korIme').val().length;

		if (korImeDuz < 5 || korImeDuz > 20) {
			$('#greskaKorImePor').html("Korisničko ime mora imati 5-20 karaktera");
			$('#greskaKorImePor').show();
			greskaKorIme = true;
		} else {		
			$('#greskaKorImePor').hide();
		}
	}

	function proveriLozinku() {
		var lozinkaDuz = $('#loz').val().length;

		if (lozinkaDuz < 5) {
			$('#greskaLozPor').html("Lozinka mora imati najmanje 5 karaktera");
			$('#greskaLozPor').show();
			greskaLoz = true;
		} else {
			$('#greskaLozPor').hide();
		}

	}

	function proveriPonLozinku() {
		var lozinka = $('#loz').val();
		var ponLozinka = $('#ponLoz').val();

		if (lozinka != ponLozinka) {
			$('#greskaPonLozPor').html("Lozinke se ne poklapaju");
			$('#greskaPonLozPor').show();
			greskaPonLoz = true;
		} else {
			$('#greskaPonLozPor').hide();
		}

	}

	function proveriIme() {
		var ime = $('#imeKorisnika').val();
		
		if (ime == "") {
			$('#greskaImePor').html("Unesite ime");
			$('#greskaImePor').show();
			greskaIme = true;
		} else {
			$('#greskaImePor').hide();
		}

	}

	function proveriPrezime() {
		var prz = $('#przKorisnika').val();
		
		if (prz == "") {
			$('#greskaPrzPor').html("Unesite prezime");
			$('#greskaPrzPor').show();
			greskaPrz = true;
		} else {
			$('#greskaPrzPor').hide();
		}

	}
	
	$('#registruj').click(function(event) {
		
		event.preventDefault();

		greskaKorIme = false;
		greskaLoz = false;
		greskaPonLoz = false;
		greskaIme = false;
		greskaPrz = false;

		proveriKorIme();
		proveriLozinku();
		proveriPonLozinku();
		proveriIme();
		proveriPrezime();
		
	})
	
	//odustajanje od registracije korisnika
	$("#odustani").click(function(event){
		event.preventDefault();
		window.location.href = "index.html";
	})
	
});
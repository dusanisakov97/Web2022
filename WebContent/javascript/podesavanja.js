$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: 'rest/korisnik/getKorisnik',
		complete: function(data){
			odlogujSe();
			pozdravPoruka(data.responseJSON);
			sakrijDugmad(data.responseJSON);
		}		
	})
});

function sakrijDugmad(korisnik){
	
	if(korisnik == undefined){
		$("#login_buttons").show();
		$("#acc_buttons").hide();
	}else {
		$("#login_buttons").hide();
		$("#acc_buttons").show();
	}	
}

function pozdravPoruka(korisnik) {
	if (korisnik == undefined) {
		$('#pozdravPor').hide();
	} else {
		$('#pozdravPor').text("Pozdrav " + korisnik.korisnicko_ime + " " + korisnik.uloga);
		$('#pozdravPor').show();
	}
}

function odlogujSe(){
	
	$("#odjava_btn").click(function(event){
		event.preventDefault();
		
		$.ajax({
			type: 'POST',
			url: 'rest/korisnik/logout',
			complete: function(data){
				window.location.href = "prijava.html";
			}
		})
	});
}
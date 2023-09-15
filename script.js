	'use strict'

	const URL = 'https://api.openweathermap.org/data/2.5/weather'; 
	const KEY = 'USE SUA KEY DO OPENWEATHER';
	const UNIDADE = 'metric';
	const flag = 'https://flagsapi.com'
	const url_icon = 'https://openweathermap.org/img/wn/'; //01d@2x.png
	const maps = 'https://www.google.com.br/maps/@'

	const mudaCor = () => {
		if (document.querySelector('#content').classList.value == "content") {
			document.querySelector('#content').classList.add('muda')
			document.querySelector('#btn').classList.add('muda')
		} else {
			document.querySelector('#content').classList.remove('muda')
			document.querySelector('#btn').classList.remove('muda')
		}

			
	}

	const tema = document.querySelector('#teste');
	tema.addEventListener('click', mudaCor)
	

	document.querySelector('#cidade').addEventListener('keyup', (e) => {
		if (e.keyCode == 13) {
			pegarCidade()
		}
	})
		
		function pegarCidade() {

			var cidade = document.querySelector('#cidade').value;

			loadUrl(cidade);
		}

		function loadUrl(cidade) {
			
			//let lat = pos.coords.latitude;
			//let long = pos.coords.longitude;
			let url = `${URL}?q=${cidade}&units=${UNIDADE}&APPID=${KEY}&lang=pt_br`;
			fetchApi(url);
			

		};

		async function fetchApi(url) {
			document.querySelector('#nok').innerHTML = ` `
			let cidade = document.querySelector('#cidade').value;
			let response = await fetch(url);
			let { main, name, sys, weather, coord } = await response.json();
			if (response.status == "404") {
				document.querySelector('#nok').innerHTML = `<h1>Cidade ${cidade} não localizada</h1>`
			} else {
				if (response.status == "400") {
					alert("Digite uma cidade")
				} else {
				let temperature = (main.temp).toFixed(1);
				let humidity = (main.humidity);
				let country = (sys.country);
				let icons = (weather[0].icon);
				let description = (weather[0].description).toUpperCase();
				let urlFlag = `${flag}/${country}/flat/24.png`;
				let iconWeather = `${url_icon}${icons}@2x.png`;
				let lat = coord.lat;
			  	let lon = coord.lon;
							
				const linkMapa = `${maps}${lat},${lon},12z?entry=ttu`;
				
				 
			document.querySelector('#city').innerHTML = `${name} <img id="goMaps" style="cursor: pointer;  height: 25px; width: 25px;" src="mapa.svg">`;
			document.querySelector('#temperature').innerHTML = `Temperatura em ${temperature} ºC`;
			document.querySelector('#description').innerHTML = `${description}`;
			document.querySelector('#humidity').innerHTML = `Umidade em ${humidity} %`;
			document.querySelector('#pais').innerHTML = `${country} <img id="bandeira" src="${urlFlag}">`;
			document.querySelector('#iconW').src = `${iconWeather}`; 
			document.querySelector('#goMaps').addEventListener('click', () => {window.open(linkMapa, '_blank')})
		}

		}

		}
var citiesArr = [];
// displayCurrentWeather function re-renders the HTML to display the appropriate content
function displayCurrentWeather(city) {
	//   var city = $("#cityInput").val();
	// <button class="city" data-name="denver">
	// var city = $(this).attr("data-name");

	var queryURL =
		'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=' +
		city +
		'&appid=97a2ed873883a66c3613e3529f2ee82f';

	// creates ajax call for the specific city current weather
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).then(function(response) {
		// creates a div to hold the data
		var currentWeatherDiv = $('<div>');
		$('#current-conditions').append(currentWeatherDiv);
		console.log(response);

		var lat = response.coord.lat;
		console.log('lat', lat);
		var lon = response.coord.lon;
		console.log('lon', lon);
		UVindex(lat, lon);
		DisplayFiveDayForecast(city);

		$(this).text(response.name);

		// var cityName1 = response.name;
		// console.log(cityName1);

		var icon = response.weather[0].icon;
		console.log('icon ' + icon);
		var iconURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
		console.log(iconURL);

		// Create CODE HERE to calculate the temperature (converted from Kelvin)
		var tempK = response.main.temp;
		// Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
		var tempF = ((tempK - 273.15) * 1.8 + 32).toFixed(1);
		console.log(tempF);
		// current Date
		var currentDate = moment().format('MM/DD/YYYY');
		console.log(currentDate);

		// // display city Name
		// $('.city').text(cityName1);
		// // display current date
		$('.currentDate').text(currentDate);
		// // display weather icon
		$('.icon').html("<img src='" + iconURL + "'>");
		// Create CODE HERE to dump the temperature content into HTML
		$('.temperature').text('Temperature: ' + tempF + ' F');
		// retrieves the humidity
		$('.humidity').text('Humidity: ' + response.main.humidity);
		// retrieves the wind speed
		$('.windSpeed').text('Wind Speed: ' + response.wind.speed);
	});
}

function UVindex(lat, lon) {
	var queryURL_UV =
		'https://api.openweathermap.org/data/2.5/uvi?appid=97a2ed873883a66c3613e3529f2ee82f&lat=' +
		lat +
		'&lon=' +
		lon;
	// console.log(queryURL_UV);
	$.ajax({
		url: queryURL_UV,
		method: 'GET'
	}).then(function(UVresponse) {
		console.log('UV response', UVresponse);
		// console.log("city", city);
		// $(".city").text(response.coord.lon);
		// $(".city").text(response.coord.lat);

		console.log('uv index', UVresponse.value);

		// ajax UV index call response.coord.lon.lat

		// retrieves the city + date + icon
		// add UV index
		$('.UVindex').text('UV index: ' + UVresponse.value);
	});
}

function DisplayFiveDayForecast(city) {
	// var city2 = $('#cityInput').val();
	// console.log(city2);
	var queryURL2 =
		'https://api.openweathermap.org/data/2.5/forecast?q=' +
		city +
		'&appid=97a2ed873883a66c3613e3529f2ee82f';

	$.ajax({
		url: queryURL2,
		method: 'GET'
	}).then(function(responseFiveDay) {
		console.log('responseFiveDay', responseFiveDay);
		// creates a div to hold the data
		var fiveDayForecastDiv = $('<div>');
		fiveDayForecastDiv.addClass('fiveDay');
		$('#fiveDay-Forecast').append(fiveDayForecastDiv);

		// use moment js to add 1 day to current date
		var date1 = moment()
			.add(1, 'days')
			.format('MM/DD/YYYY');
		console.log('date1: ' + date1);
		$('.date1').text(date1);

		// grab icon for 12pm & display
		var icon1 = responseFiveDay.list[4].weather[0].icon;
		console.log('icon ' + icon1);
		var iconURL1 = 'http://openweathermap.org/img/wn/' + icon1 + '@2x.png';
		console.log(iconURL1);
		$('.weather-icon1').html("<img src='" + iconURL1 + "'>");

		// grab response for temp Day 1
		// average temp between 3 responses (6am, 9am, 12pm, 3pm, 6pm)
		var temperatures = [];
		for (i = 0; i < 5; i++) {
			var tempK = responseFiveDay.list[i].main.temp;
			temperatures.push(parseInt(((tempK - 273.15) * 1.8 + 32).toFixed(1)));
		}

		console.log('temp arrary: ' + temperatures);
		var averageTemp =
			(temperatures[0] +
				temperatures[1] +
				temperatures[2] +
				temperatures[3] +
				temperatures[4]) /
			5;

		var humidity = [];
		for (i = 0; i < 5; i++) {
			var humid = responseFiveDay.list[i].main.humidity;
			humidity.push(parseInt(humid));
		}
		console.log('humidity array: ' + humidity);
		var averageHumidity =
			(humidity[0] + humidity[1] + humidity[2] + humidity[3] + humidity[4]) / 5;

		// display average temp1
		$('.avg1').text('Temp: ' + averageTemp);
		$('.AVGhumidity1').text('Humidity: ' + averageHumidity);

		console.log('average humidity: ' + averageHumidity);
		console.log('average temp: ' + averageTemp);

		// average temp day 2
		// use moment js to add 2 days to current date
		var date2 = moment()
			.add(2, 'days')
			.format('MM/DD/YYYY');
		console.log('date2: ' + date2);
		$('.date2').text(date2);

		// grab icon for 12pm & display
		var icon2 = responseFiveDay.list[12].weather[0].icon;
		console.log('icon ' + icon2);
		var iconURL2 = 'http://openweathermap.org/img/wn/' + icon2 + '@2x.png';
		console.log(iconURL2);
		$('.weather-icon2').html("<img src='" + iconURL2 + "'>");

		var temperatures2 = [];
		for (i = 8; i < 13; i++) {
			var tempK2 = responseFiveDay.list[i].main.temp;
			temperatures2.push(parseInt(((tempK2 - 273.15) * 1.8 + 32).toFixed(1)));
		}

		console.log('temp array: ' + temperatures2);
		var averageTemp2 =
			(temperatures2[0] +
				temperatures2[1] +
				temperatures2[2] +
				temperatures2[3] +
				temperatures2[4]) /
			5;

		var humidity2 = [];
		for (i = 8; i < 13; i++) {
			var humid2 = responseFiveDay.list[i].main.humidity;
			humidity2.push(parseInt(humid2));
		}
		console.log('humidity array: ' + humidity2);
		var averageHumidity2 =
			(humidity2[0] +
				humidity2[1] +
				humidity2[2] +
				humidity2[3] +
				humidity2[4]) /
			5;
		// display average temp 2
		$('.avg2').text('Temp: ' + averageTemp2);
		$('.AVGhumidity2').text('Humidity: ' + averageHumidity2);

		console.log('average humidity: ' + averageHumidity2);
		console.log('average temp: ' + averageTemp2);

		// average temp Day 3
		// use moment js to add 2 days to current date
		var date3 = moment()
			.add(3, 'days')
			.format('MM/DD/YYYY');
		console.log('date3: ' + date3);
		$('.date3').text(date3);

		// display icon day 3
		var icon3 = responseFiveDay.list[20].weather[0].icon;
		console.log('icon ' + icon3);
		var iconURL3 = 'http://openweathermap.org/img/wn/' + icon3 + '@2x.png';
		console.log(iconURL3);
		$('.weather-icon3').html("<img src='" + iconURL3 + "'>");

		var temperatures3 = [];
		for (i = 16; i < 21; i++) {
			var tempK3 = responseFiveDay.list[i].main.temp;
			temperatures3.push(parseInt(((tempK3 - 273.15) * 1.8 + 32).toFixed(1)));
		}

		console.log(temperatures3);
		var averageTemp3 =
			(temperatures3[0] +
				temperatures3[1] +
				temperatures3[2] +
				temperatures3[3] +
				temperatures3[4]) /
			5;

		var humidity3 = [];
		for (i = 16; i < 21; i++) {
			var humid3 = responseFiveDay.list[i].main.humidity;
			humidity3.push(parseInt(humid3));
		}
		console.log('humidity array: ' + humidity3);
		var averageHumidity3 =
			(humidity3[0] +
				humidity3[1] +
				humidity3[2] +
				humidity3[3] +
				humidity3[4]) /
			5;

		// display average temp 3
		$('.avg3').text('Temp: ' + averageTemp3);
		$('.AVGhumidity3').text('Humidity: ' + averageHumidity3);

		console.log('average humidity: ' + averageHumidity3);
		console.log('average temp: ' + averageTemp3);

		// avearge temp Day 4
		// use moment js to add 4 days to current date
		var date4 = moment()
			.add(4, 'days')
			.format('MM/DD/YYYY');
		console.log('date4: ' + date4);
		$('.date4').text(date4);

		// display icon for day 4
		var icon4 = responseFiveDay.list[28].weather[0].icon;
		console.log('icon ' + icon4);
		var iconURL4 = 'http://openweathermap.org/img/wn/' + icon4 + '@2x.png';
		console.log(iconURL4);
		$('.weather-icon4').html("<img src='" + iconURL4 + "'>");

		var temperatures4 = [];
		for (i = 24; i < 29; i++) {
			var tempK4 = responseFiveDay.list[i].main.temp;
			temperatures4.push(parseInt(((tempK4 - 273.15) * 1.8 + 32).toFixed(1)));
		}

		console.log(temperatures4);
		var averageTemp4 =
			(temperatures4[0] +
				temperatures4[1] +
				temperatures4[2] +
				temperatures4[3] +
				temperatures4[4]) /
			5;

		var humidity4 = [];
		for (i = 24; i < 29; i++) {
			var humid4 = responseFiveDay.list[i].main.humidity;
			humidity4.push(parseInt(humid4));
		}
		console.log('humidity array: ' + humidity4);
		var averageHumidity4 =
			(humidity4[0] +
				humidity4[1] +
				humidity4[2] +
				humidity4[3] +
				humidity4[4]) /
			5;
		// display average temp 4
		$('.avg4').text('Temp: ' + averageTemp4);
		$('.AVGhumidity4').text('Humidity: ' + averageHumidity4);

		console.log('average humidity: ' + averageHumidity4);
		console.log('average temp: ' + averageTemp4);

		// average temp Day 5
		// use moment js to add 5 days to current date
		var date5 = moment()
			.add(5, 'days')
			.format('MM/DD/YYYY');
		console.log('date5: ' + date5);
		$('.date5').text(date5);

		// display icon for day 5
		var icon5 = responseFiveDay.list[36].weather[0].icon;
		console.log('icon ' + icon5);
		var iconURL5 = 'http://openweathermap.org/img/wn/' + icon5 + '@2x.png';
		console.log(iconURL5);
		$('.weather-icon5').html("<img src='" + iconURL5 + "'>");

		var temperatures5 = [];
		for (i = 32; i < 37; i++) {
			var tempK5 = responseFiveDay.list[i].main.temp;
			temperatures5.push(parseInt(((tempK5 - 273.15) * 1.8 + 32).toFixed(1)));
		}

		console.log(temperatures5);
		var averageTemp5 =
			(temperatures5[0] +
				temperatures5[1] +
				temperatures5[2] +
				temperatures5[3] +
				temperatures5[4]) /
			5;

		var humidity5 = [];
		for (i = 32; i < 37; i++) {
			var humid5 = responseFiveDay.list[i].main.humidity;
			humidity5.push(parseInt(humid5));
		}
		console.log('humidity array: ' + humidity5);
		var averageHumidity5 =
			(humidity5[0] +
				humidity5[1] +
				humidity5[2] +
				humidity5[3] +
				humidity5[4]) /
			5;
		// display average temp day 5
		$('.avg5').text('Temp: ' + averageTemp5);
		$('.AVGhumidity5').text('Humidity: ' + averageHumidity5);

		console.log('average humidity: ' + averageHumidity5);
		console.log('average temp: ' + averageTemp5);
		// grab response for humidity
		// append average to html
	});
}

// This function handles events when the search button is clicked
$('#searchBtn').on('click', function(event) {
	event.preventDefault();
	// This line of code will grab the input from the textbox
	var citySearch = $('#cityInput')
		.val()
		.trim();
	displayCurrentWeather(citySearch);

	// The movie from the textbox is then added to our array
	citiesArr.push(citySearch);

	// Calling renderButtons which handles the processing of our city array
	renderButtons();
});
// Adding click event listeners to all elements with a class of "city"
$(document).on('click', '.city', UVindex);

//   // Calling the renderButtons function to display the initial buttons
//   renderButtons();

// Function for displaying movie data
function renderButtons() {
	// Deletes the cities prior to adding new cities
	// (this is necessary otherwise you will have repeat buttons)
	$('#city-buttons').empty();
	// Loops through the array of cities
	console.log('citiesArr:', citiesArr);

	for (var i = 0; i < citiesArr.length; i++) {
		// Then dynamicaly generates buttons for each city in the array
		// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
		var a = $('<button>');
		// Adds a class of city to our button
		a.addClass('city');
		// Added a data-attribute
		a.attr('data-name', citiesArr[i]);
		// Provided the initial button text
		a.text(citiesArr[i]);
		// Added the button to the buttons-view div
		$('#city-buttons').append(a);
		console.log('citiesArr[i]:', citiesArr[i]);
	}
}
renderButtons();

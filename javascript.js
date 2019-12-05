var citiesArr = [];
// displayCurrentWeather function re-renders the HTML to display the appropriate content
function displayCurrentWeather() {
//   var city = $("#cityInput").val();
    // <button class="city" data-name="denver">
    var city = $(this).attr("data-name");
 
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=97a2ed873883a66c3613e3529f2ee82f";

  // creates ajax call for the specific city current weather
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // creates a div to hold the data
    var currentWeatherDiv = $("<div>");
    $("#current-conditions").append(currentWeatherDiv);
    console.log(response);

    // ajax UV index call response.coord.lon.lat

    // $("#current-conditions").text(JSON.stringify(response));

    // retrieves the city + date + icon
    $(this).text(response.name);

    // Create CODE HERE to calculate the temperature (converted from Kelvin)
    var tempK = response.main.temp;
    // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
    var tempF = ((tempK - 273.15) * 1.8 + 32).toFixed(1);
    console.log(tempF);
    // Create CODE HERE to dump the temperature content into HTML
    $(".temperature").text("Temperature: " + tempF + " F");
    // retrieves the humidity
    $(".humidity").text("Humidity: " + response.main.humidity);
    // retrieves the wind speed
    $(".windSpeed").text("Wind Speed: " + response.wind.speed);
    // add UV index
  });
};

function DisplayFiveDayForecast() {
    var city2 = $("#cityInput").val();
    console.log(city2);
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city2 + "&appid=97a2ed873883a66c3613e3529f2ee82f";

$.ajax({
    url: queryURL2,
    method: "GET"
}).then(function(response) {
    // creates a div to hold the data
    var fiveDayForecastDiv = $("<div>");
    $("#fiveDay-Forecast").append(fiveDayForecastDiv);
    console.log(response);

});

};

// This function handles events when the search button is clicked
$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var citySearch = $("#cityInput")
    .val()
    .trim();

  // The movie from the textbox is then added to our array
  citiesArr.push(citySearch);

  // Calling renderButtons which handles the processing of our city array
  renderButtons();
});
// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".city", displayCurrentWeather);

//   // Calling the renderButtons function to display the initial buttons
//   renderButtons();

// Function for displaying movie data
function renderButtons() {
  // Deletes the cities prior to adding new cities
  // (this is necessary otherwise you will have repeat buttons)
  $("#city-buttons").empty();
  // Loops through the array of cities
  console.log("citiesArr:", citiesArr)

  for (var i = 0; i < citiesArr.length; i++) {
    // Then dynamicaly generates buttons for each city in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of city to our button
    a.addClass("city");
    // Added a data-attribute
    a.attr("data-name", citiesArr[i]);
    // Provided the initial button text
    a.text(citiesArr[i]);
    // Added the button to the buttons-view div
    $("#city-buttons").append(a);
    console.log("citiesArr[i]:", citiesArr[i])

  }
}
renderButtons();

let apiUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=";
let apiKey = "0cb7223d9ba0d2ecc19d62c5046e6e35";
let submitButton = $("#submitButton");
let cityInput = $("#cityInput");
let cityName = "";
let url = "";

submitButton.on("click", FindCity)

function FindCity(event) {
    event.preventDefault();
    cityName = cityInput.val();
    url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
    CurrentForecast();
}

function CurrentForecast() {

    $.ajax({
        url: url,
        method: 'GET',
    }).then(function (response) { // instad of .then, you can do .success
        console.log('Ajax Reponse \n-------------');
        console.log(response);
        console.log(url);
    });
}
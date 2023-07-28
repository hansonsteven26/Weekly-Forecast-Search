let rootEl = $('#root');
let apiKey = "0cb7223d9ba0d2ecc19d62c5046e6e35";
let submitButton = $("#submitButton");
let cityInput = $("#cityInput");
let cityName = "";

submitButton.on("click", function () {
    cityName = cityInput.val();
    console.log(cityName);
    CurrentForecast();
})

let url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

function CurrentForecast() {

    console.log(cityName);
    console.log(url);
    $.ajax({
        url: url,
        method: 'GET',
    }).then(function (response) { // instad of .then, you can do .success
        console.log('Ajax Reponse \n-------------');
        console.log(response);
        console.log(url);
    });
}
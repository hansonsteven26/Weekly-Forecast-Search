let count = 0;
let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=";
let apiKey = "0cb7223d9ba0d2ecc19d62c5046e6e35";
let submitButton = $("#submitButton");
let cityInput = $("#cityInput");
let cityName = "";
let url = "";
let today = dayjs().format('YYYY-MM-DD');
let dayEl = $("<h2>");
let otherDaysArray = [];
let tempsArray = [];
let weatherTypeArray = [];
let humidityArray = [];
let windSpeedArray = [];
let weatherTypeIconArray = [];
let amountOfSearches = 0;
dayEl.text("Today's date: " + today);
$("#pageTitle").append(dayEl);
let forecast = [{
    day: "",
    city: "",
    weatherType: "",
    temperature: "",
    humidity: "",
    windSpeed: ""
}];
submitButton.on("click", FindCity)

function FindCity(event) {
    event.preventDefault();
    cityName = cityInput.val();
    $("#main").removeClass("hidden");
    $("#lastSearchDiv").removeClass("hidden");
    url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
    CurrentForecast();
}

function CurrentForecast() {
    $.ajax({
        url: url,
        method: 'GET',
    }).then(function (response) {
        console.log('Ajax Reponse \n-------------');
        console.log(response);
        $("#main").removeClass("hidden");
        $.each(response.list, function () { // $.each goes through each index in the response.list on the API

            // *this* is the current index in response.list. basically i
            let otherDays = this.dt_txt.split(" "); // otherDays[0] is day, otherDays[1] is time
            let temp = this.main.temp;
            let weatherType = this.weather[0].main;
            let weatherTypeIcon = this.weather[0].icon;
            let humidity = this.main.humidity;
            let windSpeed = this.wind.speed;

            if (otherDays[0] != otherDaysArray[otherDaysArray.length - 1]) {
                otherDaysArray.push(otherDays[0]);
                tempsArray.push(temp);
                if (weatherType == "Clouds") {
                    weatherType = "Cloudy";
                }
                weatherTypeArray.push(weatherType);
                humidityArray.push(humidity);
                windSpeedArray.push(windSpeed);
                weatherTypeIconArray.push(weatherTypeIcon);
                count++;
            }
        })
        while (otherDaysArray.length > 5) {
            otherDaysArray.pop();
        }
        while (tempsArray.length > 5) {
            tempsArray.pop();
        }
        while (weatherTypeArray.length > 5) {
            weatherTypeArray.pop();
        }
        while (humidityArray.length > 5) {
            humidityArray.pop();
        }
        while (windSpeedArray.length > 5) {
            windSpeedArray.pop();
        }
        console.log(otherDaysArray);
        console.log(tempsArray);
        console.log(weatherTypeArray);
        console.log(humidityArray);
        console.log(windSpeedArray);

        $("#day1").text(otherDaysArray[0]);
        $("#day2").text(otherDaysArray[1]);
        $("#day3").text(otherDaysArray[2]);
        $("#day4").text(otherDaysArray[3]);
        $("#day5").text(otherDaysArray[4]);

        $("#day1City").text(cityName);
        $("#day2City").text(cityName);
        $("#day3City").text(cityName);
        $("#day4City").text(cityName);
        $("#day5City").text(cityName);

        $("#day1Type").text(weatherTypeArray[0]);
        $("#day2Type").text(weatherTypeArray[1]);
        $("#day3Type").text(weatherTypeArray[2]);
        $("#day4Type").text(weatherTypeArray[3]);
        $("#day5Type").text(weatherTypeArray[4]);

        $("#day1Temperature").text(tempsArray[0] + "°");
        $("#day2Temperature").text(tempsArray[1] + "°");
        $("#day3Temperature").text(tempsArray[2] + "°");
        $("#day4Temperature").text(tempsArray[3] + "°");
        $("#day5Temperature").text(tempsArray[4] + "°");

        $("#day1Humidity").text(humidityArray[0]);
        $("#day2Humidity").text(humidityArray[1]);
        $("#day3Humidity").text(humidityArray[2]);
        $("#day4Humidity").text(humidityArray[3]);
        $("#day5Humidity").text(humidityArray[4]);

        $("#day1WindSpeed").text(windSpeedArray[0]);
        $("#day2WindSpeed").text(windSpeedArray[1]);
        $("#day3WindSpeed").text(windSpeedArray[2]);
        $("#day4WindSpeed").text(windSpeedArray[3]);
        $("#day5WindSpeed").text(windSpeedArray[4]);

        $("#day1TypeImage").attr("src", `https://openweathermap.org/img/wn/${weatherTypeIconArray[0]}.png`)
        $("#day2TypeImage").attr("src", `https://openweathermap.org/img/wn/${weatherTypeIconArray[1]}.png`)
        $("#day3TypeImage").attr("src", `https://openweathermap.org/img/wn/${weatherTypeIconArray[2]}.png`)
        $("#day4TypeImage").attr("src", `https://openweathermap.org/img/wn/${weatherTypeIconArray[3]}.png`)
        $("#day5TypeImage").attr("src", `https://openweathermap.org/img/wn/${weatherTypeIconArray[4]}.png`)


        console.log(cityName);
        // I don't want the button to have the same name as the city name
        // I want the last city's name
        // City's name changes when you submit
        // Once you submit, save that city
        // If you enter in a different city name, keep the text the same

        let lastSearchButton = document.createElement("button");
        let recentsDiv = document.getElementById("recentSearches");
        recentsDiv.appendChild(lastSearchButton);
        lastSearchButton.innerHTML = cityName;
        lastSearchButton.addEventListener("click", () => {
            cityName = lastSearchButton.innerHTML;
            CurrentForecast();
        })


        localStorage.setItem("lastSearch", cityName);
        $("#lastSearch").text(localStorage.getItem("lastSearch"));
        $("#lastSearch").on("click", function () {
            cityName = localStorage.getItem("lastSearch");
        })
        $('input[type="text"]').val('');

    });
}
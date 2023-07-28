let apiUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=";
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
dayEl.text("Today's date: " + today);
$("#pageTitle").append(dayEl);

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
        $("#main").removeClass("hidden");
        localStorage.setItem("recentlySearched", cityName);
        $.each(response.list, function () {
            let otherDays = this.dt_txt.split(" ");
            let temp = this.main.temp;
            let weatherType = this.weather[0].main;
            if (otherDays[0] != today && otherDays[1] == "00:00:00") {
                otherDaysArray.push(otherDays[0]);
                tempsArray.push(temp);
                if (weatherType == "Clouds") {
                    weatherType = "Cloudy";
                }
                weatherTypeArray.push(weatherType);
            }
            // somehow get the forecast at noon for next 5 days
            // get the weather temp and store it in html id
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
        console.log(otherDaysArray);
        console.log(tempsArray);
        console.log(weatherTypeArray);

        $("#day1").text(otherDaysArray[0]);
        $("#day2").text(otherDaysArray[1]);
        $("#day3").text(otherDaysArray[2]);
        $("#day4").text(otherDaysArray[3]);
        $("#day5").text(otherDaysArray[4]);

    });
}
let apiUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=";
let apiKey = "0cb7223d9ba0d2ecc19d62c5046e6e35";
let submitButton = $("#submitButton");
let cityInput = $("#cityInput");
let cityName = "";
let url = "";
let today = dayjs().format('YYYY-MM-DD');
let nextDay = (dayjs().add(1, 'day')).format("YYYY-MM-DD");
let dayEl = $("<h2>");
dayEl.text("Today's date: " + today);
$("#pageTitle").append(dayEl);
console.log(nextDay);

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
        console.log(response.list[1].dt_txt); // min temp at noon
        $("#main").removeClass("hidden");
        localStorage.setItem("recentlySearched", cityName);
        $.each(response.list, function () {
            otherDays = this.dt_txt.split(" ");
            // console.log(otherDays);
            if (otherDays[1] == "12:00:00" && otherDays[0] != today) {
                console.log(otherDays[0]);
                console.log("Big print");
            }
            // for (let i = 0; i < 6; i++) {
            //     yyMMDD = response.list[i].dt_txt.split(" ")[0];
            //     console.log(yyMMDD);
            // }
        })
    });
}
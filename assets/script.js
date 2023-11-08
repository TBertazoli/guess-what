// var firstDigit = $("first-digit");
// var secondDigit = $("second-digit");
// var thirdDigit = $("third-digit");
// var fourthDigit = $("fourth-digit");

// var inputText = $("#inputtext");
// var cityWeather = $("#displaycity");

// var cityHistory = [];

// $(document).ready(() => {

// });

//function to get the geocordinates
var generateRandomNum = function () {
  //this if is for empty inputText
  //   if (inputText.val() === "") {
  //     return;
  //   }

  var randomNum =
    "https://www.random.org/integers/?num=4&min=0&max=9&col=1&base=10&format=plain&rnd=new";
  fetch(randomNum).then((response) => {
    response.text().then((numbers) => {
      return numbers;

      // set local storage
      sessionStorage.setItem("numbers", JSON.stringify(numbers));
      console.log(numbers);
    });
  });
};

generateRandomNum();

//function to display today's temperature
// var getWeatherReport = function (city) {
//   var cityApi =
//     "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
//     city.lat +
//     "&lon=" +
//     city.lon +
//     "&appid=4b10fa1681c38a96d7bd9c68c024b6a4";
//   fetch(cityApi).then(function (response) {
//     response.json().then(function (data) {
//       $("#cityname").text(data.name);
//       //check cityHistory index for repeating data
//       if (cityHistory.indexOf(data.name) < 0) {
//         cityHistory.unshift(data.name);
//         if (cityHistory.length > 8) {
//           cityHistory.splice(8, 1);
//         }
//       }
//       //set local storage
//       localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
//       displayCityHistory();

//       $("#date").text(todaysDate);
//       $("#temperature").text("Temp: " + data.main.temp + "℉");
//       $("#wind").text("Wind: " + data.wind.speed + "MPH");
//       $("#humidity").text("Humidity: " + data.main.humidity + "%");
//       $("#icon").attr(
//         "src",
//         "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
//       );
//       $("#displaycitycontainer").removeClass("d-none");
//     });
//   });
// };

// //function to display five day forecast
// var displayFiveDayForecast = function (city) {
//   var fiveDayApi =
//     "https://api.openweathermap.org/data/2.5/forecast?units=imperial&cnt=5&lat=" +
//     city.lat +
//     "&lon=" +
//     city.lon +
//     "&appid=4b10fa1681c38a96d7bd9c68c024b6a4";
//   fetch(fiveDayApi).then(function (response) {
//     response.json().then(function (data) {
//       $("#fivedayforecast").text("5-Day Forecast:");
//       for (var i = 0; i < data.list.length; i++) {
//         var incrementDate = moment()
//           .add(i + 1, "d")
//           .format("MM/DD/YYYY");
//         $("#day" + i)
//           .text(incrementDate)
//           .css("font-weight", "bold");
//         $("#day" + i + "temp").text("Temp: " + data.list[i].main.temp + "℉");
//         $("#day" + i + "wind").text("Wind: " + data.list[i].wind.speed + "MPH");
//         $("#day" + i + "humidity").text(
//           "Humidity: " + data.list[i].main.humidity + "%"
//         );
//         $("#day" + i + "icon").attr(
//           "src",
//           "https://openweathermap.org/img/wn/" +
//             data.list[i].weather[0].icon +
//             "@2x.png"
//         );
//       }
//     });
//   });
// };

// //function to parse and display the data from local storage
// var populateHistory = function () {
//   cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
//   displayCityHistory();
// };

// //function to create a button element to display the local storage
// var displayCityHistory = function () {
//   $("#storecitysearch").empty();
//   for (var i = 0; i < cityHistory.length; i++) {
//     var createElement = $(
//       "<button type='submit' class='btn-history' onclick='searchFromHistory(\"" +
//         cityHistory[i] +
//         "\")'></button>"
//     ).text(cityHistory[i]);
//     $("#storecitysearch").append(createElement);
//   }
// };
// //function called during on click button that will activate city location
// var searchFromHistory = function (cityName) {
//   inputText.val(cityName);
//   getCityLocation();
// };

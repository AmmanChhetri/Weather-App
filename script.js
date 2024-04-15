const apiKey = "";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");

const weatherIcon = document.querySelector(".weather img");

async function checkWeather(cityName) {
  const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

  if (response.status == 404) {
    // error
    document.querySelector(".error").style.display = "block"; // block=> displays the element
    document.querySelector(".weather").style.display = "none"; // none => hides the element
  } else {
    const data = await response.json();

    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

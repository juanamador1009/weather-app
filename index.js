// DOM references
const errorMessage = document.querySelector(".error__message");
const weatherDetails = document.querySelector(".weather__details");
const searchBox = document.querySelector(".weather__search input");
const searchButton = document.querySelector(".weather__search button");

// Weather information request by city name
async function checkWeather(city) {
  // fetch (`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`)

  fetch(`https://my-api-hub-tjkf.onrender.com/weather?city=${city}`)
    .then((response) => {
      if (response.status === 400 || response.status === 404) {
        return response.json().then((errorData) => {
          errorMessage.style.display = "block";
          errorMessage.textContent = errorData.error;
          weatherDetails.style.display = "none";
          return null;
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        // DOM references
        const cityElement = document.querySelector(".weather__city");
        const tempElement = document.querySelector(".weather__temperature");
        const humidityElement = document.querySelector(".humidity");
        const windElement = document.querySelector(".wind");
        const iconElement = document.querySelector(".weather__icon");
        const weatherDetails = document.querySelector(".weather__details");
        const errorMessage = document.querySelector(".error__message");

        // Content update
        cityElement.textContent = data.name;
        tempElement.textContent = `${Math.round(data.main.temp)}°C`;
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed} km/h`;
        iconElement.src = `./icons/${data.weather[0].main.toLowerCase()}_icon.svg`;

        // Display depending if succesful response
        weatherDetails.style.display = "flex";
        errorMessage.style.display = "none";
      }
    })
    .catch((error) => {
      errorMessage.style.display = "block";
      errorMessage.textContent = "Something went wrong!";
      weatherDetails.style.display = "none";
      console.error("Error fetching weather:", error);
    });
}

// Check weather information button
searchButton.addEventListener("click", () => {
  errorMessage.textContent = "Searching...";
  errorMessage.style.display = "block";
  checkWeather(searchBox.value);
});

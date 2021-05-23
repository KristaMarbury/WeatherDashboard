// the api will need to call 4 items temp, wind, humidity, and uv index
// local storage will need to be clickable buttons for user history
//local storage will also simply need to hold onto the city

// assign global variables /////////////////////////////////////////////////////




// separate function fetching each aspect: temp, wind, humidity, uv
// uv index - set class
// five day container
// cities history
let cities = [];


// functions //////////////////////////////////////////////////////////////////
// init
function init() {
    // check local storage for the key (cities) if present
    let citiesStorage = localStorage.getItem('cities');
    if (citiesStorage) {
        // loop through local storage and create buttons with the button label as the city
        cities = JSON.parse(citiesStorage);
        console.log(cities);
        cities.forEach(city => {
           button.querySelector("#pastsearch");
        })
    }
    coordinatesApiCall();

}

// getWeather
function coordinatesApiCall() {
    let city = document.getElementById("search-text").value || "chicago";
    let endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=872734454a7aae3a1c12ea48ac211fb3&units=imperial`;
    fetch(endpoint)

    .then((res) => res.json())
        .then(data => {
            let long = data.city.coord.lon;
            let latt = data.city.coord.lat;
            callWeatherApi(long, latt);
             document.getElementById("city").textContent = data.city.name;
        console.log(data);
    });
}

function clearRightCard() {
    $("#box1").empty();
}

// find the lat and lon within the data and set them as varibles
function callWeatherApi(lon, lat) {
    let endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=872734454a7aae3a1c12ea48ac211fb3`;
    fetch(endpoint)
    
        
        
    .then((res) => res.json())
        .then(data => {
          // traversing the DOM in rightcon
          document.getElementById("temp").textContent = data.current.temp;
          document.getElementById("wind").textContent = data.current.wind_speed;
          document.getElementById("humidity").textContent =
            data.current.humidity;
            document.getElementById("uv").textContent = data.current.uvi;
            let uvClass = checkClass(data.current.uvi);
            document.getElementById("uv").setAttribute("class", uvClass);
            console.log(data);
            dayCard(data);
        });
    
}

// function mainDayCard() {

// }

function dayCard(data) {
    const days = data.daily;
    console.log(days);
    days.forEach(day => {
        $("#daplace").append(
          `<div> <h2 class="card-header-title has-background-link-light">${day.dt}</h2>
    <p class="card-content has-background-link-light">temperature: ${day.temp.day}</p>
    <p class="card-content has-background-link-light">weather: ${day.weather[0].icon}</p>
    <p class="card-content has-background-link-light">humidity: ${day.humidity}</p>
    <p class="card-content has-background-link-light">uv index: ${day.uvi}</p></div>`
        );
    })
    
    console.log(data);
      //tried to apply the cream filling, but came up with undefined
   
}

function checkClass(uv) {
  if (uv < 3) {
    return "ok";
  } else if (uv < 7) {
    return "warning";
  } else {
    return "danger";
  }
}

// in the then of the call above, use the lat and lon to get curent weather and future
// in the then of the call above, i find the data i need for the top card on the right (city, date, temp, wind, humity, uv index)
// RENDER FUNCTION if uv index greater than some value, set the class
// RENDER FUNCTION for the 5 day forecast i want to loop through array of daily data and dynamically create a card and append it to the website
// each card will have date, icon for condition, temp, wind, humidty
// save to localstorage the city the user just searched,
// check loclastorage for that city, dont add if already there

// events ///////////////////////////////////////////////////////////////

// init - check local storage
init();
//calls the weather api city

// click search button - call the api and get our cream filling
document.getElementById("searchbtn").addEventListener("click", function (event) {
    event.preventDefault();
    clearRightCard();
    console.log("button clicked")
    city = document.querySelector("#search-text").value
    console.log(city)
    coordinatesApiCall();
     
});
// click on past city button (class) - just call the getWeather function with the label of the buton
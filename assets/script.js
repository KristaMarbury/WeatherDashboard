
// assign global variables /////////////////////////////////////////////////////
let cities = [];


// functions //////////////////////////////////////////////////////////////////

// init
function init() {
    callCity();
    coordinatesApiCall();
    

}

function stashCity(city) {
  if (!cities.includes(city)){
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
  };

}

function callCity() {
    let storedData = localStorage.getItem("cities");
     if (storedData) {
       // loop through local storage and create buttons with the button label as the city
       cities = JSON.parse(storedData);
       console.log(cities);
    //    cities.forEach((city) => {
    //      button.querySelector("#pastsearch");
    //    });
    buttonMasher(cities);
     }
    
}

function buttonMasher() {
  let places = JSON.parse(localStorage.getItem("cities"));
    $("#pastsearch").empty();
  for (i = 0; i < places.length; i++) {
    $("#pastsearch").append(
      `<button class="sbutton" id="secretsauce" data-city="${places[i]}">${places[i]}</button>`
    );
  }
}

function getSecretSauce(event) {
  $(".has-background-link").remove();
  event.preventDefault();
  let btn = event.target;
  let city = btn.getAttribute("data-city");
  coordinatesApiCall(city);
}

// getWeather
function coordinatesApiCall(spot) {
  let city = spot || document.getElementById("search-text").value || "chicago";
     stashCity(city);
    document.querySelector("#search-text").value = "";
    buttonMasher();
    let endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=872734454a7aae3a1c12ea48ac211fb3&units=imperial`;
    fetch(endpoint)

    .then((res) => res.json())
      .then(data => {
        $(".rightcard").empty();
            $(".rightcard").append(`<section id="box1" class="box1"><div id="city" class="title is-2"> ${data.city.name} </div></section>`)
            let long = data.city.coord.lon;
            let latt = data.city.coord.lat;
            callWeatherApi(long, latt);
             document.getElementById("city").textContent = data.city.name;
        console.log(data);
    });
}

function clearMainDayCard() {
    $(".rightcard").empty();
}

// find the lat and lon within the data and set them as varibles
function callWeatherApi(lon, lat) {
    let endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=872734454a7aae3a1c12ea48ac211fb3`;
    fetch(endpoint)

    .then((res) => res.json())
        .then(data => {
        //   traversing the DOM in rightcon
        //   document.getElementById("temp").textContent = data.current.temp;
        //   document.getElementById("wind").textContent = data.current.wind_speed;
        //   document.getElementById("humidity").textContent =
        //     data.current.humidity;
        //     document.getElementById("uv").textContent = data.current.uvi;
        //     let uvClass = checkClass(data.current.uvi);
        //     document.getElementById("uv").setAttribute("class", uvClass);
            console.log(data);
            // clearMainDayCard();
            mainDayCard(data);
            dayCard(data);
        });
    
}

function mainDayCard(data) {
     $(".box1").append(
       `<div> Temperature: ${data.current.temp}</div>
      <div> Wind: ${data.current.wind_speed}</div>
      <div> Humidity: ${data.current.humidity}</div>
      <div> UV Index: ${data.current.uvi}</div>`
     );
};


function dayCard(data) {

  const days = data.daily.slice(0,5);
        
      days.forEach(day => {
    let unixTime = day.dt;
        let date = new Date(unixTime * 1000);
        // $("#daplace").empty();
            $("#daplace").append(
              `<div class="card has-background-link "> <h2 class="card-header-title">${date}</h2>
                <p>temperature: ${day.temp.day}</p>
                <p>weather: <img src= "https://openweathermap.org/img/w/${day.weather[0].icon}.png"/></p>
                <p>humidity: ${day.humidity}</p>
                <p>uv index: ${day.uvi}</p></div>`
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


// events ///////////////////////////////////////////////////////////////

// init - check local storage
init();
//calls the weather api city

// click search button - call the api and get our cream filling
document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault();
  clearMainDayCard();
    // clearRightCard();
    console.log("button clicked")
    
    
    coordinatesApiCall();
     
});

document.getElementById("pastsearch").addEventListener("click", getSecretSauce);

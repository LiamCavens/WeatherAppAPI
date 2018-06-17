const app = function () {
    getDataByCity('Glasgow');
    // showMapData();
    //getCurrentLocation();


    const search = document.querySelector('#search-button');
    search.addEventListener("click", handleOptionSearch);
}

const makeRequest = function (url, callbackFunction) {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", callbackFunction);
    request.send();
}

const handleOptionSearch = function () {
    const city = document.querySelector('#city-search');
    getDataByCity(city.value);
};

const getData = function (url) {
    makeRequest(url, requestComplete);
};

const getDataByCity = function (cityName) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=c4f320d668e5ec15a88bf95db5d697b1&q=${cityName}`;

    getData(url);
};

const getDataByCoords = function(lat, lon) {
    const url = `http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=c4f320d668e5ec15a88bf95db5d697b1&qlat=${lat}&lon=${lon}`;

    getData(url);
}

const requestComplete = function () {
    if (this.status !== 200) return;
    
    const weatherData = JSON.parse(this.response);
    //console.log(weatherData);
    populate(weatherData); 
}

const populate = function (data) {
    console.log(data);
    const cityHeader = document.querySelector('#city-name');
    const cityTemp = document.querySelector('#city-temp');
    const weatherType = document.querySelector('#weather-type');
    const cloudCov = document.querySelector('#cloud-cov')

    cityHeader.textContent = `Weather in ${data.city.name}, ${data.city.country}`;
    cityTemp.innerHTML = `Temperature : ${(data.list[0].main.temp - 273).toFixed()}&#176;C`;
    weatherType.innerHTML = `Description : ${data.list[0].weather[0].description} <img id="weather-icon" src='http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png' alt="weather_icon">`;
    cloudCov.textContent = `Cloud Coverage: ${data.list[0].clouds.all}%`

    const forecast1 = document.querySelector('#cast-1');
    forecast1.innerHTML = `${data.list[1].dt_txt} <img id="weather-icon" src='http://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png' alt="weather_icon">`;

    const forecast2 = document.querySelector('#cast-2');
    forecast2.innerHTML = `${data.list[2].dt_txt} <img id="weather-icon" src='http://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png' alt="weather_icon">`;

    const forecast3 = document.querySelector('#cast-3');
    forecast3.innerHTML = `${data.list[3].dt_txt} <img id="weather-icon" src='http://openweathermap.org/img/w/${data.list[3].weather[0].icon}.png' alt="weather_icon">`;

    const forecast4 = document.querySelector('#cast-4');
    forecast4.innerHTML = `${data.list[4].dt_txt} <img id="weather-icon" src='http://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png' alt="weather_icon">`;

    const forecast5 = document.querySelector('#cast-5');
    forecast5.innerHTML = `${data.list[5].dt_txt} <img id="weather-icon" src='http://openweathermap.org/img/w/${data.list[5].weather[0].icon}.png' alt="weather_icon">`;

    const forecast6 = document.querySelector('#cast-6');
    forecast6.innerHTML = `${data.list[6].dt_txt} <img id="weather-icon" src='http://openweathermap.org/img/w/${data.list[6].weather[0].icon}.png' alt="weather_icon">`;

    const forecast7 = document.querySelector('#cast-7');
    forecast7.innerHTML = `${data.list[7].dt_txt} <img id="weather-icon" src='http://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png' alt="weather_icon">`;

    const forecast8 = document.querySelector('#cast-8');
    forecast8.innerHTML = `${data.list[8].dt_txt} <img id="weather-icon" src='http://openweathermap.org/img/w/${data.list[8].weather[0].icon}.png' alt="weather_icon">`;
};

const getCurrentLocation = function () {
    navigator.geolocation.getCurrentPosition(getCurrentLocationSuccess, getCurrentLocationFailure);
}

const getCurrentLocationSuccess = function (position) {
    const coords = position.coords;
    
    getDataByCoords(coords.latitude.toFixed(), coords.longitude.toFixed());
}

const getCurrentLocationFailure = function () {
    getDataByCity('Glasgow');
}

const showMapData = function(){
    const mapUrl = "https://tile.openweathermap.org/map/temp_new/5/55/4.png?appid=c4f320d668e5ec15a88bf95db5d697b1";

    const mapData = document.querySelector('#weather-map');

    mapData.innerHTML = `<canvas> ${mapUrl} </canvas>`; //Dont expect this to work
};

window.addEventListener('load', app);

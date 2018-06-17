const app = function () {
    getDataByCity('Glasgow');
    showMapData();
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

    cityHeader.textContent = `Weather in ${data.city.name}, ${data.city.country}`;
    cityTemp.innerHTML = `Temperature : ${(data.list[0].main.temp - 273).toFixed()}&#176;C`;
    weatherType.innerHTML = `Description : ${data.list[0].weather[0].description} <img id="weather-icon" src='http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png' alt="weather_icon">`;
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

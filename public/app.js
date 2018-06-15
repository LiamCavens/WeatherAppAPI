const app = function () {
    getData('Glasgow')

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
    getData(city.value);
};

const getData = function (cityName) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=c4f320d668e5ec15a88bf95db5d697b1&q=${cityName}`;
    makeRequest(url, requestComplete);
};

const requestComplete = function () {
    if (this.status !== 200) return;

    const weatherData = JSON.parse(this.response);
    populate(weatherData);
}

const populate = function (data) {
    console.log(data);
    const cityHeader = document.querySelector('#city-name');
    const cityTemp = document.querySelector('#city-temp');
    const weatherType = document.querySelector('#weather-type');
    const weatherIcon = document.querySelector('#weather-icon');

    cityHeader.textContent = `${data.city.name}`;
    cityTemp.innerHTML = `${(data.list[0].main.temp - 273).toFixed()}&#176;C`;
    weatherType.textContent = `${data.list[0].weather[0].description}`;
    weatherIcon.innerHTML = `<img src='http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png' alt="weather_icon">`;
};

const getCurrentLocation = function () {
    navigator.geolocation.getCurrentPosition(getCurrentLocationSuccess, getCurrentLocationFailure);
}

const getCurrentLocationSuccess = function (position) {

}

const getCurrentLocationFailure = function () {

}

window.addEventListener('load', app);

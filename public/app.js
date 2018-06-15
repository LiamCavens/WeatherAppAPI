const app = function () {
    const url = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=c4f320d668e5ec15a88bf95db5d697b1&q=Glasgow";
    makeRequest(url, requestComplete);

    const search = document.querySelector('#search-button');
    search.addEventListener("click", handleOptionSearch);
}

const makeRequest = function (url, callbackFunction) {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", callbackFunction);
    request.send();
}

const requestComplete = function () {
    if (this.status !== 200) return;

    const weatherData = JSON.parse(this.response);
    console.log(weatherData.city.name);
    populate(weatherData);
}

const populate = function (data) {
    console.log(data);
};

const handleOptionSearch = function () {
    const city = document.querySelector('#city-search');
    console.log(city.value);
};


window.addEventListener('load', app);
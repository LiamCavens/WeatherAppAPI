const app = function () {
    const url = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=c4f320d668e5ec15a88bf95db5d697b1&q=Glasgow";
    makeRequest(url, requestComplete);

    const search = document.querySelector('#city-change');
    search.addEventListener("change", handleOptionSearch)
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
    populate(weatherData); 
}

const populate = function(data) {
    console.log(data.list);
};

const handleOptionSearch = function(){
    
}


window.addEventListener('load', app);
import {
  convertPressure,
  windSpeed,
  foreDay
} from "./convert.js";
import { getIcon } from "./icons.js";

/*location.js contains functions to retrieve data from api and display it */

//Selecting current weather variables

let timezone = document.querySelector("#curr-loc");
let currentTemp = document.querySelector("#curr-temp");
let currentTempIcon = document.querySelector("#curr-icon");
let currentTempDesc = document.querySelector("#curr-temp-desc");

//Selecting current weather details variables

let sunrise = document.querySelector("#sunRS");
let sunset = document.querySelector("#sunST");
let humidity = document.querySelector("#hmd");
let windSpeedVar = document.querySelector("#wnd");
let airPressure = document.querySelector("#pres");
let uvIndex = document.querySelector("#ind");


/////////////////////////////////Api Call//////////////////////////////////

export async function apiCall(lat, long) {
  let apiKey = "6f8a284bd62863e318539ad946cae427";
  let url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=" +
    apiKey;
  let data = await (await fetch(url)).json();
  let zone = data["timezone"];
  let zoneRep = zone.replace(/_/g, " ");
  timezone.innerHTML = zoneRep;
  currentWeather(data);
  hourlyWeather(data);
  dailyWeather(data);
  return data;
}

////////////////////////////////////Current Weather////////////////////////

const currentWeather = (data) => {
  const currValues = data.current;

  //Stats
  let presHPA = currValues["pressure"];
  airPressure.innerHTML = `${convertPressure(presHPA).toFixed(2)} inHg`;

  let humid = currValues["humidity"];
  humidity.innerHTML = `${humid} %`;

  let uvInd = currValues["uvi"];
  uvIndex.innerHTML = `${uvInd.toFixed(0)}`;

  let windSpeedMS = currValues["wind_speed"];
  windSpeedVar.innerHTML = `${windSpeed(windSpeedMS).toFixed(2)} mph`;

  //Weather Icon + Description
  let weatherID = currValues["weather"][0]["id"];

  let weatherDescript = currValues["weather"][0]["description"];
  currentTempDesc.innerHTML = weatherDescript;

  

  let weatherIcon = currValues["weather"][0]["icon"];

  currentTempIcon.setAttribute("class", getIcon(weatherID, weatherIcon));
};

///Current Feels Like in Celsius

export let showFeelsLikeC = (id, temp) => {
  id.innerHTML = "Feels Like " + temp+ "°";
}

///Current Feels Like in Fahrenheit

export let showFeelsLikeF = (id , temp) => {
  id.innerHTML = "Feels Like " + temp+ "°";
};


/////////////////////////////Hourly Weather/////////////////////////////


export let hourlyWeather = (data) => {
  const hourlyValues = data.hourly;
  let hourlyVal = hourlyValues.slice(1, 9);
  
  hourlyVal.forEach((element, index) => {

    //WeatherDescription and Icon
    let weatherIDArr = element["weather"][0]["id"];
    let weatherIcon = element["weather"][0]["icon"];

    //icon

    let weatherIconID = document.querySelector("#hrly-ico-" + (index + 1));
    weatherIconID.innerHTML = "";
    weatherIconID.setAttribute("class", getIcon(weatherIDArr, weatherIcon));
    weatherIconID.setAttribute("style", "margin-left: 37%;");

  });
};

////////Show Hourly Feels like in Celsius

export let showHourlyFeelsC = (idHR, temp) => {
  idHR.innerHTML = (temp === undefined ? "---" : `Feels like ${temp}°`);
};

////////Show Hourly Feels Like in Fahrenheit

export let showHourlyFeelsF = (idHR, temp) => {
  idHR.innerHTML = (temp === undefined ? "---" : `Feels like ${temp}°`);
};

////////Show Hourly Description

export let showHourlyDesc = (idDesc, desc="") => {
  idDesc.innerHTML = desc;
};

///////////////////////////////////Daily Weather////////////////////////

export let dailyWeather = function (data) {
  const dailyValues = data.daily;
  let dailyVal = dailyValues.slice(1, 8);

  dailyVal.forEach((element, index) => {
    let timeArr = foreDay(element["dt"]);

    //Get Day
    let weatherDayID = document.querySelector("#fore-day-" + (index + 1));
    weatherDayID.innerHTML = timeArr;

    let weatherIDArr = element["weather"][0]["id"];

    let weatherIcon = element["weather"][0]["icon"];

    //Get Icon

    let weatherIconID = document.querySelector("#fore-ico-" + (index + 1));
    weatherIconID.innerHTML = "";
    weatherIconID.setAttribute("class", getIcon(weatherIDArr, weatherIcon));
    
  });
};

////////Show Forecast Feels like in Celsius///////

export let showForecastFeelsC = (idFore, temp) => {
  
  idFore.innerHTML = (temp === undefined ? "---" : `Feels like ${temp}°`);
};

////////Show Forecast Feels like in Fahrenhiet////////////

export let showForecastFeelsF = (idFore, temp) => {
  
  idFore.innerHTML = (temp === undefined ? "---" : `Feels like ${temp}°`);
};

/////////Show Forecast Deescription/////////////

export let showForecastDesc = (idDesc, desc="") => {

  idDesc.innerHTML = desc;

};

////////////////////////////////////////////////////


//Show 12-Hour Current
export let display12HourCurrent = (timeRise, timeSet) => {
  sunrise.innerHTML = timeRise;
  sunset.innerHTML = timeSet;
};


//Show 24-Hour Current

export function display24hourCurrent (timeRise, timeSet){
  sunrise.innerHTML = timeRise;
  sunset.innerHTML = timeSet;
}

//Show Celsius current
export function displayCelsiusCurrent(tempInCels) {
  console.log("temp",tempInCels);
  currentTemp.innerHTML = `${tempInCels}°`;
}

//Show Fahrenheit current
export const displayFahrCurrent = (tempInFahr) => {
  
  currentTemp.innerHTML = `${tempInFahr}°`;
}

/////////////////////////////////////////////////

//Show 12-Hour Hourly

export function display12Hourly(id, time){
  id.innerHTML = time;
}

//Show 24-Hour Hourly

export function display24Hourly(id, time){
  id.innerHTML = time;
}

//Show Celsius Hourly

export let displayCelsiusHourly = (id, temp)=> {
  id.innerHTML= temp + "°";
}

//Show Fahrenheit Hourly

export let displayFahrHourly = (id, temp) => {
  id.innerHTML= temp + "°";
}

////////////////////////////////////////////////////

//Show Celsius Forecast Min

export function displayForecastMinC (id, temp){
  id.innerHTML = temp+ "°";
}

//Show Fahrenheit Forecast Min

export function displayForecastMinF (id, temp){
  id.innerHTML = temp+ "°";
}

//Show Celsius Forecast Max

export let displayForecastMaxC = (id, temp) => {
  id.innerHTML = temp+ "°";
};

//Show Fahrenheit Forecast Max

export let displayForecastMaxF = (id, temp) => {
  id.innerHTML = temp+ "°";
};



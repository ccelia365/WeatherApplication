import DateTime from "./dateTime.js";
import { apiCall, display12HourCurrent, display24hourCurrent, displayCelsiusCurrent, 
displayFahrCurrent, display12Hourly, display24Hourly, displayCelsiusHourly, displayFahrHourly, 
displayForecastMinC, displayForecastMinF, displayForecastMaxC, displayForecastMaxF, showFeelsLikeF, showHourlyFeelsF, showHourlyDesc, showForecastFeelsF, showForecastDesc, showForecastFeelsC, showHourlyFeelsC} from "./location.js";
import {convertUTC12, convertUTC24, celsius, fahrenheit} from "./convert.js";

/*app.js contains the event listeners for clicks and functions for the menu*/ 

// Global variables added to access data from api, set temperature and time states. 

let data = {};
let tempState = "F";
let timeState = "time_12";
let currentWeatherClick = false;

//Current Weather Click

document.querySelector("#curr-temp").addEventListener("click", (event) => {
  currentWeatherClick = true;
  setCurrentFeelsLike(data);
});

// Hourly Weather Clicks

for (let i = 1; i <=8; i++){
    
    document.querySelector("#hr-"+i).addEventListener("click", (event) => {
        let temp = (tempState === "F" ? fahrenheit(data.hourly[i].feels_like) : celsius(data.hourly[i].feels_like));
        showHourlyFeelsF(document.querySelector("#hourly-feelsLike-"+i), temp);
        let description = data.hourly[i].weather[0].description;
        showHourlyDesc(document.querySelector("#hourly-feelsLike-desc-"+i), description);
    });
}

// Forecast Weather Clicks

for (let j= 1; j <=7 ; j++){
  document.querySelector("#fr-"+j).addEventListener("click", (event) => {
      let temp = (tempState === "F" ? fahrenheit(data.daily[j].feels_like["day"]) : celsius(data.daily[j].feels_like["day"]));
      showForecastFeelsF(document.querySelector("#forecast-FeelsLike-"+j), temp);
      let description = data.daily[j].weather[0].description;
      showForecastDesc(document.querySelector("#forecast-feelsLike-desc-"+j), description);
    });
}  

//Update notification if necessary
let notificationElement = document.getElementById("notification");

// Check if user supports Geolocation

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(success, showError);
} else {
  notificationElement.innerHTML = "Browser does not support Geolocation";
}

function success(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  retrieveWeather(latitude, longitude);

}

async function retrieveWeather(latitude, longitude) {
  data = await apiCall(latitude, longitude);
  defaultSettings(data);
  setTimeout(function(){
    retrieveWeather(latitude, longitude);
  }, 60000);
}

function showError(error) {
  notificationElement.innerHTML = `<p>${error.message}</p>`;
}

////////////////////Menu Options//////////////////////

let celsiusElement = document.getElementById("Celsius");
let fahrenheitElement = document.getElementById("Fahrenheit");
let twelveHour = document.getElementById("12-Hour");
let twentyfourHour= document.getElementById("24-Hour");

celsiusElement.onclick = () => {
  tempState = "C";
  settingCelsius(data);
  setCurrentFeelsLike(data);
}
fahrenheitElement.onclick = ()=> {
  tempState = "F";
  settingFahrenheit(data);
  setCurrentFeelsLike(data);
}

twelveHour.onclick = () => {
  timeState = "time_12";
  update12Hour(data);
}

twentyfourHour.onclick = () => {
  timeState = "time_24";
  update24Hour (data);
}


///////////////////////Default settings (On Load--> Fahr/12-Hour)
function defaultSettings(data){
  if (tempState === "F") {
    settingFahrenheit(data);
  } else {
    settingCelsius(data);
  }

  if (timeState === "time_12"){
    update12Hour(data);
  } else{
    update24Hour(data);
  }
  
}

function setCurrentFeelsLike (data){
  if (currentWeatherClick){
    let temp = (tempState === "F" ? fahrenheit(data.current.feels_like) : celsius(data.current.feels_like));
    showFeelsLikeF(document.querySelector("#curr-feelsLike"), temp);
  } 
}
//////////////////////////12-Hour//////////////////////////////
function update12Hour(data){

  //////////Date and Time///////
  let myDateTime = new DateTime();
  let date = document.querySelector("#curr-dayDate");
  date.innerHTML = myDateTime.currDate;

  let time = document.querySelector("#curr-time");
  time.innerHTML = myDateTime.currTime12;

  const currValues = data.current;

  //Sunrise and Sunset
  let riseUTC = currValues["sunrise"];
  let timeRise12 = convertUTC12(riseUTC);

  let setUTC = currValues["sunset"];
  let timeSet12 = convertUTC12(setUTC);

  display12HourCurrent(timeRise12, timeSet12);

  ///////////Hourly Data-12-Hour Time////////////

  const hourlyValues = data.hourly;
  let hourlyVal = hourlyValues.slice(1, 9);
  hourlyVal.forEach((element, index)=> {
    //UTC time
    let timeArr12 = convertUTC12(element["dt"]);
    let weatherTimeID = document.querySelector("#hrly-time-" + (index + 1));
    display12Hourly(weatherTimeID, timeArr12);
  });
}

////////////////////////////24-Hour///////////////////////////
function update24Hour(data){

  //////////Date and Time///////
  let myDateTime = new DateTime();

  let date = document.querySelector("#curr-dayDate");
  date.innerHTML = myDateTime.currDate;

  let time = document.querySelector("#curr-time");
  time.innerHTML = myDateTime.currTime24;

  const currValues = data.current;

  //Sunrise and Sunset
  let riseUTC = currValues["sunrise"];
  let timeRise24 = convertUTC24(riseUTC);

  let setUTC = currValues["sunset"];
  let timeSet24 = convertUTC24(setUTC);


  display24hourCurrent(timeRise24, timeSet24);

  ///////////Hourly Data-24-Hour Time////////////

  const hourlyValues = data.hourly;
  let hourlyVal = hourlyValues.slice(1, 9);
  hourlyVal.forEach((element, index)=> {
    //UTC time
    let timeArr24 = convertUTC24(element["dt"]);
    let weatherTimeID = document.querySelector("#hrly-time-" + (index + 1));
    display24Hourly(weatherTimeID, timeArr24);
  });
}


////////////////////////Celsius/////////////////////////////////
function settingCelsius(data){

  //Current Temperature
  const currValues = data.current;

  let tempK = currValues["temp"];
  let tempInCel = celsius(tempK);

  displayCelsiusCurrent(tempInCel);
  /////////////////Hourly Temperature////////////////////

  const hourlyValues = data.hourly;
  let hourlyVal = hourlyValues.slice(1, 9);
  hourlyVal.forEach((element, index)=> {
    
    //Hourly Temp
    let tempK = element["temp"];
    let tempInCel = celsius(tempK);
 
    //Temperature in Celsius or Fahrenheit
    let weatherTempID = document.querySelector("#hrly-temp-" + (index + 1));
    displayCelsiusHourly(weatherTempID, tempInCel);


    let hourlyFeelsID = document.querySelector("#hourly-feelsLike-"+ (index + 1));
    let hourlyDescID =  document.querySelector("#hourly-feelsLike-desc-"+ (index + 1));

    showHourlyFeelsC(hourlyFeelsID);
    showHourlyDesc(hourlyDescID);
  });

  //////////////////////////Daily Forecast////////////////////////

  const dailyValues = data.daily;
  let dailyVal = dailyValues.slice(1, 8);
  dailyVal.forEach((element, index) => {

    ///////////Min-Max and Feels Like Temp in C/////////
    let tempArrMin = element["temp"]["min"];
    let minInCel = celsius(tempArrMin);

    let tempArrMax = element["temp"]["max"];
    let maxInCel = celsius(tempArrMax);

    // Get Forecast Minimum
    let weatherDayIDMin = document.querySelector("#fore-min-" + (index + 1));
    
    displayForecastMinC(weatherDayIDMin, minInCel);

    // Get Forecast Maximum
   
    let weatherDayIDMax = document.querySelector("#fore-max-" + (index + 1));
    
    displayForecastMaxC(weatherDayIDMax, maxInCel);

    // Get forecast feels like and description

    let forecastFeelsID = document.querySelector("#forecast-FeelsLike-"+ (index + 1));
    let forecastDescID =  document.querySelector("#forecast-feelsLike-desc-"+ (index + 1));

    showForecastFeelsC(forecastFeelsID);
    showForecastDesc(forecastDescID);
  });


   
}

/////////////////////////Fahrenheit//////////////////////////////
function settingFahrenheit(data){
  
    //Current Temperature
    const currValues = data.current;

   //Current Temperature
   let tempK = currValues["temp"];
   let tempInFahr = fahrenheit(tempK);

  displayFahrCurrent(tempInFahr);
  /////////////////Hourly Temperature////////////////////

  const hourlyValues = data.hourly;
  let hourlyVal = hourlyValues.slice(1, 9);
  hourlyVal.forEach((element, index)=> {
    
    //Hourly Temp
    let tempK = element["temp"];
    let tempInFahr = fahrenheit(tempK);

    //Temperature in Celsius or Fahrenheit
    let weatherTempID = document.querySelector("#hrly-temp-" + (index + 1));
    displayFahrHourly(weatherTempID, tempInFahr);


    let hourlyFeelsID = document.querySelector("#hourly-feelsLike-"+ (index + 1));
    let hourlyDescID =  document.querySelector("#hourly-feelsLike-desc-"+ (index + 1));
   
    showHourlyFeelsF(hourlyFeelsID);
    showHourlyDesc(hourlyDescID); 
  });

  //////////////////////////Daily Forecast////////////////////////

  const dailyValues = data.daily;
  let dailyVal = dailyValues.slice(1, 8);
  dailyVal.forEach((element, index) => {

    let tempArrMin = element["temp"]["min"];
    let minInFahr = fahrenheit(tempArrMin);

    let tempArrMax = element["temp"]["max"];
    let maxInFahr = fahrenheit(tempArrMax);

    // Get Forecast Minimum
    let weatherDayIDMin = document.querySelector("#fore-min-" + (index + 1));
    
    displayForecastMinF(weatherDayIDMin, minInFahr);

    // Get Forecast Maximum
   
    let weatherDayIDMax = document.querySelector("#fore-max-" + (index + 1));
    
    displayForecastMaxF(weatherDayIDMax, maxInFahr);

    // Get forecast feels like and description

    let forecastFeelsID = document.querySelector("#forecast-FeelsLike-"+ (index + 1));
    let forecastDescID =  document.querySelector("#forecast-feelsLike-desc-"+ (index + 1));

    showForecastFeelsF(forecastFeelsID);
    showForecastDesc(forecastDescID ); 
  });
  
}















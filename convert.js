/*convert.js contains functions for converting data from api*/ 

//Convert UTC time

export function convertUTC24(time) {
  let timeS = new Date(time * 1000);
  let hours = timeS.getHours();
  let minutes = (timeS.getMinutes() < 10 ? '0' : '') + timeS.getMinutes();
  let output = `${hours} : ${minutes}`;
  return output;
}

export function convertUTC12(time) {
  let timeS = new Date(time * 1000);
  let hours = timeS.getHours();
  let minutes = timeS.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let output = hours + ":" + minutes + " " + ampm;
  return output;
}

//Convert Pressure

export function convertPressure(pressure) {
  let myPressure = 0.02953 * pressure;
  return myPressure;
}

//Convert Wind Speed

export function windSpeed(speed) {
  let mySpeed = speed * 2.236936;
  return mySpeed;
}

// Convert K to C

export let celsius = (data) => {
  return Math.round(data - 273.15);
};

//Convert K to F

export let fahrenheit = (data) => {
  return Math.round(((data-273.15)*(9/5))+32)
};

//Convert UTC to days

export let foreDay = (time) => {
  let timeD = new Date(time * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[timeD.getDay()];
  return day;
}

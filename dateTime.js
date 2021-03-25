/*This class contains functions to update local time */

export default class DateTime {
  constructor(date, time, temperature) {
    this.date = date;
    this.time = time;
    this.temperature = temperature;
  }

  get currDate() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let dayNum = date.getDate();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let day = days[date.getDay()];
    
    this.date = day + ", " + months[month - 1] + " " + dayNum;

    return this.date;
  }

  get currTime12() {
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    minute = minute < 10 ? "0" + minute : minute;
    this.time = hour + ":" + minute + " " + ampm;
    return this.time;
  }

  get currTime24() {
    let time = new Date();
    let hour = time.getHours();
    let minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
    this.time = hour + ":" + minute;
    return this.time;
  }
}

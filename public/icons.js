export let dayIcons = {
  Thunderstorm: "wu wu-white wu-32 wu-tstorms",
  Drizzle: "wu wu-white wu-32 wu-sleet",
  Rain: "wu wu-white wu-32 wu-rain",
  Snow: "wu wu-white wu-32 wu-snow",
  Atmosphere: "wu wu-white wu-32 wu-fog",
  Clear: "wu wu-white wu-32 wu-clear",
  Clouds: "wu wu-white wu-32 wu-cloudy",
};

export let nightIcons = {
  Thunderstorm: "wu wu-white wu-32 wu-tstorms wu-night",
  Drizzle: "wu wu-white wu-32 wu-sleet wu-night",
  Rain: "wu wu-white wu-32 wu-rain wu-night",
  Snow: "wu wu-white wu-32 wu-snow wu-night",
  Atmosphere: "wu wu-white wu-32 wu-fog wu-night",
  Clear: "wu wu-white wu-32 wu-clear wu-night",
  Clouds: "wu wu-white wu-32 wu-cloudy wu-night",
};


export let getIcon = (rangeId, iconID) => {
  let icon;

  if (rangeId >= 200 && rangeId <= 232){
    icon = ((iconID.includes("d")) ? dayIcons["Thunderstorm"] : nightIcons["Thunderstorm"] );
  }
  else if (rangeId >= 300 && rangeId <= 321){
    icon = ((iconID.includes("d")) ? dayIcons["Drizzle"] : nightIcons["Drizzle"] );
  }
  else if (rangeId >= 500 && rangeId <= 531){
    icon = ((iconID.includes("d")) ? dayIcons["Rain"] : nightIcons["Rain"] );
  }
  else if (rangeId >= 600 && rangeId <= 622){
    icon = ((iconID.includes("d")) ? dayIcons["Snow"] : nightIcons["Snow"] );
  }
  else if (rangeId >= 701 && rangeId <= 781){
    icon = ((iconID.includes("d")) ? dayIcons["Atmosphere"] : nightIcons["Atmosphere"] );
  }
  else if (rangeId === 800){
    icon = ((iconID.includes("d")) ? dayIcons["Clear"] : nightIcons["Clear"] );
  }
  else if (rangeId >= 801 && rangeId <= 804){
    icon = ((iconID.includes("d")) ?  dayIcons["Clouds"] : nightIcons["Clouds"] );
  }
  else{
    icon = dayIcons["Clouds"];
  }
  return icon;
};

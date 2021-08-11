const currentHour = document.querySelector(".hours-current");
const currentMinutes = document.querySelector(".minutes-current");
const currentSeconds = document.querySelector(".seconds-current");
const utcHour = document.querySelector(".hours-selected");
const utcMinutes = document.querySelector(".minutes-selected");
const utcSeconds = document.querySelector(".seconds-selected");
// Analog clock hands
const handHourEDT = document.querySelector(".hour-hand-edt");
const handMinEDT = document.querySelector(".minute-hand-edt");
const handSecEDT = document.querySelector(".second-hand-edt");
const handHourJST = document.querySelector(".hour-hand-jst");
const handMinJST = document.querySelector(".minute-hand-jst");
const handSecJST = document.querySelector(".second-hand-jst");
// Displays
const displayEDT = document.querySelector(".edt-time-now");
const displayJST = document.querySelector(".jst-time-now");
// Drop-down
const regionSelection = document.querySelectorAll(".region-selector");
// Library
const DateTime = luxon.DateTime;
// Menu
const burgerToggle = document.querySelector(".burger");
const areaWrapper = document.querySelector(".header-wrapper");
const headerWrapper = document.querySelector(".area-wrapper");
const logoHeader = document.querySelector(".logo-header");
// Interval
let live;

window.addEventListener("load", current);
window.addEventListener("load", gmt);
window.addEventListener("load", edt);
window.addEventListener("load", jst);

burgerToggle.addEventListener("click", openMenu);

regionSelection.forEach((region) =>
  region.addEventListener("click", () => {
    const selectedMenu = region.nextElementSibling;
    const selectedDropdownOptions = selectedMenu.firstElementChild.options;
    selectedMenu.classList.toggle("options-active");
    const options = document.querySelectorAll(".selected-option");
    options.forEach((option) =>
      // sets zone based on the area selection / select value
      option.addEventListener("click", (e) => {
        const area = e.target.value;
        const zoneMenu = option.parentElement.name;
        let zone;
        switch (zoneMenu) {
          case "europe-tz":
            if (area == "Reykjavik") {
              zone = "Atlantic";
              break;
            } else if (area == "Tbilisi") {
              zone = "Asia";
              break;
            } else {
              zone = "Europe";
              break;
            }
          case "america-tz":
            if (area == "Buenos_Aires") {
              zone = "America/Argentina";
              break;
            } else {
              zone = "America";
              break;
            }
          case "africa-tz":
            zone = "Africa";
            break;
          case "asia-tz":
            zone = "Asia";
            break;
          case "australia-tz":
            if (area == "Adelaide" || area == "Brisbane") {
              zone = "Australia";
              break;
            } else {
              zone = "Pacific";
              break;
            }
        }
        checkSelectedTZExists();
        createElements();
        adjustLayout();
        live = setInterval(() => {
          selectedTimezone(zone, area);
        }, 1000);
        checkMenu(e.target);
      })
    );
  })
);
// if a selected TZ already exists, it deletes the respective div
function checkSelectedTZExists() {
  const newDiv = document.querySelector(".new-clock");
  const newDivTimeWrap = document.querySelector(".new-tz-clock");
  if (newDiv && newDivTimeWrap) {
    newDiv.remove();
    clearInterval(live);
  }
}
// creates the necessary elements to accommodate for the selected tz
function createElements() {
  const hourWrapper = document.querySelector(".wrapper");
  // new elements
  const newDiv = document.createElement("div");
  const newDivTimeWrap = document.createElement("div");
  const newDivInfoWrap = document.createElement("div");
  const infoParagraph = document.createElement("p");
  const spanHours = document.createElement("span");
  const delimiterHours = document.createElement("span");
  const delimiterMinutes = document.createElement("span");
  const spanMinutes = document.createElement("span");
  const spanSeconds = document.createElement("span");
  //
  hourWrapper.appendChild(newDiv);
  newDiv.classList = "new-clock clock-numbered";
  [
    newDivTimeWrap.classList,
    newDivInfoWrap.classList,
    infoParagraph.classList,
  ] = ["time-wrap new-tz-clock", "info-wrap info-wrap-selected", "new-tz"];
  newDiv.appendChild(newDivTimeWrap);
  newDiv.appendChild(newDivInfoWrap);
  newDivInfoWrap.appendChild(infoParagraph);
  spanHours.classList = "hours-new";
  spanMinutes.classList = "minutes-new";
  spanSeconds.classList = "seconds-new";
  delimiterHours.classList = delimiterMinutes.classList = "delimiter";
  delimiterHours.innerText = delimiterMinutes.innerText = ":";
  newDivTimeWrap.appendChild(spanHours);
  newDivTimeWrap.appendChild(delimiterHours);
  newDivTimeWrap.appendChild(spanMinutes);
  newDivTimeWrap.appendChild(delimiterMinutes);
  newDivTimeWrap.appendChild(spanSeconds);
}
// adjusts layout based on whether a selected tz already exists
function adjustLayout() {
  const hourWrapper = document.querySelector(".wrapper");
  const utcOriginalWrapper = document.querySelector(".selected-clock");
  if (utcOriginalWrapper) {
    utcOriginalWrapper.remove();
  } else {
    return;
  }
}
// parses selected tz in 24hr format and splits it, passing it to each respective span
function selectedTimezone(zone, area) {
  const selectedHour = document.querySelector(".hours-new");
  const selectedMinutes = document.querySelector(".minutes-new");
  const selectedSeconds = document.querySelector(".seconds-new");
  const timezoneText = document.querySelector(".new-tz");
  const currentSelectedTZ = DateTime.now().setZone(`${zone}/${area}`);
  const currentSelectedTZString = currentSelectedTZ
    .toLocaleString(DateTime.TIME_24_WITH_SECONDS)
    .split(":")
    .join("");
  selectedHour.innerText = currentSelectedTZString.substring(0, 2);
  selectedMinutes.innerText = currentSelectedTZString.substring(2, 4);
  selectedSeconds.innerText = currentSelectedTZString.substring(4, 6);
  const areaEdited = String(area).replace(/_/g, " ");
  timezoneText.innerText = `${areaEdited}, ${zone}`;
}
// toggles the menu upon selection with a 600ms delay
function checkMenu(target) {
  if (target.classList.contains("selected-option")) {
    setTimeout(function () {
      burgerToggle.click();
    }, 600);
  }
}

function openMenu() {
  areaWrapper.classList.toggle("nav-full-active");
  headerWrapper.classList.toggle("nav-full-active");
  logoHeader.classList.toggle("logo-header-inactive");
}
// Hour Functions

// fetches current local timezone in 24hr format
function current() {
  update = setInterval(function () {
    let currentTime = DateTime.local()
      .toLocaleString(DateTime.TIME_24_WITH_SECONDS)
      .split(":")
      .join("");
    (currentHour.innerText = currentTime.substring(0, 2)),
      (currentMinutes.innerText = currentTime.substring(2, 4)),
      (currentSeconds.innerText = currentTime.substring(4, 6));
  }, 1000);
}
// fetches current gmt timezone in 24hr format
function gmt() {
  update = setInterval(function () {
    let currentUTC = DateTime.now()
      .setZone("Europe/London")
      .toLocaleString(DateTime.TIME_24_WITH_SECONDS)
      .split(":")
      .join("");
    (utcHour.innerText = currentUTC.substring(0, 2)),
      (utcMinutes.innerText = currentUTC.substring(2, 4)),
      (utcSeconds.innerText = currentUTC.substring(4, 6));
  }, 1000);
}
// fetches EDT tz in 24hr format and sets the rotation for the clock
function edt() {
  update = setInterval(function () {
    const currentEDT = DateTime.now().setZone("America/New_York");
    const currentEDTString = currentEDT.toLocaleString(
      DateTime.TIME_24_WITH_SECONDS
    );
    const seconds = currentEDT.second;
    const minutes = currentEDT.minute;
    const hours = currentEDT.hour;
    // divided by 60 due to 60 sec = 1 min, multiplied by 360 due to the 360-deg for the circle
    // and added
    const secondDeg = (seconds / 60) * 360 + 90;
    // minute-hand is same but correlated to the second-hand
    const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
    // hour-hand is same but correlated to the minute-hand
    const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30 + 90;
    handSecEDT.style.transform = `rotate(${secondDeg}deg)`;
    handMinEDT.style.transform = `rotate(${minuteDeg}deg)`;
    handHourEDT.style.transform = `rotate(${hourDeg}deg)`;
    displayEDT.innerText = currentEDTString;
  }, 1000);
}
// fetches JST tz in 24hr format and sets the rotation for the clock
function jst() {
  update = setInterval(function () {
    const currentJST = DateTime.now().setZone("Asia/Tokyo");
    const currentJSTString = currentJST.toLocaleString(
      DateTime.TIME_24_WITH_SECONDS
    );
    const seconds = currentJST.second;
    const minutes = currentJST.minute;
    const hours = currentJST.hour;
    // divided by 60 due to 60 sec = 1 min, multiplied by 360 due to the 360-deg for the circle
    // and added
    const secondDeg = (seconds / 60) * 360 + 90;
    // minute-hand is same but correlated to the second-hand
    const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
    // hour-hand is same but correlated to the minute-hand
    const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30 + 90;
    handSecJST.style.transform = `rotate(${secondDeg}deg)`;
    handMinJST.style.transform = `rotate(${minuteDeg}deg)`;
    handHourJST.style.transform = `rotate(${hourDeg}deg)`;
    displayJST.innerText = currentJSTString;
  }, 1000);
}

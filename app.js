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
const selectedInfoText = document.querySelector(".selected-tz-info");
const dropDownAreas = document.querySelectorAll("#area option");
const dropDownCities = document.querySelector("#city");
const DateTime = luxon.DateTime;

window.addEventListener("load", current);
window.addEventListener("load", utc);

europeTimezoneSelections = {
  1: "London, Dublin, Lisbon (GMT +01:00)",
  2: "Paris, Berlin, Rome, Madrid (GMT +02:00)",
  3: "Athens, Bucharest (GMT +03:00)",
};

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
function utc() {
  update = setInterval(function () {
    let currentUTC = DateTime.utc()
      .toLocaleString(DateTime.TIME_24_WITH_SECONDS)
      .split(":")
      .join("");
    (utcHour.innerText = currentUTC.substring(0, 2)),
      (utcMinutes.innerText = currentUTC.substring(2, 4)),
      (utcSeconds.innerText = currentUTC.substring(4, 6));
  }, 1000);
}

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
edt();

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
jst();

// function prepareSearch() {
//   dropDownAreas.forEach((area) =>
//     area.addEventListener("click", () => {
//       console.log(area.value);
//       if (area.value == "europe") {
//         europeTimezoneSelections.forEach((selection) => {
//           console.log(selection);
//           let option = dropDownCities.createElement("option");
//           dropDownCities.appendChild(selection);
//         });
//       }
//     })
//   );
// }

// prepareSearch();

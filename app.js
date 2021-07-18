const currentHour = document.querySelector(".hours-current");
const currentMinutes = document.querySelector(".minutes-current");
const currentSeconds = document.querySelector(".seconds-current");
const selectedHour = document.querySelector(".hours-selected");
const selectedMinutes = document.querySelector(".minutes-selected");
const selectedSeconds = document.querySelector(".seconds-selected");
const selectedInfoText = document.querySelector(".selected-tz-info");
const dropDownAreas = document.querySelectorAll("#area option");
const dropDownCities = document.querySelector("#city");

window.addEventListener("load", current);
window.addEventListener("load", gmt);

europeTimezoneSelections = {
  1: "London, Dublin, Lisbon (GMT +01:00)",
  2: "Paris, Berlin, Rome, Madrid (GMT +02:00)",
  3: "Athens, Bucharest (GMT +03:00)",
};

function current() {
  update = setInterval(function () {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    (currentHour.innerText = hours),
      (currentMinutes.innerText = minutes),
      (currentSeconds.innerText = seconds);
  }, 0);
}
function gmt() {
  selectedInfoText.innerText = "Greenwich Mean Time (UTC)";
  update = setInterval(function () {
    let currentTime = new Date();
    let hours = currentTime.getHours() - 3;
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    (selectedHour.innerText = hours),
      (selectedMinutes.innerText = minutes),
      (selectedSeconds.innerText = seconds);
  }, 0);
}

function euSelectedTZ(value) {
  selectedInfoText.innerText = "Greenwich Mean Time (GMT +0)";
  update = setInterval(function () {
    let currentTime = new Date();
    let hours = currentTime.getHours() + value;
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    (selectedHour.innerText = hours),
      (selectedMinutes.innerText = minutes),
      (selectedSeconds.innerText = seconds);
  }, 0);
}

function prepareSearch() {
  dropDownAreas.forEach((area) =>
    area.addEventListener("click", () => {
      console.log(area.value);
      if (area.value == "europe") {
        europeTimezoneSelections.forEach((selection) => {
          console.log(selection);
          let option = dropDownCities.createElement("option");
          dropDownCities.appendChild(selection);
        });
      }
    })
  );
}

prepareSearch();

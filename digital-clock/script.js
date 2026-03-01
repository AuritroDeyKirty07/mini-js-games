const clockElement = document.getElementById("clock");
const timezoneSelect = document.getElementById("timezoneSelect");
const themeToggle = document.getElementById("themeToggle");

let is24Hour = false;
let selectedTimezone = timezoneSelect.value;

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
}

function updateClock() {
    const time = new Date().toLocaleString("en-US", {
        timeZone: selectedTimezone
    });

    const dateObj = new Date(time);

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");

    let meridian = "";

    if (!is24Hour) {
        meridian = hours >= 12 ? " PM" : " AM";
        hours = hours % 12 || 12;
    }
    
    hours = hours.toString().padStart(2, "0");

    clockElement.textContent = `${hours}:${minutes}:${seconds}${meridian}`;

}

updateClock();
setInterval(updateClock, 1000);

clockElement.addEventListener("click", () => {
    is24Hour = !is24Hour;
});

timezoneSelect.addEventListener("change", (e) => {
    selectedTimezone = e.target.value;
    updateClock();
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

function timer(){
    const time = new Date();
    let hours = time.getHours();
    const meridian = hours >=12 ? "PM": "AM";
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, 0);
    const minutes = time.getMinutes().toString().padStart(2, 0);
    const seconds = time.getSeconds().toString().padStart(2, 0);
    const textstring = `${hours}:${minutes}:${seconds} ${meridian}`;
    document.getElementById("clock").textContent = textstring;
}

timer();
setInterval(timer, 1000);
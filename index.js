const inputs = document.querySelectorAll('input');
let running = false;
let notification = {
    available: false,
    enabled: false
}

if ('Notification' in window) {
    notification.available = true;
}

if (notification.available = true) {
    Notification.requestPermission().then(p => {
        if (p === "granted") {
            notification.enabled = true;
        }
    });
}

let length1 = 3;
for (let i = 0; i < length1; i++) {
    inputs[i].addEventListener('input', e => {
        let n = Number.parseInt(inputs[i].value)
        if (n < 0) {   
            inputs[i].value = n + (0 - n);
        }
    });
}

for (let i = 1; i < length1; i++) {
    inputs[i].addEventListener('input', e => {
        if (inputs[i].valueAsNumber > 60) {
            let n = Number.parseInt(inputs[i].value)
            inputs[i].value = n - (n - 60);
        }
    });
}

const hours = inputs[0];
const minutes = inputs[1];
const seconds = inputs[2];

let interval = undefined;

function countdown() {
    if (seconds.value !== "0") {
        seconds.value--;
    }
    else {
        if (minutes.value !== "0") {
            minutes.value--;
            seconds.value = "59";
        }
        else if (hours.value !== "0") {
            hours.value--;
            minutes.value = "59";
            seconds.value = "60";
        }
        else if (hours.value === "0") {
            clearInterval(interval);

            inputs[0].disabled = false;
            inputs[1].disabled = false;
            inputs[2].disabled = false;
            if (notification.available && notification.enabled) {
                let n = new Notification("Countdown Timer", {body: "Your specified amount of time to countdown has hit 0!", silent: false, vibrate: true, icon: "ico.png", requireInteraction: true});
                new Audio('notify.ogg').play();
            }
            running = false;
        }
    }
    document.title = `${hours.value}:${minutes.value}:${seconds.value}`;
}

window.addEventListener('keypress', e => {
    if (e.which === 13 && running === false) {
        running = true;
        for (let i = 0; i < length1; i++) {
            inputs[i].disabled = true;
            if (inputs[i].value === "") {
                inputs[i].value = 0;
            }
        }
        document.title = `${hours.value}:${minutes.value}:${seconds.value}`;
        interval = setInterval(countdown, 1000);
    }
});
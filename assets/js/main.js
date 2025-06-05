const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count');

if (coins == null) {
    localStorage.setItem('coins', '0');
    h1.textContent = '0';
} else {
    h1.textContent = Number(coins).toLocaleString();
}

if (total == null) {
    localStorage.setItem('total', '500');
    body.querySelector('#total').textContent = '/500';
} else {
    body.querySelector('#total').textContent = `/${total}`;
}

if (power == null) {
    localStorage.setItem('power', '500');
    body.querySelector('#power').textContent = '500';
} else {
    body.querySelector('#power').textContent = power;
}

if (count == null) {
    localStorage.setItem('count', '1');
}

image.addEventListener('click', (e) => {

    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);

    coins = Number(localStorage.getItem('coins'));
    power = Number(localStorage.getItem('power'));

    if (power > 0) {
        localStorage.setItem('coins', (coins + 1).toString());
        h1.textContent = (coins + 1).toLocaleString();

        localStorage.setItem('power', (power - 1).toString());
        body.querySelector('#power').textContent = (power - 1).toString();
    }

    if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    }
    else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    }
    else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    }
    else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);

    // آپدیت عرض نوار پیشرفت با مقدار جدید پاور
    power = Number(localStorage.getItem('power'));
    total = Number(localStorage.getItem('total'));
    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});

// این بخش اصلی مشکل شما رو حل میکنه: افزایش پاور به اندازه یک واحد در هر ثانیه
setInterval(() => {
    const count = Number(localStorage.getItem('count'));
    let power = Number(localStorage.getItem('power'));
    const total = Number(localStorage.getItem('total'));

    if (power < total) {
        power += count;
        if (power > total) power = total;
        localStorage.setItem('power', power.toString());
        body.querySelector('#power').textContent = power.toString();
        body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
    }
}, 1000);

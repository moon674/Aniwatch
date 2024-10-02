document.addEventListener('click', pop, true);

let cooldown = false;
const RECHARGE_TIME = 10000;

function pop() {
    if (!cooldown) {
        window.open('https://noohapou.com/4/8184199', '_blank');
        startCooldown();
    }
}

function startCooldown() {
    cooldown = true;
    setTimeout(function() { cooldown = false }, RECHARGE_TIME);
}
var canvas = document.getElementById("mainCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#343434";
ctx.fillRect(0, 0, canvas.width, canvas.height);
var mX = canvas.width / 2;
var mY = canvas.height / 2;
onmousemove = function (e) { mX = e.clientX; mY = e.clientY; }
const src = document.getElementById("source");
if (src) {
    src.addEventListener(
        "touchstart",
        (e) => {
            // Cache the client X/Y coordinates
            mX = e.touches[0].clientX;
            mY = e.touches[0].clientY;
        },
        false
    );
}

var pixels = [];
for (let i = 0; i < 200; i++) {
    pixels.push({ px: Math.random() * canvas.width, py: Math.random() * canvas.height,d:4,s:4, c: "#ffffff" });
}
function updatePixel(p) {
    if (p.px < 0 || p.px > canvas.width || p.py < 0 || p.py > canvas.height) {
        var angle = Math.random() * 7.28;
        var rad = (150 + Math.random() * 50);
        p.d = 4;
        p.s = 4;
        p.px = mX + rad * Math.cos(angle);
        p.py = mY + rad * Math.sin(angle);
        p.c = "#" + Math.floor(Math.random() * 10000000 + 6777215).toString(16);
    }
    var angle = Math.atan2(p.py - mY, p.px - mX);
    if(p.d < 50){
        p.d = p.d * 1.07;
    }
    if(p.s < 50){
        p.s = p.s * 1.04;
    }
    p.px = p.px + p.s * Math.cos(angle);
    p.py = p.py + p.s * Math.sin(angle);
    ctx.fillStyle = p.c;
    ctx.fillRect(p.px, p.py, 5, 5);
    ctx.beginPath();
    ctx.strokeStyle = p.c;
    ctx.moveTo(p.px + 2, p.py + 2);
    ctx.lineTo((p.px + (-p.d * Math.cos(angle))), (p.py + (-p.d * Math.sin(angle))));
    ctx.stroke();
}

var intervalId = window.setInterval(function () {
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    pixels.forEach(p => updatePixel(p));


}, 17);
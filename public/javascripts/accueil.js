let section1Img = document.getElementById("section1Img");

let i = 0;
setInterval(function() {
    i = (i+ 1) % 3;
    section1Img.setAttribute("src", `/images/section1${i}.png`);
}, 3500);
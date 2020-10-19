const modal1 = document.getElementById(`projectModal-1`);
const btn1 = document.getElementById("modalButton-1");
const title1 = document.getElementById("modalTitle-1");

btn1.onclick = () => {
    modal1.style.display = "block";
}

title1.onclick = () => {
    modal1.style.display = "block";
}


const modal2 = document.getElementById(`projectModal-2`);
const btn2 = document.getElementById("modalButton-2");
const title2 = document.getElementById("modalTitle-2");

btn2.onclick = () => {
    modal2.style.display = "block";
}

title2.onclick = () => {
    modal2.style.display = "block";
}

const modal3 = document.getElementById(`projectModal-3`);
const btn3 = document.getElementById("modalButton-3");
const title3 = document.getElementById("modalTitle-3");

btn3.onclick = () => {
    modal3.style.display = "block";
}

title3.onclick = () => {
    modal3.style.display = "block";
}

const modal4 = document.getElementById(`projectModal-4`);
const btn4 = document.getElementById("modalButton-4");
const title4 = document.getElementById("modalTitle-4");

btn4.onclick = () => {
    modal4.style.display = "block";
}

title4.onclick = () => {
    modal4.style.display = "block";
}

var span1 = document.getElementsByClassName("close")[0];

span1.onclick = () => {
    modal1.style.display = "none";
}
var span2 = document.getElementsByClassName("close")[1];

span2.onclick = () => {
    modal2.style.display = "none";
}

var span3 = document.getElementsByClassName("close")[2];

span3.onclick = () => {
    modal3.style.display = "none";
}
var span4 = document.getElementsByClassName("close")[3];

span4.onclick = () => {
    modal4.style.display = "none";
}

window.onclick = function (event) {
    switch (event.target) {
        case modal1:
            modal1.style.display = "none";
        case modal2:
            modal2.style.display = "none";
        case modal3:
            modal3.style.display = "none";
        case modal4:
            modal4.style.display = "none";
        default:
    }
}

function stopVideo(id) {
    var src = $j('iframe.' + id).attr('src');
    $j('iframe.' + id).attr('src', '');
    $j('iframe.' + id).attr('src', src);
}
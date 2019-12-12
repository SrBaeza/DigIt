//variables globales
var playerNrg = 100;
var energyBar = document.getElementById("nrgBarID");

//Puesta en marcha del script
document.body.onload = function() {
    StartGame();
}

//Funcion de comienzo de juego
function StartGame() {
    ResetTimer();
    StartTimer();
    MakeTiles();
    myNrgBar();
}


//funcion para probar la barra de energia
function myNrgBar() {
    var nrgValueBasic = 5;
    energyBar.style.width = (100 - nrgValueBasic) + "%";
    energyBar.style.backgroundColor = "#F9BCCA";

}

//funcion para modificar la barra

//Funcion para crear elementos basados en un array
function MakeTiles() {

    //crea referencia al div inicial
    var list = document.getElementById("myBoard");

    //Loop eje X
    for (var x = 0; x < 13; x++) {
        //Loop eje Y
        for (var y = 0; y < 13; y++) {

            //crear item de lista
            var item = document.createElement('div');

            // //añadir clase al item
            item.classList.add("tile");

            // //establecer contenido del div
            item.appendChild(document.createTextNode("x"));

            //añadir el item a la lista
            list.appendChild(item);
        }
    }
}

// Funciones de temporizador del juego
var second = 0,
    minute = 0;
var timer = document.querySelector(".currentTime");
var myInterval;

// Iniciar temporizador
function StartTimer() {
    myInterval = setInterval(
        function() {
            timer.innerHTML = minute + " mins " + second + " secs";
            second++;
            CheckTimer();
            if (second == 60) {
                minute++;
                second = 0;
            }
        }, 1000);
}
// Resetear Temporizador
function ResetTimer() {
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(myInterval);
}
//Comprobacion de tiempo limite *falta poner funcion de final de juego.
function CheckTimer() {
    if (minute >= 5) {
        window.alert("Tiempo sobrepasado");
    }
}
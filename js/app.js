/*variables globales*/

//Referencia a la barra de energia en el codigo HTML
var energyBar = document.getElementById("nrgBarID");
//Valor Inicial de energia **no cambiar
var initNrg = 100;
//Valor actual de energia
var currentNrg;
//Valor de restauracion de energia
var nrgValueIncrement = 5;

//Referencia al contador de tiempo en el codigo HTML
var timer = document.querySelector(".currentTime");
//Referencia al intervalo del contador interno de tiempo
var myInterval;
//Valor inicial del contador de tiempo
var initTime = 180;
//Referencia al valor actual de contador
var currentTime;
//Valor de restauracion de tiempo
var timeValueIncrement = 20;





//Puesta en marcha del script
document.body.onload = function() {
    StartGame();
}

//Funcion de comienzo de juego
function StartGame() {
    ResetTimer();
    StartTimer();
    MakeTiles();
    resetcurrentNrg();


}

function resetcurrentNrg() {
    currentNrg = initNrg;
    energyBar.style.width = currentNrg + "%";
    energyBar.style.backgroundColor = "hsl(" + (currentNrg - nrgValueIncrement) + ", 80%, 50%)";

}

//funcion para restaurar energia
function nrgAdd() {

    if (currentNrg >= 100) {
        alert("maxhealth");
    } else {
        currentNrg = currentNrg + nrgValueIncrement;
        energyBar.style.width = (currentNrg) + "%";
        energyBar.style.backgroundColor = "hsl(" + currentNrg + ", 80%, 50%)";

    }
}

//funcion para consumir energia
function nrgSubstract() {
    currentNrg = currentNrg - nrgValueIncrement;
    if (currentNrg <= 0) {
        alert("youloose");
    } else {
        energyBar.style.width = (currentNrg) + "%";
        energyBar.style.backgroundColor = "hsl(" + currentNrg + ", 80%, 50%)";
    }
}



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
            item.classList.add("tile", "undigged");

            //Test añadir power
            if (y % 2 == 0) {
                item.classList.add("powerF");
            } else {
                item.classList.add("powerT");
            }
            //añadimos eventos del raton
            item.addEventListener("click", this.tileClick);


            //añadir el item a la lista
            list.appendChild(item);
        }
    }
}

function PlacePowerUps(x, y) {
    var test = "powerF";
    switch (test) {
        case "powerF":

            break;
        case "powerT":
            break;
        case "item":
            break;
        default:
            break;
    };
}

//Funciones de click on tile
function tileClick() {
    //le quitamos el eventlistener para no poder hacerle click
    this.removeEventListener("click", tileClick);
    //damos la vuelta a la tile
    tileShow(this);
    //comprobamos la accion de la tile
    tileCheck(this);
}
//funcion par mostrar Tile
function tileShow(currentElement) {
    currentElement.classList.remove("undigged");
    currentElement.classList.add("digged");
}

function tileCheck(currentElement) {
    //comprobamos si la tile es de tipo powerFuel
    if (currentElement.classList.contains("powerF")) {
        /*añadimos la imagen*/
        //creamos el elemento de la imagen       
        var newImg = document.createElement('img');
        //añadimos clase a la imagen
        newImg.classList.add("pwrItemImg");
        //añadimos los parametros de ruta la imagen
        newImg.src = 'img/power_fuel_full.webp';
        //finalmente añadimos el div a la tile
        currentElement.appendChild(newImg);

        /*ejecutamos la funcion de añadir energia*/
        nrgAdd();
    } else {
        //Si no es un item de energia
        //ejecutamos la funcion de reducir energia
        nrgSubstract();
    }

    //comprobamos si la tile es de tipo PowerTime
    if (currentElement.classList.contains("powerT")) {
        /*añadimos la imagen*/
        //creamos el elemento de la imagen       
        var newImg = document.createElement('img');
        //añadimos clase a la imagen
        newImg.classList.add("pwrItemImg");
        //añadimos los parametros de ruta la imagen
        newImg.src = 'img/power_timer_full.webp';
        //finalmente añadimos el div a la tile
        currentElement.appendChild(newImg);

        /*Ejecutamos la funcion para añadir tiempo*/
        timeAdd();
    }

    //Comprobamos si la tile es de tipo Item
    if (currentElement.classList.contains("item")) {
        console.log("it has class item");
    }

    //Comprobamos si la tile es de tipo normal
    if (currentElement.classList.contains("tile")) {
        console.log("it has class tile");
    }
}



/* Funciones de temporizador del juego*/


// Iniciar temporizador
function StartTimer() {
    myInterval = setInterval(
        function() {
            //Mostrar el valor en pantalla
            timer.innerHTML = (Math.trunc(currentTime / 60)) + " mins " + (currentTime % 60) + " secs";
            //restamos un segundo
            currentTime--;
            //comprobamos si se ha agotado el tiempo
            if (currentTime <= 0) { window.alert("Te has quedado sin tiempo"); }
            //Intervalo sobre el cual se va a relanzar la funcion en milisegundos
        }, 1000);
}
// Resetear Temporizador
function ResetTimer() {
    //reseteamos el contador
    clearInterval(myInterval);
    //resetear valor total de tiempo de juego
    currentTime = initTime;
    //primer valor mostrado en pantalla
    timer.innerHTML = (Math.trunc(currentTime / 60)) + " mins " + (currentTime % 60) + " secs";
}

//Funcion para añadir tiempo al contador
function timeAdd() {
    //Comprobamos si al añadir tiempo nos saldriamos del maximo
    if (currentTime >= initTime - timeValueIncrement) {
        window.alert("Tiempo maximo alcanzado");
    } else {
        //añadimos tiempo
        currentTime = currentTime + timeValueIncrement;
    }
}

var newArray = [];
//funcion para tomar la informacion del archivo json data
//es una funcion async , cuidado de no utilizar los datos antes de ser cargados.
fetch("../data/data.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        newArray = data[0];
    })
    .then(showmydata(newArray))

function showmydata(mydata) {
    console.log(mydata[0]);
}
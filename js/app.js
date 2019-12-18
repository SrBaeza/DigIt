/* VARIABLES */

//Array con los items del mapa actual
var itemCoordinates = [];

//Referencia a la barra de energia en el codigo HTML
var energyBar = document.getElementById("nrgBarID");
//Valor Inicial de energia **no cambiar
var initNrg = 100;
//Valor actual de energia
var currentNrg;
//Valor de restauracion de energia
var nrgValueIncrement = 5;

//Valor inicial del contador de tiempo
var initTime = 180;
//Referencia al valor actual de contador
var currentTime;
//Valor de restauracion de tiempo
var timeValueIncrement = 20;

/* LISTA DE OBJETOS */
var testItem1 = {
    itemName: "Shovel",
    itemType: "Item",
    itemImg: "./img/shovel_0.webp",
    itemPiece: [
        { ID: "Shovel1", posx: 1, posy: 1, tileimg: "./img/shovel_1.webp" },
        { ID: "Shovel2", posx: 2, posy: 1, tileimg: "./img/shovel_2.webp" },
        { ID: "Shovel3", posx: 3, posy: 1, tileimg: "./img/shovel_3.webp" },
    ]
}
var testItem2 = {
    itemName: "Bone",
    itemType: "Item",
    itemImg: "./img/bone_0.webp",
    itemPiece: [
        { ID: "Bone1", posx: 3, posy: 2, rot: "rot", tileimg: "./img/bone_1.webp" },
        { ID: "Bone2", posx: 3, posy: 3, rot: "rot", tileimg: "./img/bone_2.webp" },
        { ID: "Bone3", posx: 3, posy: 4, rot: "rot", tileimg: "./img/bone_3.webp" },
    ]
}

var testPowerF = {
    itemName: "Fuel",
    itemType: "Power",
    itemImg: "./img/power_fuel.webp",
    itemPiece: [
        { ID: "PowerFuel", posx: 0, posy: 0, tileimg: "./img/power_fuel.webp" }
    ]
}

var testPowerT = {
    itemName: "Time",
    itemType: "Power",
    itemImg: "./img/power_timer.webp",
    itemPiece: [
        { ID: "PowerTime", posx: 0, posy: 1, tileimg: "./img/power_timer.webp" }
    ]
}

//objetos a utilizar en el tablero
var thisMap = [testItem1, testItem2, testPowerF, testPowerT];

/* FIN DE VARIABLES */


/* PRIMERA LLAMADA DEL SCRIPT */
document.body.onload = (() => StartGame())


//Inicializamos las funciones principales
function StartGame() {
    SetItemCoordinates(thisMap); //inicializamos un array con el mapa que vayamos a utilizar
    resetcurrentNrg(); //
    StartTimer();
    MakeTiles();
    MakePowers();
}

/* TIEMPO */

// Iniciar temporizador
function StartTimer(myInterval, timer = document.querySelector(".currentTime")) {
    //reseteamos el contador
    clearInterval(myInterval);
    //resetear valor total de tiempo de juego
    currentTime = initTime;
    //generamos un intervalo
    myInterval = setInterval(() => {
        //Mostrar el valor en pantalla
        timer.innerHTML = (Math.trunc(currentTime / 60)) + " mins " + (currentTime % 60) + " secs";
        //restamos un segundo
        currentTime--;
        //comprobamos si se ha agotado el tiempo
        if (currentTime <= 0) { console.log("Te has quedado sin tiempo"); }
        //Intervalo sobre el cual se va a relanzar la funcion en milisegundos
    }, 1000);
}

/* CREACION DEL TABLERO */

//Funcion para guardar las coordenadas de los items seleccionados
function SetItemCoordinates(currentMap) {
    //vaciamos el array
    itemCoordinates.length = 0;

    //para cada objeto dentro del array de mapa
    currentMap.forEach((item) => {
        //añadir para cada item dentro de itemPiece creamos un objeto de dos coordenadas en el array
        item.itemPiece.forEach((piece) => {
            itemCoordinates.push({
                posX: piece.posx,
                posY: piece.posy,
                rotation: piece.rot,
                itemType: item.itemType,
                ID: piece.ID,
                itemImg: piece.tileimg
            })
        })
    })

}



//Funcion para crear las casillas del tablero
function MakeTiles(myBoard = document.getElementById("myBoard")) {

    //Loop eje X
    for (var x = 0; x < 13; x++) {

        //Loop eje Y
        for (var y = 0; y < 13; y++) {

            //crear elemento web
            var item = document.createElement('div');

            //añadir data info sobre posicion de la tile
            item.setAttribute('data-row', x);
            item.setAttribute('data-column', y);

            // //añadir clase al elemento
            item.classList.add("tile", "undigged");

            //añadimos eventos del raton
            item.addEventListener("click", this.tileClick);

            //añadir el item al div principal
            myBoard.appendChild(item);
        }
    }
}

//Crear los poweritems del menu izq
function MakePowers() {

    powerArray.forEach((power) => {

        //creamos elemento de imagen
        var newPower = document.createElement('img');

        //añadimos clase al elemento img
        newPower.classList.add("itemImg");

        //añadimos los parametros de ruta la imagen
        newPower.src = power.imgsrc;

        //creamos elemento para el contador del power
        var newPowerCounter = document.createElement('div');

        //añadimos id
        newPowerCounter.id = power.subelementID;

        //añadimos clase 
        newPowerCounter.classList.add("powerCounter");

        //añadimos el contador inicial
        newPowerCounter.textContent = "1";

        //añadimos eventos del raton
        document.getElementById(power.elementID).addEventListener("click", this.PlayerItemPlay);

        //añadimos el elemento completo
        document.getElementById(power.elementID).appendChild(newPower);
        document.getElementById(power.elementID).appendChild(newPowerCounter);
    })
}



/* TILE LOGIC */

//Funciones de click on tile
function tileClick() {

    //le quitamos el eventlistener para no poder hacerle click
    this.removeEventListener("click", tileClick);

    //cambiamos clase para mostar la tile
    this.classList.replace("undigged", "digged")

    //reseteamos las variables
    var currentType = "";
    var currentPieceID = "";

    //comprobamos si la tile tiene algun item que mostrar
    itemCoordinates.forEach((item) => {
        //si las coordinadas coinciden con algun elemento del array
        if (item.posX == this.dataset.row && item.posY == this.dataset.column) {

            //Guardamos el tipo de tile que es y su ID
            currentType = item.itemType;
            currentPieceID = item.ID;

            //creamos el elemento de la imagen       
            var newImg = document.createElement('img');

            //añadimos clase al elemento img
            newImg.classList.add("itemImg");

            //añadimos clase si la imagen tiene que estar girada
            if (typeof item.rotation !== "undefined") { newImg.classList.add(item.rotation); }

            //añadimos los parametros de ruta la imagen
            newImg.src = item.itemImg;

            //finalmente añadimos el div a la tile
            this.appendChild(newImg);
        }
    })

    //comprobamos si tiene algun power
    switch (currentType) {
        //gestionamos power
        case "Power":
            switch (currentPieceID) {
                case "PowerTime":
                    timeAdd();
                    break;
                case "PowerFuel":
                    nrgAdd();
                    break;
                default:
                    break;
            }
            break;

            // gestionamos descubrir item
        case "Item":
            console.log("This is a especial Item")
            break;

            //para casillas sin ningun item
        default:
            nrgSubstract();
            break;
    }
}

//referencias valor de los powers
var currentPowerFuel = 1;
var currerntPowerTime = 1;

var powerArray = [{
    elementID: "PowerFuel",
    subelementID: "PowerFuelID",
    imgsrc: "./img/power_fuel.webp"
}, {
    elementID: "PowerTime",
    subelementID: "PowerTimeID",
    imgsrc: "./img/power_timer.webp"
}]



/* Funciones de la barra de energia */

//Funcion para resetear la variable de energia al valor inicial
function resetcurrentNrg() {
    currentNrg = initNrg;
    energyBar.style.width = currentNrg + "%";
    energyBar.style.backgroundColor = "hsl(" + (currentNrg - nrgValueIncrement) + ", 80%, 50%)";

}

//funcion para restaurar energia
function nrgAdd() {
    //comprobamos que la nrg no esta completa
    if (currentNrg >= 100) {
        currentPowerFuel++;
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
        console.log("youloose");
    } else {
        energyBar.style.width = (currentNrg) + "%";
        energyBar.style.backgroundColor = "hsl(" + currentNrg + ", 80%, 50%)";
    }
}





//Funcion para añadir tiempo al contador
function timeAdd() {
    //Comprobamos si al añadir tiempo nos saldriamos del maximo
    if (currentTime >= initTime - timeValueIncrement) {
        console.log("Tiempo maximo alcanzado");
    } else {
        //añadimos tiempo
        currentTime = currentTime + timeValueIncrement;
    }
}

//funcion para el item del menu izq
function PlayerItemPlay() {

    //comprobamos que tipo de power es
    switch (this.id) {
        case "PowerFuel":
            console.log("Power Item");
            break;
        case "PowerTime":
            console.log("Time Item");
            break;
    }
}

//actualizar power en la web
function UpdatePower() {

}
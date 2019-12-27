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
var testItem3 = {
    itemName: "BottleCup",
    itemType: "Item",
    itemImg: "./img/bottlecup_0.webp",
    itemPiece: [
        { ID: "Bottlecup1", posx: 1, posy: 1, tileimg: "./img/bottlecup_1.webp" },
        { ID: "Bottlecup2", posx: 2, posy: 1, tileimg: "./img/bottlecup_2.webp" },
        { ID: "Bottlecup3", posx: 3, posy: 1, tileimg: "./img/bottlecup_3.webp" },
    ]
}
var testItem4 = {
    itemName: "Bug",
    itemType: "Item",
    itemImg: "./img/bug_0.webp",
    itemPiece: [
        { ID: "Bug1", posx: 1, posy: 1, tileimg: "./img/bug_1.webp" },
        { ID: "Bug2", posx: 2, posy: 1, tileimg: "./img/bug_2.webp" },
        { ID: "Bug3", posx: 3, posy: 1, tileimg: "./img/bug_3.webp" },
    ]
}
var testItem5 = {
    itemName: "Bullet",
    itemType: "Item",
    itemImg: "./img/bullet_0.webp",
    itemPiece: [
        { ID: "Bullet1", posx: 1, posy: 1, tileimg: "./img/bullet_1.webp" },
        { ID: "Bullet2", posx: 2, posy: 1, tileimg: "./img/bullet_2.webp" },
        { ID: "Bullet3", posx: 3, posy: 1, tileimg: "./img/bullet_3.webp" },
    ]
}
var testItem6 = {
    itemName: "Camera",
    itemType: "Item",
    itemImg: "./img/camera_0.webp",
    itemPiece: [
        { ID: "Camera1", posx: 1, posy: 1, tileimg: "./img/camera_1.webp" },
        { ID: "Camera2", posx: 2, posy: 1, tileimg: "./img/camera_2.webp" },
        { ID: "Camera3", posx: 3, posy: 1, tileimg: "./img/camera_3.webp" },
    ]
}
var testItem7 = {
    itemName: "Can",
    itemType: "Item",
    itemImg: "./img/can_0.webp",
    itemPiece: [
        { ID: "Can1", posx: 1, posy: 1, tileimg: "./img/can_1.webp" },
        { ID: "Can2", posx: 2, posy: 1, tileimg: "./img/can_2.webp" },
        { ID: "Can3", posx: 3, posy: 1, tileimg: "./img/can_3.webp" },
    ]
}
var testItem8 = {
    itemName: "Cap",
    itemType: "Item",
    itemImg: "./img/cap_0.webp",
    itemPiece: [
        { ID: "Cap1", posx: 1, posy: 1, tileimg: "./img/cap_1.webp" },
        { ID: "Cap2", posx: 2, posy: 1, tileimg: "./img/cap_2.webp" },
        { ID: "Cap3", posx: 3, posy: 1, tileimg: "./img/cap_3.webp" },
    ]
}
var testItem10 = {
    itemName: "Chest",
    itemType: "Item",
    itemImg: "./img/chest_0.webp",
    itemPiece: [
        { ID: "Chest1", posx: 1, posy: 1, tileimg: "./img/chest_1.webp" },
        { ID: "Chest2", posx: 2, posy: 1, tileimg: "./img/chest_2.webp" },
        { ID: "Chest3", posx: 3, posy: 1, tileimg: "./img/chest_3.webp" },
    ]
}
var testItem11 = {
    itemName: "Cloth",
    itemType: "Item",
    itemImg: "./img/cloth_0.webp",
    itemPiece: [
        { ID: "Cloth1", posx: 1, posy: 1, tileimg: "./img/cloth_1.webp" },
        { ID: "Cloth2", posx: 2, posy: 1, tileimg: "./img/cloth_2.webp" },
        { ID: "Cloth3", posx: 3, posy: 1, tileimg: "./img/cloth_3.webp" },
    ]
}
var testItem12 = {
    itemName: "Coin",
    itemType: "Item",
    itemImg: "./img/coin_0.webp",
    itemPiece: [
        { ID: "Coin1", posx: 1, posy: 1, tileimg: "./img/coin_1.webp" },
        { ID: "Coin2", posx: 2, posy: 1, tileimg: "./img/coin_2.webp" },
        { ID: "Coin3", posx: 3, posy: 1, tileimg: "./img/coin_3.webp" },
    ]
}
var testItem13 = {
    itemName: "Cuaderno",
    itemType: "Item",
    itemImg: "./img/cuaderno_0.webp",
    itemPiece: [
        { ID: "Cuaderno1", posx: 1, posy: 1, tileimg: "./img/cuaderno_1.webp" },
        { ID: "Cuaderno2", posx: 2, posy: 1, tileimg: "./img/cuaderno_2.webp" },
        { ID: "Cuaderno3", posx: 3, posy: 1, tileimg: "./img/cuaderno_3.webp" },
    ]
}
var testItem14 = {
    itemName: "Fork",
    itemType: "Item",
    itemImg: "./img/fork_0.webp",
    itemPiece: [
        { ID: "Fork1", posx: 1, posy: 1, tileimg: "./img/fork_1.webp" },
        { ID: "Fork2", posx: 2, posy: 1, tileimg: "./img/fork_2.webp" },
        { ID: "Fork3", posx: 3, posy: 1, tileimg: "./img/fork_3.webp" },
    ]
}
var testItem15 = {
    itemName: "Fosil",
    itemType: "Item",
    itemImg: "./img/fosil_0.webp",
    itemPiece: [
        { ID: "Fosil1", posx: 1, posy: 1, tileimg: "./img/fosil_1.webp" },
        { ID: "Fosil2", posx: 2, posy: 1, tileimg: "./img/fosil_2.webp" },
        { ID: "Fosil3", posx: 3, posy: 1, tileimg: "./img/fosil_3.webp" },
    ]
}
var testItem16 = {
    itemName: "GoPro",
    itemType: "Item",
    itemImg: "./img/gopro_0.webp",
    itemPiece: [
        { ID: "Gopro1", posx: 1, posy: 1, tileimg: "./img/gopro_1.webp" },
        { ID: "Gopro2", posx: 2, posy: 1, tileimg: "./img/gopro_2.webp" },
        { ID: "Gopro3", posx: 3, posy: 1, tileimg: "./img/gopro_3.webp" },
    ]
}
var testItem17 = {
    itemName: "HoeShoe",
    itemType: "Item",
    itemImg: "./img/hoeshoe_0.webp",
    itemPiece: [
        { ID: "Hoeshoe1", posx: 1, posy: 1, tileimg: "./img/hoeshoe_1.webp" },
        { ID: "Hoeshoe2", posx: 2, posy: 1, tileimg: "./img/hoeshoe_2.webp" },
        { ID: "Hoeshoe3", posx: 3, posy: 1, tileimg: "./img/hoeshoe_3.webp" },
    ]
}
var testItem18 = {
    itemName: "Ingot",
    itemType: "Item",
    itemImg: "./img/ingot_0.webp",
    itemPiece: [
        { ID: "Ingot1", posx: 1, posy: 1, tileimg: "./img/ingot_1.webp" },
        { ID: "Ingot2", posx: 2, posy: 1, tileimg: "./img/ingot_2.webp" },
        { ID: "Ingot3", posx: 3, posy: 1, tileimg: "./img/ingot_3.webp" },
    ]
}
var testItem19 = {
    itemName: "Log",
    itemType: "Item",
    itemImg: "./img/log_0.webp",
    itemPiece: [
        { ID: "Log1", posx: 1, posy: 1, tileimg: "./img/log_1.webp" },
        { ID: "Log2", posx: 2, posy: 1, tileimg: "./img/log_2.webp" },
        { ID: "Log3", posx: 3, posy: 1, tileimg: "./img/log_3.webp" },
    ]
}
var testItem20 = {
    itemName: "Map",
    itemType: "Item",
    itemImg: "./img/map_0.webp",
    itemPiece: [
        { ID: "Map1", posx: 1, posy: 1, tileimg: "./img/map_1.webp" },
        { ID: "Map2", posx: 2, posy: 1, tileimg: "./img/map_2.webp" },
        { ID: "Map3", posx: 3, posy: 1, tileimg: "./img/map_3.webp" },
    ]
}
var testItem21 = {
    itemName: "Mobile",
    itemType: "Item",
    itemImg: "./img/mobile_0.webp",
    itemPiece: [
        { ID: "Mobile1", posx: 1, posy: 1, tileimg: "./img/mobile_1.webp" },
        { ID: "Mobile2", posx: 2, posy: 1, tileimg: "./img/mobile_2.webp" },
        { ID: "Mobile3", posx: 3, posy: 1, tileimg: "./img/mobile_3.webp" },
    ]
}
var testItem22 = {
    itemName: "Rock",
    itemType: "Item",
    itemImg: "./img/rock_0.webp",
    itemPiece: [
        { ID: "Rock1", posx: 1, posy: 1, tileimg: "./img/rock_1.webp" },
        { ID: "Rock2", posx: 2, posy: 1, tileimg: "./img/rock_2.webp" },
        { ID: "Rock3", posx: 3, posy: 1, tileimg: "./img/rock_3.webp" },
    ]
}
var testItem23 = {
    itemName: "Scissors",
    itemType: "Item",
    itemImg: "./img/scissors_0.webp",
    itemPiece: [
        { ID: "Scissors1", posx: 1, posy: 1, tileimg: "./img/scissors_1.webp" },
        { ID: "Scissors2", posx: 2, posy: 1, tileimg: "./img/scissors_2.webp" },
        { ID: "Scissors3", posx: 3, posy: 1, tileimg: "./img/scissors_3.webp" },
    ]
}
var testItem24 = {
    itemName: "Sign",
    itemType: "Item",
    itemImg: "./img/sign_0.webp",
    itemPiece: [
        { ID: "Sign1", posx: 1, posy: 1, tileimg: "./img/sign_1.webp" },
        { ID: "Sign2", posx: 2, posy: 1, tileimg: "./img/sign_2.webp" },
        { ID: "Sign3", posx: 3, posy: 1, tileimg: "./img/sign_3.webp" },
    ]
}
var testItem25 = {
    itemName: "Skull",
    itemType: "Item",
    itemImg: "./img/skull_0.webp",
    itemPiece: [
        { ID: "Skull1", posx: 1, posy: 1, tileimg: "./img/skull_1.webp" },
        { ID: "Skull2", posx: 2, posy: 1, tileimg: "./img/skull_2.webp" },
        { ID: "Skull3", posx: 3, posy: 1, tileimg: "./img/skull_3.webp" },
    ]
}
var testItem26 = {
    itemName: "Snake",
    itemType: "Item",
    itemImg: "./img/snake_0.webp",
    itemPiece: [
        { ID: "Snake1", posx: 1, posy: 1, tileimg: "./img/snake_1.webp" },
        { ID: "Snake2", posx: 2, posy: 1, tileimg: "./img/snake_2.webp" },
        { ID: "Snake3", posx: 3, posy: 1, tileimg: "./img/snake_3.webp" },
    ]
}
var testItem27 = {
    itemName: "Tobaco",
    itemType: "Item",
    itemImg: "./img/tobaco_0.webp",
    itemPiece: [
        { ID: "Tobaco1", posx: 1, posy: 1, tileimg: "./img/tobaco_1.webp" },
        { ID: "Tobaco2", posx: 2, posy: 1, tileimg: "./img/tobaco_2.webp" },
        { ID: "Tobaco3", posx: 3, posy: 1, tileimg: "./img/tobaco_3.webp" },
    ]
}
var testItem28 = {
    itemName: "Wheel",
    itemType: "Item",
    itemImg: "./img/wheel_0.webp",
    itemPiece: [
        { ID: "Wheel1", posx: 1, posy: 1, tileimg: "./img/wheel_1.webp" },
        { ID: "Wheel2", posx: 2, posy: 1, tileimg: "./img/wheel_2.webp" },
        { ID: "Wheel3", posx: 3, posy: 1, tileimg: "./img/wheel_3.webp" },
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
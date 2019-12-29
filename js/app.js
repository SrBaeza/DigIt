/* VARIABLES */

//Array de niveles con sus objetos correspondientes.
var stageMaster = [];

//numero de items por nivel
var itemsPerLevel = 5;

//Tamaño de tablero
var boardSize = { x: 10, y: 10 };

//Nivel Actual, inicio en 0
var currentPlayerLevel = 0;

//Referencia a la barra de energia en el codigo HTML
var energyBar = document.getElementById("nrgBarID");
//Valor Inicial de energia **no cambiar
var initNrg = 100;
//Valor actual de energia
var currentNrg;
//Valor de restauracion de energia
var nrgValueIncrement = 5;

//Timepo de Juego
var initTime = 180;
//Referencia al valor actual de contador
var currentTime;
//Valor de restauracion de tiempo
var timeValueIncrement = 20;

/* FIN DE VARIABLES */



/* >>FUNCION PRINCIPAL DEL SCRIPT */
document.body.onload = (() => StartGame())


//Inicializamos las funciones principales
function StartGame() {
    SetMapSize();
    MakeTiles();
    MakePowers();
    SetMatch();
    // SetItemCoordinates(thisMap); //inicializamos un array con el mapa que vayamos a utilizar
    resetcurrentNrg(); //
    StartTimer();
}

/* <<FUNCION PRINCIPAL DEL SCRIPT */

/* >> FUNCIONES BASICAS PARA CREACION DEL TABLERO */

//Cambiamos en css las propiedades de la grid principal del tablero.
function SetMapSize() {
    document.documentElement.style.setProperty('--boardX', boardSize.x);
    document.documentElement.style.setProperty('--boardY', boardSize.y);
}

//Funcion para crear las casillas del tablero
function MakeTiles(myBoard = document.getElementById("myBoard")) {

    //Loop eje X
    for (var y = 0; y < boardSize.y; y++) {

        //Loop eje Y
        for (var x = 0; x < boardSize.x; x++) {

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

/* << FUNCIONES BASICAS PARA CREACION DEL TABLERO */

/** >> FUNCIONES PARA LA CREACION PROCEDURAL DE LOS NIVELES E ITEMS */

//Funcion para generar los datos de la partida
function SetMatch() {

    //randomizamos el catalogo
    var randomMaster = RandomizeArray(masterItem);
    //sacamos objetos y los establecemos en diferentes mapas
    console.log(randomMaster);
    while (randomMaster.length > 0) {
        stageMaster.push(CreateLevel(randomMaster, itemsPerLevel));
    }
    console.log("Match Started");
    console.log(stageMaster);
}

// Random Fisher-Yates
// https://www.youtube.com/watch?v=tLxBwSL3lPQ
function RandomizeArray(originalItemArray) {
    // array = AssignRandomRotation(originalItemArray);

    var currentIndex = originalItemArray.length,
        currentRandom, tempObject;
    while (--currentIndex > 0) {
        currentRandom = Math.floor(Math.random() * (currentIndex + 1));
        tempObject = originalItemArray[currentRandom];
        originalItemArray[currentRandom] = originalItemArray[currentIndex];
        originalItemArray[currentIndex] = tempObject;
    }
    return originalItemArray;
}

function AssignRandomRotation(originalItemList) {

    originalItemList.forEach(originalItem => {
        switch (Math.floor((Math.random() * 4) + 1)) {
            case 1:
                console.log("is 1");
                break;
            case 2:
                console.log("is 2");
                break;
            case 3:
                console.log("is 3");
                break;
            case 4:
                console.log("is 4");
                break;
            default:
        }
        return originalItemList
    })

}

//Saca objetos del array random y los coloca en un stage
function CreateLevel(randomMaster, numOfItems) {
    if (numOfItems > randomMaster.length) { numOfItems = randomMaster.length }
    var currentLevel = [];
    do {
        var newItemOrigin = CheckTileAvailability(currentLevel);
        var currentItem = randomMaster.pop();
        var modifiedItem = SetPiecePosition(currentItem, newItemOrigin);
        currentLevel.push(modifiedItem);
    } while (--numOfItems > 0)
    return currentLevel;
}

//comprueba que no hay objectos adyacentes a un punto de origen random
function CheckTileAvailability(currentLevel) {
    var newOrigin;
    if (currentLevel.length <= 0) {
        newOrigin = GetRandomInBoard();
        return newOrigin
    } else {
        var positionTaken = UpdateLevelItemPosition(currentLevel);
        newOrigin = CheckNeighborhood(currentLevel, positionTaken);
        return newOrigin
    }
}

//Calcula posiciones aleatorias dentro de las dimensiones del tablero
function GetRandomInBoard() {
    return {
        x: Math.floor((Math.random() * (boardSize.x - 1)) + 1),
        y: Math.floor((Math.random() * (boardSize.y - 1)) + 1)
    }
}

function UpdateLevelItemPosition(currentLevel) {
    var positionTaken = [];
    currentLevel.forEach(item => {
        item.piece.forEach(piece => {
            positionTaken.push({
                x: (piece.pos.x),
                y: (piece.pos.y)
            });
        })
    })
    return positionTaken
}

function CheckNeighborhood(currentLevel, positionTaken) {

    //nuevo random cada vez que se genera
    currentOrigin = GetRandomInBoard();

    //generamos un array con todas las posiciones basadas en el nuevo origen
    var newItemPositions = UpdateNewItemPosition(currentOrigin);

    var isTileAreaTaken = positionTaken.some(alreadyOnLevel => newItemPositions.some(newInLevel => JSON.stringify(alreadyOnLevel) === JSON.stringify(newInLevel)));

    //con el resultado final mandamos de vuelta las coordenadas y 
    if (isTileAreaTaken === false) {
        return currentOrigin
    } else {
        CheckNeighborhood(currentLevel, positionTaken);
        return currentOrigin
    }
}

function UpdateNewItemPosition(randomPosition) {
    var newItemPositions = [];
    [-1, 0, 1].forEach(currentX => {
        [-1, 0, 1].forEach(currentY => {
            newItemPositions.push({
                x: (randomPosition.x + currentX),
                y: (randomPosition.y + currentY)
            });
        })
    })
    return newItemPositions
}



function SetPiecePosition(currentItem, availableOrigin) {
    console.log(currentItem);
    currentItem.piece.forEach(piece => {
        piece.pos.x = (availableOrigin.x + piece.pos.x);
        piece.pos.y = (availableOrigin.y + piece.pos.y);
    });

    return currentItem
}

function UpdateNewItemPosition(randomPosition) {
    var newItemPositions = [];
    [-1, 0, 1].forEach(currentX => {
        [-1, 0, 1].forEach(currentY => {
            newItemPositions.push({
                x: (randomPosition.x + currentX),
                y: (randomPosition.y + currentY)
            });
        })
    })
    return newItemPositions
}


/** << FUNCIONES PARA LA CREACION PROCEDURAL DE LOS NIVELES E ITEMS  */

/* >> FUNCIONES RELACIONADAS CON EL TIEMPO DE JUEGO*/

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

/* << FUNCIONES RELACIONADAS CON EL TIEMPO DE JUEGO*/

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
    console.log(stageMaster[currentPlayerLevel]);
    //comprobamos si la tile tiene algun item que mostrar
    stageMaster[currentPlayerLevel].forEach((item) => {
        console.log(item);
        item.piece.forEach(piece => {
            if (piece.pos.x == this.dataset.row && piece.pos.y == this.dataset.column) {
                console.log(true);
                //Guardamos el tipo de tile que es y su ID
                currentType = item.type;
                currentPieceID = item.ID;

                //creamos el elemento de la imagen       
                var newImg = document.createElement('img');

                //añadimos clase al elemento img
                newImg.classList.add("itemImg");

                //añadimos clase si la imagen tiene que estar girada
                if (typeof piece.rot !== "undefined") { newImg.classList.add(piece.rot); }

                //añadimos los parametros de ruta la imagen
                newImg.src = piece.img;

                //finalmente añadimos el div a la tile
                this.appendChild(newImg);
            }
        });
    })
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





/* ARRAY PRINCIPAL CON TODOS LOS OBJETOS DE JUEGO*/

var masterItem = [{
        imgSrc: "./img/wheel_0.webp",
        name: "wheel",
        type: "Item",
        piece: [
            { pos: { x: -1, y: -1 }, img: "./img/question_01.webp" },
            { pos: { x: -1, y: 0 }, img: "./img/question_01.webp" },
            { pos: { x: -1, y: +1 }, img: "./img/question_01.webp" },
            { ID: "Wheel1", pos: { x: 0, y: -1 }, img: "./img/wheel_1.webp" },
            { ID: "Wheel2", pos: { x: 0, y: 0 }, img: "./img/wheel_2.webp" },
            { ID: "Wheel3", pos: { x: 0, y: +1 }, img: "./img/wheel_3.webp" },
            { pos: { x: +1, y: -1 }, img: "./img/question_01.webp" },
            { pos: { x: +1, y: 0 }, img: "./img/question_01.webp" },
            { pos: { x: +1, y: +1 }, img: "./img/question_01.webp" }
        ]
    }, {
        imgSrc: "./img/shovel_0.webp",
        name: "Shovel",
        type: "Item",
        piece: [
            { pos: { x: -1, y: -1 }, img: "./img/question_01.webp" },
            { pos: { x: -1, y: 0 }, img: "./img/question_01.webp" },
            { pos: { x: -1, y: +1 }, img: "./img/question_01.webp" },
            { ID: "Shovel1", pos: { x: 0, y: -1 }, img: "./img/shovel_1.webp" },
            { ID: "Shovel2", pos: { x: 0, y: 0 }, img: "./img/shovel_2.webp" },
            { ID: "Shovel3", pos: { x: 0, y: +1 }, img: "./img/shovel_3.webp" },
            { pos: { x: +1, y: -1 }, img: "./img/question_01.webp" },
            { pos: { x: +1, y: 0 }, img: "./img/question_01.webp" },
            { pos: { x: +1, y: +1 }, img: "./img/question_01.webp" }
        ]
    }, {
        imgSrc: "./img/bone_0.webp",
        name: "Bone",
        type: "Item",
        piece: [
            { pos: { x: -1, y: -1 }, img: "./img/question_01.webp" },
            { pos: { x: -1, y: 0 }, img: "./img/question_01.webp" },
            { pos: { x: -1, y: +1 }, img: "./img/question_01.webp" },
            { ID: "Bone1", pos: { x: 0, y: -1 }, img: "./img/bone_1.webp" },
            { ID: "Bone2", pos: { x: 0, y: 0 }, img: "./img/bone_2.webp" },
            { ID: "Bone3", pos: { x: 0, y: +1 }, img: "./img/bone_3.webp" },
            { pos: { x: +1, y: -1 }, img: "./img/question_01.webp" },
            { pos: { x: +1, y: 0 }, img: "./img/question_01.webp" },
            { pos: { x: +1, y: +1 }, img: "./img/question_01.webp" }
        ]
    }, {
        imgSrc: "./img/power_timer.webp",
        name: "timer",
        type: "Power",
        piece: [
            { pos: { x: -1, y: -1 }, img: "./img/question_01.webp" },
            { pos: { x: -1, y: 0 }, img: "./img/question_01.webp" },
            { pos: { x: -1, y: +1 }, img: "./img/question_01.webp" },
            { pos: { x: 0, y: -1 }, img: "./img/question_01.webp" },
            { ID: "PowerTime", pos: { x: 0, y: 0 }, img: "./img/power_timer.webp" },
            { pos: { x: 0, y: +1 }, img: "./img/question_01.webp" },
            { pos: { x: +1, y: -1 }, img: "./img/question_01.webp" },
            { pos: { x: +1, y: 0 }, img: "./img/question_01.webp" },
            { pos: { x: +1, y: +1 }, img: "./img/question_01.webp" }
        ]
    },
    {
        imgSrc: "./img/power_fuel.webp",
        name: "Fuel",
        type: "Power",
        piece: [
            { pos: { x: -1, y: -1 }, img: "./img/question_01.webp" },
            { pos: { x: -1, y: 0 }, img: "./img/question_01.webp" },
            { pos: { x: -1, y: +1 }, img: "./img/question_01.webp" },
            { pos: { x: 0, y: -1 }, img: "./img/question_01.webp" },
            { ID: "PowerFuel", pos: { x: 0, y: 0 }, img: "./img/power_fuel.webp" },
            { pos: { x: 0, y: +1 }, img: "./img/question_01.webp" },
            { pos: { x: +1, y: -1 }, img: "./img/question_01.webp" },
            { pos: { x: +1, y: 0 }, img: "./img/question_01.webp" },
            { pos: { x: +1, y: +1 }, img: "./img/question_01.webp" }
        ]
    }
];
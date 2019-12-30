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
    MakeUI();
    SetMatch();
    // SetItemCoordinates(thisMap); //inicializamos un array con el mapa que vayamos a utilizar
    // resetcurrentNrg(); //
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
function MakeUI() {

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
    let randomMaster = RandomizeArray(masterItem);
    //sacamos objetos y los establecemos en diferentes mapas
    while (randomMaster.length > 0) {
        stageMaster.push(CreateLevel(randomMaster, itemsPerLevel));
    }
    console.log("Match Started");
    console.log(stageMaster);
}

// Random Fisher-Yates
// https://www.youtube.com/watch?v=tLxBwSL3lPQ
function RandomizeArray(originalItemArray) {
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

//Saca objetos del array random y los coloca en un stage
function CreateLevel(randomMaster, numOfItems) {
    //esta comprobacion hace que el ultimo nivel tenga los objetos restantes
    if (numOfItems > randomMaster.length) { numOfItems = randomMaster.length }

    let currentLevel = [];
    //Por cada objeto comprobamos si se puede colocar, asignamos posicion y rotacion, y finalmente lo añadimos al array de este nivel
    do {
        //añadimos el item aprobado al array de objetos de nivel
        currentLevel.push(ItemCreator(randomMaster.pop(), currentLevel))
    } while (--numOfItems > 0)
    return currentLevel;
}

//comprueba que no hay objectos adyacentes a un punto de origen random
function ItemCreator(currentItem, currentLevel) {
    //si es el primer objeto se coloca sin comprobacion
    if (currentLevel.length <= 0) {

        //sacamos el ultimo item del array y le asignamos valores de localizacion aleatorios
        return AssignRandomPositionToItem(currentItem)

        //Para el resto de objectos actualizamos la lista de objetos presentes en el nivel y comprobamos si esta disponible
    } else {
        //Creamos un array con todos las posiciones ya ocupados por otros items
        let currentItemsInLevelPos = currentLevel.map(item => item.piece.map(pieceList => pieceList.pos)).flat();

        // var positionTaken = UpdateLevelItemPosition(currentLevel);
        let approvedItem = FindAPlace(currentItem, currentLevel);

        return approvedItem
    }
}

function FindAPlace(originalItem, positionTaken) {

    //Aplicamos ofset de rotacion y posicion al objeto proporcionado
    let newItem = AssignRandomPositionToItem(originalItem);

    //Hacemos un array con las posiciones que va a ocupar nuestro item
    let itemPosList = newItem.piece.map(piece => piece.pos);

    //Comprobamos que ningun valor este cogido ya en el tablero
    let isPositionTaken = positionTaken.some(takenPos => itemPosList.some(itemPos => JSON.stringify(takenPos) === JSON.stringify(itemPos)));

    //con el resultado final mandamos de vuelta las coordenadas y 
    if (isPositionTaken) {
        FindAPlace(originalItem, positionTaken);
    } else {
        return newItem
    }
}

function AssignRandomPositionToItem(item) {
    //un random para rotacion de 0 a 3
    let rotRandom = Math.floor((Math.random() * 3));

    //Un random para posicion dentro de los limites del tablero
    let posRandom = {
        x: Math.floor((Math.random() * (boardSize.x - 1)) + 1),
        y: Math.floor((Math.random() * (boardSize.y - 1)) + 1)
    };

    //creamos array temporal con la posicion y rotacion random aplicada
    let newLocationArray = [];
    let finalLocationArray = [];

    ///creamos un array con todas las posiciones de 
    defaultLocation[rotRandom].forEach(element => {
        newLocationArray.push({
            pos: { x: (element.pos.x + posRandom.x), y: (element.pos.y + posRandom.y) },
            rot: rotRandom
        });
    });

    //añadimos pos y rot a las piezas del objeto y mandamos al array las que tengan ID
    item.piece.forEach((thisPiece, i) => {
        item.piece[i] = {...thisPiece, ...newLocationArray[i] };
        if (typeof thisPiece.ID !== "undefined") {
            finalLocationArray.push(item.piece[i]);
        }
    });

    //sustituimos las propiedas de pieza por el array que solo contiene ids
    item.piece = finalLocationArray;
    return item
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

    //comprobamos si la tile tiene algun item que mostrar
    stageMaster[currentPlayerLevel].forEach((item) => {

        item.piece.forEach(piece => {
            if (piece.pos.x == this.dataset.row && piece.pos.y == this.dataset.column) {

                //creamos el elemento de la imagen       
                var newImg = document.createElement('img');

                //añadimos clase al elemento img
                newImg.classList.add("itemImg");

                //añadimos clase si la imagen tiene que estar girada
                newImg.classList.add("rot-" + piece.rot);

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



// /* Funciones de la barra de energia */

// //Funcion para resetear la variable de energia al valor inicial
// function resetcurrentNrg() {
//     currentNrg = initNrg;
//     energyBar.style.width = currentNrg + "%";
//     energyBar.style.backgroundColor = "hsl(" + (currentNrg - nrgValueIncrement) + ", 80%, 50%)";

// }

// //funcion para restaurar energia
// function nrgAdd() {
//     //comprobamos que la nrg no esta completa
//     if (currentNrg >= 100) {
//         currentPowerFuel++;
//     } else {
//         currentNrg = currentNrg + nrgValueIncrement;
//         energyBar.style.width = (currentNrg) + "%";
//         energyBar.style.backgroundColor = "hsl(" + currentNrg + ", 80%, 50%)";

//     }
// }

// //funcion para consumir energia
// function nrgSubstract() {
//     currentNrg = currentNrg - nrgValueIncrement;
//     if (currentNrg <= 0) {
//         console.log("youloose");
//     } else {
//         energyBar.style.width = (currentNrg) + "%";
//         energyBar.style.backgroundColor = "hsl(" + currentNrg + ", 80%, 50%)";
//     }
// }





// //Funcion para añadir tiempo al contador
// function timeAdd() {
//     //Comprobamos si al añadir tiempo nos saldriamos del maximo
//     if (currentTime >= initTime - timeValueIncrement) {
//         console.log("Tiempo maximo alcanzado");
//     } else {
//         //añadimos tiempo
//         currentTime = currentTime + timeValueIncrement;
//     }
// }

// //funcion para el item del menu izq
// function PlayerItemPlay() {

//     //comprobamos que tipo de power es
//     switch (this.id) {
//         case "PowerFuel":
//             console.log("Power Item");
//             break;
//         case "PowerTime":
//             console.log("Time Item");
//             break;
//     }
// }





/* ARRAY PRINCIPAL CON TODOS LOS OBJETOS DE JUEGO*/

const masterItem = [{
        imgSrc: "./img/wheel_0.webp",
        name: "wheel",
        type: "Item",
        piece: [
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { ID: "Wheel1", img: "./img/wheel_1.webp" },
            { ID: "Wheel2", img: "./img/wheel_2.webp" },
            { ID: "Wheel3", img: "./img/wheel_3.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" }
        ]
    }, {
        imgSrc: "./img/shovel_0.webp",
        name: "Shovel",
        type: "Item",
        piece: [
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { ID: "Shovel1", img: "./img/shovel_1.webp" },
            { ID: "Shovel2", img: "./img/shovel_2.webp" },
            { ID: "Shovel3", img: "./img/shovel_3.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" }
        ]
    }, {
        imgSrc: "./img/bone_0.webp",
        name: "Bone",
        type: "Item",
        piece: [
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { ID: "Bone1", img: "./img/bone_1.webp" },
            { ID: "Bone2", img: "./img/bone_2.webp" },
            { ID: "Bone3", img: "./img/bone_3.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" }
        ]
    }, {
        imgSrc: "./img/power_timer.webp",
        name: "timer",
        type: "Power",
        piece: [
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { ID: "PowerTime", img: "./img/power_timer.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" }
        ]
    },
    {
        imgSrc: "./img/power_fuel.webp",
        name: "Fuel",
        type: "Power",
        piece: [
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { ID: "PowerFuel", img: "./img/power_fuel.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" },
            { img: "./img/question_01.webp" }
        ]
    }
];

//Matrix de posiciones en las cuatro posibilidades de rotacion
const defaultLocation = [
    [{ pos: { x: -1, y: -1 } }, { pos: { x: -1, y: 0 } }, { pos: { x: -1, y: 1 } },
        { pos: { x: 0, y: -1 } }, { pos: { x: 0, y: 0 } }, { pos: { x: 0, y: 1 } },
        { pos: { x: 1, y: -1 } }, { pos: { x: 1, y: 0 } }, { pos: { x: 1, y: 1 } }
    ],
    [{ pos: { x: -1, y: 1 } }, { pos: { x: 0, y: 1 } }, { pos: { x: 1, y: 1 } },
        { pos: { x: -1, y: 0 } }, { pos: { x: 0, y: 0 } }, { pos: { x: 1, y: 0 } },
        { pos: { x: -1, y: -1 } }, { pos: { x: 0, y: -1 } }, { pos: { x: 1, y: -11 } }
    ],
    [{ pos: { x: 1, y: -1 } }, { pos: { x: 0, y: -1 } }, { pos: { x: -1, y: -1 } },
        { pos: { x: 1, y: 0 } }, { pos: { x: 0, y: 0 } }, { pos: { x: -1, y: 0 } },
        { pos: { x: 1, y: 1 } }, { pos: { x: 0, y: 1 } }, { pos: { x: -1, y: 1 } }
    ],
    [{ pos: { x: 1, y: 1 } }, { pos: { x: 1, y: 0 } }, { pos: { x: 1, y: -1 } },
        { pos: { x: 0, y: 1 } }, { pos: { x: 0, y: 0 } }, { pos: { x: 0, y: -1 } },
        { pos: { x: -1, y: 1 } }, { pos: { x: -1, y: 0 } }, { pos: { x: -1, y: -1 } }
    ]
];
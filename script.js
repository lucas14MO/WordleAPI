const h1 = document.getElementById("titulo"); 
const buttons = document.getElementById("buttons");
const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const GRID = document.getElementById("grid");
const tituloIntentos = document.getElementById("intentos");

let intentos = 5;
//const diccionario = ["LUCAS", "PERRO", "SILLA", "PLAYA", "NIEVE", "VERDE", "CIELO", "PAPAS", "GATOS", "COFRE", "TUNEL", "COBRE"];
//const ran = Math.floor(Math.random() * (diccionario.length));
let palabra; // = diccionario[ran];
const valor = input.value;

async function RandomWord(){
    const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
    const data = await response.json();
    return data[0];
}

async function SetWord(){
    let word = ""; 
    while(word.length != 5)
        word = await RandomWord();
    return word;
}

async function init(){
    console.log('Esto se ejecuta solo cuando se carga la pagina web');
    palabra = (await SetWord() ).toUpperCase();
    //console.log(palabra, typeof palabra);
}

window.addEventListener('load', init);

function Intentar(){
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i]===palabra[i]){ //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {      //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
	intentos--
    tituloIntentos.textContent = "Intentos: " + intentos + "/5";
    tituloIntentos.style.color = (intentos > 3 ? "#70e000" : ( intentos > 2? "#d4d700" : "#ff1717"));

    if (INTENTO === palabra ) {
        terminar("<h1>GANASTE!😀</h1>")
        return
    }
    if (intentos==0){
        terminar("<h1>PERDISTE!😖</h1>")
    }
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;

    const reset = document.createElement('button');
        reset.id = "reset";
        reset.innerHTML = "Reiniciar";
        buttons.appendChild(reset);
        reset.onclick = function() {
            location.reload();
        }
}


function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    
    if(intento.length < 5){
        for(let i = intento.length; i < 5; i++){
            intento += "-";
        }
    }
    else if(intento.length < 5) intento = intento.substring(0, 5);

    intento = intento.toUpperCase(); 
    return intento;
}

button.addEventListener(
    "click",
    Intentar
);

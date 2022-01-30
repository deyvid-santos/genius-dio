//main app
let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde, 1 - vermelho, 2 - amarelo, 3 - azul

const blue = document.querySelector('.azul');
const red = document.querySelector('.vermelho');
const green = document.querySelector('.verde');
const yellow = document.querySelector('.amarelo');

//Sorteio
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4); //0 á 3 <linha 6>
    order[order.length] = colorOrder;
    clickedOrder = [];

    //Ordem de cores
    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//Acende a próxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(()=> {
        element.classList.add('selected');
    }, number - 250);

    //Remover cor
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

//Checagem dos Clicks
let checkOrder = () =>{
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]){ //Se o click não estiver na ordem esperada do jogo, perdeu
            gameOver();
            break;
        }
    }

    //Se estiver na ordem, vá para o próximo nível
    if (clickedOrder.length == order.length){
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//Cliques do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

//Retorno das cores <linha 6>
let createColorElement = (color) =>{
    if (color == 0){
        return green;
    } else if (color == 1){
        return red;
    } else if (color == 2){
        return yellow;
    } else if (color == 3){
        return blue;
    }
}

//Próximo nível do jogo
let nextLevel = () =>{
    score++;
    shuffleOrder();
}

//Game Over
let gameOver = () =>{
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//Novo Jogo
let playGame = () => {
    alert('Bem-vindo ao Genius! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

/* Event Listeners
green.addEventListener('click',click(0));
red.addEventListener('click',click(1));
yellow.addEventListener('click',click(2));
blue.addEventListener('click',click(3)); */

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();
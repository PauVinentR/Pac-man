document.addEventListener("DOMContentLoaded", () => {



    const scoreDisplay = document.getElementById("score");
    const levelDisplay = document.getElementById("level");
    const vidasDisplay = document.getElementById("vidas");
    let grid = document.querySelector('.grid');
    const width = 28;
    let button = document.getElementById("btn");
    let btn = document.getElementById("start");

    let score = 0;
    let countball = 0;
    let win = false;
    let vidas = 3;
    let vic1 = false;
    let vic2 = false;
    let vic3 = false;

    var img = new Image();
    img.src = "IMG/victory.jpg";

    var img2 = new Image();
    img2.src = "IMG/lose.jpg";


    var sound1 = new Howl({
        src: ['audio/die.mp3'],
        loop: true
    });
    var sound2 = new Howl({
        src: ['audio/play.mp3']

    });


    // 0 - punts
    // 1 - paret
    // 2 - fantasma
    // 3 - poder
    // 4 - buit


    /*
    Coses a fer: 
    1. Game Over: 
            punts --> 0 (FET)
            tornar a començar (FET)
                
    2. Botó: reinici --> tornar a començar (FET)
        
    3. Guanyar: 
            mapes nou ()
                Falta que es borri el mapa de baix
            level up (FET) 
            score (FET)
            3 pantalles (FET)
    */

    const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 4, 4, 1, 1, 4, 4, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 4, 4, 4, 4, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1,
        4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

    const layout2 = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 4, 4, 1, 1, 4, 4, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 4, 4, 4, 4, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 0, 0, 0, 0, 0, 0, 1,
        4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

    const layout3 = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        4, 4, 1, 1, 0, 0, 0, 1, 1, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 1, 1, 0, 0, 0, 1, 1, 4, 4,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1,
        1, 3, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 3, 1,
        1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

    const cuadrados = [];
    let level;

    function createBoard(level) {
        sound1.play();

        if (level == 1) {
            for (let i = 0; i < layout.length; i++) {
                const cuadro = document.createElement('div');
                cuadro.id = i;
                grid.appendChild(cuadro);
                cuadrados.push(cuadro);

                if (layout[i] === 0) {
                    cuadrados[i].classList.add('punts');
                }
                if (layout[i] === 1) {
                    cuadrados[i].classList.add('paret');
                }
                if (layout[i] === 3) {
                    cuadrados[i].classList.add('poder');
                }
                if (layout[i] === 4) {
                    cuadrados[i].classList.add('buit');
                }
            }
            level = 1;
            levelDisplay.innerHTML = level;
            vidasDisplay.innerHTML = vidas;
            scoreDisplay.innerHTML = score;
            vic1 = true;
        }
        if (level == 2) {
            for (let i = 0; i < layout2.length; i++) {
                const cuadro2 = document.createElement('div');
                cuadro2.id = i;
                grid.appendChild(cuadro2);
                cuadrados.push(cuadro2);

                if (layout2[i] === 0) {
                    cuadrados[i].classList.add('punts');
                }
                if (layout2[i] === 1) {
                    cuadrados[i].classList.add('paret');
                }
                if (layout2[i] === 3) {
                    cuadrados[i].classList.add('poder');
                }
                if (layout2[i] === 4) {
                    cuadrados[i].classList.add('buit');
                }
            }
            level = 2;
            levelDisplay.innerHTML = level;
            vidasDisplay.innerHTML = vidas;
            scoreDisplay.innerHTML = score;
            vic2 = true;
        }
        if (level == 3) {
            for (let i = 0; i < layout3.length; i++) {
                const cuadro3 = document.createElement('div');
                cuadro3.id = i;
                grid.appendChild(cuadro3);
                cuadrados.push(cuadro3);

                if (layout3[i] === 0) {
                    cuadrados[i].classList.add('punts');
                }
                if (layout3[i] === 1) {
                    cuadrados[i].classList.add('paret');
                }
                if (layout3[i] === 3) {
                    cuadrados[i].classList.add('poder');
                }
                if (layout3[i] === 4) {
                    cuadrados[i].classList.add('buit');
                }
            }
            level = 3;
            levelDisplay.innerHTML = level;
            vidasDisplay.innerHTML = vidas;
            scoreDisplay.innerHTML = score;
            vic3 = true;
        }
        victory();
    }

    createBoard(1);

    //Create pac-man

    let pacmanIndex = 489;
    let direccioP = true;
    cuadrados[pacmanIndex].classList.add('pacman1');

    function movePacman(tecla) {

        cuadrados[pacmanIndex].classList.remove('pacman');
        if (direccioP) {
            cuadrados[pacmanIndex].classList.remove('pacman1');
        } else {
            cuadrados[pacmanIndex].classList.remove('pacman2');
        }

        if (tecla.key == 'w' && !cuadrados[pacmanIndex - width].classList.contains('paret')) {
            pacmanIndex -= width;
            cuadrados[pacmanIndex].classList.add('pacman1');
            direccioP = true;
        }
        if (tecla.key == 's' && !cuadrados[pacmanIndex + width].classList.contains('paret')) {
            pacmanIndex += width;
            cuadrados[pacmanIndex].classList.add('pacman1');
            direccioP = true;
        }
        if (tecla.key == 'a' && !cuadrados[pacmanIndex - 1].classList.contains('paret')) {
            pacmanIndex -= 1;
            if (pacmanIndex == 392) {
                pacmanIndex = 419;
            }
            cuadrados[pacmanIndex].classList.add('pacman1');
            direccioP = true;
        }
        if (tecla.key == 'd' && !cuadrados[pacmanIndex + 1].classList.contains('paret')) {
            pacmanIndex += 1;
            if (pacmanIndex == 419) {
                pacmanIndex = 392;
            }
            cuadrados[pacmanIndex].classList.add('pacman2');
            direccioP = false;
        }

        cuadrados[pacmanIndex].classList.add('pacman');



        points();
        superPower();
        gameOver();
    }

    function points() {
        if (cuadrados[pacmanIndex].classList.contains('punts')) {
            score++;
            scoreDisplay.innerHTML = score;
            cuadrados[pacmanIndex].classList.remove('punts');
            cuadrados[pacmanIndex].classList.add('buit');
            countball++;
            victory();
        }
    }

    function superPower() {
        if (cuadrados[pacmanIndex].classList.contains('poder')) {
            score += 10;
            scoreDisplay.innerHTML = score;

            ghosts.forEach(ghost => ghost.asustat = true);
            setTimeout(relax, 10000);

            cuadrados[pacmanIndex].classList.remove('poder');
            cuadrados[pacmanIndex].classList.add('buit');
            countball++;
            victory();
        }

    }

    function relax() {
        ghosts.forEach(ghost => ghost.asustat = false);
    }

    function inicializar() {

        createBoard(1);

        if (direccioP == true) {
            cuadrados[pacmanIndex].classList.remove('pacman');
        }
        if (direccioP == false) {
            cuadrados[pacmanIndex].classList.remove('pacman');
        }
        pacmanIndex = 489;
        direccioP = true;
        cuadrados[pacmanIndex].classList.add('pacman');
        document.addEventListener('keydown', movePacman);


        ghosts = [
            new Ghost('fantasma1', 377, 500),
            new Ghost('fantasma2', 378, 700),
            new Ghost('fantasma3', 405, 400),
            new Ghost('fantasma4', 406, 300),
        ]
        ghosts.forEach(ghost => {
            cuadrados[ghost.ghostIndex].classList.add(ghost.className);
            cuadrados[ghost.ghostIndex].classList.add('ghost');
        });

        ghosts.forEach(ghost => moveGhost(ghost));

        moveGhost();
    }

    function restart() {
        alert("You've decided to start again")
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keydown', movePacman);

        if (direccioP) {
            cuadrados[pacmanIndex].classList.remove('pacman1');
        } else {
            cuadrados[pacmanIndex].classList.remove('pacman2');
        }

        ghosts.forEach(ghost => {
            cuadrados[ghost.ghostIndex].classList.remove(ghost.className);
            cuadrados[ghost.ghostIndex].classList.remove('ghost');
        });

        level = 1;
        score = 0;
        countball = 0;
        vidas = 3;
        scoreDisplay.innerHTML = score;
        vidasDisplay.innerHTML = vidas;

        cuadrados.forEach(c => c.classList = "")

        createBoard(1);

        if (direccioP == true) {
            cuadrados[pacmanIndex].classList.remove('pacman');
        }
        if (direccioP == false) {
            cuadrados[pacmanIndex].classList.remove('pacman');
        }

        pacmanIndex = 489;
        direccioP = true;
        cuadrados[pacmanIndex].classList.add('pacman');
        document.addEventListener('keydown', movePacman);


        ghosts = [
            new Ghost('fantasma1', 377, 500),
            new Ghost('fantasma2', 378, 700),
            new Ghost('fantasma3', 405, 400),
            new Ghost('fantasma4', 406, 300),
        ]
        ghosts.forEach(ghost => {
            cuadrados[ghost.ghostIndex].classList.add(ghost.className);
            cuadrados[ghost.ghostIndex].classList.add('ghost');
        });

        ghosts.forEach(ghost => moveGhost(ghost));

        moveGhost();
    }

    function start() {
        window.location.reload();
    }


    class Ghost {
        constructor(className, startIndex, vel) {
            this.className = className;
            this.startIndex = startIndex;
            this.vel = vel;
            this.ghostIndex = startIndex;
            this.asustat = false;
            this.timerId = NaN;
        }
    }

    ghosts = [
        new Ghost('fantasma1', 377, 500),
        new Ghost('fantasma2', 378, 700),
        new Ghost('fantasma3', 405, 400),
        new Ghost('fantasma4', 406, 300),
    ]

    console.log(ghosts);

    ghosts.forEach(ghost => {
        cuadrados[ghost.ghostIndex].classList.add(ghost.className);
        cuadrados[ghost.ghostIndex].classList.add('ghost');
    });

    ghosts.forEach(ghost => moveGhost(ghost));

    function moveGhost(ghost) {
        const directions = [-1, 1, width, -width];

        let direction = directions[Math.floor(Math.random() * directions.length)];
        ghost.timerId = setInterval(function () {

            if (!cuadrados[ghost.ghostIndex + direction].classList.contains('paret')
                && !cuadrados[ghost.ghostIndex + direction].classList.contains('ghost')) {
                cuadrados[ghost.ghostIndex].classList.remove(ghost.className, 'ghost', 'fantasma-asustat');
                ghost.ghostIndex += direction
                cuadrados[ghost.ghostIndex].classList.add(ghost.className, 'ghost');
            } else {
                direction = directions[Math.floor(Math.random() * directions.length)];
            }

            if (ghost.asustat) {
                cuadrados[ghost.ghostIndex].classList.add(ghost.className, 'fantasma-asustat');
            }

            if (ghost.asustat && cuadrados[ghost.ghostIndex].classList.contains('pacman')) {
                cuadrados[ghost.ghostIndex].classList.remove('fantasma-asustat', 'ghost', ghost.className);
                ghost.ghostIndex = ghost.startIndex;
                ghost.asustat = false;
                score += 100;
                scoreDisplay.innerHTML = score;
                cuadrados[ghost.ghostIndex].classList.add('ghost', ghost.className);
            }
        }, ghost.vel)

        gameOver();
    }

    function gameOver() {

        if (vidas == 0) {
            sound2.play();

            cuadrados.forEach(c => c.classList = "");

            grid.classList.add('img2');

            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keydown', movePacman);

            if (direccioP) {
                cuadrados[pacmanIndex].classList.remove('pacman1');
            } else {
                cuadrados[pacmanIndex].classList.remove('pacman2');
            }

            ghosts.forEach(ghost => {
                cuadrados[ghost.ghostIndex].classList.remove(ghost.className);
                cuadrados[ghost.ghostIndex].classList.remove('ghost');
            });

            cuadrados[pacmanIndex].classList.remove('pacman');


        } else {
            if (cuadrados[pacmanIndex].classList.contains('ghost')
                && !cuadrados[pacmanIndex].classList.contains('fantasma-asustat')) {
                
                sound2.play();

                ghosts.forEach(ghost => clearInterval(ghost.timerId))
                document.removeEventListener('keydown', movePacman);

                cuadrados.forEach(c => c.classList = "");

                countball = 0;

                setTimeout(function () {
                    alert("You've died");
                    score = 0;
                    scoreDisplay.innerHTML = score;
                    inicializar();
                }, 500)

                if (direccioP) {
                    cuadrados[pacmanIndex].classList.remove('pacman1');
                } else {
                    cuadrados[pacmanIndex].classList.remove('pacman2');
                }

                ghosts.forEach(ghost => {
                    cuadrados[ghost.ghostIndex].classList.remove(ghost.className);
                    cuadrados[ghost.ghostIndex].classList.remove('ghost');
                });

                vidas--;
                vidasDisplay.innerHTML = vidas;
            }

        }
    }

    function victory() {

        if (vic1 == true && countball == 238) {

            setTimeout(function () {
                alert("Congratulations, now you are starting level 2");
            }, 500);

            countball = 0;
            vic1 = false;
            level = 2;
            levelDisplay.innerHTML = level;
            win = false;

            cuadrados.forEach(c => c.classList = "")

            setTimeout(function () {
                createBoard(2);
            }, 400);

            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keydown', movePacman);

            if (direccioP) {
                cuadrados[pacmanIndex].classList.remove('pacman1');
            } else {
                cuadrados[pacmanIndex].classList.remove('pacman2');
            }

            ghosts.forEach(ghost => {
                cuadrados[ghost.ghostIndex].classList.remove(ghost.className);
                cuadrados[ghost.ghostIndex].classList.remove('ghost');
            });

            if (direccioP == true) {
                cuadrados[pacmanIndex].classList.remove('pacman');
            }
            if (direccioP == false) {
                cuadrados[pacmanIndex].classList.remove('pacman');
            }
            pacmanIndex = 489;
            direccioP = true;
            cuadrados[pacmanIndex].classList.add('pacman');
            document.addEventListener('keydown', movePacman);


            ghosts = [
                new Ghost('fantasma1', 377, 500),
                new Ghost('fantasma2', 378, 700),
                new Ghost('fantasma3', 405, 400),
                new Ghost('fantasma4', 406, 300),
            ]
            ghosts.forEach(ghost => {
                cuadrados[ghost.ghostIndex].classList.add(ghost.className);
                cuadrados[ghost.ghostIndex].classList.add('ghost');
            });

            ghosts.forEach(ghost => moveGhost(ghost));

            moveGhost();
        }

        if (vic2 == true && countball == 242) {

            alert("Congratulations, now you are starting last level");

            countball = 0;
            vic2 = false;
            level = 3;
            levelDisplay.innerHTML = level;
            win = false;

            cuadrados.forEach(c => c.classList = "")

            createBoard(3);

            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keydown', movePacman);

            if (direccioP) {
                cuadrados[pacmanIndex].classList.remove('pacman1');
            } else {
                cuadrados[pacmanIndex].classList.remove('pacman2');
            }

            ghosts.forEach(ghost => {
                cuadrados[ghost.ghostIndex].classList.remove(ghost.className);
                cuadrados[ghost.ghostIndex].classList.remove('ghost');
            });

            if (direccioP == true) {
                cuadrados[pacmanIndex].classList.remove('pacman');
            }
            if (direccioP == false) {
                cuadrados[pacmanIndex].classList.remove('pacman');
            }
            pacmanIndex = 489;
            direccioP = true;
            cuadrados[pacmanIndex].classList.add('pacman');
            document.addEventListener('keydown', movePacman);


            ghosts = [
                new Ghost('fantasma1', 377, 500),
                new Ghost('fantasma2', 378, 700),
                new Ghost('fantasma3', 405, 400),
                new Ghost('fantasma4', 406, 300),
            ]
            ghosts.forEach(ghost => {
                cuadrados[ghost.ghostIndex].classList.add(ghost.className);
                cuadrados[ghost.ghostIndex].classList.add('ghost');
            });

            ghosts.forEach(ghost => moveGhost(ghost));

            moveGhost();
        }

        if (vic3 == true && countball == 274) {

            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keydown', movePacman);

            alert("You've won");
            sound1.pause();

            cuadrados.forEach(c => c.classList = "")

            grid.classList.add('img');
        }
    }

    document.addEventListener('keyup', movePacman);

    button.addEventListener('click', restart);
    btn.addEventListener('click', start);

});
// ========================================
// CONFIGURAÇÃO DAS FASES
// ========================================

const phases = [

{
    title:"Onde Tudo Começou ❤️",
    subtitle:"HOPE",
    image:"img/foto1.jpg",

    message:

`Tudo começou quando dois aprendizes se encontraram na HOPE.

Eu cuidava das máquinas.

E você costurava com tanto amor e dedicação.

O que eu não pensava era que aquela aprendiz se tornaria a pessoa mais importante da minha vida.`
},

{
    title:"❤️ Nosso dia ❤️",
    subtitle:"Fortaleza",

    image:"img/foto2.jpg",

    message:

`O Pedido.

Um sorriso aqui e outro ali, fui conquistando seu coração.

E foi então que nesse dia tão especial, em Fortaleza, eu te pedi em namoro.

A decisão mais especial da minha vida.

E o melhor de tudo é que cada dia ao seu lado é uma nova aventura.

Percebi que qualquer aventura fica melhor ao seu lado, princesa.`
},

{
    title:"Nós ❤️",

    subtitle:"Nossa História",

    image:"img/foto3.jpg",

    message:

`Cada conversa.

Cada abraço.

Cada sorriso.

Cada momento ao seu lado me faz ter certeza de que escolhi a pessoa certa.`
}

];

// ========================================
// ELEMENTOS
// ========================================

let currentPhase = 0;

const board =
document.getElementById("puzzleBoard");

const progress =
document.getElementById("progressBar");

// ========================================
// DIAS JUNTOS
// ========================================

function updateCounter(){

    const start =
    new Date("2025-02-15");

    const today =
    new Date();

    const days =
    Math.floor(
    (today-start) /
    (1000*60*60*24)
    );

    document.getElementById("counter")
    .innerHTML =

    `❤️ ${days} dias ao lado da minha princesinhaaa ❤️`;

    document.getElementById("finalCounter")
    .innerHTML =

    `❤️ ${days} dias construindo nossa história ❤️`;
}

updateCounter();

// ========================================
// PARTÍCULAS
// ========================================

function createParticles(){

    const container =
    document.getElementById("particles");

    for(let i=0;i<60;i++){

        const p =
        document.createElement("div");

        p.classList.add("particle");

        p.style.left =
        Math.random()*100 + "vw";

        p.style.animationDuration =
        (10 + Math.random()*15) + "s";

        p.style.opacity =
        Math.random();

        container.appendChild(p);

    }

}

createParticles();

// ========================================
// TROCAR TELA
// ========================================

function showScreen(id){

    document
    .querySelectorAll(".screen")
    .forEach(screen=>{

        screen.classList
        .remove("active");

    });

    document
    .getElementById(id)
    .classList
    .add("active");
}

// ========================================
// INÍCIO
// ========================================

document
.getElementById("startBtn")
.onclick = ()=>{

    const music =
    document.getElementById("bgMusic");

    music.play()
    .catch(()=>{});

    loadPuzzle();

    showScreen("puzzleScreen");

};

// ========================================
// PUZZLE 3x4
// ========================================

const COLS = 3;
const ROWS = 4;

let dragged = null;

function loadPuzzle(){

    board.innerHTML = "";

    const phase =
    phases[currentPhase];

    document
    .getElementById("phaseTitle")
    .innerText =
    phase.title;

    document
    .getElementById("phaseSubtitle")
    .innerText =
    phase.subtitle;

    progress.style.width =
    ((currentPhase+1)/3)*100 + "%";

    let pieces = [];

    for(let i=0;i<12;i++){

        pieces.push(i);

    }

    pieces.sort(
    ()=>Math.random()-0.5
    );

    pieces.forEach(pieceIndex=>{

        const piece =
        document.createElement("div");

        piece.classList
        .add("piece");

        piece.draggable = true;

        piece.dataset.correct =
        pieceIndex;

        piece.style.backgroundImage =
        `url(${phase.image})`;

        piece.style.backgroundSize =
        `300% 400%`;

        const x =
        pieceIndex % COLS;

        const y =
        Math.floor(
        pieceIndex/COLS
        );

        piece.style.backgroundPosition =

        `${x*50}% ${y*33.33}%`;

        piece.addEventListener(
        "dragstart",
        dragStart
        );

        piece.addEventListener(
        "dragover",
        dragOver
        );

        piece.addEventListener(
        "drop",
        dropPiece
        );

        board.appendChild(piece);

    });

}

function dragStart(){

    dragged = this;

    this.classList.add(
    "dragging"
    );

}

function dragOver(e){

    e.preventDefault();

}

function dropPiece(){

    if(
    !dragged ||
    dragged===this
    ) return;

    const bg1 =
    dragged.style.backgroundPosition;

    const bg2 =
    this.style.backgroundPosition;

    dragged.style.backgroundPosition =
    bg2;

    this.style.backgroundPosition =
    bg1;

    const c1 =
    dragged.dataset.correct;

    const c2 =
    this.dataset.correct;

    dragged.dataset.correct =
    c2;

    this.dataset.correct =
    c1;

    dragged.classList.remove(
    "dragging"
    );

    checkPuzzle();

}

// ========================================
// VERIFICA
// ========================================

function checkPuzzle(){

    const pieces =
    [...document.querySelectorAll(".piece")];

    let correct = true;

    pieces.forEach((piece,index)=>{

        if(
        Number(
        piece.dataset.correct
        ) !== index
        ){

            correct = false;

        }

    });

    if(correct){

        setTimeout(()=>{

            document
            .getElementById(
            "messageTitle"
            ).innerText =
            phases[currentPhase]
            .title;

            document
            .getElementById(
            "messageText"
            ).innerText =
            phases[currentPhase]
            .message;

            showScreen(
            "messageScreen"
            );

        },500);

    }

}

// ========================================
// CONTINUAR
// ========================================

document
.getElementById("continueBtn")
.onclick = ()=>{

    currentPhase++;

    if(
    currentPhase <
    phases.length
    ){

        loadPuzzle();

        showScreen(
        "puzzleScreen"
        );

    }else{

        showScreen(
        "galleryScreen"
        );

    }

};

// ========================================
// CARTA
// ========================================

document
.getElementById("letterBtn")
.onclick = ()=>{

    showScreen(
    "letterScreen"
    );

    writeLetter();

};

function writeLetter(){

const text =

`Letícia, meu amor.
Quando te conheci na HOPE, jamais imaginei que aquela aprendiz de costureira se tornaria a pessoa mais importante da minha vida.
Desde então construímos nossa história peça por peça.
Tivemos viagens, risadas, desafios e até alguns perrengues que hoje nos fazem sorrir.
Não sou muito bom com palavras, mas quero que saiba o quanto sou grato por cada momento ao seu lado.
Você é meu amoozi.
Você é minha Pincesa.
Obrigado por cada abraço.
Obrigado por cada sorriso.
Obrigado por existir.
Feliz Dia dos Namorados ❤️

Eu te amo.`;

const target =
document.getElementById(
"typedLetter"
);

target.innerHTML = "";

let i=0;

const timer =
setInterval(()=>{

target.innerHTML +=
text.charAt(i);

i++;

if(
i>=text.length
){

clearInterval(timer);

}

},30);

}

// ========================================
// VIDEO
// ========================================

document
.getElementById("videoBtn")
.onclick = ()=>{

showScreen(
"videoScreen"
);

};

// ========================================
// FINAL
// ========================================

document
.getElementById("finalBtn")
.onclick = ()=>{

showScreen(
"finalScreen"
);

startHearts();

startSlideshow();

};

// ========================================
// SLIDESHOW
// ========================================

function startSlideshow(){

const photos = [

"img/foto1.jpg",
"img/foto2.jpg",
"img/foto3.jpg",
"img/foto4.jpg"

];

let index = 0;

const img =
document.getElementById(
"slideImage"
);

setInterval(()=>{

index++;

if(
index>=photos.length
){

index=0;

}

img.src =
photos[index];

},3000);

}

// ========================================
// CORAÇÕES
// ========================================

function startHearts(){

setInterval(()=>{

const heart =
document.createElement(
"div"
);

heart.classList.add(
"heart"
);

heart.innerHTML =
"❤️";

heart.style.left =
Math.random()*100
+ "vw";

heart.style.animationDuration =
(3+Math.random()*4)
+ "s";

document.body
.appendChild(heart);

setTimeout(()=>{

heart.remove();

},7000);

},250);

}
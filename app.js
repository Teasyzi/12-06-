// =============================
// CONFIGURAÇÕES
// =============================

const phases = [
{
    title: "Onde Tudo Começou ❤️",
    subtitle: "HOPE",
    image: "img/foto1.jpg",
    message: `Tudo começou quando dois aprendizes se encontraram na HOPE.

Eu cuidava das máquinas.

Você transformava tecidos em algo especial.

O que eu não imaginava era que encontraria alguém capaz de transformar também a minha vida.`
},
{
    title: "Nossa Primeira Aventura ❤️",
    subtitle: "Fortaleza",
    image: "img/foto2.jpg",
    message: `Nossa primeira viagem juntos.

Entre risadas, momentos inesquecíveis e até o perrengue tentando voltar porque o metrô estava fechado...

Percebi que qualquer aventura fica melhor ao seu lado, Mozin.`
},
{
    title: "Nós ❤️",
    subtitle: "Nossa História",
    image: "img/foto3.jpg",
    message: `Cada conversa.

Cada abraço.

Cada sorriso.

Cada momento ao seu lado me faz ter certeza de que escolhi a pessoa certa.`
}
];

// =============================
// ELEMENTOS
// =============================

const screens = {
    home: document.getElementById("home"),
    puzzle: document.getElementById("puzzleScreen"),
    message: document.getElementById("messageScreen"),
    gallery: document.getElementById("galleryScreen"),
    letter: document.getElementById("letterScreen"),
    video: document.getElementById("videoScreen"),
    final: document.getElementById("finalScreen")
};

const board = document.getElementById("puzzleBoard");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

let currentPhase = 0;

// =============================
// CONTADOR DE DIAS
// =============================

function updateDaysCounter() {

    const startDate = new Date("2025-02-15");
    const today = new Date();

    const diff =
        Math.floor(
            (today - startDate) /
            (1000 * 60 * 60 * 24)
        );

    document.getElementById("daysCounter").innerHTML = `
        ❤️ Estamos construindo nossa história há
        <h2>${diff} dias</h2>
        ❤️ E ainda estamos escrevendo os melhores capítulos.
    `;

    document.getElementById("finalDays").innerHTML =
        `❤️ ${diff} dias ao lado da minha Mozin ❤️`;
}

updateDaysCounter();

// =============================
// TROCAR TELA
// =============================

function showScreen(screenId){

    document
        .querySelectorAll(".screen")
        .forEach(screen =>
            screen.classList.remove("active")
        );

    document
        .getElementById(screenId)
        .classList.add("active");
}

// =============================
// BOTÃO INICIAL
// =============================

document
.getElementById("startBtn")
.addEventListener("click", () => {

    const music =
        document.getElementById("music");

    music.play().catch(() => {});

    startPhase();

});

// =============================
// PUZZLE
// =============================

function startPhase(){

    showScreen("puzzleScreen");

    const phase = phases[currentPhase];

    document.getElementById("phaseTitle")
        .innerText = phase.title;

    document.getElementById("phaseSubtitle")
        .innerText = phase.subtitle;

    progressFill.style.width =
        ((currentPhase + 1) * 33) + "%";

    progressText.innerText =
        ((currentPhase + 1) * 33) + "%";

    createPuzzle(phase.image);
}

// =============================
// CRIAÇÃO DO PUZZLE
// =============================

let draggedPiece = null;

function createPuzzle(image){

    board.innerHTML = "";

    let positions = [];

    for(let i=0;i<9;i++){
        positions.push(i);
    }

    positions.sort(() => Math.random() - 0.5);

    positions.forEach(pos => {

        const piece =
            document.createElement("div");

        piece.classList.add("piece");

        piece.dataset.correct = pos;

        const x = pos % 3;
        const y = Math.floor(pos / 3);

        piece.style.backgroundImage =
            `url(${image})`;

        piece.style.backgroundPosition =
            `${-x*120}px ${-y*120}px`;

        piece.draggable = true;

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

    draggedPiece = this;

    setTimeout(() => {
        this.classList.add("dragging");
    },0);

}

function dragOver(e){
    e.preventDefault();
}

function dropPiece(){

    if(!draggedPiece) return;

    const tempBg =
        this.style.backgroundPosition;

    this.style.backgroundPosition =
        draggedPiece.style.backgroundPosition;

    draggedPiece.style.backgroundPosition =
        tempBg;

    const tempCorrect =
        this.dataset.correct;

    this.dataset.correct =
        draggedPiece.dataset.correct;

    draggedPiece.dataset.correct =
        tempCorrect;

    draggedPiece.classList.remove(
        "dragging"
    );

    draggedPiece = null;

    checkPuzzle();
}

// =============================
// VERIFICAR PUZZLE
// =============================

function checkPuzzle(){

    const pieces =
        document.querySelectorAll(".piece");

    let correct = 0;

    pieces.forEach((piece,index)=>{

        if(
            parseInt(piece.dataset.correct)
            === index
        ){
            correct++;
        }

    });

    if(correct === 9){

        setTimeout(()=>{

            document.getElementById(
                "messageTitle"
            ).innerText =
                phases[currentPhase].title;

            document.getElementById(
                "messageText"
            ).innerText =
                phases[currentPhase].message;

            showScreen("messageScreen");

        },500);

    }

}

// =============================
// CONTINUAR
// =============================

document
.getElementById("continueBtn")
.addEventListener("click",()=>{

    currentPhase++;

    if(currentPhase < phases.length){

        startPhase();

    }else{

        showScreen("galleryScreen");

    }

});

// =============================
// CARTA
// =============================

document
.getElementById("letterBtn")
.addEventListener("click",()=>{

    showScreen("letterScreen");

    typeLetter();

});

function typeLetter(){

    const text =

`Meu amor, Letícia.

Quando te conheci na HOPE, eu jamais imaginaria que aquela aprendiz de costureira se tornaria a pessoa mais importante da minha vida.

Desde então construímos nossa história peça por peça.

Tivemos viagens, risadas, desafios e até alguns perrengues que hoje nos fazem sorrir quando lembramos.

Você é minha Mozin, minha Pincesa e minha melhor companhia para qualquer aventura.

Obrigado por cada momento.

Obrigado por cada apoio.

Obrigado por cada sorriso.

Desde 15 de fevereiro de 2025 estamos construindo algo lindo juntos.

E isso é apenas o começo.

Feliz Dia dos Namorados ❤️

Eu te amo.`;

    const target =
        document.getElementById(
            "typedLetter"
        );

    target.innerHTML = "";

    let i = 0;

    const interval =
        setInterval(()=>{

        target.innerHTML +=
            text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(interval);

        }

    },35);

}

// =============================
// VIDEO
// =============================

document
.getElementById("videoBtn")
.addEventListener("click",()=>{

    showScreen("videoScreen");

});

// =============================
// FINAL
// =============================

document
.getElementById("finalBtn")
.addEventListener("click",()=>{

    showScreen("finalScreen");

    startHearts();

});

// =============================
// CHUVA DE CORAÇÕES
// =============================

function startHearts(){

    const container =
        document.getElementById(
            "heart-container"
        );

    setInterval(()=>{

        const heart =
            document.createElement("div");

        heart.classList.add("heart");

        heart.innerHTML = "❤️";

        heart.style.left =
            Math.random()*100 + "vw";

        heart.style.animationDuration =
            (3 + Math.random()*3) + "s";

        container.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },6000);

    },250);

}
/* =====================================================
   MÁQUINA DOS GALOS
===================================================== */


/*
    TODAS AS IMAGENS DOS GALOS
*/

const roosterImages = [

    "images/imagem_2026-10-06_174416040.png",

    "images/imagem_2026-10-06_174425646.png",

    "images/imagem_2026-10-06_174430993.png",

    "images/imagem_2026-10-06_174437195.png",

    "images/imagem_2026-10-06_174445406.png",

    "images/imagem_2026-10-06_174451959.png",

    "images/imagem_2026-10-06_174457945.png",

    "images/imagem_2026-10-06_174504111.png",

    "images/imagem_2026-10-06_174509348.png",

    "images/imagem_2026-10-06_174515420.png"

];


/* ELEMENTOS DA MÁQUINA */

const slot1 = document.getElementById("slot1");

const slot2 = document.getElementById("slot2");

const slot3 = document.getElementById("slot3");

const slots = [
    slot1,
    slot2,
    slot3
];

const spinButton =
    document.getElementById("spinButton");

const resetButton =
    document.getElementById("resetButton");

const chipsDisplay =
    document.getElementById("chips");

const result =
    document.getElementById("machineResult");

const machine =
    document.querySelector(".rooster-machine");


/* =====================================================
   CONFIGURAÇÕES
===================================================== */

let chips = 4;

let spinning = false;


/*
    Tempo de giro de cada rolo.
    O segundo e terceiro param um pouco depois
    para dar aquele efeito de máquina.
*/

const spinTimes = [
    1200,
    1700,
    2200
];


/* =====================================================
   FUNÇÕES
===================================================== */


/*
    Escolhe uma imagem aleatória.
*/

function randomRooster() {

    const randomIndex =
        Math.floor(
            Math.random() * roosterImages.length
        );

    return randomIndex;
}


/*
    Atualiza o número de fichas na tela.
*/

function updateChips() {

    chipsDisplay.textContent = chips;

}


/*
    Mostra uma imagem no rolo.
*/

function setRooster(slot, index) {

    slot.src = roosterImages[index];

}


/*
    Coloca todos os rolos para girar.
*/

function startSpinning() {

    slots.forEach(slot => {

        slot.parentElement.classList.add("spinning");

    });

}


/*
    Para um determinado rolo.
*/

function stopSlot(slot, index) {

    slot.parentElement.classList.remove("spinning");

    setRooster(slot, index);

}


/*
    Sorteia os três resultados.
*/

function getResults() {

    return [

        randomRooster(),

        randomRooster(),

        randomRooster()

    ];

}


/*
    Verifica se os três galos são iguais.
*/

function isWinner(results) {

    return (
        results[0] === results[1] &&
        results[1] === results[2]
    );

}


/*
    Mostra mensagem de vitória.
*/

function showWin() {

    result.textContent =
        "🏆 TRÊS GALOS! VOCÊ GANHOU! 🐓";

    result.classList.remove("lose");

    result.classList.add("win");

    machine.classList.add("win-animation");


    setTimeout(() => {

        machine.classList.remove("win-animation");

    }, 700);


    /*
        Confetes simples
    */

    createConfetti();

}


/*
    Mostra mensagem de derrota.

    A pessoa não perde dinheiro.
    Ela apenas gastou uma das fichas virtuais.
*/

function showLose() {

    result.textContent =
        "🐓 NÃO FOI DESSA VEZ! TENTE NOVAMENTE!";

    result.classList.remove("win");

    result.classList.add("lose");

}


/*
    Quando as fichas acabam.
*/

function showNoChips() {

    result.textContent =
        "🎟️ SUAS FICHAS ACABARAM!";

    result.classList.remove("win");

    result.classList.add("lose");

}


/* =====================================================
   GIRAR
===================================================== */

function spin() {

    /*
        Evita clicar várias vezes enquanto
        a máquina ainda está girando.
    */

    if (spinning) {

        return;

    }


    /*
        Verifica se ainda existem fichas.
    */

    if (chips <= 0) {

        showNoChips();

        return;

    }


    spinning = true;

    spinButton.disabled = true;


    /*
        Remove mensagens anteriores.
    */

    result.classList.remove("win");

    result.classList.remove("lose");

    result.textContent = "🎰 GIRANDO...";


    /*
        Gasta uma ficha.
    */

    chips--;

    updateChips();


    /*
        Começa a animação.
    */

    startSpinning();


    /*
        Sorteia o resultado ANTES
        dos rolos pararem.
    */

    const results = getResults();


    /*
        Rolo 1
    */

    setTimeout(() => {

        stopSlot(slot1, results[0]);

    }, spinTimes[0]);


    /*
        Rolo 2
    */

    setTimeout(() => {

        stopSlot(slot2, results[1]);

    }, spinTimes[1]);


    /*
        Rolo 3
    */

    setTimeout(() => {

        stopSlot(slot3, results[2]);


        /*
            Agora que os três terminaram,
            verificamos o resultado.
        */

        if (isWinner(results)) {

            showWin();

        } else {

            showLose();

        }


        spinning = false;

        spinButton.disabled = false;


        /*
            Se acabaram as fichas,
            muda o botão.
        */

        if (chips === 0) {

            setTimeout(() => {

                if (!isWinner(results)) {

                    result.textContent =
                        "🎟️ SUAS FICHAS ACABARAM!";

                }

            }, 500);

        }

    }, spinTimes[2]);

}


/* =====================================================
   RESETAR FICHAS
===================================================== */

function resetGame() {

    /*
        Devolve as quatro fichas.
    */

    chips = 4;

    updateChips();


    /*
        Limpa o resultado.
    */

    result.textContent =
        "BOA SORTE! 🐓";

    result.classList.remove("win");

    result.classList.remove("lose");


    /*
        Ativa o botão.
    */

    spinButton.disabled = false;

    spinning = false;


    /*
        Coloca galos aleatórios
        novamente na máquina.
    */

    setRooster(
        slot1,
        randomRooster()
    );

    setRooster(
        slot2,
        randomRooster()
    );

    setRooster(
        slot3,
        randomRooster()
    );

}


/* =====================================================
   CONFETES
===================================================== */

function createConfetti() {

    const confettiCount = 35;


    for (let i = 0; i < confettiCount; i++) {

        const confetti =
            document.createElement("div");


        confetti.textContent =
            Math.random() > .5
                ? "🐓"
                : "🎉";


        confetti.style.position =
            "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top =
            "-30px";

        confetti.style.fontSize =
            (15 + Math.random() * 20) + "px";

        confetti.style.zIndex =
            "9999";

        confetti.style.pointerEvents =
            "none";


        const duration =
            1.5 + Math.random() * 2;


        confetti.style.transition =
            `top ${duration}s linear, transform ${duration}s ease-in`;


        document.body.appendChild(confetti);


        /*
            Pequeno atraso para o navegador
            registrar a posição inicial.
        */

        setTimeout(() => {

            confetti.style.top =
                "110vh";

            confetti.style.transform =
                `rotate(${Math.random() * 720}deg)`;

        }, 20);


        /*
            Remove depois da animação.
        */

        setTimeout(() => {

            confetti.remove();

        }, duration * 1000 + 100);

    }

}


/* =====================================================
   BOTÕES
===================================================== */

spinButton.addEventListener(
    "click",
    spin
);


resetButton.addEventListener(
    "click",
    resetGame
);


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

updateChips();

resetGame();

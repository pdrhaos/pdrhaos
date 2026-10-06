document.addEventListener("DOMContentLoaded", function () {

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

    let chips = 4;
    let spinning = false;

    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    const chipsDisplay = document.getElementById("chips");
    const spinButton = document.getElementById("spinButton");
    const resetButton = document.getElementById("resetButton");
    const machineResult = document.getElementById("machineResult");

    // Verifica se encontrou os elementos
    if (
        !slot1 ||
        !slot2 ||
        !slot3 ||
        !chipsDisplay ||
        !spinButton ||
        !resetButton ||
        !machineResult
    ) {
        console.error("ERRO: elementos da máquina não foram encontrados.");
        return;
    }

    function randomIndex() {
        return Math.floor(Math.random() * roosterImages.length);
    }

    function updateChips() {
        chipsDisplay.textContent = chips;
    }

    function spin() {

        if (spinning) {
            return;
        }

        if (chips <= 0) {
            machineResult.textContent = "SEM FICHAS! 😭";
            return;
        }

        // Gasta uma ficha
        chips--;
        updateChips();

        spinning = true;
        spinButton.disabled = true;

        machineResult.textContent = "GIRANDO... 🐓";

        // Animação
        let count = 0;

        const animation = setInterval(function () {

            slot1.src = roosterImages[randomIndex()];
            slot2.src = roosterImages[randomIndex()];
            slot3.src = roosterImages[randomIndex()];

            count++;

            if (count >= 18) {

                clearInterval(animation);

                // Resultado final
                const result1 = randomIndex();
                const result2 = randomIndex();
                const result3 = randomIndex();

                slot1.src = roosterImages[result1];
                slot2.src = roosterImages[result2];
                slot3.src = roosterImages[result3];

                // Verifica vitória
                if (
                    result1 === result2 &&
                    result2 === result3
                ) {

                    machineResult.textContent = "🎉 JACKPOT! VOCÊ GANHOU! 🐓";

                    machineResult.style.transform = "scale(1.15)";

                    setTimeout(function () {
                        machineResult.style.transform = "scale(1)";
                    }, 400);

                } else {

                    machineResult.textContent = "NÃO FOI DESSA VEZ! 🐓";

                }

                spinning = false;
                spinButton.disabled = false;
            }

        }, 100);

    }

    function resetGame() {

        chips = 4;
        spinning = false;

        updateChips();

        slot1.src = roosterImages[0];
        slot2.src = roosterImages[1];
        slot3.src = roosterImages[2];

        machineResult.textContent = "BOA SORTE! 🐓";

        spinButton.disabled = false;
    }

    // Botões
    spinButton.addEventListener("click", spin);
    resetButton.addEventListener("click", resetGame);

    // Estado inicial
    resetGame();

    console.log("🐓 Máquina dos Galos carregada com sucesso!");

});

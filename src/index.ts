/*
 * Entrypoint of Single-Page Application.
 */

import './styles/main.css';
import './media/audio/prompt-red-box.ogg';
import './media/audio/correct.ogg';
import './media/audio/wrong.ogg';

function main(): void {
    const app = document.getElementById("app");

    app.addEventListener("click", appInitialClickHandler);

    const left = document.createElement("div");
    const right = document.createElement("div");

    left.setAttribute("id", "left");
    right.setAttribute("id", "right");

    app.append(left, right);
}

function appInitialClickHandler() {
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    left.addEventListener("click", leftClickHandler);
    right.addEventListener("click", rightClickHandler);

    // This handler is supposed to run only once
    const app = document.getElementById("app");
    app.removeEventListener("click", appInitialClickHandler);

    playAudio("./media/audio/prompt-red-box.ogg");
}

function rightClickHandler() {
    console.log("Right element clicked.");

    const audio = playAudio("./media/audio/wrong.ogg");

    audio.addEventListener("ended", (event) => {
        playAudio("./media/audio/prompt-red-box.ogg");
    });
}

function leftClickHandler() {
    console.log("Left element clicked.");

    playAudio("./media/audio/correct.ogg");
}

function playAudio(url: string): HTMLAudioElement {
    const audio = new Audio(url);

    audio.addEventListener("canplaythrough", (event) => {
        audio.play();
    });

    return audio;
}

main()

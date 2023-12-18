/*
 * Entrypoint of Single-Page Application.
 */

import './styles/main.css';
import './media/audio/prompt-red-box.ogg';
import './media/audio/correct.ogg';
import './media/audio/wrong.ogg';

// Flag for stopping audios from running over each other
// If an audio is playing, trying to play another one will be a no-op
let fAudioRunning = false;


function main(): void {
    const app = document.getElementById("app");

    app.addEventListener("click", appInitialClickHandler);

    const left = document.createElement("div");
    const right = document.createElement("div");

    left.setAttribute("id", "left");
    right.setAttribute("id", "right");

    app.append(left, right);
}

async function sleep(ms: number): Promise<void> {
   return new Promise((resolve) => {
        setTimeout(resolve, ms);
   });
}

async function appInitialClickHandler() {
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    left.addEventListener("click", leftClickHandler);
    right.addEventListener("click", rightClickHandler);

    // This handler is supposed to run only once
    const app = document.getElementById("app");
    app.removeEventListener("click", appInitialClickHandler);

    await playAudio("./media/audio/prompt-red-box.ogg");
}

async function rightClickHandler() {
    console.log("Right element clicked.");

    await playAudio("./media/audio/wrong.ogg");
    await sleep(1000);
    await playAudio("./media/audio/prompt-red-box.ogg");
}

async function leftClickHandler() {
    console.log("Left element clicked.");

    await playAudio("./media/audio/correct.ogg");
}

async function playAudio(url: string): Promise<HTMLAudioElement> {
    if (! fAudioRunning) {
        fAudioRunning = true;

        const audio = new Audio(url);

        audio.addEventListener("canplaythrough", (event) => {
            audio.play();
        });

        return new Promise<HTMLAudioElement>((resolve) => {
            audio.addEventListener("ended", (event) => {
                fAudioRunning = false;

                return resolve(audio);
            });
        });
    }
    else {
        console.log("Audio is already playing. Skipping: %s", url);
    }
}

main()

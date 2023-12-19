/*
 * Entrypoint of Single-Page Application.
 */

import './styles/main.css';
import './media/audio/prompt-red-box.ogg';
import './media/audio/correct.ogg';
import './media/audio/wrong.ogg';

import { playAudio } from './audio';
import { configureLogging, log } from './logging';
import { appTouchStartHandler, configureElementBounds, configureTouchHandlers, touchEnded } from './touch';


function main(): void {
    configureLogging(window.location.href);

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
    log("SE selector app started");

    const left = document.getElementById("left");
    const right = document.getElementById("right");

    // This handler is supposed to run only once
    const app = document.getElementById("app");
    app.removeEventListener("click", appInitialClickHandler);

    configureElementBounds(left, right);
    configureTouchHandlers(leftBoxClicked, rightBoxClicked);
    app.ontouchstart = appTouchStartHandler;

    await playAudio("./media/audio/prompt-red-box.ogg");
}

async function rightBoxClicked() {
    log("Right element clicked.");

    await playAudio("./media/audio/wrong.ogg");
    await sleep(1000);
    await playAudio("./media/audio/prompt-red-box.ogg");

    touchEnded();
}

async function leftBoxClicked() {
    log("Left element clicked.");

    await playAudio("./media/audio/correct.ogg");

    touchEnded();
}


main()

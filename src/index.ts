/*
 * Entrypoint of Single-Page Application.
 */

import './styles/main.css';
import './media/audio/prompt-red-box.ogg';

function main(): void {
    const app = document.getElementById("app");

    const left = document.createElement("div");
    const right = document.createElement("div");

    left.setAttribute("id", "left");
    right.setAttribute("id", "right");

    left.addEventListener("click", leftClickHandler);
    right.addEventListener("click", rightClickHandler);

    app.append(left, right);
}

function rightClickHandler() {
    console.log("Right element clicked.");
}

function leftClickHandler() {
    console.log("Left element clicked.");
}

main()

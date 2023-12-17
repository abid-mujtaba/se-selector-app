console.log("Hello, World!");

import './styles/main.css';

function main(): void {
    const app = document.getElementById("app");

    const left = document.createElement("div");
    const right = document.createElement("div");

    left.setAttribute("id", "left");
    right.setAttribute("id", "right");

    app.append(left, right);
}

main()

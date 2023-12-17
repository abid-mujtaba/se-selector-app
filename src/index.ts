console.log("Hello, World!");

import './styles/main.css';

function main(): void {
    const app = document.getElementById("app");

    const header = document.createElement("h2");
    header.append("Hello, World!")

    app.append(header);
}

main()

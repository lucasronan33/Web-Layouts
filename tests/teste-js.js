const canvas = document.getElementById("editorCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let selecionados = new Set();
let movendo = false;
let redimensionando = false;
let alcaSelecionada = null;
let startX, startY;

let elementos = [
    { x: 100, y: 100, width: 150, height: 100, color: "blue" },
    { x: 300, y: 200, width: 120, height: 80, color: "red" }
];

function desenharElementos() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elementos.forEach(el => {
        ctx.fillStyle = el.color;
        ctx.fillRect(el.x, el.y, el.width, el.height);
    });
    if (selecionados.size > 0) desenharCaixaSelecao();
}

function desenharCaixaSelecao() {
    const { x, y, width, height } = calcularBoundingBox();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    desenharAlcasRedimensionamento(x, y, width, height);
}

function desenharAlcasRedimensionamento(x, y, width, height) {
    desenharAlca(x, y, "nw");
    desenharAlca(x + width / 2, y, "n");
    desenharAlca(x + width, y, "ne");
    desenharAlca(x, y + height / 2, "w");
    desenharAlca(x + width, y + height / 2, "e");
    desenharAlca(x, y + height, "sw");
    desenharAlca(x + width / 2, y + height, "s");
    desenharAlca(x + width, y + height, "se");
}

function desenharAlca(x, y, tipo) {
    ctx.fillStyle = "black";
    ctx.fillRect(x - 5, y - 5, 10, 10);
}

function calcularBoundingBox() {
    let xMin = Infinity, yMin = Infinity, xMax = -Infinity, yMax = -Infinity;
    selecionados.forEach(el => {
        xMin = Math.min(xMin, el.x);
        yMin = Math.min(yMin, el.y);
        xMax = Math.max(xMax, el.x + el.width);
        yMax = Math.max(yMax, el.y + el.height);
    });
    return { x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin };
}

canvas.addEventListener("mousedown", (e) => {
    const { offsetX: x, offsetY: y } = e;
    let selecionouAlgo = false;
    let boundingBox = calcularBoundingBox();

    // Verifica se clicou em uma alça
    let alcas = [
        { x: boundingBox.x, y: boundingBox.y, tipo: "nw" },
        { x: boundingBox.x + boundingBox.width / 2, y: boundingBox.y, tipo: "n" },
        { x: boundingBox.x + boundingBox.width, y: boundingBox.y, tipo: "ne" },
        { x: boundingBox.x, y: boundingBox.y + boundingBox.height / 2, tipo: "w" },
        { x: boundingBox.x + boundingBox.width, y: boundingBox.y + boundingBox.height / 2, tipo: "e" },
        { x: boundingBox.x, y: boundingBox.y + boundingBox.height, tipo: "sw" },
        { x: boundingBox.x + boundingBox.width / 2, y: boundingBox.y + boundingBox.height, tipo: "s" },
        { x: boundingBox.x + boundingBox.width, y: boundingBox.y + boundingBox.height, tipo: "se" }
    ];

    alcas.forEach(alca => {
        if (x >= alca.x - 5 && x <= alca.x + 5 && y >= alca.y - 5 && y <= alca.y + 5) {
            redimensionando = true;
            alcaSelecionada = alca.tipo;
        }
    });

    if (!redimensionando) {
        elementos.forEach(el => {
            if (x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height) {
                if (e.shiftKey) {
                    selecionados.has(el) ? selecionados.delete(el) : selecionados.add(el);
                } else {
                    selecionados.clear();
                    selecionados.add(el);
                }
                selecionouAlgo = true;
                movendo = true;
            }
        });
    }

    if (!selecionouAlgo && !redimensionando) selecionados.clear();
    startX = x;
    startY = y;
    desenharElementos();
});

canvas.addEventListener("mousemove", (e) => {
    if (movendo && e.buttons === 1) {
        selecionados.forEach(el => {
            el.x += e.movementX;
            el.y += e.movementY;
        });
        desenharElementos();
    }

    if (redimensionando && e.buttons === 1) {
        let dx = e.offsetX - startX;
        let dy = e.offsetY - startY;
        selecionados.forEach(el => {
            if (alcaSelecionada.includes("e")) el.width += dx;
            if (alcaSelecionada.includes("s")) el.height += dy;
            if (alcaSelecionada.includes("w")) { el.x += dx; el.width -= dx; }
            if (alcaSelecionada.includes("n")) { el.y += dy; el.height -= dy; }
        });
        startX = e.offsetX;
        startY = e.offsetY;
        desenharElementos();
    }
});

canvas.addEventListener("mouseup", () => {
    movendo = false;
    redimensionando = false;
});

desenharElementos();
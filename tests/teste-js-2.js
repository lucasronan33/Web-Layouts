const movableElement = document.getElementsByClassName("movable");

let isDragging = false;
let offsetX, offsetY, width, height;


for (const elemento of movableElement) {

    // e.clientX, e.clientY ===> posição do click do mouse

    elemento.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - elemento.getBoundingClientRect().left;
        // calcula a distancia HORIZONTAL entre a borda esquerda do elemento
        // e a posição HORIZONTAL de onde ocorreu o click do mouse

        offsetY = e.clientY - elemento.getBoundingClientRect().top;
        // calcula a distancia VERTICAL entre a borda esquerda do elemento
        // e a posição VERTICAL de onde ocorreu o click do mouse


        //Depuração
        console.log('left:', elemento.getBoundingClientRect().left);
        console.log('top:', elemento.getBoundingClientRect().top);

        console.log('x:', e.clientX);
        console.log('y:', e.clientY);

        console.log('offsetX:', offsetX);
        console.log('offsetY:', offsetY);

        console.log('width:', elemento.getBoundingClientRect().width);
        console.log('height:', elemento.getBoundingClientRect().height);
        // --------------------

        width = elemento.getBoundingClientRect().width
        height = elemento.getBoundingClientRect().height

        if ((width - offsetX) < 15 && (height - offsetY) < 15) {
            document.removeEventListener('mousemove', onMouseMove)
            document.addEventListener('mousemove', dimensionar)

        } else {
            document.removeEventListener('mousemove', dimensionar)
            document.addEventListener("mousemove", onMouseMove);
            console.log('\n');
        }
        document.addEventListener("mouseup", onMouseUp);
    });

    function dimensionar(e) {
        const left = e.clientX - elemento.getBoundingClientRect().left

        console.log(left);

        elemento.style.width = `${left}px`
    }

    function onMouseMove(e) {
        if (isDragging) {
            const left = e.clientX - offsetX;
            const top = e.clientY - offsetY;
            elemento.style.left = `${left}px`;
            elemento.style.top = `${top}px`;

        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mousemove", dimensionar);
        document.removeEventListener("mouseup", onMouseUp);
    }
}
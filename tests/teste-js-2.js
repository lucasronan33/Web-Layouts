const movableElement = document.getElementsByClassName("movable");

let isDragging = false;
let offsetX, offsetX_1, offsetY, offsetY_1, width, height;
let selecionado = 0

function ativaDesativaDivsResize(e) {
    if (e.target !== selecionado) {
        try {
            let divsResize = selecionado.querySelectorAll('.resize')
            for (const div of divsResize) {
                div.remove()
            }
        } catch (error) {
            console.log(error);

        }
    }
}

document.addEventListener('click', (e) => {
    ativaDesativaDivsResize(e)
    // const verificaDivsResize=selecionado.querySelector
    console.log('remove:', selecionado);

})

for (const elemento of movableElement) {

    // e.clientX, e.clientY ===> posição do click do mouse

    elemento.addEventListener('mousedown', (e) => {
        const verificaDivsResize = elemento.querySelector('.resize')
        // console.log(verificaDivsResize);
        console.log('selecionado:', selecionado);
        ativaDesativaDivsResize(e)

        if (!verificaDivsResize && e.target == elemento) {

            const divsResize = [
                'et',   //topo esquerdo
                't',    //top
                'td',   //topo direito
                'd',    //direito
                'db',   //direito baixo
                'b',    //baixo
                'be',   //baixo esquerdo
                'e'     //esquerdo
            ]
            for (const classe of divsResize) {
                const div = document.createElement('div')
                div.classList.add('resize', classe)
                elemento.append(div)
            }
        }
        selecionado = elemento
    })

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

        console.log('right:', elemento.getBoundingClientRect().right);
        console.log('bottom:', elemento.getBoundingClientRect().bottom);

        console.log('x:', e.clientX);
        console.log('y:', e.clientY);

        console.log('offsetX:', offsetX);
        console.log('offsetY:', offsetY);

        console.log('width:', elemento.getBoundingClientRect().width);
        console.log('height:', elemento.getBoundingClientRect().height);
        // --------------------

        width = elemento.getBoundingClientRect().width
        height = elemento.getBoundingClientRect().height

        document.removeEventListener('mousemove', onMouseMove)
        if ((width - offsetX) < 15) {
            document.addEventListener('mousemove', dimDireita)

        } else if ((height - offsetY) < 15) {
            document.addEventListener('mousemove', dimBaixo)

        } else if ((offsetX) < 15) {
            document.addEventListener('mousemove', dimEsquerda)

        } else if ((offsetY) < 15) {
            document.addEventListener('mousemove', dimCima)

        } else {
            document.removeEventListener('mousemove', dimDireita)
            document.addEventListener("mousemove", onMouseMove);
            console.log('\n');
        }
        document.addEventListener("mouseup", onMouseUp);
    });

    function dimDireita(e) {
        const left = e.clientX - elemento.getBoundingClientRect().left

        console.log('left:', left);

        elemento.style.width = `${left}px`
    }

    function dimEsquerda(e) {
        const tamanho = (elemento.getBoundingClientRect().right - e.clientX);
        const mover = (e.clientX - offsetX) + offsetX


        console.log('right:', mover);
        console.log('left:', tamanho);

        elemento.style.width = `${tamanho}px`
        elemento.style.left = `${mover}px`;
    }

    function dimBaixo(e) {
        const top = e.clientY - elemento.getBoundingClientRect().top

        console.log('top:', top);

        elemento.style.height = `${top}px`
    }

    function dimCima(e) {
        const bottom = elemento.getBoundingClientRect().bottom - e.clientY
        const mover = (e.clientY - offsetY) + offsetY

        console.log('bottom:', bottom);

        elemento.style.height = `${bottom}px`
        elemento.style.top = `${mover}px`
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
        document.removeEventListener("mousemove", dimDireita);
        document.removeEventListener("mousemove", dimEsquerda);
        document.removeEventListener("mousemove", dimBaixo);
        document.removeEventListener("mousemove", dimCima);
        document.removeEventListener("mouseup", onMouseUp);
    }
}
const corpo = document.getElementById("corpoLayout");
const botao = document.getElementById("lblCaminho");

// Configuração do caminho para o worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

estiloCorpo = corpo.style;

function marcaDesmarcaCheckbox(elemento, checkbox) {
    elemento.addEventListener('click', () => {
        if (checkbox.checked === true) {
            checkbox.checked = false
            // console.log('desmarcado');
            // let checkboxSelecionarTodas = document.querySelector('#selecionarTudo')
            // checkboxSelecionarTodas.checked = false
            // console.log('checkboxSelecionarTodas: desmarcou\n', checkboxSelecionarTodas);

        } else {
            checkbox.checked = true
            // console.log('marcado');

        }
        document.dispatchEvent(new Event('checkboxAtualizado'))
    })
}

function marcarTodasCheckbox(checkboxPai, checkboxFilho) {
    // if (checkboxPai.checked === true) {
    //     for (let checkbox of checkboxFilho) {
    //         checkbox.checked = true
    //     }
    // } else if (checkboxPai.checked === false) {
    //     for (let checkbox of checkboxFilho) {
    //         checkbox.checked = false
    //     }
    // }

    // Chat GPT
    let nodeListCheckbox = Array.from(checkboxFilho)
    nodeListCheckbox.forEach(checkbox => {
        checkbox.checked = checkboxPai.checked
    })
}

function verificaCheckboxMarcada(checkboxFilho, valorBool) {
    const todosMarcados = Array.from(checkboxFilho).every(checkbox => checkbox.checked === valorBool)
    return todosMarcados
}

function mostraEscondeButtons() {
    const verificacaoCheckbox = document.querySelectorAll('.chkArquivoSelecao')
    const arrayCheckbox = verificaCheckboxMarcada(verificacaoCheckbox, false)
    if (arrayCheckbox) {
        let divButtons = document.querySelectorAll('.divButtons')
        for (const div of divButtons) {
            div.style.display = 'none'
        }
    } else {
        for (const input of verificacaoCheckbox) {
            let divButtons = document.querySelectorAll('.divButtons')
            for (const div of divButtons) {
                if (input.checked === true) {
                    div.style.display = 'flex'
                }
            }
        }
    }
}

function gerarCotas(largura, altura, cotaLargura, cotaAltura) {
    const PPI = 100; //Pixel por polegada (padrão por tela)
    const polegadasParaMM = 35.2777784; //1 polegada = 2,54cm

    const larguraMM = (largura / PPI) * polegadasParaMM;
    const alturaMM = (altura / PPI) * polegadasParaMM;

    cotaAltura.innerText = alturaMM.toFixed(2) + "mm"; //toFixed(n) define a quantidade de casas decimais
    cotaLargura.innerText = larguraMM.toFixed(2) + "mm"; //toFixed(n) define a quantidade de casas decimais

    console.log(`largura: ${larguraMM}mm \naltura: ${alturaMM}mm`);
}

function estruturaSelecao() {
    const selecaoPDF = document.createElement('div')
    selecaoPDF.classList.add('selecaoPDF')
    document.body.appendChild(selecaoPDF)

    const divChkSelecionarTudo = document.createElement('div')
    divChkSelecionarTudo.classList.add('chkSelecionarTudo')
    selecaoPDF.appendChild(divChkSelecionarTudo)

    const chkSelecionarTudo = document.createElement('input')
    chkSelecionarTudo.type = 'checkbox'
    chkSelecionarTudo.id = 'selecionarTudo'
    chkSelecionarTudo.name = 'selecionarTudo'

    const labelSelecionarTudo = document.createElement('label')
    labelSelecionarTudo.setAttribute('for', 'selecionarTudo')
    labelSelecionarTudo.textContent = 'Desmarcar / Marcar tudo'

    divChkSelecionarTudo.append(chkSelecionarTudo, labelSelecionarTudo)

    const divButtons = document.createElement('div')
    divButtons.classList = 'divButtons'
    selecaoPDF.appendChild(divButtons)

    const btnInserirPaginas = document.createElement("button");
    btnInserirPaginas.classList = "btnInserirPaginas";
    btnInserirPaginas.innerText = "Inserir";

    const btnExcluirPaginas = document.createElement("button");
    btnExcluirPaginas.classList = "btnExcluirPaginas";
    btnExcluirPaginas.innerText = "Excluir";

    divButtons.append(btnExcluirPaginas, btnInserirPaginas);

    const boxArquivo = document.createElement('div')
    boxArquivo.id = 'box-arquivo'
    selecaoPDF.appendChild(boxArquivo)

}

function criarEstruturaLayout() {
    let container_img = document.createElement("div");
    container_img.classList.add("container-img");
    corpo.appendChild(container_img); //aonde o elemento vai ser criado

    let img_lixeira = document.createElement("div");
    img_lixeira.classList.add("img-lixeira");
    container_img.appendChild(img_lixeira);
    img_lixeira.addEventListener('click', () => {
        img_lixeira.parentElement.remove()
    })

    let lixeira = document.createElement("div");
    lixeira.classList.add("lixeira");
    img_lixeira.appendChild(lixeira);

    let srcLixeira = document.createElement("img");
    srcLixeira.setAttribute("src", "../img/ico_lixeira.png");
    lixeira.appendChild(srcLixeira);

    return {
        img_lixeira,
        container_img,
        srcLixeira,
    };
}
botao.addEventListener("click", () => {
    const criarInput = document.createElement("input");
    criarInput.type = "file";
    criarInput.accept = "image/*, application/pdf";
    criarInput.setAttribute("multiple", "");

    criarInput.addEventListener("change", async (event) => {
        const arquivos = event.target.files;

        let boxArquivo = document.querySelector('#box-arquivo')

        if (!boxArquivo) {
            estruturaSelecao()
            boxArquivo = document.querySelector('#box-arquivo')
        }

        for (const arquivo of arquivos) {
            if (arquivo) {
                const arquivoURL = URL.createObjectURL(arquivo);
                function criarEstruturaCheckbox(nmPagina) {
                    const divArquivo = document.createElement("div");
                    divArquivo.classList.add("arquivo");
                    boxArquivo.appendChild(divArquivo);

                    if (!nmPagina) {
                        nmPagina = 1
                    }

                    const divCheckboxes = document.createElement('div')
                    divCheckboxes.classList = 'divCheckboxes'
                    divArquivo.appendChild(divCheckboxes)

                    const chkArquivoSelecao = document.createElement('input');
                    chkArquivoSelecao.type = 'checkbox';
                    chkArquivoSelecao.name = `checkbox-${nmPagina}`
                    chkArquivoSelecao.classList.add("chkArquivoSelecao");

                    const label = document.createElement('label')
                    label.setAttribute('for', `checkbox-${nmPagina}`)
                    label.textContent = `Página ${nmPagina}`

                    const chkMedidasArquivo = document.createElement('input');
                    chkMedidasArquivo.type = 'checkbox';
                    chkMedidasArquivo.name = `medidas-${nmPagina}`
                    chkMedidasArquivo.classList.add("chkMedidasArquivo");

                    const labelMedidasArquivo = document.createElement('label')
                    labelMedidasArquivo.setAttribute('for', `medidas-${nmPagina}`)
                    labelMedidasArquivo.textContent = `Inserir medidas`

                    divCheckboxes.append(chkArquivoSelecao, label, chkMedidasArquivo, labelMedidasArquivo)

                    const arquivoSelecao = document.createElement("div");
                    arquivoSelecao.classList.add("arquivoSelecao");
                    divArquivo.appendChild(arquivoSelecao);

                    marcaDesmarcaCheckbox(label, chkArquivoSelecao)
                    marcaDesmarcaCheckbox(labelMedidasArquivo, chkMedidasArquivo)
                    marcaDesmarcaCheckbox(arquivoSelecao, chkArquivoSelecao)
                    marcaDesmarcaCheckbox(arquivoSelecao, chkMedidasArquivo)

                    return {
                        divArquivo,
                        chkArquivoSelecao,
                        arquivoSelecao
                    };
                }
                const divButtons = document.querySelectorAll('.divButtons')

                if (divButtons.length < 2) {
                    const paiDivButtons = divButtons[0].parentNode
                    const btnClone = divButtons[0].cloneNode(true)
                    paiDivButtons.appendChild(btnClone)

                    let btnExcluirPaginas = document.querySelectorAll('.btnExcluirPaginas')
                    for (const button of btnExcluirPaginas) {

                        button.addEventListener('click', function excluirPaginas() {
                            let checkboxMarcadas = document.querySelectorAll('.chkArquivoSelecao')
                            let boxArquivo = document.querySelector('#box-arquivo')
                            for (const checkbox of checkboxMarcadas) {
                                if (checkbox.checked === true) {
                                    let paiCheckbox = checkbox.parentNode
                                    paiCheckbox.parentNode.remove()
                                }
                            }
                            if (boxArquivo.childNodes.length < 1) {
                                boxArquivo.parentNode.remove()
                            }
                        })
                    }

                    // let btnInserir = paiBtnInserir.querySelectorAll('.btnInserirPaginas')
                    // for (const button of btnInserir) {
                    //     button.addEventListener('click', () => {
                    //         console.log('EventListenner');

                    //     })

                    // }

                    paiDivButtons.addEventListener('click', function inserirArquivos(e) {
                        if (e.target.classList.contains('btnInserirPaginas')) {
                            // console.log(el.children[0]);

                            let checkboxSelecionadas = document.querySelectorAll('.chkArquivoSelecao')
                            for (const checkbox of checkboxSelecionadas) {
                                if (checkbox.checked === true) {
                                    const { img_lixeira,
                                        container_img,
                                        srcLixeira, } = criarEstruturaLayout()

                                    let pai_arquivo_layout = checkbox.parentElement
                                    let arquivo_layout = pai_arquivo_layout.parentElement.querySelector('.arquivo_layout')

                                    let checkboxInserirMedidas = checkbox.parentElement.querySelector('.chkMedidasArquivo')
                                    if (checkboxInserirMedidas.checked === true) {

                                        let cotaAltura = document.createElement("div"); //criar elementos no HTML
                                        cotaAltura.classList.add("altura");
                                        container_img.appendChild(cotaAltura);

                                        let cotaLargura = document.createElement("div");
                                        cotaLargura.classList.add("largura");
                                        container_img.appendChild(cotaLargura);
                                        if (arquivo_layout.tagName === 'CANVAS') {
                                            console.log('canvas selecionado');

                                            //METODO: TRANSFORMANDO CANVAS EM IMAGEM 
                                            // let dataURL = arquivo_layout.toDataURL('image/png')

                                            // let arquivo_inserir = document.createElement('img')
                                            // arquivo_inserir.src = dataURL
                                            // arquivo_inserir.classList = 'arquivo_layout'


                                            //METODO: CLONANDO CANVAS 
                                            let arquivo_inserir = arquivo_layout.cloneNode(true)
                                            let renderArquivo_inserir = arquivo_inserir.getContext('2d')//pega o contexto 2D do clone

                                            renderArquivo_inserir.drawImage(arquivo_layout, 0, 0)//desenha o arquivo original no clone

                                            img_lixeira.appendChild(arquivo_inserir)

                                            let largura = (arquivo_layout.width / 72) * 25.4
                                            let altura = (arquivo_layout.height / 72) * 25.4

                                            cotaAltura.innerText = altura.toFixed(2) + 'mm'
                                            container_img.appendChild(cotaAltura);
                                            ;
                                            cotaLargura.innerText = largura.toFixed(2) + 'mm'
                                            container_img.appendChild(cotaLargura);


                                            console.log(largura);
                                            console.log(altura);

                                        } else {
                                            console.log('img selecionado');

                                            let arquivo_inserir = arquivo_layout.cloneNode(true)
                                            img_lixeira.appendChild(arquivo_inserir)

                                            gerarCotas(arquivo_layout.naturalWidth, arquivo_layout.naturalHeight, cotaLargura, cotaAltura)
                                        }


                                    }//fim condicional checkboxMedidasInserir
                                }//fim condicional checkbox das paginas selecionadas
                            }//fim do FOR para iteração das checkbox
                        }//fim condicional para capturar classe do botao
                    })//fim evento para capturar click no botao INSERIR
                }//fim condicional para duplicar os botões

                if (arquivo.type === "application/pdf") {
                    const pdf = await pdfjsLib.getDocument(arquivoURL).promise;
                    const numPagTotal = pdf.numPages;

                    for (let i = 1; i <= numPagTotal; i++) {
                        const {
                            divArquivo,
                            chkArquivoSelecao,
                            arquivoSelecao
                        } = criarEstruturaCheckbox(i);
                        const canvas = document.createElement('canvas')
                        const context = canvas.getContext('2d')
                        canvas.classList = 'arquivo_layout'
                        arquivoSelecao.appendChild(canvas)

                        const page = await pdf.getPage(i)
                        const viewport = page.getViewport({ scale: 1 })

                        canvas.width = viewport.width
                        canvas.height = viewport.height

                        const largura = (canvas.width / 72) * 25.4
                        const altura = (canvas.height / 72) * 25.4

                        const textoLargura = document.createTextNode(largura)
                        const textoAltura = document.createTextNode(altura)
                        canvas.append(textoLargura, textoAltura)
                        console.log(`${largura.toFixed(2)} x ${altura.toFixed(2)}mm`);


                        await page.render({ canvasContext: context, viewport }).promise.then()
                    }
                } else if (arquivo.type.startsWith("image/")) {
                    let arquivo_layout = document.createElement("img");
                    const {
                        divArquivo,
                        chkArquivoSelecao,
                        arquivoSelecao
                    } = criarEstruturaCheckbox();
                    arquivo_layout.classList = 'arquivo_layout'
                    arquivo_layout.src = arquivoURL
                    arquivoSelecao.appendChild(arquivo_layout)
                };
            }
        }

        let divCheckboxPai = document.querySelector('.chkSelecionarTudo')
        let checkboxPai = document.querySelector('#selecionarTudo')
        let checkboxFilho = document.querySelectorAll('.chkArquivoSelecao')

        document.addEventListener('checkboxAtualizado', () => {
            let todosMarcados = verificaCheckboxMarcada(checkboxFilho, true)
            if (todosMarcados === true) {
                checkboxPai.checked = true
                console.log(todosMarcados);
            } else {
                checkboxPai.checked = false
                console.log(todosMarcados);

            }
            console.log('fui executado');

            mostraEscondeButtons()
        })
        divCheckboxPai.addEventListener(('click'), () => {
            marcarTodasCheckbox(checkboxPai, checkboxFilho)
            document.dispatchEvent(new Event('checkboxAtualizado'))
        })

    });
    criarInput.click();
});
const corpo = document.getElementById("corpoLayout");
const botao = document.getElementById("lblCaminho");

// Configuração do caminho para o worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

estiloCorpo = corpo.style;

function marcaDesmarcaCheckbox(elemento, checkbox) {

    elemento.addEventListener('click', () => {
        if (checkbox.checked) {
            checkbox.checked = false
            console.log('desmarcado');

            let checkboxSelecionarTodas = document.querySelector('#selecionarTudo')
            checkboxSelecionarTodas.checked = false
            console.log('checkboxSelecionarTodas: desmarcou');


        } else {
            checkbox.checked = true
            console.log('marcado');

        }


        return checkbox.checked
    })

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
    divChkSelecionarTudo.append(chkSelecionarTudo, 'Desmarcar / Marcar tudo')

    const btnInserirPaginas = document.createElement("button");
    btnInserirPaginas.id = "btnInserirPaginas";
    btnInserirPaginas.innerText = "Inserir";
    selecaoPDF.appendChild(btnInserirPaginas);

    marcaDesmarcaCheckbox(divChkSelecionarTudo, chkSelecionarTudo)
}

botao.addEventListener("click", () => {
    const criarInput = document.createElement("input");
    criarInput.type = "file";
    criarInput.accept = "image/*, application/pdf";
    criarInput.setAttribute("multiple", "");

    criarInput.addEventListener("change", async (event) => {
        const arquivos = event.target.files;

        let selecaoPDF = document.querySelector('.selecaoPDF')

        if (!selecaoPDF) {
            estruturaSelecao()
            selecaoPDF = document.querySelector('.selecaoPDF')
        }

        for (const arquivo of arquivos) {
            if (arquivo) {
                const arquivoURL = URL.createObjectURL(arquivo);
                function criarEstrutura(nmPagina) {
                    const divArquivo = document.createElement("div");
                    divArquivo.classList.add("arquivo");
                    selecaoPDF.appendChild(divArquivo);

                    const chkArquivoSelecao = document.createElement('input');
                    chkArquivoSelecao.type = 'checkbox';
                    chkArquivoSelecao.classList.add("chkArquivoSelecao");
                    divArquivo.append(chkArquivoSelecao, `Página ${nmPagina}`)

                    const arquivoSelecao = document.createElement("div");
                    arquivoSelecao.classList.add("arquivoSelecao");
                    divArquivo.appendChild(arquivoSelecao);

                    const btnInserirPaginas = document.body.querySelector('#btnInserirPaginas')
                    const pai = divArquivo.parentNode
                    pai.insertBefore(divArquivo, btnInserirPaginas)

                    marcaDesmarcaCheckbox(divArquivo, chkArquivoSelecao)

                    return {
                        divArquivo,
                        chkArquivoSelecao,
                        arquivoSelecao
                    };
                }
                if (arquivo.type === "application/pdf") {
                    const pdf = await pdfjsLib.getDocument(arquivoURL).promise;
                    const numPagTotal = pdf.numPages;

                    for (let i = 1; i <= numPagTotal; i++) {
                        const {
                            divArquivo,
                            chkArquivoSelecao,
                            arquivoSelecao
                        } = criarEstrutura(i);

                    }
                } else if (arquivo.type.startsWith("image/")) {
                    let arquivo_layout = document.createElement("img");
                    const {
                        divArquivo,
                        chkArquivoSelecao,
                        arquivoSelecao
                    } = criarEstrutura(i);
                };
            }

            function gerarCotas(largura, altura, cotaAltura, cotaLargura) {
                const PPI = 100; //Pixel por polegada (padrão por tela)
                const polegadasParaMM = 35.278; //1 polegada = 2,54cm

                const larguraMM = (largura / PPI) * polegadasParaMM;
                const alturaMM = (altura / PPI) * polegadasParaMM;

                cotaAltura.innerText = alturaMM.toFixed(2) + "mm"; //toFixed(n) define a quantidade de casas decimais
                cotaLargura.innerText = larguraMM.toFixed(2) + "mm"; //toFixed(n) define a quantidade de casas decimais

                console.log(`largura: ${larguraMM}mm \naltura: ${alturaMM}mm`);
            }
        }

        let divCheckboxPai = document.querySelector('.chkSelecionarTudo')
        let checkboxPai = document.querySelector('#selecionarTudo')
        let checkboxFilho = document.getElementsByClassName('chkArquivoSelecao')

        divCheckboxPai.addEventListener('click', () => {

            if (checkboxPai.checked === true) {
                for (let checkbox of checkboxFilho) {
                    checkbox.checked = true
                }
            } else if (checkboxPai.checked === false) {
                for (let checkbox of checkboxFilho) {
                    checkbox.checked = false
                }
            }

        })

    });
    criarInput.click();

});
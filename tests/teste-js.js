const corpo = document.getElementById("corpoLayout");
const botao = document.getElementById("lblCaminho");

// Configuração do caminho para o worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

function marcaDesmarcaCheckbox(elemento, checkbox) {
    elemento.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked;
        document.dispatchEvent(new Event('checkboxAtualizado'));
    });
}

function marcarTodasCheckbox(checkboxPai, checkboxFilho) {
    Array.from(checkboxFilho).forEach(checkbox => {
        checkbox.checked = checkboxPai.checked;
    });
    document.dispatchEvent(new Event('checkboxAtualizado'));
}

function verificarTodosSelecionados(checkboxFilho, checkboxPai) {
    const todosMarcados = Array.from(checkboxFilho).every(cb => cb.checked);
    checkboxPai.checked = todosMarcados;
}

function estruturaSelecao() {
    const selecaoPDF = document.createElement('div');
    selecaoPDF.classList.add('selecaoPDF');
    document.body.appendChild(selecaoPDF);

    const divChkSelecionarTudo = document.createElement('div');
    divChkSelecionarTudo.classList.add('chkSelecionarTudo');
    selecaoPDF.appendChild(divChkSelecionarTudo);

    const chkSelecionarTudo = document.createElement('input');
    chkSelecionarTudo.type = 'checkbox';
    chkSelecionarTudo.id = 'selecionarTudo';
    divChkSelecionarTudo.append(chkSelecionarTudo, 'Desmarcar / Marcar tudo');

    const btnInserirPaginas = document.createElement("button");
    btnInserirPaginas.id = "btnInserirPaginas";
    btnInserirPaginas.innerText = "Inserir";
    selecaoPDF.appendChild(btnInserirPaginas);

    marcaDesmarcaCheckbox(divChkSelecionarTudo, chkSelecionarTudo);
}

botao.addEventListener("click", () => {
    const criarInput = document.createElement("input");
    criarInput.type = "file";
    criarInput.accept = "image/*, application/pdf";
    criarInput.setAttribute("multiple", "");

    criarInput.addEventListener("change", async (event) => {
        const arquivos = event.target.files;

        let selecaoPDF = document.querySelector('.selecaoPDF');

        if (!selecaoPDF) {
            estruturaSelecao();
            selecaoPDF = document.querySelector('.selecaoPDF');
        }

        for (const [index, arquivo] of Array.from(arquivos).entries()) {
            if (arquivo) {
                const arquivoURL = URL.createObjectURL(arquivo);

                function criarEstrutura(nmPagina) {
                    const divArquivo = document.createElement("div");
                    divArquivo.classList.add("arquivo");
                    selecaoPDF.appendChild(divArquivo);

                    const chkArquivoSelecao = document.createElement('input');
                    chkArquivoSelecao.type = 'checkbox';
                    chkArquivoSelecao.classList.add("chkArquivoSelecao");
                    divArquivo.append(chkArquivoSelecao, `Página ${nmPagina}`);

                    const arquivoSelecao = document.createElement("div");
                    arquivoSelecao.classList.add("arquivoSelecao");
                    divArquivo.appendChild(arquivoSelecao);

                    const btnInserirPaginas = document.body.querySelector('#btnInserirPaginas');
                    const pai = divArquivo.parentNode;
                    pai.insertBefore(divArquivo, btnInserirPaginas);

                    marcaDesmarcaCheckbox(divArquivo, chkArquivoSelecao);

                    return { divArquivo, chkArquivoSelecao, arquivoSelecao };
                }

                if (arquivo.type === "application/pdf") {
                    const pdf = await pdfjsLib.getDocument(arquivoURL).promise;
                    const numPagTotal = pdf.numPages;

                    for (let i = 1; i <= numPagTotal; i++) {
                        criarEstrutura(i);
                    }
                } else if (arquivo.type.startsWith("image/")) {
                    criarEstrutura(index + 1);
                }
            }
        }

        const checkboxPai = document.querySelector('#selecionarTudo');
        const checkboxFilho = document.getElementsByClassName('chkArquivoSelecao');

        document.addEventListener('checkboxAtualizado', () => {
            verificarTodosSelecionados(checkboxFilho, checkboxPai);
        });

        checkboxPai.addEventListener('change', () => {
            marcarTodasCheckbox(checkboxPai, checkboxFilho);
        });

        Array.from(checkboxFilho).forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                verificarTodosSelecionados(checkboxFilho, checkboxPai);
            });
        });
    });

    criarInput.click();
});

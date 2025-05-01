// === Função para salvar projeto ===
async function salvarProjeto() {
    const campos = {};
    document.querySelectorAll("input, select, textarea").forEach(el => {
        if (el.name) campos[el.name] = el.value;
    });

    const arquivos = [];
    const boxArquivo = document.querySelectorAll('.arquivoSelecao img, .arquivoSelecao canvas');

    for (const el of boxArquivo) {
        let tipo = el.tagName === 'CANVAS' ? 'canvas' : 'img';
        let base64 = '';

        if (tipo === 'canvas') {
            base64 = el.toDataURL("image/png");
        } else {
            base64 = el.src;
        }

        arquivos.push({
            tipo,
            conteudo: base64
        });
    }

    const projeto = { campos, arquivos };
    const blob = new Blob([JSON.stringify(projeto, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "projeto-layout.json";
    a.click();
}

// === Função para carregar projeto ===
function carregarProjeto(event) {
    const input = event.target;
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const projeto = JSON.parse(reader.result);

        // Restaurar campos do formulário
        for (const [nome, valor] of Object.entries(projeto.campos)) {
            const el = document.querySelector(`[name="${nome}"]`);
            if (el) el.value = valor;
        }

        // Limpar área do layout
        const corpo = document.getElementById("corpoLayout");
        corpo.innerHTML = '';

        // Restaurar arquivos no layout
        for (const arq of projeto.arquivos) {
            const { img_lixeira, container_img } = criarEstruturaLayout();
            const elInserir = arq.tipo === 'canvas'
                ? Object.assign(document.createElement("canvas"), { className: 'arquivo_layout' })
                : Object.assign(document.createElement("img"), { className: 'arquivo_layout', src: arq.conteudo });

            if (arq.tipo === 'canvas') {
                const img = new Image();
                img.onload = () => {
                    elInserir.width = img.width;
                    elInserir.height = img.height;
                    const ctx = elInserir.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                };
                img.src = arq.conteudo;
            }

            img_lixeira.appendChild(elInserir);

            // evento excluir (img_lixeira)
            img_lixeira.addEventListener('click', () => {
                img_lixeira.parentElement.remove()
            })

            // Criar cotas (medidas)
            const largura = (elInserir.naturalWidth || elInserir.width || 0);
            const altura = (elInserir.naturalHeight || elInserir.height || 0);

            const cotaLargura = document.createElement("div");
            cotaLargura.className = "largura";
            cotaLargura.innerText = ((largura / 72) * 25.4).toFixed(2) + 'mm';
            container_img.appendChild(cotaLargura);

            const cotaAltura = document.createElement("div");
            cotaAltura.className = "altura";
            cotaAltura.innerText = ((altura / 72) * 25.4).toFixed(2) + 'mm';
            container_img.appendChild(cotaAltura);
        }
    };
    reader.readAsText(file);

    // (function lixeira() {
    //     let img_lixeiraApagar = document.querySelectorAll('.img-lixeira')

    //     console.log('script executado')

    //     if (img_lixeiraApagar.length > 0) {
    //         console.log('entrou no if')
    //         img_lixeiraApagar.forEach(element => {
    //             const img = element.querySelector('img')
    //             console.log('img: ', img)
    //         });
    //     }
    // })()
}

const corpo = document.getElementById("arquivo");
const botao = document.getElementById("lblCaminho");

// Configuração do caminho para o worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

estiloCorpo = corpo.style;

let numeroElemento = 0;

botao.addEventListener("click", () => {
  const criarInput = document.createElement("input");
  criarInput.type = "file";
  criarInput.accept = "image/*, application/pdf";
  criarInput.setAttribute("multiple", "");

  criarInput.addEventListener("change", async (event) => {
    const arquivos = event.target.files;

    for (const arquivo of arquivos) {
      if (arquivo) {
        const arquivoURL = URL.createObjectURL(arquivo);
        function criarEstrutura() {
          let container_img = document.createElement("div");
          container_img.classList.add("container-img");
          corpo.appendChild(container_img); //aonde o elemento vai ser criado

          let cotaAltura = document.createElement("div"); //criar elementos no HTML
          cotaAltura.classList.add("altura");
          container_img.appendChild(cotaAltura);

          let cotaLargura = document.createElement("div");
          cotaLargura.classList.add("largura");
          container_img.appendChild(cotaLargura);

          let img_lixeira = document.createElement("div");
          img_lixeira.classList.add("img-lixeira");
          container_img.appendChild(img_lixeira);

          let lixeira = document.createElement("div");
          lixeira.classList.add("lixeira");
          img_lixeira.appendChild(lixeira);

          let srcLixeira = document.createElement("img");
          srcLixeira.setAttribute("src", "../img/ico_lixeira.png");
          lixeira.appendChild(srcLixeira);

          return {
            img_lixeira,
            container_img,
            cotaAltura,
            cotaLargura,
            srcLixeira,
          };
        }
        if (arquivo.type === "application/pdf") {
          const pdf = await pdfjsLib.getDocument(arquivoURL).promise;
          const numPagTotal = pdf.numPages;

          for (let i = 1; i <= numPagTotal; i++) {
            const {
              img_lixeira,
              container_img,
              cotaAltura,
              cotaLargura,
              srcLixeira,
            } = criarEstrutura();

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.classList.add("arquivo_layout");
            img_lixeira.appendChild(canvas);

            const page = await pdf.getPage(i); //renderiza a primeira pagina do PDF
            const viewport = page.getViewport({ scale: 1 });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page
              .render({ canvasContext: context, viewport })
              .promise.then(() => {
                console.log(`Pagina ${i} de ${numPagTotal} renderizada`);
              });

            gerarCotas(canvas.width, canvas.height, cotaAltura, cotaLargura);
            // Adicionando funcionalidade para excluir a ramificação
            srcLixeira.addEventListener("click", () => {
              container_img.remove(); // Remove a div pai da lixeira
            });
          }
        } else if (arquivo.type.startsWith("image/")) {
          let arquivo_layout = document.createElement("img");
          const {
            img_lixeira,
            container_img,
            cotaAltura,
            cotaLargura,
            srcLixeira,
          } = criarEstrutura();
          arquivo_layout.classList.add("arquivo_layout");
          arquivo_layout.src = arquivoURL;
          img_lixeira.appendChild(arquivo_layout);

          arquivo_layout.onload = () => {
            gerarCotas(
              arquivo_layout.naturalWidth,
              arquivo_layout.naturalHeight,
              cotaAltura,
              cotaLargura
            );
            // Adicionando funcionalidade para excluir a ramificação
            srcLixeira.addEventListener("click", () => {
              container_img.remove(); // Remove a div pai da lixeira
            });
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
    }
  });
  criarInput.click();
});

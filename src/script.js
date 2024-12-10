document.addEventListener("DOMContentLoaded", () => {
  const label_tipoImpressao = document.getElementById(
    "label_slct_tipo_impressao"
  );
  const slct_tipo_impressao = document.getElementById("slct_tipo_impressao");
  // onchange=(event)=>{}

  slct_tipo_impressao.addEventListener("change", (event) => {
    const tipoSelecionado = slct_tipo_impressao.value;

    console.log(slct_tipo_impressao.value);
    if (slct_tipo_impressao.value !== "recorte") {
      label_tipoImpressao.style.display = "block";
    } else {
      label_tipoImpressao.style.display = "none";
    }

    // CODIGO TEMPORARIO
    // alteração de gabarito de background
    let formCorpo = document.querySelector(".corpo");
    info_adicionalStyle = document.querySelector(".info_adicional").style;

    let informacoesLayout = document.querySelector(".informacoes_layout");
    let estilos = {
      informacoesLayout: document.querySelector(".informacoes_layout").style,
      dimFinal: document.querySelector(".dim_final"),
      sangra: document.querySelector(".sangra"),
      material: document.querySelector(".material"),
      quantidade: document.querySelector(".quantidade"),
      impressao: document.querySelector(".impressao"),
      cores: document.querySelector(".cores"),
      calco: document.querySelector(".calco"),
      corte: document.querySelector(".corte"),
      acabamento: document.querySelector(".acabamento"),
      bainha: document.querySelector(".bainha"),
      mascara: document.querySelector(".mascara"),
      laminacao: document.querySelector(".laminacao"),
    };

    let i = 0;
    function mostrarEstiloBotao() {
      let esconder = formCorpo.getElementsByClassName("estilo_botao");
      for (i; i < esconder.length; i++) {
        esconder[i].style.display = "flex";
      }
    }
    switch (tipoSelecionado) {
      case "uv":
        // formCorpo.style.backgroundImage = "url(../img/gabarito_layout_uv.png)";

        mostrarEstiloBotao();

        estilos.mascara.style.display = "none";
        estilos.laminacao.style.display = "none";
        estilos.bainha.style.display = "none";

        estilos.informacoesLayout.gridTemplateAreas = `'dimFinal'
          'sangra'
          'material'
          'quantidade'
          'impressao'
          'cores'
          'calco'
          'corte'
          'acabamento'`;
        break;

      case "adesivo":
        // formCorpo.style.backgroundImage =
        // "url(../img/gabarito_layout_adesivo.png)";

        mostrarEstiloBotao();

        estilos.cores.style.display = "none";
        estilos.calco.style.display = "none";
        estilos.bainha.style.display = "none";

        estilos.informacoesLayout.gridTemplateAreas = `'dimFinal'
          'sangra'
          'material'
          'quantidade'
          'impressao'
          'laminacao'
          'corte'
          'mascara'
          'acabamento'`;
        break;

      case "recorte":
        // formCorpo.style.backgroundImage =
        // "url(../img/gabarito_layout_recorte.png)";

        mostrarEstiloBotao();

        estilos.impressao.style.display = "none";
        estilos.cores.style.display = "none";
        estilos.calco.style.display = "none";
        estilos.laminacao.style.display = "none";
        estilos.bainha.style.display = "none";

        estilos.informacoesLayout.gridTemplateAreas = `'dimFinal'
          'sangra'
          'material'
          'quantidade'
          'corte'
          'mascara'
          'acabamento'
          '.'
          '.'`;

        break;

      case "tecido":
        // formCorpo.style.backgroundImage =
        // "url(../img/gabarito_layout_lona.png)";

        mostrarEstiloBotao();

        estilos.impressao.style.display = "none";
        estilos.cores.style.display = "none";
        estilos.calco.style.display = "none";
        estilos.corte.style.display = "none";
        estilos.laminacao.style.display = "none";
        estilos.mascara.style.display = "none";

        estilos.informacoesLayout.gridTemplateAreas = `'dimFinal'
          'sangra'
          'material'
          'quantidade'
          'acabamento'
          'bainha'
          '.'
          '.'
          '.'`;
        break;

      case "lona":
        // formCorpo.style.backgroundImage =
        // "url(../img/gabarito_layout_lona.png)";

        mostrarEstiloBotao();

        estilos.impressao.style.display = "none";
        estilos.cores.style.display = "none";
        estilos.calco.style.display = "none";
        estilos.corte.style.display = "none";
        estilos.laminacao.style.display = "none";
        estilos.mascara.style.display = "none";

        estilos.informacoesLayout.gridTemplateAreas = `'dimFinal'
          'sangra'
          'material'
          'quantidade'
          'acabamento'
          'bainha'
          '.'
          '.'
          '.'`;

        console.log(
          estilos.impressao.style.display,
          estilos.cores.style.display,
          estilos.calco.style.display,
          estilos.corte.style.display,
          estilos.bainha.style.display
        );

        break;
    }
  });

  const uploadPdfInput = document.getElementById("upload_pdf");
  const pdfRender = document.getElementById("layout_area");

  uploadPdfInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
      const pdfURL = URL.createObjectURL(file);
      const pdf = await pdfjsLib.getDocument(pdfURL).promise;
      const page = await pdf.getPage(1); // Renderiza apenas a primeira página

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      pdfRender.innerHTML = ""; // Limpa a área
      pdfRender.appendChild(canvas);

      // Dimensões da div de exibição
      const divWidth = pdfRender.offsetWidth;
      const divHeight = pdfRender.offsetHeight;

      // Calcula o viewport do PDF
      const viewport = page.getViewport({ scale: 1 });

      // Determina a escala para limitar ao tamanho máximo da div
      const scale = Math.min(
        divWidth / viewport.width,
        divHeight / viewport.height
      );

      // Atualiza o viewport com a escala calculada
      const scaledViewport = page.getViewport({ scale });

      // Ajusta o canvas para as novas dimensões
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      // Renderiza o PDF com o contexto ajustado
      await page.render({
        canvasContext: context,
        viewport: scaledViewport,
      }).promise;
    }
  });
});

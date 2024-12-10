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
  const pdfCanvas = document.getElementById("pdf-canvas");
  const cotasCanvas = document.getElementById("cotas-canvas");
  const container = document.getElementById("layout_area");

  const pdfCtx = pdfCanvas.getContext("2d");
  const cotasCtx = cotasCanvas.getContext("2d");

  uploadPdfInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
      const pdfURL = URL.createObjectURL(file);
      const pdf = await pdfjsLib.getDocument(pdfURL).promise;
      const page = await pdf.getPage(1); // Renderiza apenas a primeira página

      // Obtém as dimensões reais da página (em pontos, 1 ponto = 1/72 polegada)
      const originalViewport = page.getViewport({ scale: 1 });
      const pdfWidthPoints = originalViewport.width;
      const pdfHeightPoints = originalViewport.height;

      // Converte dimensões em pontos para milímetros
      const pdfWidthMm = (pdfWidthPoints / 72) * 25.4; // Largura em mm
      const pdfHeightMm = (pdfHeightPoints / 72) * 25.4; // Altura em mm

      // Calcula escala para ajustar ao container
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const scale = Math.min(
        containerWidth / pdfWidthPoints,
        containerHeight / pdfHeightPoints
      );

      // Atualiza o viewport com a escala calculada
      const scaledViewport = page.getViewport({ scale });

      // Ajusta os canvases às dimensões escaladas
      pdfCanvas.width = scaledViewport.width;
      pdfCanvas.height = scaledViewport.height;

      cotasCanvas.width = scaledViewport.width;
      cotasCanvas.height = scaledViewport.height;

      // Renderiza o PDF no canvas principal
      await page.render({
        canvasContext: pdfCtx,
        viewport: scaledViewport,
      }).promise;

      // Renderiza as cotas no canvas de cotas
      cotasCtx.clearRect(0, 0, cotasCanvas.width, cotasCanvas.height); // Limpa o canvas
      cotasCtx.font = "14px Arial";
      cotasCtx.fillStyle = "cyan";
      cotasCtx.strokeStyle = "cyan";

      // Cotas horizontais
      cotasCtx.beginPath();
      cotasCtx.moveTo(0, scaledViewport.height - 10);
      cotasCtx.lineTo(scaledViewport.width, scaledViewport.height - 10);
      cotasCtx.stroke();
      cotasCtx.fillText(
        `${pdfWidthMm.toFixed(2)} mm`,
        scaledViewport.width / 2 - 60,
        scaledViewport.height - 15
      );

      // Cotas verticais
      cotasCtx.beginPath();
      cotasCtx.moveTo(scaledViewport.width - 10, 0);
      cotasCtx.lineTo(scaledViewport.width - 10, scaledViewport.height);
      cotasCtx.stroke();
      cotasCtx.save();
      cotasCtx.translate(scaledViewport.width - 15, scaledViewport.height / 2);
      cotasCtx.rotate(-Math.PI / 2);
      cotasCtx.fillText(`${pdfHeightMm.toFixed(2)} mm`, -50, 0);
      cotasCtx.restore();
    }
  });
});

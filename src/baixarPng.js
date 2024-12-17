document.getElementById("btnSaveAsPNG").addEventListener("click", () => {
  const elemento = document.querySelector("form"); // Elemento que você quer capturar (ou outro ID)

  domtoimage
    .toPng(elemento, {
      width: elemento.offsetWidth * 2, // Redimensiona a largura para maior qualidade
      height: elemento.offsetHeight * 2, // Redimensiona a altura
      style: { transform: "scale(2)", transformOrigin: "top left" }, // Aplica zoom para capturar em alta resolução
    })
    .then((dataUrl) => {
      // Cria um link temporário para download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "captura.png";

      // Simula o clique no link para iniciar o download
      link.click();
    })
    .catch((error) => {
      console.error("Erro ao gerar a imagem:", error);
    });
});

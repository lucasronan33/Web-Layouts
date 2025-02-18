function updateFormInputs() {
  // Atualiza inputs de texto e senha
  document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"], input[type="number"]').forEach(input => {
    input.setAttribute('value', input.value);
  });

  // Atualiza textareas
  document.querySelectorAll('textarea').forEach(textarea => {
    textarea.textContent = textarea.value;
  });

  // Atualiza selects
  document.querySelectorAll('select').forEach(select => {
    select.querySelectorAll('option').forEach(option => {
      option.removeAttribute('selected');
      if (option.value === select.value) {
        option.setAttribute('selected', 'selected');
      }
    });
  });
}

document.getElementById("btnSaveAsPNG").addEventListener("click", () => {
  updateFormInputs()

  const elemento = document.querySelector("form"); // Elemento que você quer capturar (ou outro ID)

  // Força o reflow para garantir o estado visual atualizado
  elemento.offsetHeight

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
      link.download = "---LAYOUT-.png";

      // Simula o clique no link para iniciar o download
      link.click();
    })
    .catch((error) => {
      alert("Erro ao gerar a imagem:", error);
    });
});

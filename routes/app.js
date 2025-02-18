const express = require("express");
const fs = require("fs"); //biblioteca nativa Node
const path = require("path"); //biblioteca nativa Node

const app = express();
const port = 3000;

// Configurando engine EJS
app.set("view engine", "ejs");
const diretorioRaiz = path.join(__dirname, '../')
app.set("views", diretorioRaiz);

// Configurar diretórios para arquivos estáticos
app.use(express.static(diretorioRaiz)); // Para CSS e scripts
app.use("/img", express.static(path.join(diretorioRaiz, '/img'))); // Para imagens
app.use("/fonts", express.static(path.join(diretorioRaiz, '/fonts'))); // Para fontes
app.use("/src", express.static(path.join(diretorioRaiz, '/src'))); // Para recursos

// Rota para template EJS
app.get("/", (req, res) => {
  res.sendFile(diretorioRaiz, "index.html");
});
console.log(diretorioRaiz, 'index.html')

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log('Diretório raiz do projeto: ', path.join(diretorioRaiz));

});
module.exports = app

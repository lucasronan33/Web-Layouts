const express = require("express");
const fs = require("fs"); //biblioteca nativa Node
const path = require("path"); //biblioteca nativa Node

const app = express();
const port = 3000;

// Configurando engine EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../"));

// Configurar diretórios para arquivos estáticos
app.use(express.static(path.join(__dirname, "../"))); // Para CSS e scripts
app.use("/img", express.static(path.join(__dirname, "../"))); // Para imagens
app.use("/fonts", express.static(path.join(__dirname, "../"))); // Para fontes

// Rota para template EJS
app.get("/", (req, res) => {
  res.sendFile(__dirname, "../index.html");
});
console.log(__dirname, 'index.html')

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir CSS y JS
app.use('/css', express.static(path.join(__dirname, "css")));
app.use('/js', express.static(path.join(__dirname, "js")));

// Servir HTML
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/formulario", (req, res) => {
  res.sendFile(path.join(__dirname, "public/formulario.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



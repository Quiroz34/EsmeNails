const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos
app.use('/css', express.static(path.join(__dirname, "css")));
app.use('/js', express.static(path.join(__dirname, "js")));
app.use('/multi', express.static(path.join(__dirname, "public/multi")));

// Servir HTML desde la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Rutas principales
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/formulario", (req, res) => {
  res.sendFile(path.join(__dirname, "public/formulario.html"));
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public/404.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`💅 Glam Nails Studio - Formulario WhatsApp activo`);
  console.log(`📱 Los formularios se envían directamente vía WhatsApp`);
});
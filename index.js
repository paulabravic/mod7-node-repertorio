const express = require("express"); //importamos express
const fs = require("fs");

const app = express(); //instanciamos express
const port = 3000; //definimos puerto

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
  const newCancion = JSON.parse(fs.readFileSync("repertorio.json"));
  res.json(newCancion);
});

app.post("/canciones", (req, res) => {
  const cancion = req.body;

  if (
    cancion !== undefined &&
    cancion.titulo !== undefined &&
    cancion.titulo !== ""
  ) {
    const newCancion = JSON.parse(fs.readFileSync("repertorio.json"));
    newCancion.push(cancion);
    fs.writeFileSync("repertorio.json", JSON.stringify(newCancion));
    res.send("Nueva canción Agregada");
  } else {
    res.status(400).send("Debe enviar un objeto canción.");
  }
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones[index] = cancion;
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("Canción modificada con éxito");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones.splice(index, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("Canción eliminada con éxito");
});

app.listen(port, () => console.log("Servidor escuchado en puerto 3000"));


const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const studiosFilePath = path.join(__dirname, "../../data/studios.json");

// Leer tareas desde el archivo
const readStudios = () => {
  const studiosData = fs.readFileSync(studiosFilePath);
  return JSON.parse(studiosData); 
};

// Escribir tareas en el archivo
const writeStudios = (studios) => {
  fs.writeFileSync(studiosFilePath, JSON.stringify(studios, null, 2)); 
};

// Crear una nuevo anime
router.post("/", (req, res) => {
  const studios = readStudios();
  const newStudio = {
    id: studios.length + 1, 
    name: req.body.name, 
  };
  studios.push(newStudio);
  writeStudios(studios);
  res.status(201).json({ studio: newStudio });
});

// Obtener todos los animes
router.get("/", (req, res) => {
  const studios = readStudios();
  res.json(studios);
});

// Obtener una anime por ID
router.get("/:id", (req, res) => {
  const studios = readStudios();
  const studio = studios.find((t) => t.id === parseInt(req.params.id));
  if (!studio) {
    return res.status(404).json({ message: "Estudio no encontrado" });
  }
  res.json(studio);
});

// Actualizar un anime por ID
router.put("/:id", (req, res) => {
  const studios = readStudios();
  const studiosIndex = studios.findIndex((t) => t.id === parseInt(req.params.id));
  if (studiosIndex === -1) {
    return res.status(404).json({ message: "Estudio no encontrado" });
  }
  const updateStudio = {
    ...studios[studiosIndex],
    name: req.body.name,
  };
  studios[studiosIndex] = updateStudio;
  writeStudios(studios);
  res.json({ message: "Estudio actualizado exitosamente", studio: updateStudio });
});

// Eliminar una tarea por ID
router.delete("/:id", (req, res) => {
  const studios = readStudios();
  const newStudios = studios.filter((t) => t.id !== parseInt(req.params.id));
  if (animes.length === newStudios.length) {
    return res.status(404).json({ message: "Estudio no encontrado" });
  }
  writeStudios(newStudios);
  res.json({ message: "Estudio eliminado exitosamente" });
});

module.exports = router;
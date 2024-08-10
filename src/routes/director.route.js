const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const directorsFilePath = path.join(__dirname, "../../data/directors.json");

// Leer tareas desde el archivo
const readDirectors = () => {
    const directorsData = fs.readFileSync(directorsFilePath);
    return JSON.parse(directorsData);
};

// Escribir tareas en el archivo
const writeDirectors = (directors) => {
    fs.writeFileSync(directorsFilePath, JSON.stringify(directors, null, 2));
};

// Crear una nuevo anime
router.post("/", (req, res) => {
    const directors = readDirectors();
    const newDirector = {
        id: directors.length + 1,
        name: req.body.name,
    };
    directors.push(newDirector);
    writeDirectors(directors);
    res.status(201).json({ director: newDirector });
});

// Obtener todos los animes
router.get("/", (req, res) => {
    const directors = readDirectors();
    res.json(directors);
});

// Obtener una anime por ID
router.get("/:id", (req, res) => {
    const directors = readDirectors();
    const director = directors.find((t) => t.id === parseInt(req.params.id));
    if (!director) {
        return res.status(404).json({ message: "Director no encontrado" });
    }
    res.json(director);
});

// Actualizar un anime por ID
router.put("/:id", (req, res) => {
    const directors = readDirectors();
    const directorsIndex = directors.findIndex((t) => t.id === parseInt(req.params.id));
    if (directorsIndex === -1) {
        return res.status(404).json({ message: "Director no encontrado" });
    }
    const updateDirector = {
        ...directors[directorsIndex],
        name: req.body.name,
    };
    directors[directorsIndex] = updateDirector;
    writeDirectors(directors);
    res.json({ message: "Director actualizado exitosamente", director: updateDirector });
});

// Eliminar una tarea por ID
router.delete("/:id", (req, res) => {
    const directors = readDirectors();
    const newDirectors = directors.filter((t) => t.id !== parseInt(req.params.id));
    if (animes.length === newDirectors.length) {
        return res.status(404).json({ message: "Estudio no encontrado" });
    }
    writeDirectors(newDirectors);
    res.json({ message: "Estudio eliminado exitosamente" });
});

module.exports = router;
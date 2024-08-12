const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3001;

// Middleware para permitir solicitudes CORS y parsear JSON
app.use(cors());
app.use(express.json());

/**
 * Endpoint para obtener las preguntas del archivo questions.json
 */
app.get('/questions', (req, res) => {
  fs.readFile('questions.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading questions'); // Manejo de errores al leer el archivo
    } else {
      res.json(JSON.parse(data)); // Enviar las preguntas como respuesta en formato JSON
    }
  });
});

/**
 * Endpoint para obtener el historial de partidas desde el archivo history.json
 */
app.get('/history', (req, res) => {
  fs.readFile('history.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading history'); // Manejo de errores al leer el archivo
    } else {
      res.json(JSON.parse(data)); // Enviar el historial como respuesta en formato JSON
    }
  });
});

/**
 * Endpoint para guardar una nueva entrada en el historial de partidas
 */
app.post('/history', (req, res) => {
  const newEntry = req.body; // Obtener la nueva entrada del cuerpo de la solicitud

  // Leer el archivo history.json para obtener el historial actual
  fs.readFile('history.json', 'utf8', (err, data) => {
    let history = [];

    if (!err) {
      // Si no hubo errores al leer el archivo, parsear su contenido
      history = JSON.parse(data);
    }

    // Agregar la nueva entrada al historial
    history.push(newEntry);

    // Guardar el historial actualizado en el archivo history.json
    fs.writeFile('history.json', JSON.stringify(history, null, 2), 'utf8', (err) => {
      if (err) {
        res.status(500).send('Error saving history'); // Manejo de errores al guardar el archivo
      } else {
        res.status(200).send('History updated'); // Confirmar que el historial se actualizó correctamente
      }
    });
  });
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

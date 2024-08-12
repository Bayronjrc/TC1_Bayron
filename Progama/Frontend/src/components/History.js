import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css'; // Importa el archivo CSS para los estilos

const History = ({ onReturnToMenu }) => {
  // Estado para almacenar el historial de partidas
  const [history, setHistory] = useState([]);

  // Efecto para cargar el historial de partidas al montar el componente
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Solicita el historial de partidas desde la API
        const response = await axios.get('http://localhost:3001/history');
        setHistory(response.data); // Actualiza el estado con el historial recibido
      } catch (error) {
        console.error('Error fetching history:', error); // Maneja errores en la solicitud
      }
    };

    fetchHistory();
  }, []); // Dependencia vacía para ejecutar solo una vez al montar

  return (
    <div className="history-container">
      <h2>Historial de Partidas</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            Jugador: {entry.playerName}, Puntaje: {entry.score}
          </li>
        ))}
      </ul>
      <button onClick={onReturnToMenu}>Regresar al Menú Principal</button>
    </div>
  );
};

export default History;

import React, { useState } from 'react';
import Game from './Game';
import History from './History';
import './Home.css'; // Importa el archivo CSS para los estilos
import image from '../images/OIP.jpg'; // Importa la imagen para mostrar en la pantalla de inicio

const Home = ({ onStartGame, onShowHistory }) => {
  // Estado para almacenar el nombre del jugador
  const [playerName, setPlayerName] = useState('');
  // Estado para manejar si el juego ha comenzado
  const [isGameStarted, setIsGameStarted] = useState(false);
  // Estado para manejar si se está viendo el historial
  const [isViewingHistory, setIsViewingHistory] = useState(false);
  // Estado para manejar si se está ingresando el nombre del jugador
  const [isEnteringName, setIsEnteringName] = useState(false);

  // Función para iniciar el proceso de ingreso del nombre del jugador
  const startGame = () => {
    setIsEnteringName(true);
  };

  // Función para iniciar el juego después de ingresar el nombre
  const handleStartGame = () => {
    if (playerName.trim()) {
      onStartGame(playerName); // Pasa el nombre del jugador al componente principal
      setIsGameStarted(true);
    }
  };

  // Función para ver el historial de partidas
  const viewHistory = () => {
    onShowHistory(); // Llama a la función para mostrar el historial en el componente principal
    setIsViewingHistory(true);
  };

  // Función para regresar al menú principal
  const returnToMenu = () => {
    setIsGameStarted(false);
    setIsViewingHistory(false);
    setIsEnteringName(false);
  };

  // Si el juego ha comenzado, muestra el componente Game
  if (isGameStarted) {
    return <Game playerName={playerName} onReturnToMenu={returnToMenu} />;
  }

  // Si se está viendo el historial, muestra el componente History
  if (isViewingHistory) {
    return <History onReturnToMenu={returnToMenu} />;
  }

  return (
    <div className="home-container">
      <img src={image} alt="Preguntados" /> {/* Muestra la imagen de fondo */}
      {!isEnteringName ? (
        <>
          <button onClick={startGame}>Jugar</button> {/* Botón para iniciar el juego */}
          <button onClick={viewHistory}>Historial</button> {/* Botón para ver el historial */}
        </>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          /> {/* Campo de texto para ingresar el nombre del jugador */}
          <button onClick={handleStartGame}>Comenzar</button> {/* Botón para comenzar el juego */}
        </div>
      )}
    </div>
  );
};

export default Home;

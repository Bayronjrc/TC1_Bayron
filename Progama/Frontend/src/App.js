import React, { useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import History from './components/History';

const App = () => {
  // Estado para manejar la pantalla actual ('home', 'game', 'history')
  const [screen, setScreen] = useState('home');
  // Estado para almacenar el nombre del jugador
  const [playerName, setPlayerName] = useState('');

  // Función para iniciar el juego, establece el nombre del jugador y cambia la pantalla a 'game'
  const startGame = (name) => {
    setPlayerName(name);
    setScreen('game');
  };

  // Función para regresar al menú principal, reinicia el nombre del jugador y cambia la pantalla a 'home'
  const returnToMenu = () => {
    setPlayerName(''); // Limpia el nombre del jugador
    setScreen('home'); // Regresa a la pantalla de inicio
  };

  return (
    <div>
      {/* Muestra la pantalla de inicio si 'screen' es 'home' */}
      {screen === 'home' && <Home onStartGame={startGame} onShowHistory={() => setScreen('history')} />}
      {/* Muestra la pantalla del juego si 'screen' es 'game' */}
      {screen === 'game' && <Game playerName={playerName} onReturnToMenu={returnToMenu} />}
      {/* Muestra la pantalla del historial si 'screen' es 'history' */}
      {screen === 'history' && <History onReturnToMenu={returnToMenu} />}
    </div>
  );
};

export default App;

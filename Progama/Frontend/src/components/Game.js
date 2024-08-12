import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.css'; // Importa el archivo CSS para los estilos

const Game = ({ playerName, onReturnToMenu }) => {
  // Estado para almacenar las preguntas del juego
  const [questions, setQuestions] = useState([]);
  // Estado para manejar el índice de la pregunta actual
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Estado para manejar el puntaje del jugador
  const [score, setScore] = useState(0);
  // Estado para manejar el número de respuestas incorrectas
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  // Estado para manejar si el juego ha terminado
  const [gameOver, setGameOver] = useState(false);
  // Estado para manejar el mensaje de resultado del juego
  const [resultMessage, setResultMessage] = useState('');

  // Efecto para cargar las preguntas al inicio del juego
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Solicita las preguntas desde la API
        const response = await axios.get('http://localhost:3001/questions');
        // Mezcla las preguntas y toma las primeras 10
        const shuffledQuestions = response.data.sort(() => 0.5 - Math.random()).slice(0, 10);
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Función para manejar la respuesta seleccionada por el jugador
  const handleAnswer = (selectedOption) => {
    if (questions[currentQuestionIndex].answer === selectedOption) {
      setScore(score + 1); // Incrementa el puntaje si la respuesta es correcta
    } else {
      setIncorrectAnswers(incorrectAnswers + 1); // Incrementa el número de respuestas incorrectas
      if (incorrectAnswers + 1 === 5) {
        endGame('Derrota: Has cometido 5 errores.'); // Termina el juego si se alcanzan 5 errores
        return;
      }
    }

    // Mueve al siguiente índice de pregunta o termina el juego
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (score + 1 >= 6) {
        endGame(`Victoria: Has ganado con ${score + 1} aciertos.`);
      } else {
        endGame(`Derrota: Solo obtuviste ${score + 1} aciertos.`);
      }
    }
  };

  // Función para terminar el juego y guardar los resultados
  const endGame = (message) => {
    setGameOver(true); // Marca el juego como terminado
    setResultMessage(message); // Establece el mensaje de resultado

    const gameData = {
      playerName,
      score,
      incorrectAnswers,
    };

    // Envía los datos del juego al servidor para guardarlos en el historial
    axios.post('http://localhost:3001/history', gameData)
      .then(() => console.log('Game saved successfully'))
      .catch((error) => console.error('Error saving game:', error));
  };

  // Renderiza la pantalla de final del juego si el juego ha terminado
  if (gameOver) {
    return (
      <div className="game-container">
        <h2>{resultMessage}</h2>
        <p>Puntaje final: {score} aciertos, {incorrectAnswers} errores</p>
        <button onClick={onReturnToMenu}>Regresar al Menú Principal</button>
      </div>
    );
  }

  // Renderiza un mensaje de carga si las preguntas aún no están disponibles
  if (questions.length === 0) {
    return <div className="game-container">Cargando preguntas...</div>;
  }

  // Renderiza la pregunta actual y las opciones de respuesta
  return (
    <div className="game-container">
      <h2>Jugador: {playerName}</h2>
      <h3>Puntos: {score}</h3>
      <p>{questions[currentQuestionIndex].question}</p>
      <ul>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Game;

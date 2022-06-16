import React, { useEffect, useState } from 'react';
import { MainButton } from './styles/Buttons';
import PlayerBox from './components/playerBox';
import Grid from './styles/Grid';

const App = () => {
  const [players, setPlayers] = useState([false]);
  const [color, setColor] = useState('lightblue');
  const [startTime, setStartTime] = useState(0);
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    window.addEventListener('keyup', (e) => checkSpace(e));
    return () => {
      window.removeEventListener('keyup', (e) => checkSpace(e));
    };
  }, []);

  const startGame = () => {
    if (!gameStarted) {
      setColor('red');
      setTimeout(function () {
        setColor('green');
        const date = new Date();
        setStartTime(date.getTime());
        setGameStarted(true);
      }, 1000);
    }
  };

  // const getRandomTime = (max: number) => {
  //   return Math.random() * max + 1;
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlayers([false]);
    for (let i = 1; i < numberOfPlayers; i++) {
      setPlayers((oldArray) => [...oldArray, false]);
    }
    console.log(players.length);
  };

  const checkSpace = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === ' ') {
      startGame();
    }
  };

  return (
    <>
      <h1>Reaction Time Test</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Set Number of Players:
          <input
            type='number'
            value={numberOfPlayers}
            onChange={(e) => setNumberOfPlayers(e.target.valueAsNumber)}
          />
        </label>
      </form>

      <Grid>
        {players.map((player, index) => {
          return (
            <PlayerBox
              key={index}
              index={index}
              color={color}
              startTime={startTime}
              players={players}
              gameStarted={gameStarted}
              setColor={setColor}
              setPlayers={setPlayers}
              setGameStarted={setGameStarted}
            ></PlayerBox>
          );
        })}
      </Grid>
      <MainButton onClick={() => startGame()}>Start (spacebar)</MainButton>
    </>
  );
};

export default App;

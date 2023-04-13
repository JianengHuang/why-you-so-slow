import React, { useEffect, useState } from 'react';
import { MainButton } from './styles/Buttons';
import PlayerBox from './components/playerBox';
import Grid from './styles/Grid';

const App = () => {
  const [players, setPlayers] = useState([false]);
  const [colors, setColors] = useState(['lightblue']);
  const [startTime, setStartTime] = useState(0);
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    console.log('event listener added');
    console.log(numberOfPlayers);
    window.addEventListener('keyup', (e) => checkSpace(e));
    window.removeEventListener('keyup', (e) => checkSpace(e));
    return () => {
      console.log('clean up');
    };
  }, [numberOfPlayers]);

  useEffect(() => {
    console.log('number of players set');
  }, [setNumberOfPlayers]);

  const startGame = (numberOfPlayers: number) => {
    console.log(numberOfPlayers);
    if (!gameStarted) {
      // console.log(numberOfPlayers);
      setAllColors('red');
      setPlayersReady();
      // console.log(players);
      setTimeout(function () {
        setAllColors('green');
        const date = new Date();
        setStartTime(date.getTime());
        setGameStarted(true);
      }, 1000);
    }
  };

  // const getRandomTime = (max: number) => {
  //   return Math.random() * max + 1;
  // };

  const setPlayersReady = () => {
    let newPlayers = [];
    let newColors = [];
    for (let i = 0; i < players.length; i++) {
      newPlayers[i] = true;
      newColors[i] = 'lightblue';
    }
    // console.log(newPlayers, newColors);
    setPlayers(newPlayers);
    setColors(newColors);
  };

  const setAllColors = (color: string) => {
    let newColors = [];
    for (let i = 0; i < players.length; i++) {
      newColors[i] = color;
    }
    setColors(newColors);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlayers([false]);
    for (let i = 1; i < numberOfPlayers; i++) {
      setPlayers((oldArray) => [...oldArray, false]);
    }
  };

  const checkSpace = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === ' ') {
      startGame(numberOfPlayers);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPlayers(e.target.valueAsNumber);
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
            onChange={(e) => handleChange(e)}
          />
        </label>
      </form>

      <Grid>
        {players.map((player, index) => {
          return (
            <PlayerBox
              key={index}
              index={index}
              colors={colors}
              startTime={startTime}
              players={players}
              gameStarted={gameStarted}
              setColors={setColors}
              setPlayers={setPlayers}
              setGameStarted={setGameStarted}
            ></PlayerBox>
          );
        })}
      </Grid>
      <MainButton onClick={() => startGame(numberOfPlayers)}>
        Start (spacebar)
      </MainButton>
    </>
  );
};

export default App;

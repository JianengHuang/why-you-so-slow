import ColoredBox from '../styles/ColoredBox';
import { useState, useEffect } from 'react';

interface gameInterface {
  index: number;
  colors: string[];
  startTime: number;
  players: Array<boolean>;
  gameStarted: boolean;
  setColors: (newColor: string[]) => void;
  setPlayers: (newPlayers: Array<boolean>) => void;
  setGameStarted: (newGameStarted: boolean) => void;
}

const PlayerBox = ({index, colors, startTime, players, gameStarted, setColors, setPlayers, setGameStarted}: gameInterface) => {
  const [endTime, setEndTime] = useState(0);
  const [show, setShow] = useState(false);
  const [key, setKey] = useState('');

  useEffect(() => {
    window.addEventListener('keyup', (e) => checkKey(e));
    return () => {
      window.removeEventListener('keyup', (e) => checkKey(e));
    };
  }, [gameStarted]);

  const checkKey = (e: KeyboardEvent) => {
    // e.preventDefault();
    if (e.key === key) {
      endGame();
    }
  };

  const submitKey = (e: any) => {
    e.preventDefault();
    setKey(e.target.value);
    console.log(e.target.value);
  };

  const endGame = () => {
    console.log(startTime, endTime)
    if (endTime < startTime) {
      const newEndTime = new Date().getTime();
      setColorBlue();
      setEndTime(newEndTime);
      const newPlayers = players;
      newPlayers[index] = false;
      setPlayers(newPlayers);
      reloadGameState();
    }
  };

  const setColorBlue = () => {
    let newColors = colors;
    newColors[index] = 'lightblue';
    setColors(newColors);
  };

  const reloadGameState = () => {
    if (!players.includes(true)) {
      setGameStarted(false);
    }
    // console.log(props.players);
  };

  return (
    <ColoredBox color={colors[index]}>
      {/* <h2>Your Key: {key}</h2> */}
      { endTime > startTime && <h1>{endTime - startTime}</h1>}
      <button onClick={() => setShow(!show)}>Select Key</button>
      {show && (
        <form>
          <input
            type='text'
            maxLength={1}
            value={key}
            onChange={(e) => submitKey(e)}
          />
        </form>
      )}
      <button onClick={() => endGame()}>Stop</button>
    </ColoredBox>
  );
};

export default PlayerBox;

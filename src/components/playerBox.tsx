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

const PlayerBox = (props: gameInterface) => {
  const [endTime, setEndTime] = useState(0);
  const [show, setShow] = useState(false);
  const [key, setKey] = useState('');

  useEffect(() => {
    window.addEventListener('keyup', (e) => checkKey(e));
    return () => {
      window.removeEventListener('keyup', (e) => checkKey(e));
    };
  }, [props.gameStarted]);

  const checkKey = (e: KeyboardEvent) => {
    e.preventDefault();
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
    setColorBlue();
    const date = new Date();
    setEndTime(date.getTime() - props.startTime);
    const newPlayers = props.players;
    newPlayers[props.index] = false;
    props.setPlayers(newPlayers);
    reloadGameState();
  };

  const setColorBlue = () => {
    let newColors = props.colors;
    newColors[props.index] = 'lightblue';
    props.setColors(newColors);
  };

  const reloadGameState = () => {
    if (!props.players.includes(true)) {
      props.setGameStarted(false);
    }
    // console.log(props.players);
  };

  return (
    <ColoredBox color={props.colors[props.index]}>
      <h2>Your Key: {key}</h2>
      <h1>{endTime}</h1>
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

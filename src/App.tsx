import React, { useEffect, useRef, useState } from "react";
import { MainButton } from "./styles/Buttons";
import PlayerBox from "./components/playerBox";
import Grid from "./styles/Grid";
import NumberOfPlayersSelector from "./components/numberOfPlayersSelector";

const App = () => {
  const startTimeRef = useRef(0);
  const [players, setPlayers] = useState([true]);
  const [colors, setColors] = useState(["lightblue"]);
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const gameStartedRef = useRef(gameStarted);
  const playersRef = useRef(players);

  useEffect(() => {
    console.log("event listener added");
    document.addEventListener("keydown", (e) => waitForSpace(e));
    return () =>
      document.removeEventListener("keydown", (e) => console.log(e.key));
  }, []);

  useEffect(() => {
    gameStartedRef.current = gameStarted;
  }, [gameStarted]);

  useEffect(() => {
    console.log("players modified");
    if (!players.includes(false)) {
      setGameStarted(false);
    }
  }, [players, setPlayers]);

  const waitForSpace = (event: KeyboardEvent) => {
    if (event.key === " ") {
      console.log(players, startTimeRef.current);
      console.log(gameStartedRef);
      startGame(playersRef.current, gameStartedRef.current);
    }
  };

  const startGame = (players: boolean[], gameStarted: boolean) => {
    console.log(gameStarted, numberOfPlayers);
    if (!gameStarted) {
      // console.log(numberOfPlayers);
      setTimeout(() => {
        setAllColors("red");
      }, 0)
      setPlayersReady();
      // console.log(players);
      setTimeout(function () {
        setAllColors("green");
        startTimeRef.current = Date.now();
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
      newColors[i] = "lightblue";
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
    setPlayers([true]);
    for (let i = 1; i < numberOfPlayers; i++) {
      setPlayers((oldArray) => [...oldArray, true]);
    }
  };

  // const checkSpace = (e: KeyboardEvent) => {
  //   e.preventDefault();
  //   if (e.key === ' ') {
  //     startGame(numberOfPlayers);
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPlayers(e.target.valueAsNumber);
  };

  return (
    <>
      <h1>Reaction Time Test</h1>
      <NumberOfPlayersSelector
        handleSubmit={handleSubmit}
        numberOfPlayers={numberOfPlayers}
        setNumberOfPlayers={setNumberOfPlayers}
        handleChange={handleChange}
      />
      <Grid>
        {players.map((player, index) => {
          return (
            <PlayerBox
              key={index}
              index={index}
              colors={colors}
              startTimeRef={startTimeRef}
              players={players}
              gameStarted={gameStarted}
              setColors={setColors}
              setPlayers={setPlayers}
              setGameStarted={setGameStarted}
            ></PlayerBox>
          );
        })}
      </Grid>
      <MainButton onClick={() => startGame(players, gameStarted)}>
        Start (spacebar)
      </MainButton>
    </>
  );
};

export default App;

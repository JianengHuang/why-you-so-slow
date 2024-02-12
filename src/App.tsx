import React, { useState, useEffect } from "react";
import Component from './components/Component';

export default function App() {
  const [gameInProcess, setGameInProcess] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [playersFinished, setPlayersFinished] = useState([true]);
  const [testTimeoutId, setTestTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!playersFinished.includes(false) && testTimeoutId) {
      setGameInProcess(false);
      setTestStarted(false);
      clearTimeout(testTimeoutId);
    }
  }, [playersFinished])

  const updatePlayersFinished = (index: number) => {
    setPlayersFinished(oldState => oldState.map((element, idx) => idx === index ? true : element));
  }

  const startGame = () => {
    if (!gameInProcess) {
      console.log("Game Started");
      playersFinished.map(value => false);
      setGameInProcess(true);
      const testTimeout = setTimeout(() => {
        startTest();
      }, Math.random() * 5000 + 1000)
      setTestTimeoutId(testTimeout);
    }
  }

  const startTest = () => {
    console.log("Test Started");
    setTestStarted(true);
  }

  return (
    <div className='App'>
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={startGame}>Start!</button>
      <hr />
      {playersFinished.map((_, index) => 
        <Component key={index} index={index} gameInProcess={gameInProcess} testStarted={testStarted} updatePlayersFinished={updatePlayersFinished}/>
      )}
    </div>
  );
}

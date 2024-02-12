import {useState, useEffect} from "react";

type Props = {
    index: number;
    gameInProcess: boolean;
    testStarted: boolean;
    updatePlayersFinished: (index: number) => void;
}

const Component = ({index, gameInProcess, testStarted, updatePlayersFinished}: Props) => {
  const [textInsideButton, setTextInsideButton] = useState<string>('0')
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    if (gameInProcess) {
      console.log("Game Started - From Component");
      setTextInsideButton("Ready...")
    }
  }, [gameInProcess])


  useEffect(() => {
    if (testStarted) {
      console.log("Test Started - From Component");
      setTextInsideButton("Go!!!");
      setStartTime(Date.now());
    }
  }, [testStarted])

  useEffect(() => {
    console.log(gameInProcess, testStarted);
    if (gameInProcess && testStarted) {
    setTextInsideButton((endTime - startTime).toString());
    } else if (gameInProcess) {
      setTextInsideButton("Busted!")
    }
  }, [endTime])

  const endGame = () => {
    setEndTime(Date.now());
    if (gameInProcess) updatePlayersFinished(index);
  }

  return (
    <>
      <div>I am a component</div>
      <button onClick={endGame}>{textInsideButton}</button>
    </>
  );
}
export default Component;

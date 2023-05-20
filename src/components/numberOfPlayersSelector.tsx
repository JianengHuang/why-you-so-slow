type props = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    numberOfPlayers: number,
    setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const NumberOfPlayersSelector = ({handleSubmit, numberOfPlayers, setNumberOfPlayers, handleChange}: props) => {
  return (
    <form onSubmit={handleSubmit}>
        <label>
          Set Number of Players:
          <input
            type='number'
            value={numberOfPlayers}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <input type='submit' value='Set' onSubmit={() => setNumberOfPlayers(numberOfPlayers)} />
      </form>

  )
}

export default NumberOfPlayersSelector
import { useState } from 'react'

const App = () => {

  const [counter, setCounter] = useState(0)
  const addToCounter = () => {
    return setCounter(counter + 1)
  }
  const restToZero = () => setCounter(0);

  return (
    <div>
      <h1>{counter}</h1>

      <br />
      <button onClick={addToCounter}>Add to counter</button>
      <br />
      <button onClick={restToZero}>Reset Counter</button>

    </div>
  )
}

export default App

import { useState } from 'react'

const Display = ({ counter }) => {
  return (<div>{counter}</div>);
}

export function Button({ onClick, text }) {
  return (<button onClick={onClick} > {text}</button >);
}



const App = () => {


  const [counter, setCounter] = useState(0)
  console.log("rendering with counter values", counter);
  const addToCounter = () => {
    console.log("increasingm value before: ", counter);
    return setCounter(counter + 1)
  }
  const restToZero = () => { console.log("to zero value before", counter); setCounter(0); }

  const decreaseByOne = () => {
    console.log('decreasing, value before', counter);
    setCounter(counter - 1);
  }

  return (
    <div>

      <Display counter={counter} />

      <br />
      <Button onClick={addToCounter} text="Add to counter" />
      <br />

      <Button onClick={restToZero} text="Reset to zero" />
      <br />
      <Button onClick={decreaseByOne} text="Decrease by one" />

    </div>
  )
}

export default App

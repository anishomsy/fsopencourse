import { useState } from 'react'


const App = () => {
  const [clicks, setClicks] = useState({
    right: 0,
    left: 0
  });

  const [allClicks, setAllClicks] = useState([]);



  const handleRightClick = () => {
    const newClick = {
      left: clicks.left,
      right: clicks.right + 1
    }

    const newAllClicks = [
      ...allClicks,
      "r"
    ]
    setClicks(newClick);
    setAllClicks(newAllClicks);
  }
  const handleLeftClick = () => {
    const newClick = {
      ...clicks,
      left: clicks.left + 1
    }
    const newAllClicks = allClicks.concat("l");
    setClicks(newClick);

    setAllClicks(newAllClicks);
  }

  return (

    <div>

      <p>left: {clicks.left}, right: {clicks.right}</p>
      <button onClick={handleRightClick}>Right</button>
      <br />
      <button onClick={handleLeftClick}>Left</button>
      <br />
      <p>{allClicks.join(" ")}</p>
    </div>
  )
}

export default App

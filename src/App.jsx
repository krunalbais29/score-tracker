import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ScoreNotebook from './components/ScoreNotebook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ScoreNotebook/>
    </>
  )
}

export default App

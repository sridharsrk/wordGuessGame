import {BrowserRouter, Routes, Route} from "react-router-dom";

import './App.css'

import WelcomePage from './components/WelcomePage/WelcomePage'
import GameScreen from "./components/GameScreen/GameScreen";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/GameScreen" element={<GameScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

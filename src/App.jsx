
import './App.css'
import GenerationsText from './text-genration';
import TextToSpeech from './TextToSpeech'
import {   Route, Routes } from 'react-router-dom';

function App() {


  return (
    <>
    <div className="App">
        <Routes>
          <Route path="/" element={<TextToSpeech />} />
          
          <Route path="/generations-text" element={<GenerationsText />} />
        </Routes>
      </div>
    </>
  )
}

export default App

// src/TextToSpeech.js
import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useNavigate } from 'react-router-dom';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [allVoices, setAllVoices] = useState([]);
  const { speak, voices } = useSpeechSynthesis();
  const navigate = useNavigate();

  useEffect(() => {
    const filteredVoices = voices.filter(
      (voice) => voice.lang.startsWith('hi-IN') || voice.lang.startsWith('en-IN')
    );
    setAllVoices(filteredVoices);
  }, [voices]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSpeak = () => {
    const selectedVoiceIndex = document.getElementById('voiceSelect').value;
    const selectedVoice = allVoices[selectedVoiceIndex];
    speak({ text, voice: selectedVoice });
  };

  const handleNavigate = () => {
    navigate('/generations-text');
  };

  return (
    <div>
      <h1>Text to Speech</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to be spoken"
        rows="5"
        cols="50"
      ></textarea>
      <br />
      <h2>Select Voice</h2>
      <select id="voiceSelect">
        {allVoices.map((voice, index) => (
          <option key={index} value={index}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
      <button onClick={handleSpeak}>Speak</button>
      <br />
      <button onClick={handleNavigate}>Go to Generations Text Page</button>
    </div>
  );
};

export default TextToSpeech;

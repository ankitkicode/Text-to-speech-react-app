// src/TextGeneration.js
import React, { useState } from 'react';
import axios from 'axios';

const TextGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleGenerateText = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer sk-proj-uIO3qwZzgdFxjLYr6hsTT3BlbkFJCiFgsVS3fzACpqP12qjp` // Replace with your OpenAI API key
          }
        }
      );
      setGeneratedText(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating text:', error);
      if (error.response && error.response.status === 429) {
        setError('Quota exceeded. Please check your plan and billing details.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };


  const textStyles = {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#333',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    wordWrap: 'break-word'
  };

  const errorStyles = {
    color: 'red',
    fontWeight: 'bold'
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Text Generation with Hugging Face</h1>
      <textarea
        value={prompt}
        onChange={handleInputChange}
        placeholder="Enter your prompt here"
        rows="5"
        cols="50"
        style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ddd' }}
      ></textarea>
      <br />
      <button
        onClick={handleGenerateText}
        disabled={loading}
        style={{ marginTop: '10px', padding: '10px 20px', fontSize: '1rem', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff' }}
      >
        {loading ? 'Generating...' : 'Generate Text'}
      </button>
      <h2>Generated Text</h2>
      <p style={textStyles}>{generatedText}</p>
      {error && <p style={errorStyles}>{error}</p>}
    </div>
  );
};

export default TextGeneration;

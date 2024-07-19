import React, { useState } from 'react';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleInputChange = (event) => {
    setNumbers(event.target.value);
  };

  const calculateSum = () => {
    try {
      const sum = calculate(numbers);
      setResult(sum);
      setErrorMessage(''); // Clear any previous error
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const calculate = (input) => {
    if (input === '') {
      return 0;
    }
  
    let delimiter = /[,\n]/; // Default delimiter is comma or newline
  
    if (input.startsWith('//')) {
      const parts = input.split('\n');
      const delimiterLine = parts[0].substring(2); // Extract custom delimiter
  
      // If the delimiter is wrapped in square brackets, extract it properly
      const delimiterMatch = delimiterLine.match(/^(\[.*\])$/);
      if (delimiterMatch) {
        const customDelimiter = delimiterMatch[1].slice(1, -1); // Remove surrounding brackets
        delimiter = new RegExp(customDelimiter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g'); // Escape special regex characters
      } else {
        delimiter = new RegExp(`[${delimiterLine}]`, 'g'); // Single character delimiter
      }
  
      input = parts.slice(1).join('\n'); // Remove the delimiter line
    } else {
      input = input.replace(/\n/g, ','); // Replace newlines with commas if no custom delimiter
    }
  
    const nums = input.split(delimiter).filter(num => num.trim() !== ''); // Filter out any empty strings
    let sum = 0;
    let negativeNumbers = [];
  
    for (const num of nums) {
      const parsedNum = parseInt(num, 10);
      if (isNaN(parsedNum)) {
        continue;
      }
      if (parsedNum < 0) {
        negativeNumbers.push(parsedNum);
      }
      sum += parsedNum;
    }
  
    if (negativeNumbers.length > 0) {
      throw new Error('negative numbers not allowed ' + negativeNumbers.join(','));
    }
  
    return sum;
  };
  
  
  
  
  return (
    <div className="App">
      <h1>String Calculator</h1>
      <input 
        type="text" 
        value={numbers} 
        onChange={handleInputChange} 
        placeholder="Enter numbers" 
      />
      <button onClick={calculateSum}>Calculate</button>
      <p>Result: {result}</p>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default App;

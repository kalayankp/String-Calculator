import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  test('adds empty string returns 0', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const calculateButton = screen.getByText('Calculate');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(calculateButton);

    expect(screen.getByText(/Result:\s*0/)).toBeInTheDocument();
  });

  test('adds single number returns the number', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const calculateButton = screen.getByText('Calculate');

    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.click(calculateButton);

    expect(screen.getByText(/Result:\s*1/)).toBeInTheDocument();
  });

  test('adds two numbers separated by comma', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const calculateButton = screen.getByText('Calculate');

    fireEvent.change(input, { target: { value: '1,2' } });
    fireEvent.click(calculateButton);

    expect(screen.getByText(/Result:\s*3/)).toBeInTheDocument();
  });

  test('adds any number of numbers separated by comma', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const calculateButton = screen.getByText('Calculate');

    fireEvent.change(input, { target: { value: '1,2,3,4' } });
    fireEvent.click(calculateButton);

    expect(screen.getByText(/Result:\s*10/)).toBeInTheDocument();
  });

  test('adds numbers separated by comma or newline', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const calculateButton = screen.getByText('Calculate');
  
    fireEvent.change(input, { target: { value: '12,3' } });
    fireEvent.click(calculateButton);
  
    screen.debug(); // Print the DOM for debugging purposes
  
    expect(screen.getByText(/Result:\s*15/)).toBeInTheDocument();
  });
  
  test('supports custom delimiter', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const calculateButton = screen.getByText('Calculate');
  
    fireEvent.change(input, { target: { value: '//;\n1;2' } });
    fireEvent.click(calculateButton);
  
    // Debug the DOM to inspect if result is properly rendered
    screen.debug();
  
    // Use a function to match text for better flexibility
    const resultElement = await screen.findByText((content, element) => {
      return content.includes('Result: 3');
    });
  
    expect(resultElement).toBeInTheDocument();
  });
  
  
  
  
  
  
  

  test('throws exception for negative numbers', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const calculateButton = screen.getByText('Calculate');

    fireEvent.change(input, { target: { value: '1,-2,3' } });
    fireEvent.click(calculateButton);

    expect(screen.getByText(/negative numbers not allowed -2/)).toBeInTheDocument();
  });

  test('throws exception for multiple negative numbers', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const calculateButton = screen.getByText('Calculate');

    fireEvent.change(input, { target: { value: '1,-2,-3' } });
    fireEvent.click(calculateButton);

    expect(screen.getByText(/negative numbers not allowed -2,-3/)).toBeInTheDocument();
  });
});

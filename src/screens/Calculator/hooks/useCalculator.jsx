import { useState } from 'react';
import { Vibration } from 'react-native';

export const useCalculator = () => {
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttons = [
    'C',
    'DEL',
    '/',
    7,
    8,
    9,
    '*',
    4,
    5,
    6,
    '-',
    1,
    2,
    3,
    '+',
    0,
    '.',
    '=',
  ];

  const calculator = () => {
    try {
      if (currentNumber.startsWith(0) && !currentNumber.includes('.')) {
        let result = eval(currentNumber.substr(1)).toString();
        setCurrentNumber(result);
        setLastNumber(result);
      } else {
        let result = eval(currentNumber).toString();
        setCurrentNumber(result);
        return;
      }
    } catch (error) {
      setCurrentNumber('ERROR');
    }
  };

  // Validacion para evitar tocar varias veces los operadores estando en 0
  const handleInput = (buttonPressed) => {
    switch (buttonPressed) {
      case 0:
        Vibration.vibrate(35);
        if (buttonPressed === 0 && currentNumber === '0') return;
        break;
      case '+':
        Vibration.vibrate(35);
        if (buttonPressed.includes('+') && currentNumber === '+') return;
        setCurrentNumber(currentNumber + buttonPressed);
        break;
      case '-':
        Vibration.vibrate(35);
        if (buttonPressed.includes('-') && currentNumber === '-') return;
        setCurrentNumber(currentNumber + buttonPressed);
        break;

      case '*':
        Vibration.vibrate(35);
        if (buttonPressed.includes('*') && currentNumber === '*') return;
        setCurrentNumber(currentNumber + buttonPressed);
        break;

      case '/':
        Vibration.vibrate(35);
        if (buttonPressed.includes('/') && currentNumber === '/') return;
        setCurrentNumber(currentNumber + buttonPressed);
        break;
    }
    if (
      buttonPressed === 1 ||
      buttonPressed === 2 ||
      buttonPressed === 3 ||
      buttonPressed === 4 ||
      buttonPressed === 5 ||
      buttonPressed === 6 ||
      buttonPressed === 7 ||
      buttonPressed === 8 ||
      buttonPressed === 9 ||
      buttonPressed === 0 ||
      buttonPressed === '.'
    ) {
      Vibration.vibrate(35);
    }
    switch (buttonPressed) {
      case 'DEL':
        Vibration.vibrate(35);
        if (currentNumber === 'ERROR') {
          setLastNumber('');
          setCurrentNumber('');
        } else {
          setCurrentNumber(
            currentNumber.substring(0, currentNumber.length - 1),
          );
        }
        return;
      case 'C':
        Vibration.vibrate(35);
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        Vibration.vibrate(35);
        setLastNumber(currentNumber);
        calculator();
        return;
      case '.':
        if (buttonPressed.includes('.') && currentNumber === '.') return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  };
  return {
    currentNumber,
    lastNumber,
    buttons,
    handleInput,
  };
};

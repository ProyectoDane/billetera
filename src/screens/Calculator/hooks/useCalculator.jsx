import { useState } from 'react';
import { Vibration } from 'react-native';

export const useCalculator = () => {
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttons = [
    'C',
    'DEL',
    '/',
    '7',
    '8',
    '9',
    'x',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    '=',
  ];

  const calculator = () => {
    try {
      if (currentNumber.startsWith('0') && !currentNumber.includes('.')) {
        let result = eval(currentNumber.substr(1)).toString();
        setCurrentNumber(result);
        setLastNumber(result);
      } else {
        let aux = currentNumber.replaceAll("x","*");
        let result = eval(aux);
        result = +result.toString();
        setCurrentNumber(result);
        return;
      }
    } catch (error) {
      console.error(error);
      setCurrentNumber('ERROR');
    }
  };

  const operations = "+-/x";
  // Validacion para evitar tocar varias veces los operadores estando en 0
  const handleInput = (buttonPressed) => {
    let lastChar = currentNumber.toString().charAt(currentNumber.length - 1);
    switch (buttonPressed) {
      case 0:
        Vibration.vibrate(35);
        if (buttonPressed === '0' && currentNumber === '0') return;
        break;
      case '+':
      case '-':
      case 'x':
      case '/':
        Vibration.vibrate(35);
        let isMultiplicaDivide = buttonPressed === '/' || buttonPressed === 'x';
        if (currentNumber.toString() === '' && isMultiplicaDivide)
          return;
        if (currentNumber.toString() === '+' && isMultiplicaDivide)
          return;

        if (currentNumber.toString() === '-' && isMultiplicaDivide)
          return;


        //no puee haber 2 operaciones seguidas
        if  (operations.indexOf(lastChar) >-1 ) {
          setCurrentNumber(currentNumber.toString().slice(0,-1) + buttonPressed);
          return;
        }
        //no puede haber una operacion despues de un "."
        if  (lastChar === '.' ) return;
        setCurrentNumber(currentNumber.toString() + buttonPressed);
        break;
      case '.':
        Vibration.vibrate(35);
        //No puede haber mas de 1 . seguido
        if  (lastChar === '.' )
          return;

        //Me fijo siempre que en el ultimo termino, haya solo 1 "."
        let terminos = currentNumber.toString().split(/[\-+x/]+/);
        let ultimo = terminos[terminos.length-1];
        if (ultimo.indexOf('.')>-1)
          return;
        break;
      case '=':
        //El ultimo caracter no puede ser una operacion
        if  (operations.indexOf(lastChar) >-1 )
          return;

        //me fijo que exista al menos una operacion
        let found = false;
        let str = currentNumber.toString();
        for (let operation of operations) {
          if (str.indexOf(operation) > -1) {
            found = true;
            break;
          }

        }
        if (!found)
          return;
        //---------------

        break
    }
    if (
      buttonPressed === '1' ||
      buttonPressed === '2' ||
      buttonPressed === '3' ||
      buttonPressed === '4' ||
      buttonPressed === '5' ||
      buttonPressed === '6' ||
      buttonPressed === '7' ||
      buttonPressed === '8' ||
      buttonPressed === '9' ||
      buttonPressed === '0' ||
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
    setCurrentNumber(currentNumber.toString() + buttonPressed);
  };
  return {
    currentNumber,
    lastNumber,
    buttons,
    handleInput,
  };
};

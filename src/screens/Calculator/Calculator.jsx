import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../constants';
import CalcBtn from './components';

import { useCalculator } from './hooks/useCalculator';

import { styles } from './styles';

const Calculator = () => {
  const { lastNumber, currentNumber, buttons, handleInput } = useCalculator();

  return (
    <View>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' ||
          button === '/' ||
          button === 'x' ||
          button === '-' ||
          button === '+' ? (
            <CalcBtn
              key={button}
              button={button}
              style={{ backgroundColor: colors.skyBlue }}
              styleText={{ color: colors.white, fontSize: 28 }}
              onPress={() => handleInput(button)}
            />
          ) : button === '0' ? (
            <CalcBtn
              key={button}
              button={button}
              isNumber
              onPress={() => handleInput(button)}
            />
          ) : button === '.' || button === 'DEL' ? (
            <CalcBtn
              arrowBackIcon={button === 'DEL'}
              key={button}
              button={button}
              style={{
                backgroundColor:
                  button === '.' ? colors.white : colors.softGray,
                minWidth: '37%',
              }}
              onPress={() => handleInput(button)}
            />
          ) : button === 'C' ? (
            <CalcBtn
              key={button}
              button={button}
              isNumber
              onPress={() => handleInput(button)}
            />
          ) : (
            <CalcBtn
              key={button}
              button={button}
              style={{
                backgroundColor:
                  typeof button === 'number' ? colors.white : colors.softGray,
              }}
              onPress={() => handleInput(button)}
            />
          ),
        )}
      </View>
    </View>
  );
};

export default Calculator;

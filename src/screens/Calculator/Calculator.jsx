import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../constants';
import CalcBtn from './components';

import {useCalculator} from './hooks/useCalculator';

import {styles} from './styles';

const Calculator = () => {
  const { lastNumber, currentNumber, buttons, handleInput } = useCalculator();

  return (
    <View>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
        <View style={{display: "flex", flexDirection: "column", minHeight: "66%" }}>
            <View style={{flexDirection: "row", display: "flex", flex: 1}}>
                <CalcBtn
                    key="C"
                    button="C"
                    style={{ flex: 3}}
                    // styleText={{color: colors.white, fontSize: 28}}
                    onPress={() => handleInput("C")}
                    isNumber={true}
                />
                <CalcBtn
                    key="DEL"
                    button="DEL"
                    arrowBackIcon={true}
                    style={{ flex: 3}}
                    // styleText={{color: colors.white, fontSize: 28}}
                    onPress={() => handleInput("DEL")}
                    isNumber={true}
                />

                <CalcBtn
                    key="/"
                    button="/"
                    style={{ flex: 2}}
                    // styleText={{color: colors.white, fontSize: 28}}
                    onPress={() => handleInput("/")}
                />
            </View>
            <View style={{flexDirection: "row", display: "flex",  flex: 1}}>
                <CalcBtn
                    key="7" button="7"
                    style={{ flex: 1}}
                    onPress={() => handleInput("7")}
                    isNumber={true}
                />
                <CalcBtn
                    key="8" button="8"
                    style={{ flex: 1}}
                    onPress={() => handleInput("8")}
                    isNumber={true}
                />
                <CalcBtn
                    key="9" button="9"
                    style={{ flex: 1}}
                    onPress={() => handleInput("9")}
                    isNumber={true}
                />

                <CalcBtn
                    key="x" button="x"
                    style={{ flex: 1}}
                    onPress={() => handleInput("x")}
                />
            </View>
            <View style={{flexDirection: "row", display: "flex",  flex: 1}}>
                <CalcBtn
                    key="4" button="4"
                    style={{ flex: 1}}
                    onPress={() => handleInput("4")}
                    isNumber={true}
                />
                <CalcBtn
                    key="5" button="5"
                    style={{ flex: 1}}
                    onPress={() => handleInput("5")}
                    isNumber={true}
                />
                <CalcBtn
                    key="6" button="6"
                    style={{ flex: 1}}
                    onPress={() => handleInput("6")}
                    isNumber={true}
                />

                <CalcBtn
                    key="-" button="-"
                    style={{ flex: 1}}
                    onPress={() => handleInput("-")}
                />
            </View>
            <View style={{flexDirection: "row", display: "flex",  flex: 1}}>
                <CalcBtn
                    key="1" button="1"
                    style={{ flex: 1}}
                    onPress={() => handleInput("1")}
                    isNumber={true}
                />
                <CalcBtn
                    key="2" button="2"
                    style={{ flex: 1}}
                    onPress={() => handleInput("2")}
                    isNumber={true}
                />
                <CalcBtn
                    key="3" button="3"
                    style={{ flex: 1}}
                    onPress={() => handleInput("3")}
                    isNumber={true}
                />

                <CalcBtn
                    key="+" button="+"
                    style={{ flex: 1}}
                    onPress={() => handleInput("+")}
                />
            </View>
            <View style={{flexDirection: "row", display: "flex", flex: 1}}>
                <CalcBtn
                    key="0"
                    button="0"
                    style={{ flex: 2}}
                    onPress={() => handleInput("0")}
                    isNumber={true}
                />
                <CalcBtn
                    key="."
                    button="."
                    style={{ flex: 1}}
                    onPress={() => handleInput(".")}
                    isNumber={true}
                />

                <CalcBtn
                    key="="
                    button="="
                    style={{flex: 1,  backgroundColor: colors.primary, color: colors.white,}}
                    styleText={{color: colors.white}}
                    onPress={() => handleInput("=")}
                />
            </View>
        </View>
    </View>
  );
};

export default Calculator;

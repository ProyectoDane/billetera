import React from 'react';
import {SafeAreaView, StatusBar, Text, useWindowDimensions} from 'react-native';

import OnboardSlide from '../../components/OnboardSlide';

import styles from './styles'

// Assets
import Pic01 from './assets/pic01.svg';
import Pic02 from './assets/pic02.svg';
import Pic03 from './assets/pic03.svg';
import {FontAwesome5} from "@expo/vector-icons";

const Onboarding = (props) => {

  const screenWidth = useWindowDimensions().width * 0.66;

  const text2Style = {
    ...styles.subtitle2,
    flex: 10,
    // backgroundColor: "blue"
  }

  const slideTextRowStyle = {
    marginBottom: 5,
    width: "90%",
    backgroundColor: "green",
    display: "flex",
    flexDirection: "row",
    alignContent: "center"
  };

  const slides = [
    {
      id: '1',
      title: 'BIENVENIDO A',
      subtitle1: 'CÓMO PAGO',
      subtitle2: 'APRENDE A USAR TU DINERO',
      // subtitle3: 'APRENDER A USAR TU DINERO',
      img: <Pic01  width={screenWidth}  height={screenWidth}  />,
    },
    {
      id: '2',
      title: 'CARGA TU BILLETERA',
      subtitle1: 'Y TUS AHORROS',
      subtitle2: <Text><FontAwesome5 name={'wallet'} size={16}/> DINERO PARA COMPRAR</Text>,
      subtitle3:  <Text><FontAwesome5 name={'piggy-bank'} size={16}/> DINERO QUE GUARDAS</Text>,
      img: <Pic02  width={screenWidth}  height={screenWidth} />,
    },
    {
      id: '3',
      title: 'HACE TU',
      subtitle1: 'LISTA DE DESEOS',
      subtitle2: 'LO QUE TE GUSTARÍA COMPRAR',
      // subtitle3: 'COMPRARTE LO QUE TE PROPONGAS',
      img: <Pic03  width={screenWidth}  height={screenWidth} />,
    },
  ];
  return (
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
           <OnboardSlide slides={slides} {...props} />
        </SafeAreaView>
  );
};

export default Onboarding;

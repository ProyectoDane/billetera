import React from 'react';
import {SafeAreaView, StatusBar, useWindowDimensions} from 'react-native';

import OnboardSlide from '../../components/OnboardSlide';

import styles from './styles'

// Assets
import Pic01 from './assets/pic01.svg';
import Pic02 from './assets/pic02.svg';
import Pic03 from './assets/pic03.svg';


const Onboarding = (props) => {

  const screenWidth = useWindowDimensions().width * 0.66;

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
      subtitle2: 'CONOCE LOS BILLETES Y LAS MONEDAS',
      // subtitle3: 'MONEDAS. APRENDE A USARLOS',
      img: <Pic02  width={screenWidth}  height={screenWidth} />,
    },
    {
      id: '3',
      title: 'HACE TU',
      subtitle1: 'LISTA DE DESEOS',
      subtitle2: 'APRENDE A AHORRAR',
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

import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  useWindowDimensions,
} from 'react-native';

import daneLogo from '../../../assets/dane_logo.png';

import Layout from '../../components/Layout';
import { SCREEN_NAME } from '../../constants';

import { styles } from './styles';

const Information = ({ navigation }) => {
  const width = useWindowDimensions().width - 20;

  const imageGenerator = (img, height) => (
    <View style={styles.imageContainer}>
      <Image source={img} style={{ width, height }} resizeMode="contain" />
    </View>
  );

  return (
    <Layout>
      {imageGenerator(daneLogo, width / 4)}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAME.SIGN_LANGUAGE)}
          style={styles.button}>
          <Text>VIDEO DE BIENVENIDA EN LENGUAJE DE SEÑAS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAME.ABOUT)}
          style={styles.button}>
          <Text>SOBRE NOSOTROS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAME.HOW_TO_USE_APP)}
          style={styles.button}>
          <Text>¿COMO USAR LA APLICACION?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAME.SURVEY)}
          style={styles.button}>
          <Text>ENCUESTA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAME.LOGOS)}
          style={styles.button}>
          <Text>LOGOS</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Information;

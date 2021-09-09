import React from 'react';
import { Alert, Text, View } from 'react-native';

import { styles } from './styles';
import Layout from '../../components/Layout';
import SingleButton from '../../components/SingleButton';
import { savings } from '../../mockData/deseos';

// Esta pantalla puede no servir mas. A la espera que resuelvan el flow de cumplir deseo
const FulfillWish = ({ navigation, route }) => {
  const { name, value } = route.params;
  const remainingMoney = savings - Number(value);
  const handleSubmit = () => {
    Alert.alert(
      'FELICIDADES! CUMPLISTE TU DESEO !! 🎉',
      ` TUS AHORROS RESTANTES SON $${remainingMoney}`,
      [{ text: 'OK', onPress: () => navigation.navigate('MisDeseos') }],
    );
  };

  return (
    <Layout>
      <View>
        <Text style={styles.title}>🎈🎆 ESTAS POR CUMPLIR TU DESEO 🎆🎈</Text>
        <Text style={styles.subtitle}>MIS AHORROS: ${savings}</Text>
        <Text style={styles.subtitle}>DESEO: {name}</Text>
        <Text style={styles.subtitle}>VALOR: ${value}</Text>
        <Text style={styles.title}>¿QUE BILLETES QUERES USAR?</Text>
        <Text style={styles.title}> ⏪ CARRUSEL DE BILLETES ⏩ </Text>
      </View>
      <SingleButton
        icon="magic"
        sizeIcon={22}
        label="CUMPLIR DESEO"
        onPress={handleSubmit}
      />
    </Layout>
  );
};

export default FulfillWish;

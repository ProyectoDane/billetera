import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getBills, getCoins } from "../../dataAccess/Money";

//TODO: capturar routa segun el boton seleccionado


const AddRemove = () => {

  getBills().then(data => console.log(data))
  getCoins().then(data => console.log(data))

  return (
    <View>
      <Text>PANTALLA AGREGAR/QUITAR</Text>
    </View>
  );
};

export default AddRemove;

const styles = StyleSheet.create({});

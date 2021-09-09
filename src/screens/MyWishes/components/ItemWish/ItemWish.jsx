import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress/';
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from './styles';
import { colors, SCREEN_NAME } from '../../../../constants';

const ItemWish = ({ name, value, savings, testID, icon }) => {
  const progress = savings ? savings / value : 0;
  const [collapse, setCollapse] = useState(false);
  const missingMoney = value - savings < 0 ? 0 : value - savings;
  const remainingMoney = savings - Number(value);
  const textColor = {
    color: missingMoney === 0 ? colors.primary : colors.disable,
  };
  const navigation = useNavigation();
  const handleEdit = () =>
    navigation.navigate(SCREEN_NAME.NEW_WISH, {
      name,
      value: value.toString(),
      icon,
    });
  const handleAchieve = () =>
    Alert.alert(
      'FELICIDADES! CUMPLISTE TU DESEO !! 🎉',
      ` TUS AHORROS RESTANTES SON $${remainingMoney}`,
      [{ text: 'OK' }],
    );

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.iconItem}>
          <FontAwesome5 name={icon} size={40} color={colors.white} />
        </View>
        <View style={styles.dataItem}>
          <View style={styles.text}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.valueItem}>VALOR: ${value}</Text>
          </View>
          <Progress.Bar
            color={colors.white}
            unfilledColor={colors.darkCyan}
            progress={progress}
            width={240}
            height={10}
            borderWidth={0}
            borderRadius={10}
          />
        </View>
        <View style={styles.chevron}>
          <TouchableOpacity
            testID={testID}
            onPress={() => setCollapse((prevCollapse) => !prevCollapse)}>
            <FontAwesome5
              name={!collapse ? 'chevron-circle-down' : 'chevron-circle-up'}
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
      {collapse && (
        <View style={styles.collapse}>
          <Text style={styles.itemDetails}>TENES AHORRADO: ${savings}</Text>
          <Text style={styles.itemDetails}>TE FALTAN: ${missingMoney}</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              disabled={missingMoney === 0 ? false : true}
              onPress={handleAchieve}>
              <Text style={[styles.actionBtn, textColor]}>CUMPLIR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.actionBtn}>EDITAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Advertencia',
                  'Estas seguro que queres eliminar tu deseo?',
                )
              }>
              <Text style={styles.actionBtn}>ELIMINAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ItemWish;

import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, TabActions } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Progress from 'react-native-progress/';

import { colors, NAVIGATION_TITLE, SCREEN_NAME } from '../../../../constants';
import { deleteWish, fulfillWish } from '../../../../dataAccess/Wish';
import { styles } from './styles';
import {
  successDeleteWishNotification,
  successFulfillWishNotification,
} from '../../../../components/ToastNotification/successNotification';
import { formatNum } from '../../../../utils/functions/formatNum';

const ItemWish = ({ name, value, savings, wishId, testID, icon, done }) => {
  const [collapse, setCollapse] = useState(false);
  const progress = savings ? savings / value : 0;
  const missingMoney = value - savings < 0 ? 0 : value - savings;
  const remainingMoney = savings - Number(value);

  const textColor = {
    color: missingMoney === 0 && done === 0 ? colors.primary : colors.disable,
  };
  const editTextColor = {
    color: missingMoney === 0 && done === 1 ? colors.disable : colors.primary,
  };

  const navigation = useNavigation();
  const jumpToWishesFullfilled = TabActions.jumpTo(
    NAVIGATION_TITLE.WISHES_FULLFILLED,
  );

  const handleEdit = () =>
    navigation.navigate(SCREEN_NAME.NEW_WISH, {
      name,
      value: value.toString(),
      icon,
      wishId,
      done,
    });

  const handleAchieve = () => {
    Alert.alert(
      'ESTAS POR CUMPLIR TU DESEO',
      ` TUS AHORROS RESTANTES SERAN ${formatNum(remainingMoney)}`,
      [
        {
          text: 'CONTINUAR',
          onPress: async () => {
            await fulfillWish(wishId);
            navigation.dispatch(jumpToWishesFullfilled);
            successFulfillWishNotification();
          },
        },
        {
          text: 'CANCELAR',
          style: 'cancel',
        },
      ],
    );
  };

  const handleDelete = () => {
    Alert.alert('ADVERTENCIA', 'ESTAS SEGURO QUE QUERES ELIMINAR TU DESEO?', [
      {
        text: 'CONTINUAR',
        onPress: async () => {
          await deleteWish(wishId);
          successDeleteWishNotification();
        },
      },
      {
        text: 'CANCELAR',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.iconItem}>
          <FontAwesome5 name={icon} size={40} color={colors.white} />
        </View>
        <View style={styles.dataItem}>
          <View style={styles.text}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.valueItem}>VALOR: {formatNum(value)}</Text>
          </View>
          <Progress.Bar
            color={colors.white}
            unfilledColor={colors.darkCyan}
            progress={!done ? progress : 1}
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
          <Text style={styles.itemDetails}>
            TENES AHORRADO: {formatNum(savings)}
          </Text>
          <Text style={styles.itemDetails}>
            TE FALTAN: {formatNum(missingMoney)}
          </Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              disabled={missingMoney === 0 && done === 0 ? false : true}
              onPress={handleAchieve}>
              <Text style={[styles.actionBtn, textColor]}>CUMPLIR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={missingMoney === 0 && done === 1 ? true : false}
              onPress={handleEdit}>
              <Text style={[styles.actionBtn, editTextColor]}>EDITAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={styles.actionBtn}>ELIMINAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ItemWish;

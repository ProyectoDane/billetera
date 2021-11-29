import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, TabActions } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Progress from 'react-native-progress/';

import { colors, NAVIGATION_TITLE, SCREEN_NAME } from '../../../../constants';
import { deleteWish, fulfillWish } from '../../../../dataAccess/Wish';
import { styles } from './styles';
import { formatNum } from '../../../../utils/functions/formatNum';
import { toastNotification } from '../../../../utils/functions/toastNotifcation';
import { AddRemoveContext } from '../../../AddRemove/AddRemoveContext';

const ItemWish = ({ name, value, wishId, testID, icon, done }) => {
  const [collapse, setCollapse] = useState(false);
  const { totalMoneySavings } = useContext(AddRemoveContext);

  const progress = totalMoneySavings ? totalMoneySavings / value : 0;
  const missingMoney =
    value - totalMoneySavings < 0 ? 0 : value - totalMoneySavings;
  const remainingMoney = totalMoneySavings - Number(value);

  const textColor = {
    color: done === 0 ? colors.primary : colors.disable,
  };
  const editTextColor = {
    color: done === 1 ? colors.disable : colors.primary,
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
      ` ACORDATE DE SACAR ${formatNum(value)} DE TUS AHORROS`,
      [
        {
          text: 'CONTINUAR',
          onPress: async () => {
            await fulfillWish(wishId);
            navigation.dispatch(jumpToWishesFullfilled);
            toastNotification(
              'EL DESEO SE CUMPLIÓ CORRECTAMENTE!',
              'success',
              'success',
            );
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
          toastNotification(
            'EL DESEO SE ELIMINÓ CORRECTAMENTE!',
            'danger',
            'success',
          );
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
          {!done ? (
            <>
              <Text style={styles.itemDetails}>
                TENES AHORRADO: {formatNum(totalMoneySavings)}
              </Text>
              <Text style={styles.itemDetails}>
                TE FALTAN: {formatNum(missingMoney)}
              </Text>
            </>
          ) : null}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              disabled={done === 0 ? false : true}
              onPress={handleAchieve}>
              <Text style={[styles.actionBtn, textColor]}>CUMPLIR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={done === 1 ? true : false}
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

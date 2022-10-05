import React, {useContext, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';
import * as Progress from 'react-native-progress/';

import {colors, NAVIGATION_TITLE, SCREEN_NAME} from '../../../../constants';
import {deleteWish, fulfillWish} from '../../../../dataAccess/Wish';
import {styles} from './styles';
import {formatNum} from '../../../../utils/functions/formatNum';
import {toastNotification} from '../../../../utils/functions/toastNotifcation';
import {AddRemoveContext} from '../../../AddRemove/AddRemoveContext';

const ItemWish = ({ name, value, wishId, testID, icon, done, onChange }) => {
  const [collapse, setCollapse] = useState(false);
  const { totalMoneySavings } = useContext(AddRemoveContext);

  const progress = totalMoneySavings ? totalMoneySavings / value : 0;
  const missingMoney =
    value - totalMoneySavings < 0 ? 0 : value - totalMoneySavings;
  // const remainingMoney = totalMoneySavings - Number(value);

  const textColor = {
    color: done === 0 ? colors.primary : colors.disable,
  };
  const editTextColor = {
    color: done === 1 ? colors.disable : colors.primary,
  };

  const navigation = useNavigation();
  const jumpToWishesFullfilled = CommonActions.navigate({
    name: NAVIGATION_TITLE.WISHES_FULLFILLED,
    params: {},
  });

  const handleEdit = () =>
    navigation.navigate(SCREEN_NAME.NEW_WISH, {
      name,
      value: value.toString(),
      icon,
      wishId,
      done,
    });

  const handleAchieve = () => {
    Alert.alert('ESTAS POR CUMPLIR TU DESEO', ` ACORDATE DE SACAR ${formatNum(value)} DE "MIS AHORROS"`, [
      {
        text: 'CONTINUAR',
        onPress: async () => {
          await fulfillWish(wishId);
          onChange();
          navigation.dispatch(jumpToWishesFullfilled);
          toastNotification('✓ DESEO CUMPLIDO!', null, 'success');
        },
      },
      {
        text: 'CANCELAR',
        style: 'cancel',
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert('', 'ESTAS SEGURO QUE QUERES ELIMINAR TU DESEO?', [
      {
        text: 'ELIMINAR',
        onPress: async () => {
          await deleteWish(wishId);
          onChange();
          toastNotification('✓ BORRASTE EL DESEO', null, 'success');
        },
      },
      {
        text: 'CANCELAR',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={{...styles.container, padding: 10}}>
      <View style={{...styles.item, flex: 1, padding: 10}}>
        <View style={styles.itemTopSection}>
          <View style={{flex: 0.20}}>
            <View style={styles.iconItem}>
              <FontAwesome5 name={icon} size={25} color={colors.primary}/>
            </View>
          </View>
          <View style={{...styles.dataItem, flex: 1.2, paddingLeft: 25}}>
            <Progress.Bar
                color={colors.primary}
                unfilledColor={colors.primarySoft}
                progress={!done ? progress : 1}
                width={null}
                height={15}
                borderWidth={0}
                borderRadius={10}
            />
        </View>
        </View>

        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={styles.itemTextRow}>
            <Text style={styles.itemLabel}>{name}</Text>
            <Text style={styles.valueItem}>{formatNum(value)}</Text>
          </View>
          {!done ? (
          <>
            <View style={styles.itemTextRow}>
              <Text style={styles.itemLabel}>TENES AHORRADO:</Text>
              <Text style={styles.valueItem}>{formatNum(totalMoneySavings)}</Text>
            </View>
            <View style={styles.itemTextRow}>
              <Text style={styles.itemLabel}>TE FALTAN:</Text>
              <Text style={{...styles.valueItem, ...styles.valueItemSpecial}}>{formatNum(missingMoney)}</Text>
            </View>
          </>
            ) : null}
        </View>
        <View>
          <View style={{...styles.actionsContainer, ...(done? {justifyContent: "flex-end"}:{})}}>
            { !done? (
            <TouchableOpacity
                onPress={handleAchieve}>
              <Text style={{...styles.actionBtn, ...textColor}}>CUMPLIR</Text>
            </TouchableOpacity>)
            : null }
            { !done? (
            <TouchableOpacity
                onPress={handleEdit}>
              <Text style={{...styles.actionBtn, ...editTextColor}}>EDITAR</Text>
            </TouchableOpacity>
                )
            : null }
            <TouchableOpacity onPress={handleDelete}>
              <Text style={{...styles.actionBtn}}>ELIMINAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/*{true && (*/}
      {/*  <View style={styles.collapse}>*/}
      {/*    {!done ? (*/}
      {/*      <>*/}
      {/*        <Text style={styles.itemLabel}>*/}
      {/*          TENES AHORRADO: {formatNum(totalMoneySavings)}*/}
      {/*        </Text>*/}
      {/*        <Text style={styles.itemLabel}>*/}
      {/*          TE FALTAN: {formatNum(missingMoney)}*/}
      {/*        </Text>*/}
      {/*      </>*/}
      {/*    ) : null}*/}
      {/*    <View style={styles.actionsContainer}>*/}
      {/*      <TouchableOpacity*/}
      {/*        disabled={done === 0 ? false : true}*/}
      {/*        onPress={handleAchieve}>*/}
      {/*        <Text style={[styles.actionBtn, textColor]}>CUMPLIR</Text>*/}
      {/*      </TouchableOpacity>*/}
      {/*      <TouchableOpacity*/}
      {/*        disabled={done === 1 ? true : false}*/}
      {/*        onPress={handleEdit}>*/}
      {/*        <Text style={[styles.actionBtn, editTextColor]}>EDITAR</Text>*/}
      {/*      </TouchableOpacity>*/}
      {/*      <TouchableOpacity onPress={handleDelete}>*/}
      {/*        <Text style={styles.actionBtn}>ELIMINAR</Text>*/}
      {/*      </TouchableOpacity>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*)}*/}
    </View>
  );
};

export default ItemWish;

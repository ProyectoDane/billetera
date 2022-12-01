import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {colors} from '../../../constants';
import {formatNum} from '../../../utils/functions/formatNum';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import AddRemoveMoney from '../AddRemoveMoneyV2/AddRemoveMoney';
import {FontAwesome5} from '@expo/vector-icons';
import {styles as commonStyles} from '../commonAddRemoveStyles';
import {default as cardStyles} from '../../../components/Card/styles';
import {styles as itemWishStyles} from './../../MyWishes/components/ItemWish/styles';
import {bottomButtonContainer, shadow} from '../../../constants/styles';
import SingleButton from '../../../components/SingleButton';
import {View, Text, useWindowDimensions} from 'react-native';

export default function ManualPayment({
  navigation,
  initialTotal,
  initialBills,
  initialCoins,
  setActualTotal,
  setActualBills,
  setActualCoins,
  totalPayment,
  setTotalPayment,
  onSave,
}) {
  const layout = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [totalFreeze] = useState(() => totalPayment);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'BILLETES'},
    {key: 'second', title: 'MONEDAS'},
  ]);

  const handleSave = async () => {
    setIsLoading(true);
    onSave();
  };

  const handleDiscard = useCallback(
    (action) => {
      setTotalPayment(0);
      setActualTotal(initialTotal);
      setActualBills(initialBills);
      setActualCoins(initialCoins);
      navigation.dispatch(action);
    },
    [initialTotal, initialBills, initialCoins],
  );

  const setTotal = useCallback((cb) => {
    setTotalPayment(cb);
    setActualTotal(cb);
  }, []);

  //Check for dirty changes before exiting
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!isLoading) handleDiscard(e.data.action);
    });
    return unsubscribe;
  }, [navigation, isLoading]);

  const renderScene = useMemo(
    () =>
      SceneMap({
        first: () => <AddRemoveMoney money={initialBills} setActual={setActualBills} setTotal={setTotal} isPayment />,
        second: () => <AddRemoveMoney money={initialCoins} setActual={setActualCoins} setTotal={setTotal} isPayment />,
      }),
    [initialTotal],
  );

  const getTabBarIcon = useMemo(
    () =>
      SceneMap({
        first: () => <FontAwesome5 name="money-bill-wave" size={20} color={colors.primary} />,
        second: () => <FontAwesome5 name="coins" size={20} color={colors.primary} />,
      }),
    [],
  );

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          ...cardStyles.card,
          margin: 10,
          width: 'auto',
          flex: 1,
          flexBasis: 60,
          paddingVertical: 10,
          flexGrow: 0,
          ...shadow,
        }}
      >
        <View style={{...itemWishStyles.itemTextRow}}>
          <Text style={{...itemWishStyles.itemLabel}}>TOTAL</Text>
          <Text style={{...itemWishStyles.valueItem}}>{formatNum(totalFreeze)}</Text>
        </View>
        {totalPayment > 0 ? (
          <View style={{...itemWishStyles.itemTextRow}}>
            <Text style={{...itemWishStyles.itemLabel}}>TE FALTA PAGAR</Text>
            <Text style={{...itemWishStyles.valueItem}}>{formatNum(totalPayment)}</Text>
          </View>
        ) : totalPayment === 0 ? (
          <View style={{...itemWishStyles.itemTextRow}}>
            <Text style={{...itemWishStyles.itemLabel}}>PAGASTE JUSTO</Text>
          </View>
        ) : (
          <View style={{...itemWishStyles.itemTextRow}}>
            <Text style={{...itemWishStyles.itemLabel}}>TU VUELTO ES </Text>
            <Text style={{...itemWishStyles.valueItem, ...itemWishStyles.valueItemSpecial}}>
              {formatNum(Math.abs(totalPayment))}
            </Text>
          </View>
        )}
      </View>
      <View style={{...cardStyles.card, ...shadow, flex: 15, margin: 10, width: 'auto', flexGrow: 1}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={commonStyles.indicatorStyle}
              style={{backgroundColor: colors.white}}
              renderIcon={getTabBarIcon}
              tabStyle={commonStyles.tabStyle}
              labelStyle={commonStyles.tabLabel}
            />
          )}
        />
      </View>
      <View style={{...bottomButtonContainer, flexBasis: 130, paddingBottom: 40, paddingTop: 15}}>
        <SingleButton
          icon="money-bill-wave"
          sizeIcon={22}
          label="CONFIRMAR"
          isLoading={isLoading}
          disabled={isLoading || totalPayment > 0}
          onPress={handleSave}
          style={{
            width: '100%',
            marginBottom: 10,
            backgroundColor: totalPayment > 0 ? colors.disable : colors.primary,
          }}
        />
        <SingleButton
          style={{
            width: '100%',
            backgroundColor: colors.white,
            borderWidth: 2,
            borderColor: colors.primary,
            color: colors.primary,
          }}
          label="VOLVER"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

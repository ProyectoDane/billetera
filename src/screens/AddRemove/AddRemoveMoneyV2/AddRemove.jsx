import React, {useState, useEffect, useMemo} from 'react';
import {colors} from '../../../constants';
import SvgPiggyBank from '../../HomeScreen/SvgPiggyBank';
import {Alert, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import AddRemoveMoney from './AddRemoveMoney';
import SingleButton from '../../../components/SingleButton';
import {FontAwesome5} from '@expo/vector-icons';
import {styles as myWishesStyles} from '../../MyWishes/styles';
import {default as cardStyles} from '../../../components/Card/styles';
import {shadow} from '../../../constants/styles';
import {styles as WishesStyles} from '../../WishesHome/styles';
import {styles as commonStyles} from '../commonAddRemoveStyles';
import Card from '../../../components/Card/Card';
import CardSection from '../../../components/Card/CardSection';
import CardText from '../../../components/Card/CardText';
import Amount from '../../../components/Amount/Amount';

export default function AddRemove({
  navigation,
  initialBills,
  initialCoins,
  initialTotal,
  actualTotal,
  setActualTotal,
  setActualBills,
  setActualCoins,
  onSave,
  hasUnsavedChanges,
  title,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'BILLETES'},
    {key: 'second', title: 'MONEDAS'},
  ]);

  const handleSave = async () => {
    setIsLoading(true);
    onSave();
  };

  const handleDiscard = (action) => {
    setActualTotal(initialTotal);
    setActualBills(initialBills);
    setActualCoins(initialCoins);
    navigation.dispatch(action);
  };

  //Check for dirty changes before exiting
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      const onDiscardPress = () => {
        handleDiscard(e.data.action);
      };

      if (!isLoading && hasUnsavedChanges) {
        e.preventDefault();
        promptAlert(initialTotal, actualTotal, onDiscardPress);
      } else return;
    });
    return unsubscribe;
  }, [navigation, initialTotal, actualTotal, hasUnsavedChanges, isLoading]);

  const renderScene = useMemo(
    () =>
      SceneMap({
        first: () => <AddRemoveMoney money={initialBills} setActual={setActualBills} setTotal={setActualTotal} />,
        second: () => <AddRemoveMoney money={initialCoins} setActual={setActualCoins} setTotal={setActualTotal} />,
      }),
    [initialTotal],
  );

  const svgicon = {width: 58, aspectRatio: 1 / 1, marginRight: 12};
  const flexrow = {flex: 1, flexDirection: 'row', alignItems: 'center'};
  return (
    <View style={{flex: 1, justifyContent: 'center', flexBasis: 60}}>
      <Card containerStyle={{flex: 0.9, maxHeight: 100}}>
        <CardSection>
          <View style={flexrow}>
            <SvgPiggyBank style={svgicon} />
            <CardText>{title}</CardText>
          </View>
          <Amount>{actualTotal}</Amount>
        </CardSection>
      </Card>
      <View style={{...cardStyles.card, ...shadow, flex: 5, margin: 10, width: 'auto'}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              pressColor={'transparent'}
              indicatorStyle={commonStyles.indicatorStyle}
              style={{backgroundColor: colors.white, height: 55}}
              renderIcon={(props) => {
                const {route} = props;
                if (route.key === 'first') {
                  return (
                    <FontAwesome5 name="money-bill-wave" size={22} color={colors.primary} style={{marginRight: 5}} />
                  );
                }
                return <FontAwesome5 name="coins" size={22} color={colors.primary} style={{marginRight: 5}} />;
              }}
              tabStyle={commonStyles.tabStyle}
              labelStyle={commonStyles.tabLabel}
            />
          )}
        />
      </View>
      <View
        style={{
          ...myWishesStyles.bottomButtonContainer,
          paddingVertical: 0,
        }}
      >
        <SingleButton
          icon="money-bill-wave"
          sizeIcon={22}
          label="GUARDAR"
          isLoading={isLoading}
          disabled={!hasUnsavedChanges}
          onPress={handleSave}
          style={{...WishesStyles.container, width: '100%', marginBottom: 10}}
        />
      </View>
    </View>
  );
}

export const promptAlert = (total, actual, onPress) => {
  return Alert.alert(
    'Seguro que quieres descartar los cambios?',
    `Tienes cambios sin guardar. Deseas descartarlos y volver a la pantalla de inicio?
     Saldo actual: ${total} 
     Saldo sin guardar: ${actual}`,
    [
      {text: 'Atras', style: 'cancel', onPress: () => {}},
      {text: 'Descartar', style: 'destructive', onPress},
    ],
  );
};

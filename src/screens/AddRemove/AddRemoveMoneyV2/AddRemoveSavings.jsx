import React, {useContext, useState, useEffect, useMemo} from 'react';
import {AddRemoveContext} from '../AddRemoveContext';
import {innerSaveAddRemoveSavings} from '../utils';
import {calculateChanges} from '../../../utils/functions/calculateChanges';
import {toastNotification} from '../../../utils/functions/toastNotifcation';
import {colors, SCREEN_NAME} from '../../../constants';
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

export default function AddRemoveSavings({navigation}) {
  const context = useContext(AddRemoveContext);
  const {
    actualBillsSavings,
    setActualBillsSavings,
    actualCoinsSavings,
    setActualCoinsSavings,
    totalMoneySavings,
    actualMoneySavings,
    setActualMoneySavings,
    initialBillsMoneySavings,
    initialCoinsMoneySavings,
    currentUser,
    waitRefresh,
  } = context;
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'BILLETES'},
    {key: 'second', title: 'MONEDAS'},
  ]);
  const hasUnsavedChanges = calculateChanges(
    initialBillsMoneySavings,
    initialCoinsMoneySavings,
    actualBillsSavings,
    actualCoinsSavings,
  );

  //Check for dirty changes before exiting
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      const onDiscardPress = () => {
        setActualMoneySavings(totalMoneySavings);
        setActualBillsSavings(initialBillsMoneySavings);
        setActualCoinsSavings(initialCoinsMoneySavings);
        navigation.dispatch(e.data.action);
      };

      if (!isLoading && hasUnsavedChanges) {
        e.preventDefault();
        promptAlert(totalMoneySavings, actualMoneySavings, hasUnsavedChanges, onDiscardPress);
      } else return;
    });
    return unsubscribe;
  }, [navigation, totalMoneySavings, actualMoneySavings, hasUnsavedChanges, isLoading]);

  const handleSave = async () => {
    setIsLoading(true);
    await innerSaveAddRemoveSavings(
      currentUser.id,
      initialCoinsMoneySavings,
      actualCoinsSavings,
      initialBillsMoneySavings,
      actualBillsSavings,
    );
    await waitRefresh();
    toastNotification('SE ACTUALIZO EL DINERO CORRECTAMENTE!', 'success', 'success');
    navigation.navigate(SCREEN_NAME.HOME);
  };

  const renderScene = useMemo(
    () =>
      SceneMap({
        first: () => (
          <AddRemoveMoney
            moneyArray={initialBillsMoneySavings}
            setCurrentMoney={setActualBillsSavings}
            setTotal={setActualMoneySavings}
          />
        ),
        second: () => (
          <AddRemoveMoney
            moneyArray={initialCoinsMoneySavings}
            setCurrentMoney={setActualCoinsSavings}
            setTotal={setActualMoneySavings}
          />
        ),
      }),
    [totalMoneySavings],
  );

  const svgicon = {width: 58, aspectRatio: 1 / 1, marginRight: 12};
  const flexrow = {flex: 1, flexDirection: 'row', alignItems: 'center'};
  return (
    <View style={{flex: 1, justifyContent: 'center', flexBasis: 60}}>
      <Card containerStyle={{flex: 0.9, maxHeight: 100}}>
        <CardSection>
          <View style={flexrow}>
            <SvgPiggyBank style={svgicon} />
            <CardText>MIS AHORROS</CardText>
          </View>
          <Amount>{actualMoneySavings}</Amount>
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
                } else {
                  return <FontAwesome5 name="coins" size={22} color={colors.primary} style={{marginRight: 5}} />;
                }
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

export const promptAlert = (total, actual, hasChanges, onPress) => {
  return Alert.alert(
    'Discard changes?',
    `You have unsaved changes. Are you sure to discard them and leave the screen? ${
      total - actual
    } //${total} // ${actual} //${hasChanges}`,
    [
      {text: "Don't leave", style: 'cancel', onPress: () => {}},
      {
        text: 'Discard',
        style: 'destructive',
        // If the user confirmed, then we dispatch the action we blocked earlier
        // This will continue the action that had triggered the removal of the screen
        onPress: onPress,
      },
    ],
  );
};

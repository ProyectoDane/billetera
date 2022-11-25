import React, {useContext, useState, useEffect, useMemo} from 'react';
import {AddRemoveContext} from '../AddRemoveContext';
import {innerSaveAddRemove} from '../utils';
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

export default function AddRemoveWallet({navigation}) {
  const {
    actualBillsMoneyWallet,
    setActualBillsMoneyWallet,
    actualCoinsMoneyWallet,
    setActualCoinsMoneyWallet,
    totalMoneyWallet,
    actualMoneyWallet,
    setActualMoneyWallet,
    initialBillsMoneyWallet,
    initialCoinsMoneyWallet,
    currentUser,
    waitRefresh,
  } = useContext(AddRemoveContext);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'BILLETES'},
    {key: 'second', title: 'MONEDAS'},
  ]);
  const hasUnsavedChanges = calculateChanges(
    initialBillsMoneyWallet,
    initialCoinsMoneyWallet,
    actualBillsMoneyWallet,
    actualCoinsMoneyWallet,
  );

  //Check for dirty changes before exiting
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      const onDiscardPress = () => {
        setActualMoneyWallet(totalMoneyWallet);
        setActualBillsMoneyWallet(initialBillsMoneyWallet);
        setActualCoinsMoneyWallet(initialCoinsMoneyWallet);
        navigation.dispatch(e.data.action);
      };

      if (!isLoading && hasUnsavedChanges) {
        e.preventDefault();
        promptAlert(totalMoneyWallet, actualMoneyWallet, hasUnsavedChanges, onDiscardPress);
      } else return;
    });
    return unsubscribe;
  }, [navigation, totalMoneyWallet, actualMoneyWallet, hasUnsavedChanges, isLoading]);

  const handleSave = async () => {
    setIsLoading(true);
    await innerSaveAddRemove(
      currentUser.id,
      initialCoinsMoneyWallet,
      actualCoinsMoneyWallet,
      initialBillsMoneyWallet,
      actualBillsMoneyWallet,
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
            moneyArray={initialBillsMoneyWallet}
            setCurrentMoney={setActualBillsMoneyWallet}
            setTotal={setActualMoneyWallet}
          />
        ),
        second: () => (
          <AddRemoveMoney
            moneyArray={initialCoinsMoneyWallet}
            setCurrentMoney={setActualCoinsMoneyWallet}
            setTotal={setActualMoneyWallet}
          />
        ),
      }),
    [totalMoneyWallet],
  );

  const svgicon = {width: 58, aspectRatio: 1 / 1, marginRight: 12};
  const flexrow = {flex: 1, flexDirection: 'row', alignItems: 'center'};
  return (
    <View style={{flex: 1, justifyContent: 'center', flexBasis: 60}}>
      <Card containerStyle={{flex: 0.9, maxHeight: 100}}>
        <CardSection>
          <View style={flexrow}>
            <SvgPiggyBank style={svgicon} />
            <CardText>MI BILLETERA</CardText>
          </View>
          <Amount>{actualMoneyWallet}</Amount>
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

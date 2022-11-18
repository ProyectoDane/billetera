import * as React from 'react';
import { useState } from 'react';
import { Alert, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import AddRemoveMoney from '../AddRemoveMoney';
import SingleButton from '../../../../components/SingleButton';
import { colors } from '../../../../constants';
import { FontAwesome5 } from '@expo/vector-icons';
import {styles as myWishesStyles} from "../../../MyWishes/styles";
import { default as cardStyles} from "../../../../components/Card/styles";
import {shadow} from "../../../../constants/styles";
import { styles as WishesStyles} from "../../../WishesHome/styles";
import { styles as commonStyles } from '../../commonAddRemoveStyles';
import Card from '../../../../components/Card/Card';
import CardSection from '../../../../components/Card/CardSection';
import CardText from '../../../../components/Card/CardText';
import Amount from '../../../../components/Amount/Amount';

export default function AddRemoveBaseScreen({
  navigation,
  actualBills, //array: billetes en la instancia
  setActualBills,
  actualCoins, //array: coins en la instancia
  setActualCoins,
  totalMoneyWallet, //number: El total guardado en la BD
  actualMoneyWallet, //number: El total antes de guardar (auxiliar)
  setActualMoneyWallet,
  initialBillsMoneyWallet, //array: billetes iniciales (guardados en la BD)
  initialCoinsMoneyWallet, //array: coins  iniciales (guardados en la BD)
  handleSave,
  itemTitle,
  itemIcon,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <AddRemoveMoney
            initialMoney={initialBillsMoneyWallet}
            actualMoney={actualBills}
            setActualMoney={setActualBills}
            actualMoneyWallet={actualMoneyWallet}
            setActualMoneyWallet={setActualMoneyWallet}
            totalMoneyWallet={totalMoneyWallet}
          />
        );
      case 'second':
        return (
          <AddRemoveMoney
            initialMoney={initialCoinsMoneyWallet}
            actualMoney={actualCoins}
            setActualMoney={setActualCoins}
            actualMoneyWallet={actualMoneyWallet}
            setActualMoneyWallet={setActualMoneyWallet}
            totalMoneyWallet={totalMoneyWallet}
          />
        );

      default:
        return null;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'BILLETES' },
    { key: 'second', title: 'MONEDAS' },
  ]);

  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);

  React.useEffect(() => {
    setHasUnsavedChanges(Boolean(totalMoneyWallet - actualMoneyWallet != 0));
    // console.log(`${actualMoneyWallet}, ${totalMoneyWallet}, ${hasUnsavedChanges}`);
  }, [totalMoneyWallet, actualMoneyWallet]);

  const innerHandleSave = async () => {
    setIsLoading(true);
    setHasUnsavedChanges(false); //Prevent "Dirty check" on navigation leave after saving
    return handleSave();
  };

  //Check for dirty changes before exiting
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen? ' +
            (totalMoneyWallet - actualMoneyWallet) +
            ' //' +
            totalMoneyWallet +
            ' // ' +
            actualMoneyWallet +
            ' //' +
            hasUnsavedChanges,
          [
            { text: "Don't leave", style: 'cancel', onPress: () => {} },
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [navigation, hasUnsavedChanges],
  );

  const getTabBarIcon = (props) => {
    const { route } = props;
    if (route.key === 'first') {
      return <FontAwesome5 name="money-bill-wave" size={22} color={colors.primary} style={{marginRight:5}} />;
    } else {
      return <FontAwesome5 name="coins" size={22} color={colors.primary} style={{marginRight:5}}/>;
    }
  };

  const MyTabs = React.useMemo(() => {
      // console.log(`render tab view ${actualMoneyWallet}`);
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        // initialLayout={{ width: "50%" }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            pressColor={'transparent'}
            indicatorStyle={commonStyles.indicatorStyle}
            style={{ backgroundColor: colors.white, height: 55 }}
            renderIcon={(props) => getTabBarIcon(props)}
            tabStyle={commonStyles.tabStyle}
            labelStyle={commonStyles.tabLabel}
          />
        )}
      />
    );
  }, [actualMoneyWallet]);


  const flexrow = {flex: 1, flexDirection: 'row', alignItems: 'center'};
  return (
    <View style={{flex: 1, justifyContent: 'center', flexBasis: 60}}>
      <Card containerStyle={{flex: 0.9, maxHeight: 100}}>
        <CardSection>
          <View style={flexrow}>
            {itemIcon}
            <CardText>{itemTitle}</CardText>
          </View>
          <Amount>{actualMoneyWallet}</Amount>
        </CardSection>
      </Card>
      <View style={{...cardStyles.card, ...shadow, flex: 5, margin: 10, width: 'auto'}}>
        {MyTabs}
      </View>
      <View
        style={{
            ...myWishesStyles.bottomButtonContainer,
          paddingVertical: 0,
        }}>
        <SingleButton
          icon="money-bill-wave"
          sizeIcon={22}
          label="GUARDAR"
          isLoading={isLoading}
          disabled={!hasUnsavedChanges}
          onPress={innerHandleSave}
          style={{ ...WishesStyles.container, width: '100%', marginBottom: 10  }}
        />
      </View>
    </View>
  );
}

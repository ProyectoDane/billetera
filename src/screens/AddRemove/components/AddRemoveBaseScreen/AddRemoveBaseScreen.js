import * as React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import AddRemoveMoney from '../AddRemoveMoney';
import { formatNum } from '../../../../utils/functions/formatNum';
import SingleButton from '../../../../components/SingleButton';
import { colors } from '../../../../constants';
import { FontAwesome5 } from '@expo/vector-icons';
import {styles as whishesStyles} from "../../../MyWishes/styles";
import { default as cardStyles} from "../../../../components/Card/styles";
import {shadow} from "../../../../constants/styles";

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

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'BILLETES' },
    { key: 'second', title: 'MONEDAS' },
  ]);

  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);

  React.useEffect(() => {
    setHasUnsavedChanges(Boolean(totalMoneyWallet - actualMoneyWallet != 0));
    // console.log(`${actualMoneyWallet}, ${totalMoneyWallet}, ${hasUnsavedChanges}`);
  }, [actualMoneyWallet]);

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
      return <FontAwesome5 name="money-bill-wave" size={20} color={colors.primary} />;
    } else {
      return <FontAwesome5 name="coins" size={20} color={colors.primary} />;
    }
  };

  const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    tabLabel: {
        // backgroundColor: "red"
        color: colors.primary
    },
    tabStyle: {
      flex: 1,
      flexDirection: 'row',
        // backgroundColor: colors.white
    },
      indicatorStyle: {
          backgroundColor: colors.primary,
          height: 5,

      }
  });

  return (
    <View style={{flex: 1 }}>
      <View
        style={{
          margin: 5,
          flex: 0.1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 10,
          }}>
          <Text style={{ fontSize: 30 }}>Total {formatNum(actualMoneyWallet)}</Text>
        </View>
      </View>
        <View style={{...cardStyles.card, ...shadow, flex: 1, margin: 10, width: "auto"}}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            // initialLayout={{ width: "50%" }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={styles.indicatorStyle}
                style={{ backgroundColor: colors.white}}
                renderIcon={(props) => getTabBarIcon(props)}
                tabStyle={styles.tabStyle}
                labelStyle={styles.tabLabel}
              />
            )}
          />
        </View>
      <View
        style={{
            ...whishesStyles.bottomButtonContainer,
          paddingVertical: 0,
          //  backgroundColor: colors.primary
        }}>
        <SingleButton
          icon="money-bill-wave"
          sizeIcon={22}
          label="GUARDAR"
          isLoading={isLoading}
          disabled={isLoading}
          onPress={innerHandleSave}
          style={{ ...styles.container, width: '100%', marginBottom: 10  }}
        />
      </View>
    </View>
  );
}

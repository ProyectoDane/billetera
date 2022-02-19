import * as React from 'react';
import {useContext, useState} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import AddRemoveWalletBills from '../AddRemoveWalletBills';
import {formatNum} from '../../../../utils/functions/formatNum';
import {AddRemoveContext} from '../../AddRemoveContext';
import SingleButton from '../../../../components/SingleButton';
import {innerSaveAddRemove} from '../../utils';
import getMoney from '../../../../utils/functions/loadMoneyToContext';
import {toastNotification} from '../../../../utils/functions/toastNotifcation';
import {colors, SCREEN_NAME} from '../../../../constants';
import {FontAwesome5} from "@expo/vector-icons";

export default function AddRemoveWallet({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    actualBills,
    setActualBills,
    actualCoins,
    setActualCoins,
    totalMoneyWallet,
    actualMoneyWallet,
    setActualMoneyWallet,
    initialBillsMoneyWallet,
    initialCoinsMoneyWallet,
  } = useContext(AddRemoveContext);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <AddRemoveWalletBills
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
          <AddRemoveWalletBills
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

  const context = useContext(AddRemoveContext);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'BILLETES' },
    { key: 'second', title: 'MONEDAS' },
  ]);

  const handleSave = async () => {
    setIsLoading(true);

    await innerSaveAddRemove(
      initialCoinsMoneyWallet,
      actualCoins,
      initialBillsMoneyWallet,
      actualBills,
    );
    await getMoney(context);
    toastNotification(
      'SE ACTUALIZO EL DINERO CORRECTAMENTE!',
      'success',
      'success',
    );
    navigation.navigate(SCREEN_NAME.HOME);
  };

  const getTabBarIcon = (props) => {
    const {route} = props
    if (route.key === 'first') {
      return <FontAwesome5 name='money-bill-wave' size={20} color={'white'}/>
    } else {
      return <FontAwesome5 name='coins' size={20} color={'white'}/>

    }
  }

  const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    tabLabel: {
      //fontSize: 5,
      //display: 'none',
      //height: 0
    },
    tabStyle: {
      flex: 1,
      flexDirection: 'row',
    },
  })

  return (
    <View style={{ flex: 1}}>
      <View style={{
        margin: 5,
        flex: 0.1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <View style={{
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 10
        }}>
          <Text style={{ fontSize: 30,
            }}>
            Total {formatNum(actualMoneyWallet)}
          </Text>
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props =>
            <TabBar
                {...props}
                indicatorStyle={{backgroundColor: colors.secondary, height: 5}}
                renderIcon={
                  props => getTabBarIcon(props)
                }
                tabStyle={styles.tabStyle}
                labelStyle={styles.labelStyle}
            />
        }
      />
      <View style={{ paddingVertical: 0,
      //  backgroundColor: colors.primary
      }}>
        <SingleButton
          icon="money-bill-wave"
          sizeIcon={22}
          label="GUARDAR"
          isLoading={isLoading}
          disabled={isLoading}
          onPress={handleSave}
          style={{...styles.container, width: "100%", height: 50}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
});

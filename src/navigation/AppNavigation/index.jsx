import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomeScreen from '../../screens/HomeScreen';
import Calculator from '../../screens/Calculator';
import MyWallet from '../../screens/MyWallet';
import MyWishes from '../../screens/MyWishes';
import MySavings from '../../screens/MySavings';
import Profile from '../../screens/Profile';
import NewWish from '../../screens/NewWish';
import ProfileButton from '../../components/ProfileButton';
import Survey from '../../screens/Survey/Survey';
import About from '../../screens/About/About';
import Information from '../../screens/Information';
import HowToUseApp from '../../screens/HowToUseApp';
import SignLanguage from '../../screens/SignLanguage';
import WishesFulfilled from '../../screens/WishesFulfilled';
import NavTitle from '../../components/NavTitle';
import WalletBuy from '../../screens/Buy/WalletBuy';
import SavingsBuy from '../../screens/Buy/SavingsBuy';
import SavingsManualPayment from '../../screens/AddRemove/SavingsManualPayment';
import AddRemoveWallet from '../../screens/AddRemove/AddRemoveWallet';
import AddRemoveSavings from '../../screens/AddRemove/AddRemoveSavings';
import WalletManualPayment from '../../screens/AddRemove/WalletManualPayment/WalletManualPayment';

import SvgChevron from '../../components/CustomButton/SvgChevron';
import { colors, NAVIGATION_TITLE, SCREEN_NAME } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeStack = createStackNavigator();
const MyWishesStack = createStackNavigator();
const InformationStack = createStackNavigator();
const WishesTopTab = createMaterialTopTabNavigator();
const CalculatorStack = createStackNavigator();

const HomeNavigation = () => {
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <HomeStack.Navigator
      initialRouteName={SCREEN_NAME.HOME}
      detachInactiveScreens={false}
      screenOptions={({ route }) => ({
        headerTitleStyle: { marginLeft: -15, fontSize: 18 },
        headerStyle: { backgroundColor: colors.white, elevation: 10 },
        headerLeft: ({ canGoBack, onPress }) => {
          if (route.name === SCREEN_NAME.HOME) return <ProfileButton sizeIcon={18} colorIcon={colors.newBlack} />;
          else if (canGoBack) {
            return (
              <TouchableOpacity onPress={onPress} style={{ padding: 15 }}>
                <SvgChevron style={{ width: 16, height: 16, transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>
            );
          }
        },
      })}>
      <HomeStack.Screen
        name={SCREEN_NAME.HOME}
        component={HomeScreen}
        options={{
          title: '',
          cardStyleInterpolator: forFade,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.MY_WALLET}
        component={MyWallet}
        options={{
          headerTitle: NAVIGATION_TITLE.MY_WALLET,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.MY_SAVINGS}
        component={MySavings}
        options={{
          headerTitle: NAVIGATION_TITLE.MY_SAVINGS,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.WALLET_BUY}
        component={WalletBuy}
        options={{
          headerTitle: () => <NavTitle title={NAVIGATION_TITLE.WALLET_BUY} iconName={'wallet'} />,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.SAVINGS_BUY}
        component={SavingsBuy}
        options={{
          headerTitle: () => <NavTitle title={NAVIGATION_TITLE.SAVINGS_BUY} iconName={'piggy-bank'} />,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.ADD_REMOVE}
        component={MoneyTab}
        options={{
          headerTitle: NAVIGATION_TITLE.ADD_REMOVE,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.ADD_REMOVE_SAVINGS}
        component={MoneyTabSavings}
        options={{
          headerTitle: () => <NavTitle title={NAVIGATION_TITLE.ADD_REMOVE} iconName={'piggy-bank'} />,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.WALLET_MANUAL_PAYMENT}
        component={ManualMoneyTab}
        options={{
          headerTitle: () => <NavTitle title={NAVIGATION_TITLE.WALLET_MANUAL_PAYMENT} iconName={'wallet'} />,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.SAVINGS_MANUAL_PAYMENT}
        component={ManualMoneyTabSavings}
        options={{
          headerTitle: () => <NavTitle title={NAVIGATION_TITLE.SAVINGS_MANUAL_PAYMENT} iconName={'piggy-bank'} />,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.PROFILE}
        component={Profile}
        options={{
          title: NAVIGATION_TITLE.PROFILE,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.CALCULATOR_NAV}
        component={CalculatorNavigation}
        options={{
          headerShown: false,
          title: NAVIGATION_TITLE.CALCULATOR,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.WISHES_NAV}
        component={MyWishesNavigation}
        options={{
          headerShown: false,
          title: NAVIGATION_TITLE.WISHES,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.INFORMATION_NAV}
        component={InformationNavigation}
        options={{
          headerShown: false,
          title: NAVIGATION_TITLE.INFO,
        }}
      />
    </HomeStack.Navigator>
  );
};

const MyWishesNavigation = () => (
  <MyWishesStack.Navigator
    initialRouteName={SCREEN_NAME.MY_WISHES}
    screenOptions={{
      headerStyle: { backgroundColor: colors.menu, elevation: 0 },
      headerTintColor: colors.white,
      headerTitleAlign: 'center',
    }}>
    <MyWishesStack.Screen
      name={SCREEN_NAME.MY_WISHES}
      component={WishesTab}
      options={{
        title: NAVIGATION_TITLE.MY_WISHES,
      }}
    />
    <MyWishesStack.Screen
      name={SCREEN_NAME.NEW_WISH}
      component={NewWish}
      options={({ route }) => ({
        title: route.params ? NAVIGATION_TITLE.EDIT_WISH : NAVIGATION_TITLE.NEW_WISH,
      })}
    />
    <MyWishesStack.Screen
      name={SCREEN_NAME.WISHES_FULLFILLED}
      component={WishesFulfilled}
      options={{
        title: NAVIGATION_TITLE.WISHES_FULLFILLED,
      }}
    />
  </MyWishesStack.Navigator>
);

const ManualMoneyTab = ({ navigation }) => <WalletManualPayment navigation={navigation} />;

const ManualMoneyTabSavings = ({ navigation }) => <SavingsManualPayment navigation={navigation} />;

const MoneyTab = ({ navigation }) => <AddRemoveWallet navigation={navigation} />;

const MoneyTabSavings = ({ navigation }) => <AddRemoveSavings navigation={navigation} />;

const InformationNavigation = () => (
  <InformationStack.Navigator
    initialRouteName={SCREEN_NAME.INFORMATION}
    screenOptions={{
      headerStyle: { backgroundColor: colors.menu, elevation: 0 },
      headerTintColor: colors.white,
      headerTitleAlign: 'center',
    }}>
    <InformationStack.Screen
      name={SCREEN_NAME.INFORMATION}
      component={Information}
      options={{
        title: NAVIGATION_TITLE.INFO,
      }}
    />
    <InformationStack.Screen
      name={SCREEN_NAME.PROFILE}
      component={Profile}
      options={{
        title: NAVIGATION_TITLE.PROFILE,
      }}
    />
    <InformationStack.Screen
      name={SCREEN_NAME.SIGN_LANGUAGE}
      component={SignLanguage}
      options={{
        title: NAVIGATION_TITLE.SIGN_LANGUAGE,
      }}
    />
    <InformationStack.Screen
      name={SCREEN_NAME.ABOUT}
      component={About}
      options={{
        title: NAVIGATION_TITLE.ABOUT,
      }}
    />
    <InformationStack.Screen
      name={SCREEN_NAME.HOW_TO_USE_APP}
      component={HowToUseApp}
      options={{
        title: NAVIGATION_TITLE.HOW_TO_USE_APP,
      }}
    />
    <InformationStack.Screen
      name={SCREEN_NAME.SURVEY}
      component={Survey}
      options={{
        title: NAVIGATION_TITLE.SURVEY,
      }}
    />
  </InformationStack.Navigator>
);

const CalculatorNavigation = () => (
  <CalculatorStack.Navigator
    initialRouteName={SCREEN_NAME.CALCULATOR}
    screenOptions={{
      headerStyle: { backgroundColor: colors.menu, elevation: 0 },
      headerTintColor: colors.white,
      headerTitleAlign: 'center',
    }}>
    <CalculatorStack.Screen
      name={SCREEN_NAME.CALCULATOR}
      component={Calculator}
      options={{
        title: NAVIGATION_TITLE.CALCULATOR,
      }}
    />
  </CalculatorStack.Navigator>
);

const WishesTab = () => (
  <WishesTopTab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
      tabBarStyle: { backgroundColor: '#e9e9e9' },
    }}>
    <WishesTopTab.Screen name={NAVIGATION_TITLE.WISHES} component={MyWishes} />
    <WishesTopTab.Screen name={NAVIGATION_TITLE.WISHES_FULLFILLED} component={WishesFulfilled} />
  </WishesTopTab.Navigator>
);
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <HomeNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;

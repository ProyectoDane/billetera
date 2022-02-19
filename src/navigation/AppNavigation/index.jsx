import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {FontAwesome5, Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {
    createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs';

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
import Logos from '../../screens/Logos/Logos';
import WishesFulfilled from '../../screens/WishesFulfilled';
import NavTitle from '../../components/NavTitle';
import WalletBuy from '../../screens/Buy/WalletBuy';
import SavingsBuy from '../../screens/Buy/SavingsBuy';
import SavingsManualPayment
    from '../../screens/AddRemove/SavingsManualPayment';
import AddRemoveWallet
    from '../../screens/AddRemove/components/AddRemoveWallet/AddRemoveWallet';
import AddRemoveSavings
    from '../../screens/AddRemove/components/AddRemoveSavings/AddRemoveSavings';
import WalletManualPayment
    from '../../screens/AddRemove/WalletManualPayment/WalletManualPayment';

import {
    colors,
    NAVIGATION_TITLE,
    SCREEN_NAME,
    TABS_NAME,
} from '../../constants';
import {View} from "react-native";
import LoadingScreen from "../../screens/HomeScreen/LoadingScreen";

const Tab = createBottomTabNavigator();
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
      initialRouteName={SCREEN_NAME.LOADING}
      screenOptions={({route, navigation}) => ({
        headerStyle: { backgroundColor: colors.white, elevation: 0 },
        headerTintColor: colors.black,
        headerRight: () => {
            if (route.name === 'HomeScreen')
                return <ProfileButton sizeIcon={18} />

        },
        headerTitleAlign: 'center',
          headerLeft: ({canGoBack, onPress}) =>
              canGoBack && (
                  <View style={{marginLeft: 15}}>
                      <FontAwesome5
                          name="chevron-left"
                          onPress={onPress}
                          color="black"
                          size={25}
                      />
                  </View>
              )

      })}>
        <HomeStack.Screen
            name={SCREEN_NAME.LOADING}
            component={LoadingScreen}
            options={{
                headerShown: false,
                title: '',
                headerRight: () => null,
                headerLeft: () => null,
            }}
        />
        <HomeStack.Screen
            name={SCREEN_NAME.HOME}
            component={HomeScreen}
            options={{
                title: '',
                cardStyleInterpolator: forFade
            }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.MY_WALLET}
        component={MyWallet}
        options={{
          title: NAVIGATION_TITLE.MY_WALLET,

        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.MY_SAVINGS}
        component={MySavings}
        options={{
          title: NAVIGATION_TITLE.MY_SAVINGS,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.WALLET_BUY}
        component={WalletBuy}
        options={{
          title: NAVIGATION_TITLE.WALLET_BUY,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.SAVINGS_BUY}
        component={SavingsBuy}
        options={{
          title: NAVIGATION_TITLE.SAVINGS_BUY,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.ADD_REMOVE}
        component={MoneyTab}
        options={{
          title: NAVIGATION_TITLE.ADD_REMOVE,
            headerTitle: () => <NavTitle title={NAVIGATION_TITLE.ADD_REMOVE} iconName={"wallet"}  />,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.ADD_REMOVE_SAVINGS}
        component={MoneyTabSavings}
        options={{
          title: NAVIGATION_TITLE.ADD_REMOVE_SAVINGS,
            headerTitle: () => <NavTitle title={NAVIGATION_TITLE.ADD_REMOVE} iconName={"piggy-bank"}  />,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.WALLET_MANUAL_PAYMENT}
        component={ManualMoneyTab}
        options={{
          title: NAVIGATION_TITLE.WALLET_MANUAL_PAYMENT,
          headerTitle: () => <NavTitle />,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.SAVINGS_MANUAL_PAYMENT}
        component={ManualMoneyTabSavings}
        options={{
          title: NAVIGATION_TITLE.SAVINGS_MANUAL_PAYMENT,
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NAME.PROFILE}
        component={Profile}
        options={{
          title: NAVIGATION_TITLE.PROFILE,
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
      options={{
        title: NAVIGATION_TITLE.NEW_WISH,
      }}
    />
    <MyWishesStack.Screen
      name={SCREEN_NAME.WISHES_FULLFILLED}
      component={WishesFulfilled}
      options={{
        title: NAVIGATION_TITLE.WISHES_FULLFILLED,
      }}
    />
    <MyWishesStack.Screen
      name={SCREEN_NAME.PROFILE}
      component={Profile}
      options={{
        title: NAVIGATION_TITLE.PROFILE,
      }}
    />
  </MyWishesStack.Navigator>
);

const ManualMoneyTab = ({ navigation }) => (
  <WalletManualPayment navigation={navigation} />
);

const ManualMoneyTabSavings = ({ navigation }) => (
  <SavingsManualPayment navigation={navigation} />
);

const MoneyTab = ({ navigation }) => (
  <AddRemoveWallet navigation={navigation} />
);

const MoneyTabSavings = ({ navigation }) => (
  <AddRemoveSavings navigation={navigation} />
);

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
    <InformationStack.Screen
      name={SCREEN_NAME.LOGOS}
      component={Logos}
      options={{
        title: NAVIGATION_TITLE.LOGOS,
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
    <WishesTopTab.Screen
      name={NAVIGATION_TITLE.WISHES_FULLFILLED}
      component={WishesFulfilled}
    />
  </WishesTopTab.Navigator>
);

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={SCREEN_NAME.LOADING}
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}>
        <Tab.Screen
          name={TABS_NAME.HOME}
          component={HomeNavigation}
          options={{
            title: NAVIGATION_TITLE.HOME,
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={TABS_NAME.CALCULATOR}
          component={CalculatorNavigation}
          options={{
            title: NAVIGATION_TITLE.CALCULATOR,
            tabBarIcon: ({ color }) => (
              <Ionicons name="calculator" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={TABS_NAME.MY_WISHES}
          component={MyWishesNavigation}
          options={{
            title: NAVIGATION_TITLE.MY_WISHES,
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={TABS_NAME.INFORMATION}
          component={InformationNavigation}
          options={{
            title: NAVIGATION_TITLE.INFO,
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-circle" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

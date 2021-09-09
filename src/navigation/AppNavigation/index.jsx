import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../../screens/HomeScreen';
import Calculator from '../../screens/Calculator';
import MyWallet from '../../screens/MyWallet';
import MyWishes from '../../screens/MyWishes';
import MySavings from '../../screens/MySavings';
import Profile from '../../screens/Profile';
import NewWish from '../../screens/NewWish';
import FulfillWish from '../../screens/FulfillWish';
import ProfileButton from '../../components/ProfileButton';
import AddRemove from '../../screens/AddRemove';
import Buy from '../../screens/Buy';
import {
  colors,
  SCREEN_NAME,
  NAVIGATION_TITLE,
  TABS_NAME,
} from '../../constants';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const MyWishesStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeNavigation = () => (
  <HomeStack.Navigator
    initialRouteName={SCREEN_NAME.HOME}
    screenOptions={{
      headerStyle: { backgroundColor: colors.menu, elevation: 0 },
      headerTintColor: colors.white,
      headerRight: () => <ProfileButton sizeIcon={18} />,
      headerTitleAlign: 'center',
    }}>
    <HomeStack.Screen
      name={SCREEN_NAME.HOME}
      component={HomeScreen}
      options={{
        title: '',
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
      name={SCREEN_NAME.BUY}
      component={Buy}
      options={{
        title: NAVIGATION_TITLE.BUY,
      }}
    />
    <HomeStack.Screen
      name={SCREEN_NAME.ADD_REMOVE}
      component={AddRemove}
      options={{
        title: NAVIGATION_TITLE.ADD_REMOVE,
      }}
    />
  </HomeStack.Navigator>
);

const MyWishesNavigation = () => (
  <MyWishesStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.menu, elevation: 0 },
      headerTintColor: colors.white,
      headerRight: () => <ProfileButton sizeIcon={18} />,
      headerTitleAlign: 'center',
    }}>
    <MyWishesStack.Screen
      name={SCREEN_NAME.MY_WISHES}
      component={MyWishes}
      options={{
        title: NAVIGATION_TITLE.MY_WISHES,
      }}
    />
    <MyWishesStack.Screen name={SCREEN_NAME.NEW_WISH} component={NewWish} />
    <MyWishesStack.Screen
      name={SCREEN_NAME.FULFILL_WISH}
      component={FulfillWish}
      options={{ headerShown: false }}
    />
  </MyWishesStack.Navigator>
);

const ProfileNavigation = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.menu, elevation: 0 },
      headerTintColor: colors.white,
      headerRight: () => <ProfileButton sizeIcon={18} />,
      headerTitleAlign: 'center',
    }}>
    <ProfileStack.Screen
      name={SCREEN_NAME.PROFILE}
      component={Profile}
      options={{
        title: NAVIGATION_TITLE.PROFILE,
      }}
    />
  </ProfileStack.Navigator>
);

const AppNavigation = () => (
  <NavigationContainer>
    <Tab.Navigator
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
        component={Calculator}
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
        name={TABS_NAME.PROFILE}
        component={ProfileNavigation}
        options={{
          title: NAVIGATION_TITLE.PROFILE,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigation;

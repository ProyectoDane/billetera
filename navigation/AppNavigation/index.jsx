import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../screens/HomeScreen';
import Calculator from '../../screens/Calculator';
import MyWallet from '../../screens/MyWallet';
import MyWishes from '../../screens/MyWishes';
import MySavings from '../../screens/MySavings';
import Profile from '../../screens/Profile';
import NewWish from '../../screens/NewWish';
import FulfillWish from '../../screens/FulfillWish';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const MyWishesStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeNavigation = () => (
  <HomeStack.Navigator initialRouteName={HomeScreen}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="My Wallet" component={MyWallet} />
    <HomeStack.Screen name="My Savings" component={MySavings} />
  </HomeStack.Navigator>
);

const MyWishesNavigation = () => (
  <MyWishesStack.Navigator>
    <MyWishesStack.Screen name="My Wishes" component={MyWishes} />
    <MyWishesStack.Screen name="New Wish" component={NewWish} />
    <MyWishesStack.Screen
      name="Fulfill Wish"
      component={FulfillWish}
      options={{ headerShown: false }}
    />
  </MyWishesStack.Navigator>
);

const ProfileNavigation = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const AppNavigation = () => (
  <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={{
          title: 'Calculator',
          tabBarIcon: ({ color }) => (
            <Ionicons name="calculator" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My Wishes"
        component={MyWishesNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigation;

import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Go to wallet" onPress={() => navigation.navigate('My Wallet')} />
      <Button title="Go to savings" onPress={() => navigation.navigate('My Savings')} />
     </View>
  );
}

import React from 'react';
import { View, FlatList, Text } from 'react-native';

import ItemWish from '../ItemWish/';
import { savings, whishesList } from '../../../../mockData/deseos';
import { styles } from './styles';

const WishList = () => {
  return (
    <View style={styles.list}>
      {whishesList.length > 0 ? (
        <FlatList
          data={whishesList}
          renderItem={({ item }) => (
            <ItemWish
              name={item.name}
              value={item.value}
              savings={savings}
              testID={`testId-itemWish-${item.id}`}
              icon={item.icon}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.withOutList}>
          <Text>No tienes nungun deseo! agrega uno!</Text>
        </View>
      )}
    </View>
  );
};

export default WishList;

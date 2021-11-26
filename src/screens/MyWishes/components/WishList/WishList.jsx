import React from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';

import ItemWish from '../ItemWish/';
import { styles } from './styles';
import { useGetWishes } from '../../hooks/useGetWishes';
import { colors } from '../../../../constants';

const WishList = () => {
  const { wishes, loading } = useGetWishes();

  return !loading ? (
    <View style={styles.list}>
      {wishes.length > 0 ? (
        <FlatList
          data={wishes}
          renderItem={({ item }) => (
            <ItemWish
              name={item.name}
              value={item.value}
              icon={item.icon}
              done={item.done}
              userId={item.userId}
              wishId={item.id}
              testID={`testId-itemWish-${item.id}`}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.withOutList}>
          <Text>¡NO TENES NINGUN DESEO, AGREGA UNO!</Text>
        </View>
      )}
    </View>
  ) : (
    <ActivityIndicator
      style={styles.spinner}
      size="large"
      color={colors.miBilletera}
    />
  );
};

export default WishList;

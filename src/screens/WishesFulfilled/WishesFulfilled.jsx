import React from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';

import ItemWish from '../MyWishes/components/ItemWish';

import { useGetWishes } from '../MyWishes/hooks/useGetWishes';
import { styles } from './styles';
import { savings } from '../../mockData/deseos';
import { colors } from '../../constants';

const WishesFulfilled = () => {
  const { wishes: wishesFulfilled, loading, doRefresh } = useGetWishes(true);
  const handleChange = () => doRefresh(Date.now());

  return !loading ? (
    <View style={styles.list}>
      {wishesFulfilled.length > 0 ? (
        <FlatList
          data={wishesFulfilled}
          renderItem={({ item }) => (
            <ItemWish
              name={item.name}
              value={item.value}
              icon={item.icon}
              done={item.done}
              wishId={item.id}
              userId={item.userId}
              savings={savings}
              testID={`testId-itemWish-${item.id}`}
              onChange={handleChange}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.withOutList}>
          <Text>AUN NO TIENES DESEOS CUMPLIDOS!</Text>
        </View>
      )}
    </View>
  ) : (
    <ActivityIndicator style={styles.spinner} size="large" color={colors.miBilletera} />
  );
};

export default WishesFulfilled;

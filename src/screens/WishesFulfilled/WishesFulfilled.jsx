import React from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';

import ItemWish from '../MyWishes/components/ItemWish';

import { useGetWishesFulfilled } from '../MyWishes/hooks/useGetWishesFulfilled';
import { styles } from './styles';
import { savings } from '../../mockData/deseos';
import { colors } from '../../constants';

const WishesFulfilled = () => {
  const { wishesFulfilled, loading } = useGetWishesFulfilled();

  return !loading ? (
    <View style={styles.list}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
          marginTop: 10,
        }}>
        DESEOS CUMPLIDOS
      </Text>
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
    <ActivityIndicator
      style={styles.spinner}
      size="large"
      color={colors.miBilletera}
    />
  );
};

export default WishesFulfilled;

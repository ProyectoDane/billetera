import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import IconContainer from './IconContainer';

import { colors } from '../../../../constants';
import { shadow } from '../../../../constants/styles';
import { formatNum } from '../../../../utils/functions/formatNum';

const ItemWishDone = ({ name, value, icon, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconAndProductContainer}>
        <IconContainer iconName={icon} />
        <Text style={styles.productText}>{name}</Text>
      </View>
      <View style={styles.moneyAndButtonContainer}>
        <Text style={styles.moneyText}>{formatNum(value)}</Text>

        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteButton}>ELIMINAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    marginHorizontal: 11,
    marginVertical: 17,
    borderRadius: 12,
    ...shadow,
  },
  iconAndProductContainer: {
    paddingHorizontal: 11,
    paddingVertical: 19,
    flexDirection: 'row',
  },
  productText: {
    width: 100,
    flexWrap: 'wrap',
    marginLeft: 17,
    marginTop: 18,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.7,
  },
  moneyAndButtonContainer: {
    paddingHorizontal: 28,
    paddingVertical: 19,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  moneyText: {
    marginVertical: 18,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.7,
    color: colors.orange2,
  },
  deleteButton: {
    fontSize: 13,
    paddingBottom: 15,
    fontWeight: 'bold',    
    color: colors.primary,
  },
});

export default ItemWishDone;

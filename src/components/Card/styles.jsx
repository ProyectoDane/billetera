import { colors } from '../../constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    width: '100%',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    borderRadius: 12,
    padding: 8,
    elevation: 6,
    backgroundColor: colors['white'],
    paddingHorizontal: 12,
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  cardContentFlex: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: 'green',
    // height: 300,
  },
  cardSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    // backgroundColor: 'red',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  cardCollapse: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  cardChevron2: {
    position: 'absolute',
    right: 10,
    width: '8%',
  },
  cardChevron: {
    position: 'absolute',
    right: 10,
    width: '5%',
  },
  label: {
    color: '#222',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.orange2,
  },
  cardButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default styles;

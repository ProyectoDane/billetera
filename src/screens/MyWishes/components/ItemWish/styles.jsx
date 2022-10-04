import { StyleSheet } from 'react-native';

import { colors } from '../../../../constants';
import {shadow} from "../../../../constants/styles";

export const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "60%",
    backgroundColor: colors.primary,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    padding: 10,
    color: colors.red
  },
  itemTopSection: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    paddingRight: 10,
    paddingVertical: 10,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10
  },
  item: {
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    ...shadow
  },
  iconItem: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 50,
    height: 50,
    position: "relative",
    width: "100%",
    maxWidth: 300,
    textAlign: "center",
    overflow: "hidden",
  },
  dataItem: {
    flex: 0.8,
    // alignItems: 'center',
  },
  chevron: {
    flex: 0.1,
    alignItems: 'center',
  },
  title: {
    flex: 0.7,
    textAlign: 'left',
    color: colors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  itemTextRow: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,

  },
  valueItem: {
    flex: 0.7,
    textAlign: 'right',
    fontWeight: "900",
    color: colors.newBlack
  },
  valueItemSpecial: {
    color: colors.orange,
  },
  itemLabel: {
    flex: 1,
    fontWeight: 'bold',
    color: colors.newBlack
  },
  actionsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    color: colors.white,
  },
  actionBtn: {
    fontWeight: 'bold',
    flex: 1,
    // width: 80,
    color: colors.primary,
    textAlign: 'center',
    paddingTop: 6,
    fontSize: 13,
  },
  text: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 6,
  },
  collapse: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: colors.strongCyan,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});

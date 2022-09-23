import * as React from 'react';
import { useState } from 'react';
import { ScrollView, Alert, View } from 'react-native';
import AddRemoveMoney from '../AddRemoveMoney';
import SingleButton from '../../../../components/SingleButton';
import { colors, SCREEN_NAME } from '../../../../constants';
import Layout from '../../../../components/Layout';
import Card from '../../../../components/Card/Card';
import CardSection from '../../../../components/Card/CardSection';
import SvgWallet from '../../../HomeScreen/SvgWallet';
import CardText from '../../../../components/Card/CardText';
import Amount from '../../../../components/Amount/Amount';
import SvgPiggyBank from '../../../HomeScreen/SvgPiggyBank';
import CardCollapse from '../../../../components/Card/CardCollapse';
import SvgBills from '../../../MyWallet/SvgBills';
import { totalize, withQuantity } from '../../../../utils/functions/common';
import { styles } from './styles';

export default function AddRemoveBaseScreen({
  navigation,
  actualBills, //array: billetes en la instancia
  setActualBills,
  actualCoins, //array: coins en la instancia
  setActualCoins,
  totalMoneyWallet, //number: El total guardado en la BD
  actualMoneyWallet, //number: El total antes de guardar (auxiliar)
  setActualMoneyWallet,
  initialBillsMoneyWallet, //array: billetes iniciales (guardados en la BD)
  initialCoinsMoneyWallet, //array: coins  iniciales (guardados en la BD)
  handleSave,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);

  React.useEffect(() => {
    setHasUnsavedChanges(Boolean(totalMoneyWallet - actualMoneyWallet != 0));
    // console.log(`${actualMoneyWallet}, ${totalMoneyWallet}, ${hasUnsavedChanges}`);
  }, [actualMoneyWallet]);

  const innerHandleSave = async () => {
    setIsLoading(true);
    setHasUnsavedChanges(false); //Prevent "Dirty check" on navigation leave after saving
    return handleSave();
  };

  //Check for dirty changes before exiting
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            { text: "Don't leave", style: 'cancel', onPress: () => {} },
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [navigation, hasUnsavedChanges],
  );

  const bills = withQuantity(initialBillsMoneyWallet);
  const coins = withQuantity(initialCoinsMoneyWallet);
  const totalBills = totalize(bills);
  const totalCoins = totalize(coins);
  const flexrow = { flex: 1, flexDirection: 'row', alignItems: 'center' };
  const svgicon = { width: 58, aspectRatio: 1 / 1, marginRight: 12 };
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.cardGroup}>
        <View style={styles.container}>
          <Card containerStyle={{ flex: 1 }}>
            <CardSection>
              <View style={flexrow}>
                <SvgWallet style={svgicon} />
                <CardText>total billetera</CardText>
              </View>
              <Amount>{totalMoneyWallet}</Amount>
            </CardSection>
          </Card>
        </View>
        <View style={[styles.container, { marginTop: -5 }]}>
          <Card expandable>
            <CardSection>
              <View style={flexrow}>
                <SvgPiggyBank style={svgicon} />
                <CardText>Billetes</CardText>
              </View>
              <Amount>{totalBills}</Amount>
            </CardSection>
            <CardCollapse>
              <View style={{ backgroundColor: '#fff' }}>
                <AddRemoveMoney
                  initialMoney={initialBillsMoneyWallet}
                  actualMoney={actualBills}
                  setActualMoney={setActualBills}
                  actualMoneyWallet={actualMoneyWallet}
                  setActualMoneyWallet={setActualMoneyWallet}
                  totalMoneyWallet={totalMoneyWallet}
                />
              </View>
            </CardCollapse>
          </Card>
        </View>
        <View style={[styles.container, { marginTop: -5 }]}>
          <Card expandable>
            <CardSection>
              <View style={flexrow}>
                <SvgBills style={svgicon} />
                <CardText>Monedas</CardText>
              </View>
              <Amount>{totalCoins}</Amount>
            </CardSection>
            <CardCollapse>
              <View style={{ backgroundColor: '#fff' }}>
                <AddRemoveMoney
                  initialMoney={initialCoinsMoneyWallet}
                  actualMoney={actualCoins}
                  setActualMoney={setActualCoins}
                  actualMoneyWallet={actualMoneyWallet}
                  setActualMoneyWallet={setActualMoneyWallet}
                  totalMoneyWallet={totalMoneyWallet}
                />
              </View>
            </CardCollapse>
          </Card>
        </View>
      </ScrollView>
      <View>
        <View
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#FFF',
            borderRadius: 10,
            elevation: 8,
          }}>
          <SingleButton
            label="GUARDAR"
            isLoading={isLoading}
            disabled={true}
            onPress={innerHandleSave}
            style={{ ...styles.container, width: '90%', height: 50 }}
          />
          <SingleButton
            label="CANCELAR"
            onPress={() => navigation.navigate(SCREEN_NAME.HOME)}
            style={{
              ...styles.container,
              backgroundColor: colors.white,
              borderColor: colors.primary,
              borderWidth: 2,
              width: '90%',
              height: 50,
            }}
            textStyle={{ color: colors.primary }}
          />
        </View>
      </View>
    </Layout>
  );
}

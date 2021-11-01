import React, { useState, Fragment } from 'react';
import { Text, View } from 'react-native';

import WalletCarrouselItem from './WalletCarrouselItem';
import { styles } from "./WalletCarrouselStyles";



export default function WalletCarrousel({ moneyType, dataCarrousel }){
  const [step, setStep] = useState(0)
  const [item, setItem] = useState(dataCarrousel ? dataCarrousel[step] : [])

  const lastStep = dataCarrousel && dataCarrousel.length > 0 ? dataCarrousel.length - 1 : 0;

  const firstStep = 0;

  const calculateStep = sign => sign === "+" ? step + 1 : step - 1;


  const nextStep = () => 
    step === lastStep ?
      (setItem(dataCarrousel[firstStep]), setStep(firstStep)) :
      (setItem(dataCarrousel[calculateStep("+")]), setStep(calculateStep("+")))

  const prevStep = () => 
    step === firstStep ?
      (setItem(dataCarrousel[lastStep]), setStep(lastStep)) :
      (setItem(dataCarrousel[calculateStep("-")]), setStep(calculateStep("-")))


  return(
    <Fragment>
      <View style={styles.wrapperQuestion}>
        <Text style={styles.question}>
          ¿QUÉ {moneyType.toUpperCase()} TENGO?
        </Text>
      </View>
      {
        lastStep ? 
        <WalletCarrouselItem
          itemInfo={item} 
          nextStep={nextStep}
          prevStep={prevStep}
        />  
        :
        <Text>
          AÚN NO TIENES {moneyType.toUpperCase()}
        </Text>
      }
    </Fragment>
  )
}
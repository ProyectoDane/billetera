import React from 'react'
import { View, Text, FlatList } from 'react-native'
import Slide from '../../components/Slide'
import Indicators from '../../components/Indicators'

// Assets
import pic01 from './assets/pic01.png'
import pic02 from './assets/pic02.png'
import pic03 from './assets/pic03.png'

import styles from './styles'

const slides = [
  {
    id: "1",
    title: 'BIENVENIDO A ¿CÓMO PAGO?',
    subtitle: 'UNA MANERA FÁCIL DE APRENDER A USAR TU DINERO',
    img: pic01,  
  },
  {
    id: "2",
    title: 'CARGA TU BILLETERA Y TUS AHORROS',
    subtitle: 'CONOCE LOS BILLETES Y LAS MONEDAS. APRENDE A USARLOS',
    img: pic02,  
  },
  {
    id: "3",
    title: 'HACE TU LISTA DE DESEOS',
    subtitle: 'APRENDE A AHORRAR PARA COMPRARTE LO QUE TE PROPONGAS',
    img: pic03,  
  },
]



const Onboarding = () => {
  return (
    <View style={styles.container}>
      <FlatList horizontal pagingEnabled showsHorizontalScrollIndicator={false} data={slides} keyExtractor={item => item.id} renderItem={({item}) => <Slide item={item} />} />
      <View style={styles.indicatorContainer}>
        <Indicators indicatorCount={slides.length} />
      </View>
    </View>
  )
}

export default Onboarding

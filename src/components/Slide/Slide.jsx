import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './styles'

const Slide = ({item}) => {
  return (
    <View style={styles.slides}>
      <View style={styles.visualContainer}>
        <Text>{item.title}</Text>
        <Image source={item.img} />
        <Text>{item.subtitle}</Text>
      </View>
    </View>
  )
}

export default Slide
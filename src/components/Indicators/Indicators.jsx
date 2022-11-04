import React from 'react'
import {View} from 'react-native'
import styles from './styles'

const Indicators = ({indicatorCount}) => {
    if(!indicatorCount || typeof indicatorCount !== 'number') return null

    let indicators = []
    for(let i = 0; i < indicatorCount; i++) {
        indicators.push(i)
    }
    return indicators.map(indicator => <View key={indicator.toString()} style={styles.indicator} />)
}

export default Indicators
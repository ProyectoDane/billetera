import React from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Text from '../../components/TextUppercase';

import daneLogo from '../../../assets/dane_logo.png';
import tincLogo from '../../../assets/tinc_logo.png';

import { labels } from '../../constants';
import { styles } from './styles';

const About = () => {
  const width = useWindowDimensions().width - 20;

  const imageGenerator = (img, height) => (
    <View style={styles.imageContainer}>
      <Image source={img} style={{ width, height }} resizeMode="contain" />
    </View>
  );

  return (
    <ScrollView style={styles.whiteContainer}>
      <View style={styles.container}>
        {imageGenerator(daneLogo, width / 6)}
        <Text bold>{labels.aboutScreen.dane}</Text>
        <Text paragraph>{labels.aboutScreen.descripton}</Text>
        <Text bold>{labels.aboutScreen.coordination}</Text>
        {imageGenerator(tincLogo, width / 3)}
        <Text bold>{labels.aboutScreen.idea}</Text>
        <Text paragraph>{labels.aboutScreen.ideaText}</Text>
        <Text bold>{labels.aboutScreen.development}</Text>
        <Text paragraph>{labels.aboutScreen.developmentText}</Text>
        <Text bold>{labels.aboutScreen.acknowledgment}</Text>
        <Text paragraph>{labels.aboutScreen.acknowledgmentText}</Text>
        <Text bold>{labels.aboutScreen.license}</Text>
        <Text style={{ textTransform: 'lowercase' }}>
          {labels.aboutScreen.licenseLink}
        </Text>
      </View>
    </ScrollView>
  );
};

export default About;

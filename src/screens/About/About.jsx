import React from 'react';
import {
  Image,
  Linking,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import daneLogo from '../../../assets/dane_logo.png';
import tincLogo from '../../../assets/tinc_logo.png';
import intiveLogo from '../../../assets/intive_logo_blue.png';

import {labels} from '../../constants';
import {styles} from './styles';
import {MarkedList} from "@jsamr/react-native-li";
import {disc} from "@jsamr/counter-style/presets";
import {FontAwesome5} from "@expo/vector-icons";
import TextUppercase from "../../components/TextUppercase";

const About = () => {
  const width = useWindowDimensions().width - 20;
  const dummy = () => {};
  const imageGenerator = (img, height, url) => {
    const openLink = () => (url?Linking.openURL(url):dummy);
    return (
        <TouchableOpacity onPress={openLink}>
          <View style={styles.imageContainer}>
            <Image source={img} style={{width, height}} resizeMode="contain"/>
          </View>
        </TouchableOpacity>
    );
  }

  const members = [
    {"name": "Guido Wagner", "url":"https://www.linkedin.com/in/guiw5/"},
    {"name": "Angles Peña", "url":"https://www.linkedin.com/in/angeles-pe%C3%B1a/"},
    {"name": "Federico Rodriguez", "url":"https://www.linkedin.com/in/rodriguezfederico/"},
    {"name": "Gonzalo Sansone", "url":"https://www.linkedin.com/in/gonzalo-sansone-b440a3196/"},
    {"name": "Lucia Sauer", "url":"https://www.linkedin.com/in/lucia-julieta-sauer/"},
    {"name": "Juan Manuel Alvarez (dj)", "url":"https://www.linkedin.com/in/jmalvarez/"},
    {"name": "Alexis Sukierman", "url":"https://www.linkedin.com/in/zukierman/"},
  ];



  return (
    <ScrollView style={styles.whiteContainer}>
      <View style={{...styles.container, paddingVertical: 20, paddingHorizontal: 5}}>
        {imageGenerator(daneLogo, width / 6, "http://www.proyectodane.org/")}

        <TextUppercase bold style={styles.title}>{labels.aboutScreen.dane}</TextUppercase>
        <Text paragraph>{labels.aboutScreen.descripton}</Text>
        <TextUppercase bold style={styles.title}>{labels.aboutScreen.coordination}</TextUppercase>
        {imageGenerator(tincLogo, width / 3, "https://tinc.org.ar/")}
        <TextUppercase bold style={styles.title}>{labels.aboutScreen.idea}</TextUppercase>
        <Text paragraph>{labels.aboutScreen.ideaText}</Text>
        <TextUppercase bold style={styles.title}>{labels.aboutScreen.development}</TextUppercase>
        <View>
          {imageGenerator(intiveLogo, width / 6, "https://intive.com/")}
          <MarkedList counterRenderer={disc}>
            {members.map((elem, index)=>(
                <Text key={index} style={{ flexShrink: 2, marginVertical: 3 }}  onPress={() => Linking.openURL(elem.url)}>
                  {elem.name} <FontAwesome5  name='linkedin' />
                </Text>
            ))}
          </MarkedList>
        </View>
        <TextUppercase bold style={styles.title}>{labels.aboutScreen.acknowledgment}</TextUppercase>
        <Text paragraph>{labels.aboutScreen.acknowledgmentText}</Text>
        <TextUppercase bold style={styles.title}>{labels.aboutScreen.license}</TextUppercase>
        <Text style={{ textTransform: 'lowercase' }}  onPress={() => Linking.openURL(labels.aboutScreen.licenseLink)}>
          {labels.aboutScreen.licenseLink}
        </Text>
      </View>
    </ScrollView>
  );
};

export default About;

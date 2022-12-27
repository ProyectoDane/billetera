import React from 'react';
import {Image, Linking, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import daneLogo from '../../../assets/dane_logo.png';
import tincLogo from '../../../assets/tinc_logo.png';
import intiveLogo from '../../../assets/intive_logo_blue.png';

import {colors, labels} from '../../constants';
import {styles} from './styles';
import {MarkedList} from "@jsamr/react-native-li";
import {disc} from "@jsamr/counter-style/presets";
import {FontAwesome5} from "@expo/vector-icons";
import TextUppercase from "../../components/TextUppercase";

const About = () => {
  const width = useWindowDimensions().width - 50;
  const dummy = () => {};
  const imageGenerator = (img, height, url) => {
    const openLink = () => (url?Linking.openURL(url):dummy);
    return (
        <TouchableOpacity onPress={openLink}>
          <View style={{...styles.imageContainer,}}>
            <Image source={img} style={{width, height}} resizeMode="contain"/>
          </View>
        </TouchableOpacity>
    );
  }

  const members = [
    {"name": "Leandro Favre", "url":"https://www.linkedin.com/in/leandro-f-7a06a8171/"},
    {"name": "Guido Wagner", "url":"https://www.linkedin.com/in/guiw5/"},
    {"name": "Angeles Peña", "url":"https://www.linkedin.com/in/angeles-pe%C3%B1a/"},
    {"name": "Federico Rodriguez", "url":"https://www.linkedin.com/in/rodriguezfederico/"},
    {"name": "Gonzalo Sansone", "url":"https://www.linkedin.com/in/gonzalo-sansone-b440a3196/"},
    {"name": "Lucia Sauer", "url":"https://www.linkedin.com/in/lucia-julieta-sauer/"},
    {"name": "Juan Manuel Alvarez (dj)", "url":"https://www.linkedin.com/in/jmalvarez/"},
    {"name": "Alexis Sukierman", "url":"https://www.linkedin.com/in/zukierman/"},
  ];

  const thanksTo = [
    {"name": "Graciela  Roldan Schuth", "url":"https://www.linkedin.com/in/graciela-roldan-schuth-a9a2a3114/?original_referer=http%3A%2F%2Fwww.proyectodane.org%2F"},
    {"name": "Elisa Nudman", "url":"https://www.linkedin.com/in/elisa-nudman-71527b13/"},
    {"name": "Maria Eugenia Villamagna", "url":"https://www.linkedin.com/in/eugenia-villamagna-b62bb022/"},
    {"name": "Bettina Schettini", "url":"https://www.linkedin.com/in/bettina-schettini-3840207"},
    {"name": "Ana Clara Razzetti", "url":"https://www.linkedin.com/in/anaclararazzetti/"},
  ];


  const hr = <View style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 1,
    backgroundColor: colors.softGray,
    marginVertical: 15
  }}></View>;
  return (
    <ScrollView style={{}}>
      <View style={{...styles.container}}>
        <TextUppercase bold style={{...styles.title, marginBottom: 10}}>{labels.aboutScreen.dane}</TextUppercase>
        {imageGenerator(daneLogo, width / 5, "http://www.proyectodane.org/")}
        <Text paragraph style={{marginTop: 10}}>{labels.aboutScreen.descripton}</Text>
        {hr}
        <TextUppercase bold style={styles.title}>{labels.aboutScreen.coordination}</TextUppercase>
        {imageGenerator(tincLogo, width / 3, "https://tinc.org.ar/")}
        {hr}
        {/*<TextUppercase bold style={styles.title}>{labels.aboutScreen.idea}</TextUppercase>*/}
        {/*<Text paragraph>{labels.aboutScreen.ideaText}</Text>*/}
        <TextUppercase bold style={styles.title}>{labels.aboutScreen.development}</TextUppercase>
        <View>
          {imageGenerator(intiveLogo, width / 8, "https://intive.com/")}
          <MarkedList counterRenderer={disc}>
            {members.map((elem, index) => (
                <Text key={index} style={{flexShrink: 2, marginVertical: 3}} onPress={() => Linking.openURL(elem.url)}>
                  {elem.name} <FontAwesome5 name='linkedin'/>
                </Text>
            ))}
          </MarkedList>
        </View>
        {hr}
        <TextUppercase bold style={styles.title}>{labels.aboutScreen.acknowledgment}</TextUppercase>
        <View>
          <MarkedList counterRenderer={disc}>
            {thanksTo.map((elem, index) => (
                <Text key={index} style={{flexShrink: 2, marginVertical: 3}} onPress={() => Linking.openURL(elem.url)}>
                  {elem.name} <FontAwesome5 name='linkedin'/>
                </Text>
            ))}
          </MarkedList>
        </View>
        {hr}
        <TextUppercase bold style={styles.title}>{labels.aboutScreen.license}</TextUppercase>
        <Text style={{textTransform: 'lowercase'}} onPress={() => Linking.openURL(labels.aboutScreen.licenseLink)}>
          {labels.aboutScreen.licenseLink}
        </Text>
      </View>
    </ScrollView>
  );
};

export default About;

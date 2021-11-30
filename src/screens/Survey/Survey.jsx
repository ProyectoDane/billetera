import React, { useRef, useState, useEffect } from 'react';
import { View, ActivityIndicator, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useIsFocused } from '@react-navigation/native';

import Text from '../../components/TextUppercase';
import SingleButton from '../../components/SingleButton';

import { styles } from './styles';
import { labels, colors, SCREEN_NAME } from '../../constants';
import { updateSurveyDone, surveyDone } from '../../dataAccess/User';

//TODO: Configurar para que se ejecute al iniciar app por primera vez.

const Survey = ({ navigation, route }) => {
  const [firstTime, setFirstTime] = useState(!!route?.params?.firstTime);
  const [done, setDone] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const init = async () => {
      const isDone = await surveyDone();
      if (!isDone) {
        await updateSurveyDone();
      }
    };
    init();
  }, [isFocused]);

  useEffect(() => {
    if (firstTime && done) {
      updateSurveyDone();
      setTimeout(() => {
        navigation.popToTop();
        navigation.navigate(SCREEN_NAME.HOME);
      }, 1000);
    } else if (!done && !isFocused) {
      navigation.goBack();
    }
  }, [done, firstTime]);

  const refWebView = useRef(null);
  const width = useWindowDimensions().width;
  const renderActivityIndicator = () => (
    <View style={styles.spinner}>
      <ActivityIndicator color={colors.lightGreen} size="large" />
    </View>
  );

  const renderScreenAgain = (text, again) => (
    <View style={styles.completeContainer}>
      <Text paragraph bold>
        {text}
      </Text>
      <View style={{ alignSelf: 'center' }}>
        <SingleButton
          label={again}
          icon="redo-alt"
          sizeIcon={width < 300 ? 10 : 20}
          style={styles.retryBtn}
          onPress={() => setDone(false)}
        />
      </View>
    </View>
  );

  return (
    <View style={firstTime ? styles.containerFistTime : styles.container}>
      {done ? (
        renderScreenAgain(
          labels.surveyScreen.complete,
          labels.surveyScreen.completeAgain,
        )
      ) : (
        <WebView
          testID="survey-web-view"
          ref={refWebView}
          startInLoadingState={true}
          onError={renderScreenAgain(
            labels.surveyScreen.error,
            labels.surveyScreen.again,
          )}
          renderLoading={renderActivityIndicator}
          source={{
            uri: 'https://docs.google.com/forms/d/e/1FAIpQLSdzCaQerAuvmpqL7ADvUGzyIT2HBFF6IxJt0qRdrWbyWMqWXw/viewform?usp=sf_link',
          }}
          onNavigationStateChange={(navState) => {
            if (navState.canGoBack) {
              refWebView.current.stopLoading();
              setDone(true);
              setFirstTime(true);
            }
          }}
        />
      )}
    </View>
  );
};

export default Survey;

import React, { useRef, useState, useEffect } from 'react';
import { View, ActivityIndicator, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';

import Text from '../../components/TextUppercase';
import SingleButton from '../../components/SingleButton';

import { styles } from './styles';
import { labels, colors, SCREEN_NAME } from '../../constants';
import { updateSurveyDone } from '../../dataAccess/User';

//TODO: Configurar para que se ejecute al iniciar app por primera vez.

const Survey = ({ navigation, route }) => {
  const [firstTime, setFirstTime] = useState(!!route?.params?.firstTime);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (firstTime && done) {
      updateSurveyDone();
      navigation.navigate(SCREEN_NAME.HOME);
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
  console.log('firstTime', firstTime);
  console.log('done', done);

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

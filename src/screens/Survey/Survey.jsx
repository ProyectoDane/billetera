import React, { useRef, useState } from 'react';
import { View, ActivityIndicator, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';

import Text from '../../components/TextUppercase';
import SingleButton from '../../components/SingleButton';

import { styles } from './styles';
import { labels, colors } from '../../constants';

//TODO: Configurar para que se ejecute al iniciar app por primera vez.

const Survey = () => {
  const [done, setDone] = useState(false);
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
          color="lightGreen"
          onPress={() => setDone(false)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
            }
          }}
        />
      )}
    </View>
  );
};

export default Survey;

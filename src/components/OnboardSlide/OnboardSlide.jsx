import React, { useState, useRef } from 'react';
import { FlatList, View } from 'react-native';

import Indicators from './Indicators';
import Slide from './Slide';
import Button from './Button';

import styles from './styles';

const OnboardSlide = ({ slides = [], onDone }) => {
  if (!slides || !slides.length) return null;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef();

  const onViewableItemsChanged = useRef((item) => {
    const index = item.viewableItems[0].index;
    setCurrentSlideIndex(index);
  });

  const handleSkip = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const handleNext = () => {
    if (currentSlideIndex >= slides.length - 1) return;
    flatListRef.current.scrollToIndex({ index: currentSlideIndex + 1 });
  };

  return (
    <>
      <View>
        <FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          data={slides}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Slide item={item} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged.current}
        />

        <View style={{ marginTop: 100, paddingHorizontal: 11 }}>
          {currentSlideIndex < slides.length - 1 ? (
            <Button title="CONTINUAR" icon="long-arrow-alt-right" mode="contained" onPress={handleNext} />
          ) : (
            <Button
              title="EMPECEMOS"
              icon="long-arrow-alt-right"
              mode="contained"
              onPress={() => console.log('Entrar a la app...')}
            />
          )}
          <View style={{ marginTop: 14 }} />
          {currentSlideIndex < slides.length - 1 ? (
            <Button title="SALTAR" mode="outlined" onPress={handleSkip} />
          ) : (
            <Button title="IR A ENCUESTA" mode="outlined" onPress={() => console.log('Ir a encuesta...')} />
          )}
        </View>
      </View>

      <View style={styles.indicatorContainer}>
        <Indicators currentSlideIndex={currentSlideIndex} countIndicator={slides.length} />
      </View>
    </>
  );
};

export default OnboardSlide;

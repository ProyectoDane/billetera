import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import AnimatedBox from './AnimatedBox';
import styles from './styles';

export const ToggleContext = React.createContext({ expanded: null, expandable: null });

const Card = ({ expandable = false, children, containerStyle, style }) => {
  const [expanded, setExpanded] = useState(false);
  const [content, setExpandable] = useState(false);

  const toggle = useCallback(() => {
    setExpanded((open) => !open);
  }, []);

  const value = useMemo(
    () => ({ expanded, toggle, setExpandable, content, expandable: Boolean(content) }),
    [expanded, content],
  );

  const cardWrapper = StyleSheet.flatten([{ padding: 12 }, expandable ? { flex: 1 } : { flex: 0.42 }, containerStyle]);
  const styles2 = StyleSheet.flatten([expandable ? styles.cardContent : styles.cardContentFlex, style]);
  const divider = {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    margin: 15,
    marginBottom: 10,
  };
  return (
    <ToggleContext.Provider value={value}>
      <View style={cardWrapper}>
        <View style={[styles.card, expandable ? { flex: 0 } : { flex: 1 }]}>
          <TouchableWithoutFeedback onPress={expandable ? toggle : null}>
            <View style={styles2}>{children}</View>
          </TouchableWithoutFeedback>
          { expandable ? (
            <AnimatedBox open={expanded}>
              <View>
                <View style={divider} />
                {content}
              </View>
            </AnimatedBox>
          ) : null }
        </View>
      </View>
    </ToggleContext.Provider>
  );
};

export default Card;

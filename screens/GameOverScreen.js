import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const GameOverScreen = props => {
  return (
    <View style={ styles.screen }>
      <Text style={ styles.defaultText }>J'ai deviné votre nombre en { props.guessRounds } essais !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  defaultText: {
    color: Colors.text,
  }
});

export default GameOverScreen;

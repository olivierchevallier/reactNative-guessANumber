import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';

import Colors from '../constants/colors';

const GameOverScreen = props => {
  return (
    <View style={ styles.screen }>
      <Card title="J'ai deviné votre nombre" style={ styles.messageContainer }>
        <BodyText style={ styles.text }>Il m'a fallu</BodyText>
        <NumberContainer>{ props.guessRounds}</NumberContainer>
        <BodyText style={ styles.text }>essais</BodyText>
        <BodyText style={ [styles.text, styles.spaced] }>Votre nombre était</BodyText>
        <NumberContainer>{ props.userNumber }</NumberContainer>
        <Button title="Nouvelle partie" onPress={ props.onNewGame }/>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 15,
  },

  spaced: {
    marginTop: 20,
  },

  messageContainer: {
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default GameOverScreen;

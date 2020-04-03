import React from 'react';
import { View, Text, Image, Button, StyleSheet, Dimensions } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Title from '../components/Title';
import BodyText from '../components/BodyText';
import CustomButton from '../components/CustomButton';

import Colors from '../constants/colors';

const GameOverScreen = props => {
  return (
    <View style={ styles.screen }>
      <Image source={ require('../assets/gameOver.png') } style={ styles.image } />
      <Card title="J'ai deviné votre nombre" style={ styles.messageContainer }>
        <BodyText>Il m'a fallu</BodyText>
        <NumberContainer>{ props.guessRounds}</NumberContainer>
        <BodyText>essais</BodyText>
        <Title style={ styles.spaced }>Votre nombre était</Title>
        <NumberContainer>{ props.userNumber }</NumberContainer>
        <CustomButton onPress={ props.onNewGame }>Nouvelle partie</CustomButton>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: (Dimensions.get('window').height > 811 ? 50 : 10),
  },

  spaced: {
    marginTop: (Dimensions.get('window').height > 811 ? 20 : 10),
  },

  messageContainer: {
    alignItems: 'center',
    textAlign: 'center',
  },

  image: {
    width: (Dimensions.get('window').height > 811 ? 180 : 150), height: (Dimensions.get('window').height > 811 ? 180 : 150),
    borderRadius: 100,
  },
});

export default GameOverScreen;

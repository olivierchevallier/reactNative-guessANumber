import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Dimensions } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Title from '../components/Title';
import BodyText from '../components/BodyText';
import CustomButton from '../components/CustomButton';

import Colors from '../constants/colors';

const GameOverScreen = props => {
  const [verticalOrientation, setVerticalOrientation] = useState(Dimensions.get('window').width < Dimensions.get('window').height);

  useState(() => {
    const updateLayout = () => {
      setVerticalOrientation(Dimensions.get('window').width < Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  let layout = (
    <View style={ styles.screenV }>
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

  if (!verticalOrientation) {
    layout = (
      <View style={ styles.screenH }>
      <Image source={ require('../assets/gameOver.png') } style={ styles.image } />
      <Card title="Votre nombre était" style={ styles.messageContainer }>
        <NumberContainer>{ props.userNumber }</NumberContainer>
        <CustomButton onPress={ props.onNewGame }>Nouvelle partie</CustomButton>
      </Card>
    </View>
    );
  }

  return layout;
};

const styles = StyleSheet.create({
  screenV: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: (Dimensions.get('window').height > 811 ? 50 : 10),
  },

  screenH: {
    flexDirection: 'row', flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: (Dimensions.get('window').height > 811 ? 50 : 10),
  },

  spaced: {
    marginTop: (Dimensions.get('window').height > 811 ? 20 : 10),
  },

  messageContainer: {
    alignItems: 'center',
    textAlign: 'center',
  },

  image: {
    width: (Dimensions.get('window').height > 650 ? 180 : 150), height: (Dimensions.get('window').height > 650 ? 180 : 150),
    borderRadius: 100,
  },
});

export default GameOverScreen;

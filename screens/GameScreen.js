import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rnd = Math.floor((Math.random() * (max - min)) + min);
  if (rnd === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rnd;
  }
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));

  return (
    <View style={ styles.screen }>
      <Card title="Choix de l'ordinateur">
        <NumberContainer>{ currentGuess }</NumberContainer>
        <View style={ styles.buttonContainer }>
          <Button title="Plus petit" onPress={ () => {} }/>
          <Button title="Plus grand" onPress={ () => {} }/>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '90%',
  }
});

export default GameScreen;
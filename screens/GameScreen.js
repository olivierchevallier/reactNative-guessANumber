import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

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
  const currentMin = useRef(1);
  const currentMax = useRef(100);
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(currentMin.current, currentMax.current, props.userChoice));

  const nextGuessHandler = (direction) => {
    if ((direction < 0 && currentGuess < props.userChoice) || (direction > 0 && currentGuess > props.userChoice)) {
      Alert.alert(
        'Vous essayez de tricher !', 
        'Je t\'ai reconnu petit tricheur... je te laisse une chance de me donner la bonne indication', 
        [{ text: 'Compris !', style: 'destructive', onPress: ()=>{} }]
      );
    } else {
      if(direction < 0) {
        currentMax.current = currentGuess;
      } else {
        currentMin.current = currentGuess;
      }
      setCurrentGuess(generateRandomBetween(currentMin.current, currentMax.current, currentGuess));
    }
    console.log('min : ' + currentMin.current + 'max : ' + currentMax.current);
  };

  return (
    <View style={ styles.screen }>
      <Card title="Choix de l'ordinateur">
        <NumberContainer>{ currentGuess }</NumberContainer>
        <Card style={ styles.buttonContainer }>
          <Button title="Plus petit" onPress={ () => { nextGuessHandler(-1) } }/>
          <Button title="Plus grand" onPress={ () => { nextGuessHandler(1) } }/>
        </Card>
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
    justifyContent: 'space-between',
    marginTop: 20,
    width: '85%',
    padding: 0,
  }
});

export default GameScreen;
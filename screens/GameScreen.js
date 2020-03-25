import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min); max = Math.floor(max);
  const rnd = Math.floor((Math.random() * (max - min)) + min);
  if (rnd === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else { return rnd; }
};

const GameScreen = props => {
  const currentMin = useRef(1);
  const currentMax = useRef(100);
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(currentMin.current, currentMax.current, props.userChoice));
  const [rounds, setRounds] = useState(1);

  // Ici on décompose le tableau props pour pouvoir passer les dépendances à useEffect
  // Sans ça, il faudrait passer props.userChoice et props.onGameOver à useEffect
  // Et donc ils seraient considérés comme différents à chaque "rerendering"
  const { userChoice, onGameOver } = props;

  // Le deuxième argument de useEffect spécifie les dépendances selon lesquelles la fonction doit s'executer ou non
  // Quand le composant est "rerendered", la fonction ne s'executera que si les dépendences ont changé.
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if ((direction < 0 && currentGuess < userChoice) || (direction > 0 && currentGuess > userChoice)) {
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
      setRounds(rounds => rounds + 1);
    }
  };

  return (
    <View style={ styles.screen }>
      <Card title="Choix de l'ordinateur">
        <NumberContainer>{ currentGuess }</NumberContainer>
      </Card>
      <Card style={ styles.buttonContainer }>
          <CustomButton color={ Colors.danger } onPress={ () => { nextGuessHandler(-1) } }>
            <Ionicons name="ios-remove" color="white" size={ 24 } />
          </CustomButton>

          <CustomButton color={ Colors.success } onPress={ () => { nextGuessHandler(1) } }>
            <Ionicons name="ios-add" color="white" size={ 24 } />
          </CustomButton>
        </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },

  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 20,
  }
});

export default GameScreen;
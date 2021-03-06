import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import Title from '../components/Title';
import BodyText from '../components/BodyText';

import Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min + 1); max = Math.floor(max);
  const rnd = Math.floor((Math.random() * (max - min)) + min);
  if (rnd === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else { return rnd; }
};

const renderListItem = (guess, index) => (
  <View style={ [styles.pastGuessContainer, (index == 0 ? styles.firstGuess : null)] } key={ guess }>
    <BodyText style={ styles.pastGuess }> { guess }</BodyText>
  </View>
);

const GameScreen = props => {
  const currentMin = useRef(1);
  const currentMax = useRef(100);
  const initialGuess = generateRandomBetween(currentMin.current, currentMax.current, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [verticalOrientation, setVerticalOrientation] = useState(Dimensions.get('window').width < Dimensions.get('window').height);

  // Ici on décompose le tableau props pour pouvoir passer les dépendances à useEffect
  // Sans ça, il faudrait passer props.userChoice et props.onGameOver à useEffect
  // Et donc ils seraient considérés comme différents à chaque "rerendering"
  const { userChoice, onGameOver } = props;

  // Le deuxième argument de useEffect spécifie les dépendances selon lesquelles la fonction doit s'executer ou non
  // Quand le composant est "rerendered", la fonction ne s'executera que si les dépendences ont changé.
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
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
      const nextGuess = generateRandomBetween(currentMin.current, currentMax.current, currentGuess);
      setCurrentGuess(nextGuess);
      setPastGuesses(currPastGuesses => [nextGuess, ...currPastGuesses]);
    }
  };

  useEffect(() => {
    const updateLayout = () => {
      setVerticalOrientation(Dimensions.get('window').width < Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });

  let layout = (
    <View style={ styles.screenV }>
      <Card title="Choix de l'ordinateur">
        <NumberContainer>{ currentGuess }</NumberContainer>
      </Card>
      <View style={ styles.pastGuessesContainer }>
        <Title style={ styles.pastGuessesTitle }>Historique des propositions</Title>
        <ScrollView contentContainerStyle={ styles.pastGuessesSV }>
          { pastGuesses.map((guess, index) => renderListItem(guess, (index - pastGuesses.length + 1))) }
        </ScrollView>
      </View>
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

  if (!verticalOrientation) {
    layout = (
      <View style={ styles.screenH }>
        <View style={ styles.leftSection }>
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
        <View style={ styles.pastGuessesContainer }>
          <Title style={ styles.pastGuessesTitle }>Historique des propositions</Title>
          <ScrollView contentContainerStyle={ styles.pastGuessesSV }>
            { pastGuesses.map((guess, index) => renderListItem(guess, (index - pastGuesses.length + 1))) }
          </ScrollView>
        </View>
      </View>
    );
  }

  return layout;
};

const styles = StyleSheet.create({
  screenV: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  screenH: {
    flex: 1, flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 20,
  },

  leftSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },

  pastGuessesContainer: {
    flex: 1,
    marginTop: 20,
    width: '100%',
  },

  pastGuessesTitle: {
    textAlign: 'center',
  },

  pastGuessesSV: {
    flexGrow: 1,
    marginTop: 12,
  },

  pastGuessContainer: {
    borderTopColor: Colors.secondary,
    borderTopWidth: 1,
  },

  firstGuess: {
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
  }, 

  pastGuess: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 6,
  }
});

export default GameScreen;
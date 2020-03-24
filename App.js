import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

import Colors from './constants/colors';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (roundsCount) => {
    setGuessRounds(roundsCount);
  };

  const newGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let content = <StartGameScreen onStartGame={ startGameHandler }/>;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={ userNumber } onGameOver={ gameOverHandler }/>;
  } else if (guessRounds > 0) {
    content = <GameOverScreen guessRounds={ guessRounds } userNumber={ userNumber } onNewGame={ newGameHandler } />;
  }

  return (
    <View style={ styles.screen }>
      <Header title="Devine un nombre"></Header>
      { content }
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  }
});

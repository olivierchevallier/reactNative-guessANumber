import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';

import Title from '../components/Title';

import Colors from '../constants/colors';

const NumberContainer = props => {
  let number = parseInt(props.children);
  const [showingNumber, setShowingNumber] = useState(0);

  if (isNaN(number)){
    console.log('The value you passed to NumberContainer is not a number');
    setShowingNumber(0);
  }

  const timeoutDuration = (base) => {
    if (showingNumber < number) {
      return base / (number + 1 - showingNumber);
    } else {
      return base / (showingNumber + 1 - number);
    }
  }

  setTimeout(() => {
    if (showingNumber < number) {
      setShowingNumber(showingNumber + 1);
    } else if (showingNumber > number) {
      setShowingNumber(showingNumber - 1);
    }
  }, timeoutDuration(200));

  return (
    <View>
      <Title style={ styles.number }>{ showingNumber }</Title>
    </View>
  );
}

const styles = StyleSheet.create({
  number: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: (Dimensions.get('window').height > 650 ? 40 : 25),
  },
});

export default NumberContainer;
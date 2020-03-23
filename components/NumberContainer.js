import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
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
    <View style={ styles.numberContainer }>
      <Text style={ styles.number }>{ showingNumber }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  numberContainer: {

  },

  number: {
    color: Colors.text,
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default NumberContainer;
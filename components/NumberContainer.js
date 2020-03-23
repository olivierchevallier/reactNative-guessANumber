import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const NumberContainer = props => {
  let number = parseInt(props.children);
  const [showingNumber, setShowingNumber] = useState(0);

  if (isNaN(number)){
    console.log('The value you passed to NumberContainer is not a number');
    setShowingNumber(0);
  }


  setTimeout(() => {
    if (showingNumber < number) {
      setShowingNumber(showingNumber + 1);
    } else if (showingNumber !== number) {
      setShowingNumber(0);
    }
  }, (500/((number + 1) - showingNumber)));

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
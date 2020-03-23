import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const Input = props => {
  return (
    <TextInput 
      { ...props }
      style={ {...styles.input, ...props.style} } 
      placeholderTextColor={ Colors.tertiary }
      keyboardAppearance="dark"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginVertical: 12,
    borderColor: Colors.secondary,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default Input;
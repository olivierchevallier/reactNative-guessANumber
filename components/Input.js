import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/colors';

const Input = props => {
  return (
    <TextInput 
      { ...props }
      style={ {...styles.input, ...Platform.select({ ios: styles.inputIOS, android: styles.inputAndroid}), ...props.style} } 
      placeholderTextColor={ Colors.tertiary }
      keyboardAppearance="dark"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: Colors.secondary,
  },

  inputAndroid: {
    marginBottom: 12,
    padding: 3,
    borderBottomWidth: 0.5,
  },

  inputIOS: {
    marginVertical: 12,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default Input;
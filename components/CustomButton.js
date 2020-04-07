import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import Colors from '../constants/colors';

const CustomButton = props => {
  const backgroundColor = props.color ? { backgroundColor: props.color } : '';

  let TouchableComponent = TouchableOpacity;
  if (Platform.OS == 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={ styles.buttonContainer }>
      <TouchableComponent onPress={ props.onPress }>
        <View style={ [styles.button, backgroundColor] }>
          <Text style={ styles.title }>{ props.children }</Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    overflow: 'hidden',
  },

  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 12, paddingHorizontal: 24,
    borderRadius: 24,
  },

  title: {
    color: Colors.text,
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
  }
});

export default CustomButton;
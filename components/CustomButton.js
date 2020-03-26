import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../constants/colors';

const CustomButton = props => {
  const backgroundColor = props.color ? { backgroundColor: props.color } : '';

  return (
    <TouchableOpacity onPress={ props.onPress }>
      <View style={ [styles.button, backgroundColor] }>
        <Text style={ styles.title }>{ props.children }</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
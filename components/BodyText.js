import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const BodyText = props => {
  return (
    <Text style={ {...styles.body, ...props.style} }>{ props.children }</Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans',
    color: Colors.text,
  },
});

export default BodyText;
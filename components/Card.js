import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const Card = props => {
  return (
    <View style={ {...styles.card, ...props.style} }>
      <Text style={ styles.title }>{ props.title }</Text>
      { props.children }
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    padding: 20,
    // Ces propriétés apportent un ombre sur iOS
    //shadowColor: 'rgb(142, 142, 147)', shadowOffset: { height: 2, width: 0 }, shadowRadius: 6, shadowOpacity: 0.26,
    // Cette propriété apporte une ombre sur android
    //elevation: 5,
    borderRadius: 10,
  },

  title: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default Card;
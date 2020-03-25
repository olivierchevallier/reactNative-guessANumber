import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Title from '../components/Title';

import Colors from '../constants/colors';

const Card = props => {
  let title = null;
  if (props.title) {
    title = <Title style={ styles.title }>{ props.title }</Title>;
  }

  return (
    <View style={ {...styles.card, ...props.style} }>
      { title }
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
    textAlign: 'center',
    marginBottom: 12,
  }
});

export default Card;
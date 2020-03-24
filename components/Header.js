import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Title from '../components/Title';

import Colors from '../constants/colors';

const Header = props => {
  return (
    <View style={ styles.header }>
      <Title>{ props.title }</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%', height: 100,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  }
});

export default Header;


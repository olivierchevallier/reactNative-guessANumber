import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Title from '../components/Title';

import Colors from '../constants/colors';

const Header = props => {
  let headerStyle = styles.header;

  if (Dimensions.get('window').height > 811) {
    headerStyle = styles.bigHeader;
  }

  return (
    <View style={ headerStyle }>
      <Title>{ props.title }</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%', height: 65,
    paddingTop: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },

  bigHeader: {
    width: '100%', height: 100,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  }
});

export default Header;


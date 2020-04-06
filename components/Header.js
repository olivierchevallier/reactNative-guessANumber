import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Title from '../components/Title';

import Colors from '../constants/colors';

const Header = props => {
  const [ windowHeight, setWindowHeight ] = useState(Dimensions.get('window').height);
  let headerStyle = styles.header;

  useEffect(() => {
    const updateLayout = () => {
      setWindowHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  if (windowHeight > 811) {
    headerStyle = styles.bigHeader;
  } else if (windowHeight < 450) {
    headerStyle = styles.smallHeader;
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
  },

  smallHeader: {
    width: '100%', height: 50,
    paddingTop: 5,
    backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  }
});

export default Header;


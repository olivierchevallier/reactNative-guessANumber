import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Button, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert,
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import { reset } from 'expo/build/AR';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Nombre invalide !', 'Le nombre choisi doit se situer entre 1 et 99.', [{ text: 'Compris !',  style: 'destructive', onPress: resetInputHandler}])
      setConfirmed(false);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  }

  let confirmOutput;

  if (confirmed) {
    confirmOutput = (
      <Card style={ styles.confirmationContainer }>
        <Text style={ [styles.defaultText, styles.confirmationTitle] }>Vous avez choisi le nombre</Text>
        <NumberContainer>{ selectedNumber }</NumberContainer>
        <Button title="Commencer " />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={ ()=>{ Keyboard.dismiss() } }>
      <View style={ styles.screen }>
        <Text style={ [styles.defaultText, styles.title] }>Commencer une nouvelle partie</Text>
        <Card style={ styles.card }>
          <Text style={ styles.defaultText }>Entrez un nombre</Text>
          <Input 
            style={ styles.numericInput } 
            placeholder="Ex: 36" 
            keyboardType="number-pad"
            maxLength={ 2 }
            onChangeText={ numberInputHandler }
            value={ enteredValue }
          />
          <View style={ styles.buttonsContainer }>
            <View style={ styles.button }>
              <Button title="Réinitialiser" onPress={ resetInputHandler } color={ Colors.danger } />
            </View>
            <View style={ styles.button }>
              <Button title="Confirmer" onPress={ confirmInputHandler } color={ Colors.accent } />
            </View>
          </View>
        </Card>
        { confirmOutput }
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    marginVertical: 12,
  },

  card: {
    width: '95%',
    alignItems: 'center',
  },

  numericInput: {
    width: '100%',
    textAlign: 'center',
    color: Colors.text,
  },

  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  defaultText: {
    color: Colors.text,
  },

  button: {
    width: 110,
  },

  confirmationContainer: {
    marginTop: 20,
  },

  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  chosenNumber: {
    
  }
});

export default StartGameScreen;
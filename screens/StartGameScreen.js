import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Button, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert,
  Dimensions,
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import Title from '../components/Title';
import CustomButton from '../components/CustomButton';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [verticalOrientation, setVerticalOrientation] = useState(Dimensions.get('window').width < Dimensions.get('window').height);

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
      <Card style={ verticalOrientation ? styles.confirmationContainerV : styles.confirmationContainerH } title="Vous avez choisi le nombre">
        <NumberContainer>{ selectedNumber }</NumberContainer>
        <CustomButton onPress={ ()=> props.onStartGame(selectedNumber) }>Commencer</CustomButton>
      </Card>
    );
  }

  useEffect(() => {
    const updateLayout = () => {
      setVerticalOrientation(Dimensions.get('window').width < Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  return (
    <TouchableWithoutFeedback onPress={ ()=>{ Keyboard.dismiss() } }>
        <View style={ styles.screen }>
          <Title style={ styles.title }>Commencer une nouvelle partie</Title>
          <View style={ (verticalOrientation ? styles.mainContainerV : styles.mainContainerH) }>
            <Card style={{ ...styles.inputContainer, width: (verticalOrientation ? '100%' : '50%') }} title="Entrez un nombre">
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

  mainContainerV: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center',
  },

  mainContainerH: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center',
  },

  title: {
    marginVertical: 12,
  },

  inputContainer: {
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

  button: {
    width: 110,
  },

  confirmationContainerV: {
    marginTop: 20,
    alignItems: 'center',
  },

  confirmationContainerH: {
    marginLeft: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;
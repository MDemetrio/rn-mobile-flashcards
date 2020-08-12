import React from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';

const TextField = ({ value, onChange, ...props }) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.inputText}
        underlineColorAndroid='#A593E0'
        selectionColor='#A593E0'
        onChangeText={onChange}
        value={value}
        {...props}
      />
    </View>
  );
};

const styles = Platform.OS == 'ios' ?
  StyleSheet.create({
    inputText: {
      fontSize: 24,
      textAlign: 'center',
      color: '#566270',
      fontWeight: '300',
      height: 40,
    },
    textInputContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#A593E0'
    }
  })
  :
  StyleSheet.create({
    inputText: {
      fontSize: 24,
      textAlign: 'center',
      color: '#566270',
      fontWeight: '300',
      height: 40,

      selectionColor: '#A593E0',
    },
    textInputContainer: {
      borderBottomWidth: 0,
      borderBottomColor: '#A593E0'
    }
  })

export default TextField;
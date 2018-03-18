import React from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';

const TextField = ({value, onChange, ...props}) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.inputText}
        onChangeText={onChange}
        value={value}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#566270',
    fontWeight: '300',
    height: 40,
    underlineColorAndroid: '#A593E0',
    selectionColor: '#A593E0',
  },
  textInputContainer: {
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderBottomColor: '#A593E0'
  }
});

export default TextField;
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import TextField from '../shared/TextField';

import { addCardToDeck } from '../helpers/repository';

export default class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const deck = navigation.getParam('deckTitle', 'Deck');
    return {
      title: deck,
    };
  };

  state = {
    card: {
      question: '',
      answer: '',
    },
  };

  handleSubmit = async () => {
       const deckTitle = this.props.navigation.getParam('deckTitle', 'Deck');
       if (deckTitle) {
       await addCardToDeck({ title: deckTitle, card: this.state.card });
       }

    this.props.navigation.goBack();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
          <Text style={styles.deckNameText}>New Card</Text>
        </View>
        <View>
          <TextField
            onChange={question =>
              this.setState(prevState => ({
                card: { ...prevState.card, question },
              }))}
            value={this.state.card.question}
            placeholder={'Question'}
          />
          <TextField
            onChange={answer =>
              this.setState(prevState => ({
                card: { ...prevState.card, answer },
              }))}
            value={this.state.card.answer}
            placeholder={'Answer'}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handleSubmit()}>
            <Text style={styles.cardCountText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFF3',
    padding: 20,
    flex: 1,
    justifyContent: 'space-around',
  },
  deckNameText: {
    textAlign: 'center',
    fontSize: 32,
    color: '#A593E0',
    fontWeight: '200',
  },
  cardCountText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#566270',
    fontWeight: '300',
  },
  button: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#A593E0',
    margin: 5,
    padding: 10,
  },
});
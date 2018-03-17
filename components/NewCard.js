import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { addCardToDeck } from '../helpers/repository';

export default class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;

    return {
      title: deck ? `Add card to ${deck.title}` : 'New Card',
    };
  };
  state = {
    card: {
      question: '',
      answer: '',
    },
  };
  handleSubmit = async () => {
    const { deck } = this.props.navigation.state.params;
    await addCardToDeck({ title: deck.title, card: this.state.card });

    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.deckNameText}>New Card</Text>
        </View>
        <View>
          <TextInput
            style={[
              { height: 40, borderColor: 'gray', borderWidth: 1 },
              styles.cardCountText,
            ]}
            onChangeText={question =>
              this.setState(prevState => ({
                card: { ...prevState.card, question },
              }))}
            value={this.state.card.question}
          />
          <TextInput
            style={[
              { height: 40, borderColor: 'gray', borderWidth: 1 },
              styles.cardCountText,
            ]}
            onChangeText={answer =>
              this.setState(prevState => ({
                card: { ...prevState.card, answer },
              }))}
            value={this.state.card.answer}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handleSubmit()}>
            <Text style={styles.cardCountText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
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

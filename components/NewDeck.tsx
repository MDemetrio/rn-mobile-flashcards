import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import TextField from '../shared/TextField'

import { saveDeckTitle } from '../helpers/repository';

export default class NewDeck extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerStyle: {
      borderBottomWidth: 0,
    },
  };

  state = { title: '' };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBarStyle('dark-content');
      this.setState({title: ''})
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  handleSubmit = async () => {
    const deck = await saveDeckTitle(this.state.title);
    this.props.navigation.navigate('DeckDetail', {
      deckTitle: deck.title,
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">

        <View>
          <Text style={styles.deckNameText}>
            What is the title of your new deck?
          </Text>
        </View>
          <TextField
            onChange={title => this.setState({ title })}
            value={this.state.title}
            placeholder={'Deck Name'}
          />
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
  button: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#A593E0',
    margin: 5,
    padding: 10,
  },
});
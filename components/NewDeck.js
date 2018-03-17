import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import { saveDeckTitle, getDeck } from '../helpers/repository';

export default class NewDeck extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerStyle: {
      borderBottomWidth: 0,
    },
  };

  state = { title: '' };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  handleSubmit = async () => {
    const deck = await saveDeckTitle(this.state.title);
    console.log(deck);
    this.props.navigation.navigate('DeckDetail', {
      deck
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>

        <View>
          <Text style={styles.deckNameText}>
            What is the title of your new deck?
          </Text>
        </View>
        <View>
          <TextInput
            style={[
              { height: 40, borderColor: 'gray', borderWidth: 1 },
              styles.cardCountText,
            ]}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
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

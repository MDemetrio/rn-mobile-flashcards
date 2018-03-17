import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { getDecks } from '../helpers/repository';

export default class DeckList extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerStyle: {
      borderBottomWidth: 0,
    },
  };

  state = { decks: [] };

 componentDidMount() {
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBarStyle('dark-content');
      getDecks().then(decks => this.setState({decks}))
    });
  }
  
  componentWillUnmount() {
    this._navListener.remove();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <FlatList
          horizontal
          data={this.state.decks}
          keyExtractor={(item, index) => item.title}
          renderItem={({ item }) => (
            <View style={[styles.item, styles.shadow]}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('DeckDetail', { deck: item })}>
                <Text style={styles.deckNameText}>
                  {item.title}
                </Text>
                <Text style={styles.cardCountText}>
                  {item.cardCount} cards
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingBottom: 48,
    backgroundColor: '#566270',
  },
  item: {
    width: 275,
    backgroundColor: '#FFFFF3',
    borderRadius: 16,
    padding: 20,
    margin: 15,
    justifyContent: 'center',
  },
  shadow: {
    elevation: 10,
    shadowRadius: 4,
    shadowOpacity: 0.6,
    shadowColor: '#A593E0',
    shadowOffset: {
      width: 8,
      height: 8,
    },
  },
  deckNameText: {
    textAlign: 'center',
    fontSize: 64,
    color: '#A593E0',
    fontWeight: '200',
  },
  cardCountText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#566270',
    fontWeight: '300',
  },
});


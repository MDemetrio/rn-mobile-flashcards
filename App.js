import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import QuizPage from './components/QuizPage';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import { Ionicons } from '@expo/vector-icons';

const Tabs = TabNavigator(
  {
    DeckListStack: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? 'ios-browsers' : 'ios-browsers-outline'}
            size={26}
            style={{ color: '#A593E0' }}
          />
        ),
      },
    },
    NewDeckStack: {
      screen: NewDeck,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? 'ios-create' : 'ios-create-outline'}
            size={26}
            style={{ color: '#A593E0' }}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#A593E0',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
  }
);

const RootStack = StackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    DeckDetail: {
      screen: DeckDetail,
    },
    QuizPage: {
      screen: QuizPage,
    },
    NewCard: {
      screen: NewCard,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component {
  render() {
    return (
    <RootStack/>
    );
  }
}

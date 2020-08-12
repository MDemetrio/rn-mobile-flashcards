import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import QuizPage from './components/QuizPage';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import { Ionicons } from '@expo/vector-icons';

interface TabInfo {
  label?: string;
  focusIcon: string;
  unfocusIcon: string;
}

const Tabs: Record<string, TabInfo> = {
  "DeckList": { label: "Decks", focusIcon: 'ios-browsers', unfocusIcon: 'ios-browsers-outline' },
  "NewDeck": { focusIcon: 'ios-create', unfocusIcon: 'ios-create-outline' },
}

const Tab = createBottomTabNavigator();

const Home = () => (
  <Tab.Navigator tabBarOptions={{ activeTintColor: '#A593E0' }} screenOptions={({ route }) => (
    {
      tabBarLabel: Tabs[route.name].label,
      tabBarIcon: ({ focused }) =>
        <Ionicons
          name={focused ? Tabs[route.name].focusIcon : Tabs[route.name].unfocusIcon}
          size={26}
          style={{ color: '#A593E0' }}
        />
    })}>
    <Tab.Screen name="DeckList" component={DeckList} />
    <Tab.Screen name="NewDeck" component={NewDeck} />
  </Tab.Navigator>
)

const RootStack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="DeckDetail" component={DeckDetail} />
          <RootStack.Screen name="QuizPage" component={QuizPage} />
          <RootStack.Screen name="NewCard" component={NewCard} />

        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
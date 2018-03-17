import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { BlurView } from 'expo';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default class QuizPage extends Component {
  static navigationOptions = {
    title: 'Quiz',
  };
  state = {
    intensity: new Animated.Value(0),
    answerShown: false
  };
  componentDidMount() {
    this._animate();
  }

  _animate = () => {
    let { intensity } = this.state;
    Animated.timing(intensity, { duration: 2500, toValue: 100 }).start(() => {
      Animated.timing(intensity, { duration: 2500, toValue: 0 }).start(
        this._animate
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deckNameText}>
          Does React Native work with android?
        </Text>
        
        <View>
          <Text style={styles.deckNameText}>
            Answer
          </Text>
          <AnimatedBlurView
            tint="default"
            intensity={this.state.intensity}
            style={StyleSheet.absoluteFill}
          />
        </View>
        
        {this.state.answerShown ? 
        
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.cardCountText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.cardCountText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
        :
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.cardCountText}>Show Answer</Text>
          </TouchableOpacity>
        </View>
        }
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

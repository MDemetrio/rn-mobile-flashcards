import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { BlurView } from 'expo';
import { getDeck, concludeStudySession } from '../helpers/repository';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default class QuizPage extends Component {
  static navigationOptions = {
    title: 'Quiz',
  };

  state = {
    intensity: new Animated.Value(100),

    answerShown: false,

    deck: {
      title: '',
      questions: [],
      cardCount: 0,
    },

    points: 0,

    currentQuestion: {
      position: 0,
    },
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('willFocus', () => {
      const deckTitle = this.props.navigation.getParam('deckTitle', 'Deck');
      if (deckTitle) {
        getDeck(deckTitle).then(deck =>
          this.setState({
            deck,
            currentQuestion: { position: 0, ...deck.questions[0] },
          })
        );
      }
    });
  }

  async componentDidUpdate() {
    if (this.state.endReached) {
      await concludeStudySession(this.state.deck.title);
    }
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  _animate = () => {
    let { intensity } = this.state;
    Animated.timing(intensity, { duration: 2500, toValue: 0 }).start();
  };

  _showAnswer = () => {
    this._animate();
    this.setState({ answerShown: true });
  };

  _nextQuestion = correct => {
    this.setState(({ currentQuestion, deck, points }) => {
      const position = currentQuestion.position + 1;
      const newPoints = correct ? points + 1 : points;

      if (deck.cardCount === position) {
        return {
          points: newPoints,
          endReached: true,
        };
      }

      return {
        intensity: new Animated.Value(100),
        points: newPoints,
        answerShown: false,
        currentQuestion: {
          position: position,
          ...deck.questions[position],
        },
      };
    });
  };

  render() {
    const {
      deck,
      currentQuestion,
      answerShown,
      endReached,
      points,
    } = this.state;
    const currentPosition = deck && currentQuestion
      ? `${currentQuestion.position + 1}/${deck.cardCount}`
      : '';

    return endReached
      ? <View style={styles.container}>
          <Text style={styles.deckNameText}>
            {`Congrats!! You got ${points} questions right`}
          </Text>
        </View>
      : <View style={styles.container}>
          <Text
            style={[styles.deckNameText, { fontSize: 16, textAlign: 'left' }]}>
            {currentPosition}
          </Text>
          <Text style={styles.deckNameText}>
            {currentQuestion && currentQuestion.question}
          </Text>
          
          {Platform.OS === 'ios'
            ? <View>
                <Text style={styles.deckNameText}>
                  {currentQuestion && currentQuestion.answer}
                </Text>
                <AnimatedBlurView
                  tint="default"
                  intensity={this.state.intensity}
                  style={StyleSheet.absoluteFill}
                />
              </View>
            : <View style={{opacity: answerShown ? 1 : 0 }}>
                <Text style={styles.deckNameText}>
                  {currentQuestion && currentQuestion.answer}
                </Text>
              </View>}

          {answerShown
            ? <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this._nextQuestion(true)}>
                  <Text style={styles.cardCountText}>Correct</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this._nextQuestion(false)}>
                  <Text style={styles.cardCountText}>Incorrect</Text>
                </TouchableOpacity>

              </View>
            : <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this._showAnswer()}>
                  <Text style={styles.cardCountText}>Show Answer</Text>
                </TouchableOpacity>
              </View>}
        </View>;
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
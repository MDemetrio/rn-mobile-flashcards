import { AsyncStorage } from 'react-native';
import { showLocalNotification, setLocalNotification } from './notifications';
const DECKS_KEY = 'DECKS_KEY';
const LAST_STUDY_SESSION = 'LAST_STUDY_SESSION';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(decks => {
      return decks ? Object.values(JSON.parse(decks)) : JSON.parse(decks);
    })
    .catch(err => Promise.reject(err));
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(decks => {
      return JSON.parse(decks)[id];
    })
    .catch(err => Promise.reject(err));
}

export async function saveDeckTitle(title) {
  try {
    await AsyncStorage.mergeItem(
      DECKS_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: [],
          cardCount: 0,
        },
      })
    );

    const decks = await AsyncStorage.getItem(DECKS_KEY);
    return JSON.parse(decks)[title];
  } catch (error) {
    console.log(error);
  }
}

export async function addCardToDeck({ title, card }) {
  try {
    const decks = await AsyncStorage.getItem(DECKS_KEY);
    if (decks !== null) {
      let deck = JSON.parse(decks)[title];
      const cardCount = deck.questions.length;

      return await AsyncStorage.mergeItem(
        DECKS_KEY,
        JSON.stringify({
          [title]: {
            title,
            questions: [...deck.questions, { ...card }],
            cardCount: cardCount + 1,
          },
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function concludeStudySession(title) {
  try {
    await AsyncStorage.mergeItem(
      LAST_STUDY_SESSION,
      JSON.stringify({
        deck: title,
        date: new Date(),
      })
    );

    AsyncStorage.getItem(LAST_STUDY_SESSION).then(JSON.parse).then(session => {
      showLocalNotification(
        'Congrats on your quizz completion!!',
        'In 12 hours we will remember you to study again :)'
      );

      let time = new Date(session.date);
      time.setSeconds(time.getSeconds() + 12); // 12 second for testing purposes, but it could be 12 hours or days
      setLocalNotification(time, 'day');
    });
  } catch (error) {
    console.log(error);
  }
}

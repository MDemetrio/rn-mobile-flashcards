import { AsyncStorage } from 'react-native';
const DECKS_KEY = 'DECKS_KEY';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_KEY).then((decks) => {
    return Object.values(JSON.parse(decks));
  }).catch(err => Promise.reject(err))
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECKS_KEY).then((decks) => {
    return JSON.parse(decks)[id];
  }).catch(err => Promise.reject(err))
}

export async function saveDeckTitle(title) {
  try {
    await AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(
      {
        [title]: {
          title,
          questions: [],
          cardCount: 0,
        }
      }
    ))

    const decks = await AsyncStorage.getItem(DECKS_KEY);
    return JSON.parse(decks)[title]
  } catch (error) {
    console.log(error)
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

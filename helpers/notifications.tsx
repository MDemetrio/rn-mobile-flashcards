import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';
const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification(title, body) {
  return {
    title: title ? title : 'Time to study!!',
    body: body ? body : "👋 Don't forget to do your quizzes today!! (we lied about the 12 hours it was really 12 secs, GO BACK TO STUDY!)",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification(time, repeat) {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync();

          Notifications.scheduleLocalNotificationAsync(createNotification(), {
            time,
            repeat,
          }).then(id => console.log(id));
        }
      });
}

export function showLocalNotification(title, body) {
  Notifications.presentLocalNotificationAsync(createNotification(title, body));
}

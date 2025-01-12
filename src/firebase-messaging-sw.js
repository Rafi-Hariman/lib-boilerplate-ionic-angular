// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    // REPLACE BY YOUR FIREBASE CONFIG HERE
    apiKey: "AIzaSyCJ14cjEAtXP2-9L84FmJ_R0RuYSuRh8rI",
    authDomain: "lib-pill-notification-angular.firebaseapp.com",
    projectId: "lib-pill-notification-angular",
    storageBucket: "lib-pill-notification-angular.firebasestorage.app",
    messagingSenderId: "392629802330",
    appId: "1:392629802330:web:221efc5a8afd0565470f63",
    measurementId: "G-RX5QSJK4YQ",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

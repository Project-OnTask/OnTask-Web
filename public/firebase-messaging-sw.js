importScripts("https://www.gstatic.com/firebasejs/6.6.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.6.2/firebase-messaging.js");
firebase.initializeApp({
// Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyA2-amWFKNeL8S2ro2QrSnrg_VyJTw4MOA",
    authDomain: "robotic-circle-251816.firebaseapp.com",
    databaseURL: "https://robotic-circle-251816.firebaseio.com",
    projectId: "robotic-circle-251816",
    storageBucket: "robotic-circle-251816.appspot.com",
    messagingSenderId: "793948288341",
    appId: "1:793948288341:web:e3f012a03bf72efbe12bdc",
    measurementId: "G-RFCEMCWZ3D"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(registration => {
      registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});
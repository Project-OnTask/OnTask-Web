import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
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
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
// Project Settings => Cloud Messaging => Web Push certificates
  "BPjkk54R5WlhvwRfuCDNiiRbvVvt9kDJF15TpkrfdN2qdvvWkxFyV62Y8gSAWDQApqaU0C6qjdr67xVfoGU9G3E"
);
export { messaging };
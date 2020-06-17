const firebase = require('firebase');

var firebaseConfig = {
  apiKey: "AIzaSyA9DzyeqeO-_ij9twoBunZFd8BEXirRxBE",
  authDomain: "react-myburger-b7ad9.firebaseapp.com",
  databaseURL: "https://react-myburger-b7ad9.firebaseio.com",
  projectId: "react-myburger-b7ad9",
  storageBucket: "react-myburger-b7ad9.appspot.com",
  messagingSenderId: "736112760968",
  appId: "1:736112760968:web:6fa6dd06920fe3afbc673d",
  measurementId: "G-YXFW75MYE8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

module.exports = firebase;
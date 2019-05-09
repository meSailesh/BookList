import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyBsxu07bucJ07mZ9Q1XDZvCYSJUHfxvSWg",
    authDomain: "reactcrud-de43c.firebaseapp.com",
    databaseURL: "https://reactcrud-de43c.firebaseio.com",
    projectId: "reactcrud-de43c",
    storageBucket: "reactcrud-de43c.appspot.com",
    messagingSenderId: "931558670174",
    appId: "1:931558670174:web:a55509d2fd6b39af"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
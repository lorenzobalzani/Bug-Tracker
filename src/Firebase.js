import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyC1VewXtZudLTyYn1a93eMe7IfMu7NinUo",
    authDomain: "bug-tracker-4b9e0.firebaseapp.com",
    databaseURL: "https://bug-tracker-4b9e0.firebaseio.com",
    projectId: "bug-tracker-4b9e0",
    storageBucket: "bug-tracker-4b9e0.appspot.com",
    messagingSenderId: "61715751895",
    appId: "1:61715751895:web:7eb47dbf28b8134502e192",
    measurementId: "G-Z3XR6NXBC8"
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
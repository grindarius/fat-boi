import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyCcGpN_df3nRUInvf4quzDM_RcyeJD-4DA",
  authDomain: "thomas-the-bus.firebaseapp.com",
  databaseURL: "https://thomas-the-bus.firebaseio.com",
  projectId: "thomas-the-bus",
  storageBucket: "thomas-the-bus.appspot.com",
  messagingSenderId: "424784913985",
  appId: "1:424784913985:web:94e9c62acb6c3b04db88c0"
};

firebase.initializeApp(config)

const db = firebase.firestore()

const busBlueCollection = db.collection('busBlue')
const busRedCollection = db.collection('busRed')
const busYellowCollection = db.collection('busYellow')

export {
  db,
  busBlueCollection,
  busRedCollection,
  busYellowCollection
}
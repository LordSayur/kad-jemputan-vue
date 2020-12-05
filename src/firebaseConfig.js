import firebase from "firebase/app";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyDkGTAI10oVCQwHHK3_GXFg8RwEaIlH6rU",
  authDomain: "omar-amirah.firebaseapp.com",
  databaseURL: "https://omar-amirah-default-rtdb.firebaseio.com",
  projectId: "omar-amirah",
  storageBucket: "omar-amirah.appspot.com",
  messagingSenderId: "520209727915",
  appId: "1:520209727915:web:6931db1c33802627e992ee"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();

// date issue fix according to firebase
const settings = {
  // timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const agendas = db.collection("agendas");

export {
  db,
  agendas
};

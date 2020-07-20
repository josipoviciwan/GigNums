import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyBJ9fen4qGVpfattUlcYH5ZB95PTarSHPs",
  authDomain: "gignums.firebaseapp.com",
  databaseURL: "https://gignums.firebaseio.com",
  projectId: "gignums",
  storageBucket: "",
  messagingSenderId: "447847159110",
  appId: "1:447847159110:web:d147ad7f93a98191"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;

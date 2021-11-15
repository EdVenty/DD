// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, Auth, User } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { doc, DocumentData, DocumentSnapshot, getDoc, getFirestore, setDoc, query, collection, onSnapshot, getDocs, limit, orderBy, Timestamp, deleteDoc } from "firebase/firestore";
import React from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlqB_0nI-CGH1UI23XeveLabHwiMDXX5c",
  authDomain: "dorogadobra-85fd2.firebaseapp.com",
  projectId: "dorogadobra-85fd2",
  storageBucket: "dorogadobra-85fd2.appspot.com",
  messagingSenderId: "888417216434",
  appId: "1:888417216434:web:57d27244768edbeea6e6ab",
  measurementId: "G-5XSCSWLNVY"
};

export interface UserFirestore{
  displayName?: string,
  sex?: string,
  photoURL?: string
}
export interface NewsFirestore{
  title?: string,
  timestamp?: Timestamp
  author?: string,
  content?: string,
  headerImage?: string,
  newsId?: string
}
export interface LikeNewsFirestore{
  uid?: string,
  timestamp?: Timestamp
}

const userConveter = {
  toFirestore: (userFirestore: UserFirestore) => {
      return {
        name: userFirestore.displayName,
        photoURL: userFirestore.photoURL
      };
  },
  fromFirestore: (snapshot: DocumentSnapshot | undefined) : UserFirestore => {
    if(!snapshot) return {};

    const data = snapshot.data();
    return {
      displayName: data?.name,
      sex: data?.sex,
      photoURL: data?.photoURL
    };
  }
};

const newsConveter = {
  fromFirestore: (snapshot: DocumentSnapshot | undefined) : NewsFirestore => {
    if(!snapshot) return {};

    const data = snapshot.data();
    return {
      author: data?.Author,
      content: data?.Content,
      headerImage: data?.HeaderImage,
      timestamp: data?.Timestamp,
      title: data?.Title,
      newsId: snapshot?.id
    };
  }
};

const likeNewsConveter = {
  fromFirestore: (snapshot: DocumentSnapshot | undefined) : LikeNewsFirestore => {
    if(!snapshot) return {};

    const data = snapshot.data();
    return {
      uid: snapshot?.id,
      timestamp: data?.Timestamp
    };
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore();

export const AuthContext = React.createContext({
    auth, provider, db
});

export function getUserInFirestore(user: User){
  return new Promise<{userFirestore: UserFirestore; userExists: boolean;}>((resolve, reject) =>
    getDoc(doc(db, "users", user.uid))
      .then((value) => resolve({
        userFirestore: userConveter.fromFirestore(value),
        userExists: value.exists()
      }))
      .catch((reason) => reject(reason))
    )
}

export function setUserInFirestore(user: User, userFirestore: UserFirestore){
  return new Promise((resolve, reject) =>
    setDoc(doc(db, "users", user.uid), userConveter.toFirestore(userFirestore))
      .then((value) => resolve(value))
    )
}

export function onUserInFirestoreUpdate(user: User, callback: (userFire: UserFirestore | undefined) => void){
  return onSnapshot(doc(db, "users", user.uid), (doc) => callback(userConveter.fromFirestore(doc)));
}

export function getNews(){
  return new Promise<NewsFirestore[]>((resolve, reject) => {
    getDocs(query(collection(db, "news")))
    .then((value) => {
      console.log(value);
      resolve(value.docs.map(newsConveter.fromFirestore))
    });
  });
}

export function addLikeToNews(user: User, newsId: string){
  setDoc(doc(db, "news", newsId, "likes", user.uid), {
    Timestamp: Timestamp.fromDate(new Date())
  });
}
export function getLikesFromNews(user: User, newsId: string){
  return new Promise<LikeNewsFirestore[]>((resolve, reject) => {
    getDocs(query(collection(db, "news", newsId, 'likes')))
    .then((value) => resolve(value.docs.map(likeNewsConveter.fromFirestore)))
  });
}
export function removeLikeFromNews(user: User, newsId: string){
  deleteDoc(doc(db, "news", newsId, "likes", user.uid));
}
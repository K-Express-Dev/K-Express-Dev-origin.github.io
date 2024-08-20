// src/services/firestore.js
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Add a document
export const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "users"), userData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Get documents
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

// Query documents
export const getUserByEmail = async (email) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error querying documents: ", error);
    throw error;
  }
};
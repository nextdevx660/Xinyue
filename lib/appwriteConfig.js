// /lib/appwriteConfig.js
import { Client, Storage, Account } from "appwrite";
import { TablesDB } from "appwrite";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'



const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // or your Appwrite endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);





const firebaseConfig = {
  apiKey: "AIzaSyABFr3W5XhLWNeTdT4WhgE8ar8B-DDqYB0",
  authDomain: "yustream-7c588.firebaseapp.com",
  projectId: "yustream-7c588",
  storageBucket: "yustream-7c588.firebasestorage.app",
  messagingSenderId: "304829403351",
  appId: "1:304829403351:web:05f35267b9e0612f17e092",
  measurementId: "G-MNNXD3KW8L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)



export const account = new Account(client);
export const tables = new TablesDB(client);
export const storage = new Storage(client);
export { client };

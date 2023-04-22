// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import moment from 'moment';
import { getAuth, User } from "firebase/auth";
import { getDatabase, push, get, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC3DmCyeiKi-BFo-X0y0IjZVwJkOR8x2p0",
  authDomain: "auto-tutor.firebaseapp.com",
  databaseURL: "https://auto-tutor-default-rtdb.firebaseio.com",
  projectId: "auto-tutor",
  storageBucket: "auto-tutor.appspot.com",
  messagingSenderId: "180447506296",
  appId: "1:180447506296:web:063dc21d9b7f9a0fbc628d",
  measurementId: "G-2VLVGYP1B7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
//const analytics = getAnalytics(app);

export function dbSet(loc: string, value: any): Promise<void> {
    return set(ref(database, loc), value);
}

export async function dbGet(loc: string): Promise<any | null> {
    try {
        const snapshot = await get(ref(database, loc))
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null
    }
}

export function getConversationPath(user: User, conversationId: string) {
    return `${user.uid}/conversation_messages/${conversationId}`
}

export async function pushMessageToConversation(user: User, conversationId: string, data: any) {
    const conversationRef = ref(database, getConversationPath(user, conversationId));
    const newMessageRef = push(conversationRef);
    await set(newMessageRef, data);
}

export async function clearConversation(user: User, conversationId: string) {
    const conversationRef = ref(database, getConversationPath(user, conversationId));
    await set(conversationRef, null);
}

export async function createNewConversation(user: User): Promise<string> {
    const conversationRef = ref(database, `${user.uid}/conversations`);
    // TODO error handle
    const newConversationRef = push(conversationRef);
    const isoDate = moment().toISOString();
    await set(newConversationRef, { title: "New Conversation", created: isoDate });
    return newConversationRef.key!;
}

export async function deleteConversation(user: User, conversationId: string) {
    const conversationRef = ref(database, `${user.uid}/conversations/${conversationId}`);
    await set(conversationRef, null);
}

export async function editConversationTitle(user: User, conversationId: string, title: string) {
    const conversationTitleRef = ref(database, `${user.uid}/conversations/${conversationId}/title`);
    await set(conversationTitleRef, title);
}
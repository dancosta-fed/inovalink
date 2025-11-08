import { doc, getDoc, setDoc, updateDoc, getDocFromCache } from "firebase/firestore";
import { db } from "./firebase";
import { User as FirebaseUser } from "firebase/auth";

export interface UserData {
  email: string;
  userType: 'freelancer' | 'business';
  displayName?: string;
  createdAt?: string;
}

export const saveUserData = async (user: FirebaseUser, userData: Omit<UserData, 'email'>) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      email: user.email,
      ...userData,
      createdAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    }
    return null;
  } catch (error: any) {
    if (error.code === 'unavailable' || error.message?.includes('offline')) {
      try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDocFromCache(userRef);
        
        if (userSnap.exists()) {
          console.log('Using cached user data');
          return userSnap.data() as UserData;
        }
      } catch (cacheError) {
        console.warn('Could not get user data from cache:', cacheError);
      }
      console.warn('Firestore is offline and no cached data available');
      return null;
    }
    console.error('Error getting user data:', error);
    throw error;
  }
};

export const updateUserType = async (userId: string, userType: 'freelancer' | 'business') => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      userType: userType
    });
  } catch (error) {
    console.error('Error updating user type:', error);
    throw error;
  }
};

export const checkIfUserExists = async (userId: string): Promise<boolean> => {
  try {
    const userData = await getUserData(userId);
    return userData !== null;
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
};

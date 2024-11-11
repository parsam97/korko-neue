import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export function useFirestore() {
    async function saveUserProfile(userProfile) {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('No user is currently logged in');
            }

            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, userProfile, { merge: true });
            console.log('User profile saved successfully');
        } catch (error) {
            console.error('Error saving user profile:', error);
            throw error;
        }
    }

    return {
        saveUserProfile
    };
}

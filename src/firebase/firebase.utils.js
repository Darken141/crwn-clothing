import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyAzPJD8IjGXXHdgrhgRHTNx_0fcVCd_YzU",
    authDomain: "crwn-clothing-5a917.firebaseapp.com",
    databaseURL: "https://crwn-clothing-5a917.firebaseio.com",
    projectId: "crwn-clothing-5a917",
    storageBucket: "crwn-clothing-5a917.appspot.com",
    messagingSenderId: "613561282108",
    appId: "1:613561282108:web:c34440444396e14c1f5d39"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if(!snapShot.exists) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log('error creating user', err.message)
        }
    }

    return userRef
}


// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({ prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
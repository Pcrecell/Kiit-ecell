
# 🔥 Firebase Integration — E-Cell Project

This project uses **Firebase** for authentication, Firestore-based storage, and admin operations using the Firebase Admin SDK. It supports both frontend and backend functionalities for secure user data handling, document access, and role-based control.

---

## 📁 Firebase Frontend Setup

### ✅ Installation

Install Firebase in your React project:

```bash
npm install firebase
```

---

### ✅ Configuration

Create a file `src/firebase/firebaseConfig.js` to initialize Firebase:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

Use `.env` variables to keep your credentials secure.

---

### ✅ Usage

- **Authentication:** Firebase Auth is used for user login and registration.
- **Firestore:** Access the `Users` collection using `getDoc`, `setDoc`, etc.

Example usage:

```js
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const userRef = doc(db, "Users", userId);
const userSnap = await getDoc(userRef);
```

---

## 🔐 Firestore Rules

These are the Firestore security rules in `Firestore -> Rules` section:

```js
service cloud.firestore {
  match /databases/{database}/documents {

    // Authenticated users can read/write their own document
    match /Users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Any authenticated user can read from the 'Users' collection
    match /Users/{document=**} {
      allow read: if request.auth != null;
    }

    // Default rule - change to false in production
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ **Note:** The last rule is permissive (`if true`). In production, use:
```js
allow read, write: if false;
```

---

## 🧠 Firebase Admin SDK Setup (Backend)

### ✅ Installation

Install the Firebase Admin SDK in your Node.js backend:

```bash
npm install firebase-admin
```

---

### ✅ Initialization

Create a Firebase admin utility file:

```js
// utils/firebaseAdmin.js
import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
```

> 🔐 Environment variables are used to protect sensitive keys.

---



---

## ✅ Best Practices

| Area             | Recommendation |
|------------------|----------------|
| Firestore Rules  | Do **not** use `allow read, write: if true` in production |
| Credentials      | Store securely in `.env` and never commit |
| Security         | Validate input, sanitize database queries, and lock down access rules |

---

## 📌 Project Highlights

- 🔐 Secure user document access (`Users/{userId}`)
- 🧠 Admin-only backend operations
- 📄 Firestore rules for ownership and visibility
- 🔄 Real-time sync via Firestore

---

## 📂 Environment Variables

Make sure to add the following to your `.env` files:

### Frontend (`.env`):

```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...


REACT_APP_JOIN_API_KEY=...
REACT_APP_JOIN_AUTH_DOMAIN=...
REACT_APP_JOIN_PROJECT_ID=...
REACT_APP_JOIN_STORAGE_BUCKET=...
REACT_APP_JOIN_MESSAGING_SENDER_ID=...
REACT_APP_JOIN_APP_ID=...
```

### Backend (`.env`):

```
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---





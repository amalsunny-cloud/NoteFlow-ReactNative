         📱 NoteFlow – React Native + Firebase (Mini Full-Stack App)

🧾 Overview :

NoteFlow is a full-stack mobile notes application built using React Native (Expo) and Firebase.
It enables users to register, log in, and manage personal notes (create, edit, delete) securely.


✨ Features :

🔐 Secure Authentication - Firebase Authentication with email/password

📝 Create Notes - Rich text notes with automatic saving

✏️ Edit Notes - Easy in-place editing

🗑️ Delete Notes - Swipe to delete with confirmation

🌙 Modern UI - Clean, intuitive interface

🔄 Real-time Sync - Instant synchronization with Firebase

⚡ Fast Performance - Optimized for smooth user experience



⚙️ Tech Stack :

Frontend   - React Native (Expo)	Mobile UI & logic
Backend	  - Firebase Authentication, Firestore
Navigation - Expo Router (File-based routing)
Language	  - JavaScript / TypeScript	


📋 Prerequisites :

Before you begin, ensure you have:

1. Node.js (v14 or newer)
2. npm or yarn
3. Expo CLI
4. iOS Simulator (for Mac) or Android Studio (for Android)
5. Firebase account


🚀 Installation 

1. Clone the Repository
      git clone https://github.com/amalsunny-cloud/NoteFlow-ReactNative

      cd noteflow


2. Install Dependencies

      npm install
      # or
      yarn install


3. Firebase Setup

   Create Firebase Project

      1. Go to Firebase Console
      2. Create a new project named "NoteFlow"
      3. Enable Authentication (Email/Password)
      4. Create Firestore Database
      5. Get your Firebase configuration

   Configure Firebase

      1. Copy the Firebase configuration from your project settings
      2. Update config/firebase.ts with your configuration:

         // firebase.js
            import { initializeApp } from 'firebase/app';
            import { getAuth } from 'firebase/auth';
            import { getFirestore } from 'firebase/firestore';

            const firebaseConfig = {
            apiKey: "your-api-key",
            authDomain: "your-project.firebaseapp.com",
            projectId: "your-project-id",
            storageBucket: "your-project.appspot.com",
            messagingSenderId: "123456789",
            appId: "your-app-id"
            };

            const app = initializeApp(firebaseConfig);
            export const auth = getAuth(app);
            export const db = getFirestore(app);
            export default app;


4.  Configure Environment Variables

   Create .env file in root directory:

      EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
      EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
      EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
      EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
      EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
      EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id


5. Run the App

   # Start the development server

   expo start
      - Runs the Expo CLI command using a globally installed version of Expo.
      - Requires you to have run:
            npm install -g expo-cli
               
               Or

   npx expo start
      - Uses the local version of Expo CLI from your project’s node_modules, or   downloads it temporarily if not installed.



🧪 Usage Flow

   1. Register a new account.

   2. Login using your credentials.

   3. Add new notes (title & description).

   4. View all notes saved for your account.

   5. Edit or delete notes anytime.

   6. Logout securely.



🏗️ Project Structure 

         noteflow/
      ├── app/                           # Expo Router file-based routing
      │ ├── (tabs)/                      # Tab navigation group
      │ │ ├── _layout.tsx                # Tab layout configuration
      │ │ └── notes.tsx                  # Notes screen within tabs
      │ ├── _layout.tsx                  # Root layout configuration
      │ ├── index.tsx                    # Landing screen
      │ ├── login.tsx                    # Login screen
      │ └── signup.tsx                   # Signup screen
      ├── assets/                        # Static assets (images, icons, etc.)
      │ └── images/                      # App images and icons
      ├── config/                        # Configuration files
      │ └── firebase.ts                  # Firebase configuration
      ├── .env                           # Environment variables (private)
      ├── .gitignore                     # Git ignore rules
      ├── app.json                       # Expo app configuration
      ├── eas.json                       # EAS build configuration
      ├── package.json                   # Dependencies and scripts
      ├── README.md                      # Project documentation
      └── tsconfig.json                  # TypeScript configuration



🧩 Dependencies

   ## Core Framework
      - expo (`~54.0.13`) - React Native framework
      - react (`19.1.0`) - React library
      - react-native (`0.81.4`) - Mobile app framework

   ## Backend & Database
      - firebase (`^12.4.0`) - Backend services (Authentication & Firestore)

   ## Navigation & Routing
      - expo-router (`~6.0.11`) - File-based routing

   ## UI & User Experience
      - react-native-toast-message (`^2.3.3`) - Toast notifications

   ## Platform Support
      - react-dom (`19.1.0`) - Web support
      - react-native-web (`~0.21.0`) - Web compatibility

   ## Development Dependencies
      - typescript (`~5.9.2`) - Type checking



   ## 🎥 Demo Video

      https://drive.google.com/file/d/12pOvj0UBXQjLvpahAEZzu4-53tPOLr14/view?usp=drivesdk

   ## 👨‍💻 Author

      Amal Sunny

   ## 📄 License

      This project is created for educational and evaluation purposes.
      All rights reserved © 2025 Amal Sunny.
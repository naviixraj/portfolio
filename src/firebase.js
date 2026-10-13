import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcOmyuqlZesIBrrBoqyMjWBUhrQirjRzM",
  authDomain: "portfolio-7e179.firebaseapp.com",
  projectId: "portfolio-7e179",
  storageBucket: "portfolio-7e179.firebasestorage.app",
  messagingSenderId: "41216129569",
  appId: "1:41216129569:web:cec707d0e750f0fb150160",
  measurementId: "G-FT40LNJ4W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export { app, analytics };

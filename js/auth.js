import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAy3COYKUBLZqqRc7gSZ_Q_0vEvrzt3Jc",
  authDomain: "servicemate-2b321.firebaseapp.com",
  projectId: "servicemate-2b321",
  storageBucket: "servicemate-2b321.appspot.com",
  messagingSenderId: "681765776685",
  appId: "1:681765776685:web:23a8a7e96007d4f54477a4",
  measurementId: "G-ZXYMCVJC5R",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

document
  .getElementById("signup-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const documentFile = document.getElementById("document-file")?.files[0];

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: `${name} - ${role}` });

      if (role === "Tradesperson" && documentFile) {
        const fileRef = ref(
          storage,
          `documents/${user.uid}/${documentFile.name}`
        );
        await uploadBytes(fileRef, documentFile);
        const fileURL = await getDownloadURL(fileRef);
        console.log("Document uploaded: ", fileURL);
      }

      alert("Signup successful! Redirecting to your dashboard...");
      window.location.href =
        role === "Customer"
          ? "services.html"
          : "tradesperson-dashboard.html";
    } catch (error) {
      console.error("Signup Error: ", error.message);
      alert(`Error: ${error.message}`);
    }
  });

document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const [name, role] = user.displayName.split(" - ");

    alert(`Welcome back, ${name}! Redirecting to your ${role} dashboard...`);
    window.location.href =
      role === "Customer"
        ? "customer-dashboard.html"
        : "tradesperson-dashboard.html";
  } catch (error) {
    console.error("Login Error: ", error.message);
    alert(`Error: ${error.message}`);
  }
});

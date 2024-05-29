import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged ,sendEmailVerification} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDomQ80LkmAO7UKxYOskFdNjq6jzRwLJk4",
    authDomain: "authentication-app-14ee1.firebaseapp.com",
    projectId: "authentication-app-14ee1",
    storageBucket: "authentication-app-14ee1.appspot.com",
    messagingSenderId: "966385118735",
    appId: "1:966385118735:web:40dcfffb25b67f06b37d7a",
    measurementId: "G-708HSBDYHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Select elements
const signUpEmail = document.getElementById("sign-up-email");
const signUpPassword = document.getElementById("sign-up-password");
const signUpButton = document.getElementById("sign-up");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

const signInEmail = document.getElementById("sign-in-email");
const signInPassword = document.getElementById("sign-in-password");
const signInButton = document.getElementById("sign-in");

// Email validation pattern
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Registration function
const registration = (event) => {
    event.preventDefault();

    const email = signUpEmail.value;
    const password = signUpPassword.value;

    if (!emailPattern.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email is not valid",
        });
        return;
    }

    if (password.length < 8) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password must be at least 8 characters long.",
        });
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            Swal.fire("Successfully Registered");
            document.querySelector('.cont').classList.remove('s-signup');
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
            });
        });
};

// Sign-In function
const signIn = (event) => {
    event.preventDefault();

    const email = signInEmail.value;
    const password = signInPassword.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const userEmail = userCredential.user.email;
            // Redirect to profile page with user's email as query parameter
            window.location.href = `profile.html?email=${userEmail}`;
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
            });
        });
};

// Add event listeners
signUpButton.addEventListener('click', registration);
signInButton.addEventListener('click', signIn);

// Toggle form view
document.querySelector('.img-btn').addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s-signup');
});



firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, display their email
        const userEmail = user.email;
        console.log(user.email)
      // Update your profile page UI with the email
      // (e.g., set it as innerHTML of a <span> element)
    } else {
      // User is not signed in, handle accordingly
      // (e.g., redirect back to the sign-in page)
    }
});
  
// const verifyEmail = document.getElementById("verifyEmail")

// const verify = () =>

// {
//     const auth = getAuth();
//     sendEmailVerification(auth.currentUser)
//     Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Email sent",
//         showConfirmButton: false,
//         timer: 1500
//       })
//   .then(() => {
//     // Email verification sent!
//     // ...
//   });

// }
// verifyEmail.addEventListener('click', verify);
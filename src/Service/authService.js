import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import jwt_decode from "jwt-decode";
import firebaseConfig from "./firebaseConfig.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from '../components/dashboard/index.jsx';

firebase.initializeApp(firebaseConfig);

export const authService = {
  loginWithGoogle: async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    if (result.user) {
      const token = await result.user.getIdToken();
      const decodedToken = jwt_decode(token);


      // Make a POST request to the loginGoogle API endpoint with the token
      const response = await fetch(
        "https://capstone-matching.herokuapp.com/api/v1/auth/loginGoogle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

          },
          body: JSON.stringify({ token }),

        }
      )
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      
        // Save the token and user type in local storage
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("student", data.student.student_role.role_name);
      
        const role = localStorage.getItem("student");
        if (role === "Admin") {
          return (
            <Router>
              {console.log("Tôi là admin")}
              <Routes>
              <Link to="/Dashboard">Go to Dashboard</Link>
                <Route exact path="/Dashboard">
                <Dashboard />
                </Route>
              </Routes>
            </Router>
          );
        } else {
          console.log("Tôi là user");
        }
      } else {
        throw new Error("Failed to log in");
      }

    }
  },
};


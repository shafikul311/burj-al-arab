import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import './Login.css'

const Login = () => {
  const [loggenInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  var provider = new firebase.auth.GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const { displayName, email } = result.user;
        const signInUser = { name: displayName, email };
        setLoggedInUser(signInUser);
        history.replace(from);
        storeAuthToken();
        // console.log(signInUser)
      })
      .catch((error) => {
       
        var errorCode = error.code;
        var errorMessage = error.message;
       
        var email = error.email;
      
        var credential = error.credential;

     
      });
  };

  const storeAuthToken =()=>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
    sessionStorage.setItem('token',idToken);
      // ...
    }).catch(function(error) {
      // Handle error
    });
    
  }
  return (
    <div className="login-style">
      <h1 className="text-center" >Continue with Google</h1>
      <button className="text-center btn btn-outline-success badge rounded-pill p-3" onClick={handleGoogleSignIn}> Google sign in</button>
    </div>
  );
};

export default Login;

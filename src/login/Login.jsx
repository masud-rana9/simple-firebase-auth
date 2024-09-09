import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import { useRef, useState } from "react";
//import { GithubAuthProvider } from "firebase/auth";

const Login = () => {
  const auth = getAuth(app);
  const [showPassword, setShowPassword] = useState(false);
  const reSetref = useRef();
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState("");
  console.log(app);
  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();
  const handleSignIn = () => {
    //console.log("google mama is on fire");
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const logedUser = result.user;
        setUser(logedUser);
        console.log(logedUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const handleSignInWithGit = () => {
    signInWithPopup(auth, GithubProvider)
      .then((result) => {
        const logedUser = result.user;
        setUser(logedUser);
        console.log(logedUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const handleSignOut = () => {
    console.log("signOut");
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        console.log(loggedUser);
        setSuccess("User login successfully!");
        form.reset();
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });

    console.log({ email, password });
  };

  const handlResetPassword = (event) => {
    //console.log("aaad");
    const email = reSetref.current.value;
    if (!email) {
      alert("plase provide your email");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check your email");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <br />
        <input type="email" name="email" ref={reSetref} placeholder="Email" />
        <br />
        <input
          type={showPassword ? "text" : "password"} // Conditional rendering based on state
          name="password"
          placeholder="Password"
        />
        <br />
        <button type="button" onClick={toggleShowPassword}>
          {showPassword ? "Hide Password" : "Show Password"}
        </button>
        <button type="submit">Login</button>
      </form>
      <button onClick={handlResetPassword}>Reset Password</button>

      {success && <p>{success}</p>}

      {user ? (
        <button onClick={handleSignOut}>SignOut</button>
      ) : (
        <div>
          <button onClick={handleSignIn}>Google Auth</button>
          <button onClick={handleSignInWithGit}>Github Auth</button>
        </div>
      )}

      <div>
        {user && (
          <div>
            <h1>{user.displayName}</h1>
            <h2>{user.email}</h2>
            <img src={user.photoURL} alt="#" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

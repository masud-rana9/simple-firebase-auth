import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Register = () => {
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const auth = getAuth(app);

    // Registering a new user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        console.log(loggedUser);
        verfiyEmailSend(result.user);
        updateUserData(result.user, name);
        setSuccess("User registered successfully!");
        form.reset();
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });

    console.log({ name, email, password });
  };

  const verfiyEmailSend = (user) => {
    sendEmailVerification(user).then((result) => {
      console.log(result);
      alert("plese verify your email address");
    });
  };

  const updateUserData = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        console.log("user updated Successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      {user && <div>{user.displayName || user.email}</div>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <br />
        <input type="email" name="email" placeholder="Email" />
        <br />
        <input type="password" name="password" placeholder="Password" />
        <br />
        <button type="submit">Register</button>
      </form>

      {success && <p>{success}</p>}
    </div>
  );
};

export default Register;

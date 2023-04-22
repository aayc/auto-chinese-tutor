import React from "react";
import { useState } from "react";
import { auth } from "../util/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const attemptLogin = async () => {
    if (email == "" || password == "") {
      alert("Please fill out all fields");
      return;
    }

    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false)
    } catch (error) {
      const code = "" + error
      if (code.includes("auth/user-not-found")) {
        alert("No user found with that email");
      } else if (code.includes("auth/wrong-password")) {
        alert("Incorrect password");
      } else if (code.includes("auth/invalid-email")) {
        alert("Invalid email");
      } else {
        alert("Unknown error");
      }
    }
  };

  return (
    <div>
      <div className="mt-12 px-4 w-72 m-auto">
        <input
          type="text"
          className="w-full h-10 px-2 focus:outline-none bg-gray-100 rounded-lg"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full h-10 my-2 px-2 focus:outline-none bg-gray-100 rounded-lg"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full px-6 py-2 bg-black text-white transition ease-in-out duration-150 hover:opacity-70 rounded-lg"
          onClick={(e) => attemptLogin()}
        >
          Log in
          {loading && <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white ml-2"></div>}
        </button>
      </div>
    </div>
  );
}

export default Login;

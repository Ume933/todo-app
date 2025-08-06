import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { FirebaseError } from "firebase/app";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/userSlice";
import { fetchCurrentUser } from "../api"; 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      const { uid, email: userEmail, role } = await fetchCurrentUser(token); // ✅ Centralized API call

      dispatch(
        setUser({
          uid,
          email: userEmail,
          role,
        })
      );

      navigate("/dashboard");
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      console.error("Login error:", firebaseError.message);
      alert(firebaseError.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
        required
      />

      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Login
      </button>

      <p className="mt-4 text-center">
        New user?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { registerUser } from "../api"; 

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      await registerUser(token, email, role); 

      navigate("/login");
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      console.error("Register error:", firebaseError.message);
      alert(firebaseError.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

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

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
        required
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="super-admin">Super Admin</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;

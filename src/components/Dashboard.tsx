import { useNavigate } from "react-router-dom";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";
import SuperAdminPanel from "./SuperAdminPanel.tsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.user.role);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="mb-4">This is a protected page only accessible after login.</p>

      {role === "user" && (
  <>
    <AddTodo />
    <TodoList />
  </>
)}

{(role === "admin") && (
  <>
    <TodoList />
  </>
)}

{role === "super-admin" && (
  <>
    <SuperAdminPanel />
  </>
)}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

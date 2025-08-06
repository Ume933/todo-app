// pages/Dashboard.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Todo Components go here */}
    </div>
  );
};

export default Dashboard;

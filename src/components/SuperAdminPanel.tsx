// components/SuperAdminPanel.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUserRole } from "../store/userListSlice";
import type { AppDispatch, RootState } from "../store/store";

const SuperAdminPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.userList);
  const [selectedRole, setSelectedRole] = useState<{ [uid: string]: string }>({});

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleRoleChange = (uid: string, role: string) => {
    setSelectedRole((prev) => ({ ...prev, [uid]: role }));
  };

  const handleAssign = (uid: string) => {
    const role = selectedRole[uid];
    if (role) {
      dispatch(updateUserRole({ uid, role }));
    }
  };

  return (
    <div>
      <h2>Super Admin Panel</h2>
      {loading && <p>Loading users...</p>}
      {error && <p>Error: {error}</p>}

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>UID</th>
            <th>Current Role</th>
            <th>Assign New Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>{user.email}</td>
              <td>{user.uid}</td>
              <td>{user.role}</td>
              <td>
                <select
                  value={selectedRole[user.uid] || ""}
                  onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super-admin">Super Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleAssign(user.uid)}>Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminPanel;

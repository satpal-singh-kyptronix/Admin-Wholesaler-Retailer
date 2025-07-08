import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Commission.scss";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5555";

export const CommissionPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [commissionValue, setCommissionValue] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/wholesalers-retailers`);
      setUsers(response.data.users || []);
      setFilteredUsers(response.data.users || []);
      setSuccess("Fetched successfully!");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role.toLowerCase() === roleFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [searchQuery, roleFilter, users]);

  const handleSaveChanges = async () => {
    if (!selectedUserId || !commissionValue) {
      setError("Please select a user and enter a commission value.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/auth/commission`, {
        userId: selectedUserId,
        commission: commissionValue,
      });

      setSuccess("Commission updated successfully!");
      setError("");
      fetchUsers(); // Refresh
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update commission");
      setSuccess("");
    }
  };

  return (
    <div className="PaymentPricing__mainWrapper">
      <h3>Commission Management</h3>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="TieredPricing__mainWrapper">
        <div className="TP__topHeadingMainWrapper">
          <h4>Set Commission</h4>
          <button onClick={() => console.log("Navigate to all pricing")}>
            See all Pricing
          </button>
        </div>

        <div className="productAndprice__inputMainWrapper">
          <div className="inputLabel__wrapper">
            <label>Filter by Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="retailer">Retailer</option>
              <option value="wholesaler">Wholesaler</option>
            </select>
          </div>

          <div className="inputLabel__wrapper">
            <label>Select User</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">-- Select user --</option>
              {filteredUsers.some((user) => user.role.toLowerCase() === "wholesaler") && (
                <optgroup label="Wholesalers">
                  {filteredUsers
                    .filter((user) => user.role.toLowerCase() === "wholesaler")
                    .map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name} (Wholesaler)
                      </option>
                    ))}
                </optgroup>
              )}
              {filteredUsers.some((user) => user.role.toLowerCase() === "retailer") && (
                <optgroup label="Retailers">
                  {filteredUsers
                    .filter((user) => user.role.toLowerCase() === "retailer")
                    .map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name} (Retailer)
                      </option>
                    ))}
                </optgroup>
              )}
            </select>
          </div>

          <div className="inputLabel__wrapper">
            <label>Commission (%)</label>
            <input
              type="number"
              placeholder="e.g. 10"
              value={commissionValue}
              onChange={(e) => setCommissionValue(e.target.value)}
            />
          </div>

          <div className="saveBtn__wrapper">
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </div>

        {selectedUserId && (
          <p className="selectedUserInfo">
            Selected:{" "}
            {users.find((u) => u._id === selectedUserId)?.name || "User not found"}
          </p>
        )}
      </div>

      <div className="TransactionHistory__mainWrapper">
        <h4>Commission History</h4>
        <div className="filterSearch__wrapper">
          <div className="inputLabel__wrapper">
            <label>Search by Name or Email</label>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="inputLabel__wrapper">
            <label>Filter by Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="retailer">Retailer</option>
              <option value="wholesaler">Wholesaler</option>
            </select>
          </div>
        </div>

        <div className="table__wrapper">
          <table className="commission-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Commission (%)</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>{user.commission ?? "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommissionPage;
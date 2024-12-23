import React, { useState } from "react";

interface UserInfo {
  id: number;
  name: string;
  phone: string;
  location: string;
  description: string;
  age: number;
  status: string;
  images: string[];
}

const SearchAndFilters: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromAge, setFromAge] = useState("");
  const [toAge, setToAge] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Status");

  const [userData, setUserData] = useState<UserInfo[]>([
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      location: "New York",
      description: "A brief description of John Doe.",
      age: 28,
      status: "Active",
      images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "987-654-3210",
      location: "Los Angeles",
      description: "A brief description of Jane Smith.",
      age: 34,
      status: "Inactive",
      images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
    },
    {
      id: 3,
      name: "Robert Brown",
      phone: "555-555-5555",
      location: "Chicago",
      description: "A brief description of Robert Brown.",
      age: 45,
      status: "Active",
      images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
    },
  ]);

  const [filteredData, setFilteredData] = useState<UserInfo[]>(userData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFromAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromAge(event.target.value);
  };

  const handleToAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToAge(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleFilterByAgeRange = () => {
    const from = parseInt(fromAge, 10);
    const to = parseInt(toAge, 10);
    let filteredUsers = userData.filter(
      (user) => user.age >= from && user.age <= to
    );
    if (selectedStatus !== "Status") {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === selectedStatus
      );
    }
    setFilteredData(filteredUsers);
  };

  const handleClearFilters = () => {
    setFilteredData(userData); // Restablece la lista original
    setInputValue(""); // Limpia el valor del input
    setFromAge("");
    setToAge("");
    setSelectedStatus("Status");
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchAndButton}>
        <input
          type="text"
          placeholder="Search by Name..."
          style={styles.searchInput}
          value={inputValue}
          onChange={handleInputChange}
        />
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          style={styles.statusSelect}
        >
          <option value="Status">Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div style={styles.ageFilterContainer}>
        <input
          type="number"
          placeholder="Age(min.)"
          style={styles.ageInput}
          value={fromAge}
          onChange={handleFromAgeChange}
        />
        <input
          type="number"
          placeholder="Age(max.)"
          style={styles.ageInput}
          value={toAge}
          onChange={handleToAgeChange}
        />
        <button style={styles.button} onClick={handleFilterByAgeRange}>
          🔍
        </button>
      </div>

      {filteredData.map((user) => (
        <div key={user.id} style={styles.userData}>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Location:</strong> {user.location}
          </p>
          <p>
            <strong>Description:</strong> {user.description}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Status:</strong> {user.status}
          </p>
          <div>
            <strong>Images:</strong>
            {user.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`User Image ${index}`}
                style={{ width: "100px", height: "100px", margin: "5px" }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "4px",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#8D95D6",
    padding: "30px",
  },
  searchAndButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
    width: "100%",
  },
  searchInput: {
    width: "100%", // Ocupa todo el ancho
    padding: "10px 16px",
    border: "1px solid #ccc",
    borderRadius: "50px",
    outline: "none",
    fontSize: "16px",
  },
  statusSelect: {
    width: "100%", // Ocupa todo el ancho
    padding: "10px 16px",
    border: "1px solid #ccc",
    borderRadius: "50px",
    outline: "none",
    fontSize: "16px",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#ECA563",
    color: "white",
    border: "none",
    borderRadius: "50px",
    fontSize: "14px",
    cursor: "pointer",
  },
  ageFilterContainer: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginBottom: "10px",
  },
  ageInput: {
    flex: 1,
    padding: "10px 16px",
    border: "1px solid #ccc",
    borderRadius: "50px",
    outline: "none",
    fontSize: "16px",
  },
  userData: {
    backgroundColor: "#fff",
    color: "#333",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
    width: "100%",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
};

export default SearchAndFilters;

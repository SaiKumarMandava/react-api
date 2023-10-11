import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null); //view detais stae
  const [currentPage, setCurrentPage] = useState(1); //pagination state
  const [searchTerm, setSearchTerm] = useState("");  //search state
  const usersPerPage = 3; //pagination limit

  useEffect(() => {
    axios
      .get("http://localhost:3009/api/users") // Use the correct URL for your backend API
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError("Error fetching data");
        console.error(err);
      });
  }, []);

  const toggleUserDetails = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };
//filtering
const filteredUsers = data.filter((user) =>
//search by user name that is contact column values in frontend
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
   
  );
  //pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1>Fetching the data from the below API end point</h1>
      <p>
        Api end point{" "}
        <a href="https://jsonplaceholder.typicode.com/users" target="blank">
          Click Here
        </a>
      </p>
      <div style={{display:"flex",width:"80%",marginLeft:"200px"}}>
      <input
        type="Search"
        placeholder="Search users by contact name ex :- Bret or bret"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", maxWidth: "400px", margin: "10px 0",padding:"10px",outline:"none",borderRadius:"5px 5px 5px 5px"}}
      />
      </div>
      {error && <p>{error}</p>}
      
      <div className="user-cards">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className={`user-card ${
              expandedUser === user.id ? "expanded" : ""
            }`}
          >
            <div
              className="user-summary"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              <div style={{ width: "230px", padding: "20px" }}>
                <p style={{ display: "none" }}>
                  Company Name Registrationnnnvvvv
                </p>
                <p>{user.company.name}</p>
              </div>
              <div style={{ width: "180px" }}>
                <strong>Contact</strong>
                <p>{user.username}</p>
              </div>
              <div style={{ width: "180px" }}>
                <strong>City</strong>
                <p>{user.address.city}</p>
              </div>
              <div style={{ width: "180px" }}>
                <strong>Street</strong>
                <p>{user.address.street}</p>
              </div>
              <div style={{ width: "180px" }}>
                <strong>Email</strong>
                <p>{user.email}</p>
              </div>
              <div style={{ padding: "20px" }}>
                <Button onClick={() => toggleUserDetails(user.id)}>
                  {expandedUser === user.id ? "Hide Details" : "View Details"}
                </Button>
              </div>
            </div>

            <div>
              {expandedUser === user.id && (
                <div style={{ padding: "10px" }}>
                  <div className="user-details">
                    <div style={{ marginRight: "1320px", width: "50%" }}>
                      <strong
                        style={{
                          marginRight: "1200px",
                          width: "50%",
                          padding: "18px",
                        }}
                      >
                        Description
                      </strong>

                      <p style={{ marginRight: "1320px", width: "100%" }}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.{" "}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        padding: "5px",
                      }}
                    >
                      <div>
                        <div style={{ width: "100%" }}>
                          <strong>Contact Person Name</strong>
                          <p>{user.name}</p>
                        </div>
                        <div style={{ width: "100%" }}>
                          <strong>Username</strong>
                          <p>{user.username}</p>
                        </div>
                        <div style={{ width: "100%" }}>
                          <strong>City</strong>
                          <p>{user.address.city}</p>
                        </div>
                        <div style={{ width: "100%" }}>
                          <strong>Street</strong>
                          <p>{user.address.street}</p>
                        </div>
                        <div style={{ width: "100%" }}>
                          <strong>Email</strong>
                          <p>{user.email}</p>
                        </div>
                      </div>
                      <div>
                        <div style={{ width: "100%" }}>
                          <strong style={{ marginRiht: "280px" }}>
                            Address
                          </strong>
                          <p>City : {user.address.city}</p>
                          <p>Street : {user.address.street}</p>
                          <p>Appartment : {user.address.suite}</p>
                          <p>ZipCode : {user.address.zipcode}</p>
                          <p>GeoLocation :</p>
                          <p>
                            lat : {user.address.geo.lat} lng :{" "}
                            {user.address.geo.lng}
                          </p>
                        </div>
                        <div style={{ width: "100%" }}>
                          <strong>Phone</strong>
                          <p>{user.phone}</p>
                        </div>
                      </div>
                      <div>
                        <div style={{ width: "100%" }}>
                          <strong>Website</strong>
                          <p>{user.website}</p>
                        </div>
                        <div style={{ width: "100%" }}>
                          <strong>Company</strong>
                          <p>Company Name : {user.company.name}</p>
                          <p>
                            Company CatchPhrase : {user.company.catchPhrase}
                          </p>
                          <p>Company Business : {user.company.bs}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
       
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.length / usersPerPage)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default App;

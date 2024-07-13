import React, { useState } from "react";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St",
  });

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Account Details</h2>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          <p>Address: {userDetails.address}</p>
        </div>
      ) : (
        <div>
          <h2>Please Sign In</h2>
          {/* Sign-in form goes here */}
        </div>
      )}
    </div>
  );
};

export default Account;

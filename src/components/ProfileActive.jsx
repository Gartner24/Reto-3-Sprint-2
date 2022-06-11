import { Alert, AlertTitle, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Image } from "react-bootstrap";

const ProfileActive = ({
  name,
  email,
  password,
  phone,
  admin,
  cart,
  id,
  payment,
}) => {
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({
    name: name,
    email: email,
    password: password,
    phone: phone,
    payment: payment,
    admin: admin,
    cart: cart,
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const putData = async () => {
    try {
      const response = await axios.put(
        `https://food-hut-api.herokuapp.com/users/${id}`,
        user
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putData();
    setSuccess(true);
  };

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <h1>You're Profile</h1>
        <div>
          <div>
            <Image src={""} roundedCircle alt="profile" />
          </div>
          <form>
            <div className="my-2">
              <input
                type="text"
                name="name"
                defaultValue={name}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <input
                type="email"
                name="email"
                defaultValue={email}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <input
                type="tel"
                name="phone"
                defaultValue={phone}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </form>
          {}
          {success && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Your profile has been updated
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileActive;

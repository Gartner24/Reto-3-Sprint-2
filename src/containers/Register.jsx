import { Alert, AlertTitle, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/User/UserContext";

const Register = () => {
  const { users, getUsers } = useContext(UserContext);

  const usersURL = "https://food-hut-api.herokuapp.com/users";

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    admin: false,
    cart: [],
  });

  const [phone, setPhone] = useState(false);
  const [required, setRequired] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const putData = async () => {
    try {
      const response = await axios.post(usersURL, user);
      getUsers();
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone === false) {
      if (user.name === "" || user.email === "" || user.password === "") {
        setRequired(true);
      } else {
        setRequired(false);
        putData();
      }
    } else {
      if (
        user.name === "" ||
        user.email === "" ||
        user.password === "" ||
        user.phone === ""
      ) {
        setRequired(true);
      } else {
        setRequired(false);
        putData();
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="d-flex align-items-center h-75">
      <form className="d-flex flex-column w-100 p-5">
        <TextField
          onChange={handleChange}
          name="name"
          label="Name"
          variant="standard"
          size="small"
          autoComplete="off"
        />
        {phone ? (
          <TextField
            onChange={handleChange}
            name="phone"
            label="Phone"
            variant="standard"
            size="small"
            autoComplete="off"
          />
        ) : (
          <TextField
            onChange={handleChange}
            name="email"
            label="Email"
            variant="standard"
            size="small"
            autoComplete="off"
          />
        )}
        <TextField
          onChange={handleChange}
          name="password"
          label="Password"
          variant="standard"
          size="small"
          type="password"
          autoComplete="off"
        />
        <TextField
          label="Confirm Password"
          variant="standard"
          size="small"
          type="password"
          autoComplete="off"
        />
        <div className="my-5 w-100">
          <Button
            onClick={() => setPhone(!phone)}
            variant="outlined"
            color="success"
            className="w-100"
          >
            {phone ? "Login with Email" : "Login with Phone"}
          </Button>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            className="w-50"
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            Sing Up
          </Button>
        </div>
        <small className="m-5 text-center">
          Are you already registered? sign in <Link to={"/login"}>HERE</Link>
        </small>
        {required && (
          <Alert severity="error" className="my-5">
            <AlertTitle>Error</AlertTitle>
            <p>Please fill all the fields</p>
          </Alert>
        )}
        {success && (
          <Alert severity="success" className="my-5">
            <AlertTitle>Success</AlertTitle>
            <p>You have successfully registered</p>
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Register;
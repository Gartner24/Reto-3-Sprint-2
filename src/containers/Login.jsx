import { Alert, AlertTitle, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/User/UserContext";

const Login = () => {
  const { users, getUsers } = useContext(UserContext);
  const [phone, setPhone] = useState(false);
  const [required, setRequired] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone == false) {
      if (user.password == "" || user.email == "") {
        setRequired(true);
      } else {
        setRequired(false);
        getUsers();
        if (users.length > 0) {
          const validation = users.find(
            (userData) => userData.email == user.email
          );
          if (validation) {
            if (validation.password == user.password) {
              setIncorrect(false);
              setLoggedIn(true);
              localStorage.setItem("user", JSON.stringify(validation.id));
            } else {
              setIncorrect(true);
            }
          } else {
            setIncorrect(true);
          }
        } else {
          setIncorrect(true);
        }
      }
    } else {
      if (user.password == "" || user.email == "") {
        setRequired(true);
      } else {
        setRequired(false);
        getUsers();
        if (users.length > 0) {
          const validation = users.find(
            (userData) => userData.phone == user.phone
          );
          if (validation) {
            if (validation.password == user.password) {
              setIncorrect(false);
              setLoggedIn(true);
              localStorage.setItem("user", JSON.stringify(validation.id));
            } else {
              setIncorrect(true);
            }
          } else {
            setIncorrect(true);
          }
        } else {
          setIncorrect(true);
        }
      }
    }
  };

  useEffect(() => {
    if (loggedIn) {
      window.location.href = "/";
    }
  }, [loggedIn]);

  return (
    <div className="d-flex align-items-center h-75">
      <form className="d-flex flex-column w-100 p-5">
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
          autoComplete="password"
        />
        <Button
          onClick={handleSubmit}
          className="mt-3"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
        <Button
          className="mt-3"
          variant="contained"
          color="success"
          onClick={() => setPhone(!phone)}
        >
          {phone ? "Login with Email" : "Login with Phone"}
        </Button>
        {required && (
          <Alert severity="error" className="my-5">
            <AlertTitle>Error</AlertTitle>
            <p>Please fill all the fields</p>
          </Alert>
        )}
        {incorrect && (
          <Alert severity="error" className="my-5">
            <AlertTitle>Error</AlertTitle>
            <p>Incorrect email or password</p>
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Login;

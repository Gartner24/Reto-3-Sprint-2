import { Alert, AlertTitle, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileActive from "../components/ProfileActive";
import ProfileDesabled from "../components/ProfileDesabled";
import UserContext from "../context/User/UserContext";

const id = JSON.parse(localStorage.getItem("user"));

const Profile = () => {
  const { users, getUsers } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [adminCheck, setAdminCheck] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    payment: [
      {
        id: 1,
        paid: false,
      },
    ],
    admin: false,
    cart: [],
  });

  useEffect(() => {
    getUsers();
    setProfile(users.find((user) => user.id == id));
    setAdminCheck(users.find((user) => user.id == id));
  }, [id]);

  return (
    <div>
      {edit ? (
        <ProfileActive {...profile} id={id} />
      ) : (
        <ProfileDesabled {...profile} />
      )}
      {edit ? (
        <div>
          <Button onClick={() => setEdit(!edit)}>Cancel</Button>
        </div>
      ) : (
        <Button onClick={() => setEdit(!edit)}>Edit</Button>
      )}
      {adminCheck && (
       <Link
          to="/admin"
          style={{
            textDecoration: "none",
            color: "black",
            marginLeft: "10px",
            marginTop: "10px",
          }}
        >
          <Button>Admin</Button>
        </Link>
      )}
    </div>
  );
};

export default Profile;

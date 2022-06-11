import React, { useContext, useEffect, useState } from "react";
import Categories from "../components/Categories";
import Restaurants from "../components/Restaurants";
import UserContext from "../context/User/UserContext";

const Home = () => {
  const { users, getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {users.length !== 0 ? (
        users.map((user) => (
          <div key={user.id} className="card p-3 my-3">
            <h3>Bienvenido {user.name}</h3>
          </div>
        ))
      ) : (
        <div>Vacio</div>
      )}
      <Categories />
      <Restaurants />
    </div>
  );
};

export default Home;

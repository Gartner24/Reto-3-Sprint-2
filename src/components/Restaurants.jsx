import React, { useContext, useEffect } from "react";
import UserContext from "../context/User/UserContext";
import RestaurantContext from "../context/Restaurants/RestaurantContext";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Restaurants = () => {
  // const { users, getUsers } = useContext(UserContext);
  const { restaurantsData: restaurants, getRestaurants } =
    useContext(RestaurantContext);

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <>
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="card my-3 d-flex flex-row align-items-center"
        >
          <Button
            className="p-3"
            component={Link}
            to={"/restaurants/" + restaurant.name + "/" + restaurant.id}
          >
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              style={{ maxWidth: "100%", height: "100%" }}
            />
            <div>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.rating}</p>
              <p>{restaurant.time}</p>
            </div>
          </Button>
        </div>
      ))}
    </>
  );
};

export default Restaurants;
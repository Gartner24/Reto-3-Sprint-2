import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Image } from "react-bootstrap";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Admin = () => {
  const [food, setFood] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [user, setUser] = useState([]);
  const [foodActive, setFoodActive] = useState(false);
  const [restaurantActive, setRestaurantActive] = useState(false);
  const [userActive, setUserActive] = useState(false);

  const foodData = async () => {
    const { data } = await axios.get("https://food-hut-api.herokuapp.com/food");
    setFood(data);
  };

  const restaurantData = async () => {
    const { data } = await axios.get(
      "https://food-hut-api.herokuapp.com/restaurants"
    );
    setRestaurant(data);
  };

  const userData = async () => {
    const { data } = await axios.get(
      "https://food-hut-api.herokuapp.com/users"
    );
    setUser(data);
  };

  const handleFoodActive = () => {
    foodData();
    setFoodActive(true);
    setRestaurantActive(false);
    setUserActive(false);
  };

  const handleRestaurantActive = () => {
    restaurantData();
    setFoodActive(false);
    setRestaurantActive(true);
    setUserActive(false);
  };

  const handleUserActive = () => {
    userData();
    setFoodActive(false);
    setRestaurantActive(false);
    setUserActive(true);
  };

  const handleDeleteFood = async (id) => {
    try {
      const url = `https://food-hut-api.herokuapp.com/food/${id}`;
      await axios.delete(url);
      foodData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      const url = `https://food-hut-api.herokuapp.com/restaurants/${id}`;
      await axios.delete(url);
      restaurantData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const url = `https://food-hut-api.herokuapp.com/users/${id}`;
      await axios.delete(url);
      userData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    foodData();
    restaurantData();
    userData();
  }, []);

  return (
    <div>
      <h1>SELECT A TYPE</h1>
      <div>
        <Button onClick={() => handleFoodActive()}>Food</Button>
        <Button onClick={() => handleRestaurantActive()}>Restaurant</Button>
        <Button onClick={() => handleUserActive()}>User</Button>
      </div>
      {foodActive && (
        <div>
          <h2>FOOD</h2>
          <Stack spacing={3}>
            {food.map((item) => (
              <Item key={item.id}>
                <Image
                  style={{ width: "100px" }}
                  src={item.img}
                  alt={item.name}
                />
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <p>{item.category}</p>
                <p>{item.restaurant}</p>
                <p>{item.rating}</p>
                <Button variant="contained">Edit</Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteFood(item.id)}
                >
                  Delete
                </Button>
              </Item>
            ))}
          </Stack>
        </div>
      )}
      {restaurantActive && (
        <div>
          <h2>RESTAURANT</h2>
          <Stack spacing={3}>
            {restaurant.map((item) => (
              <Item
                key={item.id}
                className="card d-flex flex-row align-items-center"
              >
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.rating}</p>
                <Button variant="contained">Edit</Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteRestaurant(item.id)}
                >
                  Delete
                </Button>
              </Item>
            ))}
          </Stack>
        </div>
      )}
      {userActive && (
        <div>
          <h2>USERS</h2>
          <Stack spacing={3}>
            {user.map((item) => (
              <Item key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.email}</p>
                <p>{item.phone}</p>
                <p>{item.admin}</p>
                <Button variant="contained">Edit</Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteUser(item.id)}
                >
                  Delete
                </Button>
              </Item>
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default Admin;

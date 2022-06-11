import { Alert, AlertTitle, Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";

const SelectedFoodComponent = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [payment, setPayment] = useState([
    {
      id: "",
      paid: false,
    },
  ]);
  const [item, setItem] = useState({
    id: data[0].id,
    name: data[0].name,
    restaurant: data[0].restaurant,
    category: data[0].category,
    rating: data[0].rating,
    price: data[0].price,
    img: data[0].img,
    quantity: 1,
  });
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    admin: false,
    cart: "",
  });

  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const userID = JSON.parse(localStorage.getItem("user"));

  const putItem = async () => {
    try {
      const url = `https://food-hut-api.herokuapp.com/users/${userID}`;
      await axios.put(url, userData);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const getUser = async () => {
    try {
      const url = `https://food-hut-api.herokuapp.com/users/${userID}`;
      const { data } = await axios.get(url);
      const { cart } = data;
      const validation = cart.filter((cartitem) => {
        const validation2 = cartitem.id === item.id;
        return validation2;
      });
      if (validation.length === 0) {
        setAlreadyInCart(false);
        setPayment([
          {
            id: item.id,
            paid: false,
          },
        ]);
        setUserData({
          ...userData,
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          payment: payment,
          admin: data.admin,
          cart: [...cart, item],
        });
      } else {
        setAlreadyInCart(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleClick = async () => {
    await getUser();
    putItem();
    setSuccess(true);
  };

  useEffect(() => {
    getUser();
    setItem({
      ...item,
      quantity: quantity,
    });
    setSuccess(false);
  }, [quantity]);

  return (
    <>
      {data.map((food) => (
        <div key={food.id}>
          <Image src={food.img} alt={food.name} style={{ width: "100vw" }} />
          <div className="p-3">
            <h1>{food.name}</h1>
            <p className="text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
              totam, officia, nulla placeat similique nostrum pariatur optio
              vitae libero facere eius praesentium, eaque dolore! Magnam quo
              laboriosam quia debitis cum.
            </p>
          </div>
          {alreadyInCart ? (
            <Alert severity="warning" className="my-3">
              <AlertTitle>Warning</AlertTitle>
              <p>
                You already have this item in your cart. Please remove it from
                your cart to place another order.
              </p>
            </Alert>
          ) : (
            <div className="d-flex justify-content-around">
              <div
                className="bg-light d-flex"
                style={{ width: "fit-content", borderRadius: "10px" }}
              >
                <Button onClick={handleQuantityIncrement}>+</Button>
                <span className="d-flex align-items-center">{quantity}</span>
                <Button onClick={handleQuantityDecrement}>-</Button>
              </div>
              <Button variant="contained" color="primary" onClick={handleClick}>
                Add ${food.price * quantity}
              </Button>
            </div>
          )}
          {success && (
            <Alert severity="success" className="my-3">
              <AlertTitle>Success</AlertTitle>
              <p>
                Your order has been placed successfully. You will be notified
                when your order is ready.
              </p>
            </Alert>
          )}
          {error && (
            <Alert severity="error" className="my-3">
              <AlertTitle>Error</AlertTitle>
              <p>
                There was an error placing your order. Please try again later.
              </p>
            </Alert>
          )}
        </div>
      ))}
    </>
  );
};

export default SelectedFoodComponent;

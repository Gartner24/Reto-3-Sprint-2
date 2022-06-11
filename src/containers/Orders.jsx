import { Alert, AlertTitle, Avatar } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChildModal from "../components/ChildModal";

const Orders = () => {
  const id = JSON.parse(localStorage.getItem("user"));

  const getData = async () => {
    try {
      const url = "https://food-hut-api.herokuapp.com/users/" + id;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const [paid, setPaid] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getData().then((data) => {
      setData(data.cart);
    });
    
  }, []);

  useEffect(() => {
    getData().then((data) => {
      setPaid(data.payment[0].paid);
    });
  }, [paid, data]);


  return (
    <div>
      <h1>All Orders</h1>
      <ul className="p-0">
        {data.map((food) => (
          <li
            key={food.id}
            style={{ listStyle: "none" }}
            className="d-flex align-items-center my-4 bg-light p-3"
          >
            <Avatar sx={{ bgcolor: green[500] }}>
              <AssignmentIcon />
            </Avatar>
            <div className="d-flex justify-content-around align-items-center w-100 mx-3">
              <div>
                <h2 className="m-0">{food.restaurant}</h2>
                <p className="m-0">$ {food.price * food.quantity}</p>
              </div>
              <ChildModal {...food} />
            </div>
          </li>
        ))}
      </ul>
      {
        paid === true ? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Your order has been placed.
          </Alert>
        ) : (
          <Alert severity="warning">
            <AlertTitle>Alert</AlertTitle>
            Your order has not been placed yet.
          </Alert>
        )
      }
    </div>
  );
};

export default Orders;

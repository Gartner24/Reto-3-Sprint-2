import { Button } from "@mui/material";
import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SelectFoodStyled } from "../styles/GlobalStyle";

const Food = ({ data, restaurant }) => {
  return (
    <>
      <h1 className="text-center">Restaurant {restaurant}</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {data.map((food) => (
          <SelectFoodStyled
            key={food.id}
            className="card m-3"
            style={{
              width: "171px",
              height: "182px",
              borderRadius: "10px",
            }}
          >
            <Button
              component={Link}
              to={"/food/" + restaurant + "/" + food.name + "/" + food.id}
              className="d-flex flex-column"
            >
              <div className="d-flex justify-content-center">
                <Image
                  src={food.img}
                  alt={food.name}
                  style={{
                    width: "154px",
                    height: "110px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="p-2">
                <h3>{food.name}</h3>
                <p>$ {food.price}</p>
              </div>
            </Button>
          </SelectFoodStyled>
        ))}
      </div>
    </>
  );
};

export default Food;

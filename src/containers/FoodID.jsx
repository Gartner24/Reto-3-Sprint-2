import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Categories from "../components/Categories";
import Food from "../components/Food";
import FoodContext from "../context/Food/FoodContext";

const FoodID = () => {
  const { foodData, getFood } = useContext(FoodContext);

  const { restaurant, id } = useParams();

  const pathParams = restaurant.replace(/\s/g, "%20");

  useEffect(() => {
    getFood(pathParams);
  }, []);

  return (
    <div>
      <Categories />
      <Food data={foodData} restaurant={restaurant} />
    </div>
  );
};

export default FoodID;

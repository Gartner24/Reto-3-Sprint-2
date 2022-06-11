import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import SelectedFoodComponent from "../components/SelectedFoodComponent";
import FoodContext from "../context/Food/FoodContext";

const SelectedFood = () => {
  const { foodData, getFood } = useContext(FoodContext);

  const { restaurant, id } = useParams();

  const pathParams = restaurant.replace(/\s/g, "%20");

  useEffect(() => {
    getFood(pathParams);
  }, []);
  const data = foodData.filter((food) => food.id == id);

  console.log(data);

  return (
    <div>
      <SelectedFoodComponent data={data} />
    </div>
  );
};

export default SelectedFood;

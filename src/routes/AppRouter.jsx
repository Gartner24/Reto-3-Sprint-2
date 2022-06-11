import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../containers/Home";
import Search from "../containers/Search";
import Orders from "../containers/Orders";
import Profile from "../containers/Profile";
import Login from "../containers/Login";
import Register from "../containers/Register";
import UserState from "../context/User/UserState";
import RestaurantState from "../context/Restaurants/RestaurantState";
import FoodID from "../containers/FoodID";
import FoodState from "../context/Food/FoodState";
import SelectedFood from "../containers/SelectedFood";
import Admin from "../containers/Admin";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <UserState>
        <FoodState>
          <RestaurantState>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/restaurants/:restaurant/:id" element={<FoodID />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/food/:restaurant/:food/:id"
                element={<SelectedFood />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </RestaurantState>
        </FoodState>
      </UserState>
    </BrowserRouter>
  );
};

export default AppRouter;

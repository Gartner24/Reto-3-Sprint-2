import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Search = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    const { data } = await axios.get("https://food-hut-api.herokuapp.com/food");
    setData(data);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="d-flex flex-wrap justify-content-start">
      <TextField
        id="filled-basic"
        label="Search"
        variant="filled"
        onChange={handleChange}
      />
      {filteredData.map((item) => (
        <Link
          to={`/food/${item.restaurant}/${item.name}/${item.id}`}
          key={item.id}
          className="card d-flex flex-row m-4 w-75"
          style={{ height: "60px" }}
        >
          <Image
            style={{
              width: "60px",
              height: "100%",
              borderRadius: "10px",
            }}
            width={100}
            src={item.img}
            alt={item.name}
          />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default Search;

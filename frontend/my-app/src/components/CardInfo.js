import React from "react";
import { Link } from "react-router-dom";

const CardInfo = ({ item }) => {
  return (
    <div className="card cardInfo">
      <img src={item.imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <p className="card-text">{item.name}</p>
      </div>
    </div>
  );
};

export default CardInfo;

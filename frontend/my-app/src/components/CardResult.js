import React from "react";
import { Link } from "react-router-dom";

const CardResult = ({ item }) => {
  return (
    <Link to={`/profile/${item._id}`}>
      <div className="card cardInfo">
        <img src={item.picture[0]} className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">{item.name}</p>
          <p className="card-text">{item.bio}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardResult;

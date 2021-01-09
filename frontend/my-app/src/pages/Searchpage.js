import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardResult from "../components/CardResult";
import CardinfoProfileData from "../components/CardinfoProfileData";
import ProfileiconData from "../components/ProfileiconData";
import { useSelector } from "react-redux";

export const SearchPage = () => {
  const [search, setSearch] = useState([]);
  const {
    items: { items },
  } = useSelector((state) => ({ ...state }));

  const init = () => {
    console.log(items);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="profile-container-fluid">
      <nav className="navbar navbar-light p-2 bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>

          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="#">
                Active
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/updateprofile">
                Update Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                Link
              </Link>
            </li>
          </ul>

          <form className="d-flex">
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="row bg-primary ">
        <div className="col-12 py-5"></div>
      </div>
      <div className="row p-5 m-2 search-cont">
        {items &&
          items.map((x) => (
            <div className="col-md-4 col-sm-6 p-2" key={x.id}>
              <CardResult item={x} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPage;

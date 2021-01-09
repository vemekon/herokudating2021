import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { searchUser } from "../util/userApi";
import { useSelector, useDispatch } from "react-redux";

const SearchForm = () => {
  const [genderIn, setGenderIn] = useState("");
  const [genderOut, setGenderOut] = useState("");
  const [minAge, setMinage] = useState(0);
  const [maxAge, setMaxage] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    user: { currentUser },
  } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(history);
    searchUser({ genderOut, minAge, maxAge }, currentUser.token)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "SEARCH_RESULT",
          payload: res.data,
        });
        history.push("/search");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="card ">
      <div className="card-body">
        <div className="text-center">
          <h3 className="white-text">
            <i className="fas fa-user white-text"></i> Search Members:
          </h3>
          <hr className="hr-light" />
        </div>
        <div className="mb-2">
          <select
            className="form-select form-select"
            aria-label=".form-select-sm "
            onChange={(e) => setGenderIn(e.target.value)}
          >
            <option selected>I am </option>
            <option value="man">a man</option>
            <option value="woman">a woman</option>
            <option value="3">prefer not to say</option>
          </select>
        </div>
        <div className="mb-2">
          <select
            className="form-select form-select"
            aria-label=".form-select-sm "
            onChange={(e) => setGenderOut(e.target.value)}
          >
            <option selected>Seeking</option>
            <option value="man">a man</option>
            <option value="woman">a woman</option>
          </select>
        </div>

        <div className="row mb-2">
          <div className="col-sm-6">
            <select
              className="form-select form-select"
              aria-label=".form-select-sm "
              onChange={(e) => setMinage(e.target.value)}
            >
              <option selected>Min age</option>
              {[...new Array(101).keys()].map(
                (x) => x > 18 && <option value={x}>{x}</option>
              )}
            </select>
          </div>
          <div className="col-sm-6">
            <select
              className="form-select form-select"
              aria-label=".form-select-sm "
              onChange={(e) => setMaxage(e.target.value)}
            >
              <option selected>Max age</option>
              {[...new Array(101).keys()].map(
                (x) => x > 18 && <option value={x}>{x}</option>
              )}
            </select>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Search for free
          </button>
          <hr className="hr-light mb-3 mt-4" />
        </div>
      </div>
    </div>
  );
};

export default SearchForm;

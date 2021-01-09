import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardResult from "../components/CardResult";
import CardinfoProfileData from "../components/CardinfoProfileData";
import ProfileiconData from "../components/ProfileiconData";
import { useSelector } from "react-redux";
import { newMessages, getMessages, friendAdd } from "../util/userApi";

export const SingleProfile = () => {
  const [profile, setProfile] = useState({});
  const [txt, setTxt] = useState("");
  const [msg, setMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    items: { items },
    user: { currentUser },
  } = useSelector((state) => ({ ...state }));

  const id = useParams().id;

  const init = () => {
    const profileDetail = items && items.find((x) => x._id === id);
    setProfile(profileDetail);
    console.log(profileDetail);
  };

  const messageHandle = async () => {
    try {
      const result = await newMessages({ txt, id }, currentUser.token);
      const res = result.data;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const addingFriend = async () => {
    try {
      const result = await friendAdd(id, currentUser.token);
      const res = result.data;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="profile-container">
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
      <div className="row container-fluid text-center prf">
        <div className="col-12 profile-element ">
          <Link>
            <img
              src={profile && profile.picture && profile.picture[0]}
              alt=""
              className="rounded-circle"
            />{" "}
          </Link>
          <p className="p-4">{profile && profile.name}</p>
        </div>
        <div className="col-12">
          <div className="row text-center offset-3">
            {ProfileiconData.map((x) => (
              <Link className="col-2" key={x.id}>
                {x.svg} <p>{x.name}</p>
              </Link>
            ))}
            <Link className="col-2" onClick={addingFriend}>
              {ProfileiconData[ProfileiconData.length - 1].svg}{" "}
              <p>Add Friend</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="row p-2 ms-auto ">
        <div className="col-md-7 shadow p-5 ms-3 bg-white rounded">
          <h6 className="display-5">About me</h6>
          <hr />
          <p>{profile && profile.bio}</p>
        </div>
        <div className="col-md-4 shadow p-5 ms-3 bg-white rounded">
          <p>
            Congratulations ! Your journey starts now for a wonderful and
            fruitful life. Love and relationship is now at the stroke of your
            keyboard. Do not wait
          </p>
        </div>
      </div>
      <div className="row p-2 ms-auto ">
        <div className="col-md-7 shadow p-5 ms-3 bg-white rounded">
          <h6 className="display-5">My hobbies</h6>
          <hr />
          <p>{profile && profile.hobby}</p>
        </div>
        <div className="col-md-4 shadow p-5 ms-3 bg-white rounded">
          <p>
            Congratulations ! Your journey starts now for a wonderful and
            fruitful life. Love and relationship is now at the stroke of your
            keyboard. Do not wait
          </p>
        </div>
      </div>
      <div className="row p-2 ms-auto ">
        <div className="col-md-7 shadow p-5 ms-3 bg-white rounded">
          <h6 className="display-5">Send message</h6>
          <hr />
          <div class="form-floating">
            <textarea
              className="form-control"
              placeholder="Enter your message"
              onChange={(e) => setTxt(e.target.value)}
            ></textarea>
            <button className="btn btn-primary my-2" onClick={messageHandle}>
              send your message
            </button>
          </div>
        </div>
        <div className="col-md-4 shadow p-5 ms-3 bg-white rounded">
          <p>
            Congratulations ! Your journey starts now for a wonderful and
            fruitful life. Love and relationship is now at the stroke of your
            keyboard. Do not wait
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;

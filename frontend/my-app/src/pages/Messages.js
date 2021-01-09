import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardInfo from "../components/CardInfo";
import CardinfoProfileData from "../components/CardinfoProfileData";
import ProfileiconData from "../components/ProfileiconData";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { getMessages, profileInit } from "../util/userApi";
import ReceivedM from "../components/ReceivedM";

export const Messages = () => {
  const [profile, setProfile] = useState({});
  const [txt, setTxt] = useState("");
  const [msg, setMsg] = useState([]);
  const [received, setReceived] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    items: { item },
    user: { currentUser },
  } = useSelector((state) => ({ ...state }));

  const init = () => {
    setLoading(true);
    const itemMsg = item && item.message;
    setReceived(itemMsg);
    //console.log(item.messageReceived);
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, [item]);

  const element = () => (
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
          <img src="/images/default1.jpg" alt="" className="rounded-circle" />
          <p className="p-4">{profile.name}</p>
        </div>
        <div className="col-12">
          <div className="row text-center offset-3">
            <div className="col-2">
              {ProfileiconData[0].svg} <p>{msg} messages</p>
            </div>
            <div className="col-2">
              {ProfileiconData[1].svg} <p>New Matches</p>
            </div>
            <div className="col-2">
              {ProfileiconData[1].svg} <p>Friends</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row  p-2 ms-auto ">
        <div className="col-md-7 shadow p-3 ms-2 bg-white rounded">
          <h6 className="display-5">0 New Messages</h6>
          <hr />
          <ReceivedM />
        </div>
        <div className="col-md-4 shadow p-5 ms-2 bg-white rounded">
          <p>
            Congratulations ! Your journey starts now for a wonderful and
            fruitful life. Love and relationship is now at the stroke of your
            keyboard. Do not wait
          </p>
        </div>
      </div>

      <div className="row  mt-2 text-center shadow  bg-white  p-3  ">
        <p className="text-muted col-md-2">About US</p>
        <p className="text-muted col-md-2">Terms and Conditions</p>
        <p className="text-muted col-md-2">Policy</p>
        <p className="text-muted col-md-2">Help</p>
        <p className="text-muted col-md-2">Safety</p>
      </div>
    </div>
  );

  return <>{element()}</>;
};

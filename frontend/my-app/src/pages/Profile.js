import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardInfo from "../components/CardInfo";
import CardinfoProfileData from "../components/CardinfoProfileData";
import ProfileiconData from "../components/ProfileiconData";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { friendList, getMessages, profileInit } from "../util/userApi";

export const Profile = () => {
  const [profile, setProfile] = useState({});
  const [txt, setTxt] = useState("");
  const [msg, setMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const dispatch = useDispatch();
  const {
    items: { items },
    user: { currentUser },
  } = useSelector((state) => ({ ...state }));

  const id = useParams().id;

  const init = async () => {
    try {
      setLoading(true);
      const result = await profileInit(currentUser.token);
      setLoading(false);
      setProfile(result.data);
      dispatch({
        type: "SINGLE_ITEM",
        payload: result.data,
      });
      const msglength = result.data.message && result.data.message.length;
      setMsg(msglength);
      const aa = result.data.message.map((x) =>
        x.content.map((y) => console.log(y.body))
      );
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    init();
  }, [friends]);

  const handleFriend1 = () => {
    friendList(currentUser.token)
      .then((item) => console.log(item.data))
      .catch((error) => console.log(error));
  };
  const handleFriend = async () => {
    try {
      const user = await friendList(currentUser.token);
      setFriends(user.data.user);
      console.log(user.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bestMatches = (CardinfoProfileData) =>
    CardinfoProfileData.map((x) => (
      <div className="col-md-4 p-2" key={x.id}>
        <CardInfo item={x} />
      </div>
    ));
  const bestFriends = () =>
    friends.map((x) => (
      <Link className="col-md-4 p-2" key={x._id} to={`profile/${x._id}`}>
        <CardInfo item={x} onClick={(x) => friendHandle(x)} />
      </Link>
    ));
  const friendHandle = (x) => {};
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
          <p className="p-4">{currentUser.name}</p>
        </div>
        <div className="col-12">
          <div className="row text-center offset-3">
            <Link className="col-2 disabled" to="/messages">
              {ProfileiconData[0].svg} <p>{msg} messages</p>
            </Link>
            <Link className="col-2">
              {ProfileiconData[1].svg} <p>New Matches</p>
            </Link>
            <Link className="col-2" onClick={handleFriend}>
              {ProfileiconData[1].svg} <p>Friends</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="row p-2 ms-auto ">
        <div className="col-md-7 shadow p-5 ms-3 bg-white rounded">
          <h6 className="display-5">0 New Messages</h6>
          <hr />
          <p>This is yoye message</p>
        </div>
        <div className="col-md-4 shadow p-5 ms-3 bg-white rounded">
          <p>
            Congratulations ! Your journey starts now for a wonderful and
            fruitful life. Love and relationship is now at the stroke of your
            keyboard. Do not wait
          </p>
        </div>
      </div>

      <div className="row p-2 mt-2 shadow ps-5 ms-4 bg-white rounded container  ">
        <p>{friends.length > 0 ? "Best Friends" : "Best Match"}</p>
        {friends.length > 0 ? bestFriends() : bestMatches(CardinfoProfileData)}
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

  return <>{loading || !currentUser ? <Loading /> : element()}</>;
};

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import CardInfo from "../components/CardInfo";
import CardinfoProfileData from "../components/CardinfoProfileData";
import ProfileiconData from "../components/ProfileiconData";
import { cloudUpload, profileInit, updateProfile } from "../util/userApi";
import { useSelector } from "react-redux";

export const UpdateProfile = () => {
  const [quote, setQuote] = useState("");
  const [hobby, setHobby] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [imgurl, setImageurl] = useState("");
  const [bio, setBio] = useState("");
  const history = useHistory();

  const { user } = useSelector((state) => ({ ...state }));

  const postImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mekele");
    formData.append("cloud_name", "mekele");

    await cloudUpload(formData)
      .then((res) => {
        console.log(res.data.url);
        setImageurl(res.data.url);
        updateProfile(
          { hobby, bio, quote, imgurl: res.data.url },
          user.currentUser.token
        )
          .then((res) => {
            console.log(imgurl, "update");
            history.push("/profile");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const init = () => {
    profileInit(user.currentUser.token)
      .then((res) => {
        console.log(res.data);
        setBio(res.data.bio);
        setQuote(res.data.quote);
        setGender(res.data.gender);
        setHobby(res.data.hobby);
      })
      .catch((error) => console.log(error));
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
              <Link
                className="nav-link active"
                aria-current="page"
                to="/profile"
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/matches">
                Matches
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/messages">
                Messages
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
          <p className="p-4">Hello Milen</p>
        </div>
      </div>
      <div className="row p-2 ms-auto ">
        <div className="col-md-7 shadow p-5 ms-3 bg-white rounded">
          <p className="text-danger">I am</p>
          <hr />
          <div class="form-floating">
            <select
              name="gender"
              class="form-select"
              onChange={(e) => setGender(e.target.value)}
            >
              <option selected>Please choose</option>
              <option value="1">Man</option>
              <option value="2">Woman</option>
            </select>
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
      <div className="row p-2 ms-auto ">
        <div className="col-md-7 shadow p-5 ms-3 bg-white rounded">
          <p className="text-danger">Who am I ?</p>
          <hr />
          <div class="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
            <label for="floatingTextarea2">Comments</label>
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
      <div className="row p-2 ms-auto ">
        <div className="col-md-7 shadow p-5 ms-3 bg-white rounded">
          <p className="text-danger">My hobbies</p>
          <hr />
          <div class="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
            ></textarea>
            <label for="floatingTextarea2">Comments</label>
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
      <div className="row p-2 ms-auto ">
        <div className="col-md-7 shadow p-5 ms-3 bg-white rounded">
          <p className="text-danger">Personal Quote</p>
          <hr />
          <div class="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            ></textarea>
            <label for="floatingTextarea2">Comments</label>
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
      <div className="row p-2 ms-auto ">
        <div className="col-md-7 shadow p-5 ms-3 bg-white rounded">
          <p className="text-danger">Upload Picture</p>
          <hr />
          <div class="form-floating">
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
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
      <div className="row container ms-3">
        <button className="btn btn-outline btn-block" onClick={postImage}>
          Update Profile
        </button>
      </div>
    </div>
  );
};
export default UpdateProfile;

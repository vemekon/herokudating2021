import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase/firebase.utils";
import { registerUser } from "../util/userApi";
import { useDispatch } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      console.log(idTokenResult.token);
      registerUser({ gender, age }, idTokenResult.token).then((res) => {
        dispatch({
          type: "USER_LOGGED",
          payload: {
            name: res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            role: res.data.role,
            _id: res.data._id,
          },
        });
      });
      history.push("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid  signin-container">
      <div className="row ml-auto p-3 col-md-6 offset-md-3">
        <Link to="/">
          {" "}
          <h2>facepic</h2>
        </Link>
        <div className="container bg-success">
          <form className="mt-3">
            <p className="text-center">Login in </p>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  class="form-select"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option selected>Please choose</option>
                  <option value="man">Man</option>
                  <option value="woman">Woman</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Age</label>
                <select
                  name="age"
                  class="form-select"
                  onChange={(e) => setAge(e.target.value)}
                >
                  <option selected>Please choose</option>
                  {[...new Array(101).keys()].map(
                    (x) => x > 18 && <option value={x}>{x}</option>
                  )}
                </select>
              </div>
            </div>
            <div className="mb-0">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-1 form-check"></div>
            <hr />
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSignin}
              >
                Register
              </button>
              <hr />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

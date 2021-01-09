import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase/firebase.utils";
import { getcurrentUser } from "../util/userApi";
import { useDispatch } from "react-redux";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      console.log(idTokenResult.token);
      getcurrentUser(idTokenResult.token).then((res) => {
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

      setEmail("");
      setPassword("");
      history.push("/");
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
            <div className="mb-0">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <small class=" offset-md-6">Forgot password?</small>
            <div className="mb-1 form-check"></div>
            <hr />
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSignin}
              >
                Signin
              </button>
              <hr />
              <button
                className="btn btn-primary"
                type="button"
                onClick={signInWithGoogle}
              >
                Signin with Google {process.env.REACT_APP_API}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;

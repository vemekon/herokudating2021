import { useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import { useDispatch } from "react-redux";
import { auth } from "./firebase/firebase.utils";
import { getcurrentUser } from "./util/userApi";
import Register from "./pages/Register";
import { Profile } from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import SearchPage from "./pages/Searchpage";
import SingleProfile from "./pages/SingleProfile";
import { Messages } from "./pages/Messages";

function App() {
  const dispatch = useDispatch();
  const {
    user: { currentUser },
  } = useSelector((state) => ({ ...state }));
  //let unsubscribe;

  useEffect(() => {
    let unsubscribe;
    unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const result = await user.getIdTokenResult();
        const token = result.token;
        getcurrentUser(token)
          .then((res) => {
            //console.log(res.data);
            dispatch({
              type: "USER_LOGGED",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((error) => console.log(error));
      }
      dispatch({
        type: "NO USER",
      });
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/signin" component={Signin} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile/:id" component={SingleProfile} />
        <Route exact path="/messages" component={Messages} />
        <Route
          exact
          path="/updateprofile"
          render={() =>
            currentUser ? <UpdateProfile /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/profile"
          render={() => (currentUser ? <Profile /> : <Redirect to="/signin" />)}
        />
        <Route exact path="/search" component={SearchPage} />
      </Switch>
    </div>
  );
}

export default App;

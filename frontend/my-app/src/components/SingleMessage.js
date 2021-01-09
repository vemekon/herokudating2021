import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../pages/Loading";
import { sendMessages } from "../util/userApi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const SingleMessage = ({ data }) => {
  const [txt, setTxt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const {
    items: { item },
    user: { currentUser },
  } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const message = (results && results.message) || [];

  const handleSubmit = async (x) => {
    console.log(x);
    try {
      setLoading(true);
      //console.log(x.connect._id);
      const result = await sendMessages(
        { txt, id: x.connect._id },
        currentUser.token
      );

      setLoading(false);

      if (result) {
        dispatch({
          type: "SINGLE_ITEM",
          payload: result.data,
        });
      }
      // console.log(result.data, " ==", item);

      setResults(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //init();
    setResults(item);
  }, [item]);

  const element = () => {
    console.log(message);
    return (
      <>
        {message &&
          message.map((x) => {
            console.log(message);
            return (
              <Link
                to={`message/${x.connect._id}`}
                className="row g-4 my-1 text-decoration-none "
                key={x.connect._id}
              >
                <div className="col-2 rp">
                  <img
                    src="https://images.unsplash.com/photo-1603600694679-48f52061b807?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
                    className="card-img-top rr"
                    alt="..."
                  />
                </div>
                <div className="col-8">
                  <div className="row px-2">
                    <div className="col-12 fs-5">from</div>
                    <div className="col-12">
                      {" "}
                      <p className="t text-muted">
                        I am good thans but the main question is{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="row">
                    <div className="col-12 t text-muted">from done</div>
                    <div className="col-12">i am </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </>
    );
  };
  return <>{loading || !results ? <Loading /> : element()}</>;
};

export default SingleMessage;

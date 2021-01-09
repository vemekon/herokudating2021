import React, { useState, useEffect } from "react";
import Loading from "../pages/Loading";
import { sendMessages } from "../util/userApi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const ReceivedM = ({ data }) => {
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
              <div key={x.connect._id}>
                <p>From : {x.connect.name}</p>
                <ul class="list-group">
                  {x.content.map((y) => (
                    <li
                      className={`list-group-item list-group-item-primary ${
                        y.to && "bg-info"
                      }`}
                      key={y._id}
                    >
                      <div className="row">
                        <div className="col-sm-2">
                          {y.to ? x.connect.name : "You"}
                        </div>
                        <div className="col-sm-7"> {y.body}</div>
                        <div className="col-sm-3">
                          <small className="offset-3">
                            {moment(y.date).fromNow()}
                          </small>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="form-froating mt-1 ">
                  <textarea
                    className="form-control msgForm"
                    placeholder="Reply here"
                    onChange={(e) => setTxt(e.target.value)}
                  ></textarea>
                  <button
                    className="btn btn-outline-primary mt-1 mb-2"
                    onClick={(e) => handleSubmit(x)}
                  >
                    Button
                  </button>
                </div>
              </div>
            );
          })}
      </>
    );
  };
  return <>{loading || !results ? <Loading /> : element()}</>;
};

export default ReceivedM;

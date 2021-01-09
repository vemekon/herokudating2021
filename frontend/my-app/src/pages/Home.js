import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import searchForm from "../components/SearchForm";
import CardInfo from "../components/CardInfo";
import CardinfoData from "../components/CardinfoData";
import CardiconData from "../components/CardiconData";

const Home = () => {
  const searchText = () => (
    <>
      <h1
        className="h1-responsive font-weight-bold wow fadeInLeft"
        data-wow-delay="0.3s"
      >
        Sign up right now!{" "}
      </h1>
      <hr className="hr-light" />
      <h6 className="mb-3 wow fadeInLeft">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
        repellendus quasi fuga nesciunt dolorum nulla magnam veniam sapiente,
        fugiat! Commodi sequi non animi ea dolor molestiae, quisquam iste,
        maiores. Nulla.
      </h6>
      <Link className="btn btn-outline-white ">Learn more</Link>
    </>
  );
  return (
    <>
      <Nav />
      <div className="bg-danger p-2 m-0"></div>
      <div className="view mt-0">
        <div className=" rgba-gradient align-items-center">
          <div className="container">
            <div className="row pt-5">
              <div className="col-md-6 mb-5 mt-md-0 mt-5 white-text text-center text-md-left">
                {searchText()}
              </div>
              <div className="col-md-6 col-xl-5 mb-4">{searchForm()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row text-center mx-auto">
          <h2 className="display-5 p-5">
            JOIN FREE, BROWSE & MESSAGE EVERY MEMBER
          </h2>

          {CardinfoData.map((x) => (
            <div key={x.id} className="col-sm-6 col-md-4 mb-2">
              <CardInfo item={x} />
            </div>
          ))}
        </div>
      </div>
      <div className="container-flud  mt-5 row main-mask px-3 text-center">
        {CardiconData.map((x) => (
          <div key={x.id} className="col-sm-4 col-md-3  mask">
            <div className="p-2">{x.svg}</div>
            <p className="display-4">{x.name}</p>
            <p className="display-4">gtg</p>
          </div>
        ))}
      </div>
      <div className="container-flud bg-primary p-5 text-center">
        <h4 className="display-5 text-light">
          WHY CHOOSE PLENTY MORE FISH ONLINE DATING?
        </h4>
        <p className="text-light">
          Plentymorefish has been providing online dating since 2002 and as a
          dating site we pride ourselves in providing you with a safe and secure
          environment in which to meet like-minded individuals for chats, dates
          and meaningful relationships. You can join free today, it's easy to
          create your profile and start talking to members in your area. Local
          singles just like you looking for singles just like you.
        </p>
        <button className="btn btn-danger p-3 mt-5">Join Free Today</button>
      </div>

      <div className="container-flud bg-dark p-2 text-center text-light row">
        <p>All rights reserved </p>
      </div>
    </>
  );
};

export default Home;

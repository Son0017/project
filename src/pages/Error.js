import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="section error-page">
      <div className="error-container">
        <h1>Oops! it's a dead end</h1>

        <Link to="/" className="btn btn-primary">
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default Error;

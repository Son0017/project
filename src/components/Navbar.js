import React from "react";
import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import styled from "styled-components";
import { useState } from "react";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="nav-center" style={{ position: "relative" }}>
        <Link to="/">
          <h1 className="logo">Book Store</h1>
        </Link>

        <Phone style={{ display: "flex" }}>
          <ul
            className="nav-links"
            style={{ display: `${!open ? "flex" : "none"}` }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/singlecocktail">Upload Book</Link>
            </li>
            <li>
              <Link to="/userlogup">add User</Link>
            </li>
            <li>
              <Link to="/box">Box</Link>
            </li>
          </ul>
          <CiMenuBurger
            className="burger"
            onClick={() => {
              setOpen(!open);
            }}
          ></CiMenuBurger>
        </Phone>
      </div>
    </nav>
  );
};

const Phone = styled.div`
  .burger {
    display: none;
    font-size: 25px;
  }
  @media only screen and (max-width: 600px) {
    display: none;
    position: absolute;
    .burger {
      display: block;
    }
    background: white;
    right: 0;
    border: 1px;
    top: 40px;
    padding: 5px;
    .nav-links {
      flex-direction: column;
    }
  }
`;

export default Navbar;

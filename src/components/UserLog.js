import React, { useState } from "react";
import { BookUpload } from "../pages/SingleCocktail";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

function UserLog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const { postUser } = useFetch();
  let [user, setUser] = useState({
    roleName: "USER",
    userName: "",
    fio: "",
    password: "",
    balance: 0,
    blocked: false,
    phoneNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isThereUser = users.filter((item) => {
      if (
        item.userName === user.userName &&
        item.fio === user.fio &&
        item.password === user.password
      ) {
        console.log(item);
        return item;
      }
    });
    if (isThereUser.length > 0) {
      if (isThereUser[0].roleName !== "ADMIN") {
        console.log(isThereUser[0]);
        localStorage.setItem("userid", isThereUser[0].id);
        dispatch({ type: "oneUser", payload: isThereUser[0].id });
      } else {
        sessionStorage.setItem("admin", isThereUser[0].id);
        dispatch({ type: "adminId", payload: isThereUser[0].id });
      }
      navigate("/");
    } else {
      const date = await postUser("http://localhost:8090/api/user/save", user);
      if (date.success) {
        navigate("/");
      }
    }
  };

  return (
    <BookUpload>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">User Name:</label>
        <input
          onChange={(e) => {
            setUser({ ...user, userName: e.target.value });
          }}
          id="name"
          placeholder="User Name:"
          type="text"
          required
        />
        <label htmlFor="familia">Familia Ism:</label>
        <input
          onChange={(e) => {
            setUser({ ...user, fio: e.target.value });
          }}
          id="familia"
          placeholder="Familia"
          type="text"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          id="password"
          placeholder="password"
          type="password"
          required
        />
        <label htmlFor="raqam">Telefon Raqam:</label>
        <input
          onChange={(e) => {
            setUser({ ...user, phoneNumber: e.target.value });
          }}
          style={{ marginBottom: "8px" }}
          id="raqam"
          placeholder="Telefon Raqam"
          type="text"
        />

        <button className="link" type="submit">
          Log up
        </button>
      </form>
    </BookUpload>
  );
}

export default UserLog;

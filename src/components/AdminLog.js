import React, { useState } from "react";
import { BookUpload } from "../pages/SingleCocktail";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../hooks/useFetch";

function AdminLog() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { postAdmin } = useFetch();
  let [user, setUser] = useState({
    roleName: "ADMIN",
    userName: "",
    fio: "",
    password: "",
    balance: 0,
    blocked: false,
    phoneNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isThereUser = users.filter(
      (item) =>
        item.userName === user.userName &&
        item.fio === user.fio &&
        item.roleName === user.roleName
    );
    if (isThereUser.length > 0) {
      sessionStorage.setItem("admin", isThereUser[0].id);
      dispatch({ type: "adminId", payload: isThereUser[0].id });
    } else {
      postAdmin("http://localhost:8090/api/user/save", user);
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
          required
          style={{ marginBottom: "8px" }}
          id="raqam"
          placeholder="Telefon Raqam"
          type="number"
        />
        <button className="link" type="submit">
          Log up
        </button>
      </form>
    </BookUpload>
  );
}

export default AdminLog;

import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useFetch } from "../hooks/useFetch";

function UserList() {
  const { deleteUser, changeRole } = useFetch();
  const users = useSelector((state) => state.users);
  return (
    <UserListStyled>
      <section className="section">
        <h2 className="section-title">cocktails</h2>
        <div className="cocktails-center">
          {users &&
            users.map((item) => {
              return (
                <article key={item.id} className="cocktail">
                  <div className="cocktail-footer">
                    <h3>{item.userName}</h3>
                    <h4>{item.fio}</h4>
                    <p>{item.roleName}</p>
                    {item.roleName === "USER" && (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          changeRole(item.id, {
                            id: item.id,
                            roleName: "ADMIN",
                            fio: item.fio,
                            userName: item.userName,
                            password: item.password,
                            balance: item.balance,
                            blocked: item.blocked,
                            phoneNumber: item.phoneNumber,
                          });
                        }}
                      >
                        USER
                      </button>
                    )}
                    {item.roleName === "USER" && (
                      <button
                        style={{ marginLeft: "10px" }}
                        className="btn btn-primary"
                        onClick={() => {
                          deleteUser(
                            `http://localhost:8090/api/user/delete/${item.id}`
                          );
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
        </div>
      </section>
    </UserListStyled>
  );
}

const UserListStyled = styled.div``;
export default UserList;

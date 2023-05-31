import React from "react";
import { useSelector } from "react-redux";
// import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Cocktail from "./Cocktail";
function Uncheckad() {
  const books = useSelector((state) => state.books);
  const { deleteUser, cheakedBooks } = useFetch();

  return (
    <section className="section">
      <h2 className="section-title">Books</h2>
      <div className="cocktails-center">
        {books &&
          books.map((item) => {
            return (
              <article key={item.id} className="cocktail">
                <article>
                  <Cocktail item={item} coc={false} />
                  <p style={{ marginLeft: "1.5rem" }}>
                    {item.blocked ? "Blocked" : "not bloked"}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      cheakedBooks(item.id, {
                        ...item,
                        blocked: !item.blocked,
                      });
                    }}
                    style={{ marginLeft: "1.5rem" }}
                  >
                    Cheaked
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ marginLeft: "10px", marginBottom: "10px" }}
                    onClick={() => {
                      deleteUser(
                        `http://localhost:8090/api/book/delete/${item.id}`
                      );
                    }}
                  >
                    delete
                  </button>
                </article>
              </article>
            );
          })}
      </div>
    </section>
  );
}

export default Uncheckad;
//http://localhost:8090/api/book/edit
{
  /*  */
}

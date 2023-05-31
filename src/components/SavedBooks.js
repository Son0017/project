import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Cocktail from "./Cocktail";
function SavedBooks() {
  const user = useSelector((state) => state.userOne);
  const [books, setBooks] = useState([]);
  const { deleteUser, getSaveBooks } = useFetch();
  const [update, setUpdate] = useState(true);
  async function getBooks() {
    const data = await getSaveBooks(
      `http://localhost:8090/api/savedBook/getAllByUserId/${user}`
    );
    setBooks(data);
  }
  useEffect(() => {
    getBooks();
  }, [update]);
  return (
    <section className="section">
      <h2 className="section-title">Save Books</h2>
      <div className="cocktails-center">
        {books.length > 0 ? (
          books.map((item) => {
            return (
              <article key={item.id} className="cocktail">
                <article>
                  <Cocktail item={item} coc={false} />
                </article>
              </article>
            );
          })
        ) : (
          <h1>No any book</h1>
        )}
      </div>
    </section>
  );
}

export default SavedBooks;
{
  /* <button
                      className="btn btn-primary"
                      onClick={() => {
                        deleteUser(
                          `http://localhost:8090/api/savedBook/delete/${item.id}`
                        );
                        setUpdate(!update);
                      }}
                    >
                      delete
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ marginLeft: "10px" }}
                    >
                      buy
                    </button> */
}

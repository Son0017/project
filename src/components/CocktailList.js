import React from "react";
import Cocktail from "./Cocktail";
import { useState } from "react";
import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

const CocktailList = ({ changeCat }) => {
  const [books, setBooks] = useState(null);
  const { getSaveBooks } = useFetch();

  async function name() {
    const data = await getSaveBooks(
      "http://localhost:8090/api/book/allActiveBooks"
    );
    setBooks(data);
  }

  useEffect(() => {
    name();
  }, []);
  return (
    <section className="section">
      <h2 className="section-title">Books</h2>
      <div className="cocktails-center">
        {books &&
          books.map((item) => {
            if (!item.category && changeCat.length === 0) {
              return (
                <article key={item.id} className="cocktail">
                  <Cocktail item={item} coc={true} />
                </article>
              );
            } else if (item.category) {
              if (item.category.name.includes(changeCat)) {
                return (
                  <article key={item.id} className="cocktail">
                    <Cocktail item={item} coc={true} />
                  </article>
                );
              }
            }
          })}
      </div>
    </section>
  );
};

export default CocktailList;

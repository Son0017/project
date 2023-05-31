import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import Cocktail from "./Cocktail";

function CreateCotegory() {
  const { books, category, categoryList } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const { createCategory, cheakedBooks } = useFetch();
  const handleSubmit = (e) => {
    e.preventDefault();
    let names = "";
    categoryList.map((item) => {
      names += `/${item.name}`;
    });
    if (!names.includes(`/${name}`)) {
      createCategory(name);
    } else {
      categoryList.map((item) => {
        if (item.name === name) {
          dispatch({ type: "category", payload: item.id });
        }
      });
    }
  };

  const handleClick = (item) => {
    cheakedBooks(item.id, { ...item, category: { id: category } });
  };
  return (
    <CreteStyled>
      <form onSubmit={handleSubmit}>
        <label>Create Cotegory:</label>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          className="value"
          value={name}
        />
        <button className="link">create cotigory</button>
      </form>
      <section className="section">
        <h2 className="section-title">Books</h2>
        <div className="cocktails-center">
          {books &&
            books.map((item) => {
              if (!item.category) {
                return (
                  <article key={item.id} className="cocktail">
                    <article>
                      <Cocktail item={item} coc={false} />
                      {category && (
                        <button
                          className="btn btn-primary"
                          style={{
                            marginLeft: "1.5rem",
                            marginBottom: "1.5rem",
                          }}
                          onClick={() => {
                            handleClick(item);
                          }}
                        >
                          Add category
                        </button>
                      )}
                    </article>
                  </article>
                );
              }
            })}
        </div>
      </section>
    </CreteStyled>
  );
}

const CreteStyled = styled.div`
  .link {
    width: 100px;
    border-radius: 30px;
    height: 35px;
    cursor: pointer;
  }
  form {
    padding-top: 15px;
    margin-right: auto;
    margin-left: auto;
    width: 400px;
    display: flex;
    flex-direction: column;
  }
  input {
    padding: 7px 12px;
    margin-bottom: 8px;
  }
`;

export default CreateCotegory;
/*
  

*/

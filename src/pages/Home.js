import React from "react";
import CocktailList from "../components/CocktailList";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { useState } from "react";
const Home = () => {
  const { getSaveBooks } = useFetch();
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false);
  async function getBook() {
    const data = await getSaveBooks("http://localhost:8090/api/category/all");
    setCategory(data);
  }
  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    getBook();
  }, []);
  const [changeCat, setChangeCat] = useState("");
  return (
    <main style={{ position: "relative" }}>
      <div className="dropdown">
        <button className="dopbtn" onClick={handleOpen}>
          Category
        </button>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              <button
                onClick={() => {
                  setChangeCat("");
                }}
              >
                All
              </button>
            </li>
            {category &&
              category.map((item) => {
                return (
                  <li className="menu-item" key={item.id}>
                    <button
                      onClick={() => {
                        setChangeCat(item.name);
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
          </ul>
        ) : null}
      </div>
      <CocktailList changeCat={changeCat} />
    </main>
  );
};

export default Home;

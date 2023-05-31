import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useSelector } from "react-redux";
// import { useEffect } from "react";
const Cocktail = ({ item, coc }) => {
  const { userOne } = useSelector((state) => state);
  const { savedBook, getContent } = useFetch();
  const [data, setData] = useState(null);

  async function datael(item) {
    const logo = await getContent(item.logo.id);
    const file = await getContent(item.attachment.id);
    setData({ logo, file });
  }

  const handleDawnlod = () => {
    const newFile = new File([data.logo], "book", { type: data.type });

    let file = URL.createObjectURL(newFile);
    let a = document.createElement("a");
    a.download = "myPdf.pdf";
    a.href = file;
    a.click();
  };

  useEffect(() => {
    datael(item);
  }, [item]);

  return (
    <article>
      {data && (
        <div className="img-container">
          <img src={URL.createObjectURL(data.logo)} />
        </div>
      )}
      <div className="cocktail-footer">
        <h4>Name: {item.name}</h4>
        <h4>Author: {item.author}</h4>
        <p>price: {item.price}</p>

        <>
          {coc && (
            <>
              <button onClick={handleDawnlod} className="btn btn-primary">
                Download
              </button>
              {userOne && (
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    savedBook({
                      userId: userOne,
                      bookId: item.id,
                      saved: true,
                      bought: false,
                      sold: false,
                    });
                  }}
                >
                  Save Box
                </button>
              )}
            </>
          )}
        </>
      </div>
    </article>
  );
};

export default Cocktail;
// {id: 'c17a0838-a39e-4fe2-a033-b8a5403ec90e', name: '3.jpg', size: 7740729, contentType: 'image/jpeg', fileURL: null}

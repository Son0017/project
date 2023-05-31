import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFetch } from "../hooks/useFetch";
import Loading from "../components/Loading";
const SingleCocktail = () => {
  const { useId, adminId, isPending } = useSelector((state) => state);
  const { attachmentIdPost, lofoIdPost, bookPost } = useFetch();
  const [uploadBook, setUploadBook] = useState({
    categoryId: "",
    ownerId: useId,
    name: "",
    author: "",
    price: 0,
    blocked: false,
    numberOfPages: 0,
    attachmentId: "",
    logoId: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const aid = await attachmentIdPost(uploadBook.attachmentId);
    const lid = await lofoIdPost(uploadBook.logoId);

    if (aid.success && lid.success) {
      const data = await bookPost({
        ...uploadBook,
        attachmentId: aid.object,
        logoId: lid.object,
      });
      if (data.responce.success) {
        setUploadBook({
          categoryId: "",
          ownerId: useId,
          name: "",
          author: "",
          price: 0,
          blocked: false,
          numberOfPages: 0,
          attachmentId: "",
          logoId: "",
        });
      }
    }
  };
  return (
    <BookUpload className="section cocktail-section">
      {isPending && <Loading />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="bookName">Book Name:</label>
        <input
          required
          onChange={(e) => {
            setUploadBook({ ...uploadBook, name: e.target.value });
          }}
          value={uploadBook.name}
          id="bookName"
          placeholder="Book Name"
          type="text"
        />
        <label htmlFor="author">Author:</label>
        <input
          required
          onChange={(e) => {
            setUploadBook({ ...uploadBook, author: e.target.value });
          }}
          value={uploadBook.author}
          id="author"
          placeholder="Author"
          type="text"
        />
        <label htmlFor="price">Price:</label>
        <input
          required
          onChange={(e) => {
            setUploadBook({ ...uploadBook, price: e.target.value });
          }}
          value={uploadBook.price}
          id="price"
          placeholder="Price"
          type="number"
        />
        <label htmlFor="pages">Number of Pages:</label>
        <input
          required
          onChange={(e) => {
            setUploadBook({ ...uploadBook, numberOfPages: e.target.value });
          }}
          value={uploadBook.numberOfPages}
          id="pages"
          placeholder="Number of Pages"
          type="number"
        />
        <div>
          <label htmlFor="myfile">
            <p>Select a file:</p>
            <input
              required
              onChange={(e) => {
                setUploadBook({
                  ...uploadBook,
                  attachmentId: e.target.files[0],
                });
              }}
              type="file"
              id="myfile"
              name="myfile"
            ></input>
          </label>
          <label htmlFor="image">
            <p>Select a image:</p>
            <input
              required
              onChange={(e) => {
                setUploadBook({ ...uploadBook, logoId: e.target.files[0] });
              }}
              type="file"
              id="image"
              name="myfile"
            ></input>
          </label>
        </div>
        {useId || adminId ? (
          <button className="link">Upload</button>
        ) : (
          <Link to={"/userlogup"}>
            <button className="link">Upload</button>
          </Link>
        )}
      </form>
    </BookUpload>
  );
};
const BookUpload = styled.div`
  padding-top: 30px;
  form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
  }
  label {
    text-align: start;
    margin: 8px 0;
    font-weight: 700;
    font-size: 18px;
  }
  input {
    border: none;
    outline: none;
    padding: 11px 7px;
    border-radius: 10px;
  }
  .link {
    width: 150px;
    border-radius: 30px;
    height: 50px;
  }
  div {
    display: flex;
  }
  padding-bottom: 0;
`;
export { SingleCocktail, BookUpload };

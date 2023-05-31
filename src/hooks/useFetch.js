import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
const useFetch = () => {
  // const user = useSelector((state) => state.userOne);
  const dispatch = useDispatch();
  const requestUser = async (url) => {
    try {
      const res = await fetch(url);
      let responce = await res.json();
      dispatch({ type: "users", payload: responce.object });
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: err });
    }
  };
  const postUser = async (url, data) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });
      let responce = await res.json();
      localStorage.setItem("userid", responce.object);
      dispatch({ type: "oneUser", payload: responce.object });
      return responce;
    } catch (err) {
      console.error(err);
      dispatch({ type: "error", payload: err });
    }
  };
  const getContent = async (id) => {
    try {
      const file = await fetch(
        `http://localhost:8090/api/attachment/getAttachmentWithContent/${id}`
      );
      const data = await file.blob();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const postAdmin = async (url, data) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });
      let responce = await res.json();
      sessionStorage.setItem("admin", responce.object);
      dispatch({ type: "adminId", payload: responce.object });
    } catch (err) {
      console.error(err);
      dispatch({ type: "error", payload: err });
    }
  };
  const getBooks = async (url) => {
    try {
      const res = await fetch(url);
      let responce = await res.json();
      dispatch({ type: "books", payload: responce.object });
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: err });
    }
  };
  const cheakedBooks = async (id, item) => {
    let x = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    try {
      const res = await fetch(`http://localhost:8090/api/book/edit/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: item.name,
          author: item.author,
          price: item.price,
          blocked: item.blocked,
          numberOfPages: item.numberOfPages,
          categoryId: item.category ? item.category.id : x,
          ownerId: item.owner ? item.owner.id : x,
          attachmentId: item.attachment ? item.attachment.id : x,
          logoId: item.logo ? item.logo.id : x,
        }),
      });
      const datae = await res.json();
      getBooks("http://localhost:8090/api/book/all");
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: err });
    }
  };
  const getCategory = async (url) => {
    try {
      getBooks("http://localhost:8090/api/book/all");
      requestUser("http://localhost:8090/api/user/all");
      const res = await fetch(url);
      let responce = await res.json();
      dispatch({ type: "categoryList", payload: responce.object });
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: err });
    }
  };
  async function getSaveBooks(url) {
    try {
      const res = await fetch(url);
      let responce = await res.json();
      return responce.object;
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: err });
    }
  }
  const deleteUser = async (id) => {
    try {
      await fetch(id, {
        method: "DELETE",
      });
      if (id.includes("api/user/delete")) {
        requestUser("http://localhost:8090/api/user/all");
      }
      if (id.includes("api/book/delete/")) {
        getBooks("http://localhost:8090/api/book/all");
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: err });
    }
  };
  const changeRole = async (id, data) => {
    try {
      console.log(data);
      await fetch(`http://localhost:8090/api/user/edit/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ ...data }),
      });
      requestUser("http://localhost:8090/api/user/all");
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: err });
    }
  };
  const createCategory = async (item) => {
    try {
      const res = await fetch("http://localhost:8090/api/category/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: item }),
      });
      const data = await res.json();
      dispatch({ type: "category", payload: data.object });
    } catch (err) {
      console.error(err);
      dispatch({ type: "error", payload: err });
    }
  };
  const attachmentIdPost = async (data) => {
    let responce;
    try {
      const formData = new FormData();
      formData.append("file", data);
      const attachmentId = await fetch(
        "http://localhost:8090/api/attachment/save",
        {
          method: "POST",
          body: formData,
        }
      );
      responce = await attachmentId.json();
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: err });
    }
    return responce;
  };
  const lofoIdPost = async (data) => {
    let responce;
    try {
      const formData = new FormData();
      formData.append("file", data);
      const attachmentId = await fetch(
        "http://localhost:8090/api/attachment/save",
        {
          method: "POST",
          body: formData,
        }
      );
      responce = attachmentId.json();
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: err });
    }
    return responce;
  };
  const bookPost = async (item) => {
    let responce;
    let x = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    dispatch({ type: "isPending", payload: true });
    try {
      const res = await fetch("http://localhost:8090/api/book/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: item.name,
          author: item.author,
          price: item.price,
          blocked: !item.blocked,
          numberOfPages: item.numberOfPages,
          categoryId: x,
          ownerId: item.ownerId ? item.ownerId : x,
          attachmentId: item.attachmentId ? item.attachmentId : x,
          logoId: item.logoId ? item.logoId : x,
        }),
      });
      responce = await res.json();
    } catch (err) {
      console.error(err);
      dispatch({ type: "error", payload: err });
    } finally {
      dispatch({ type: "isPending", payload: false });
    }
    return { responce };
  };

  const savedBook = async (data) => {
    try {
      await fetch("http://localhost:8090/api/savedBook/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ ...data }),
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: err });
    }
  };
  return {
    requestUser,
    savedBook,
    getContent,
    postUser,
    changeRole,
    cheakedBooks,
    createCategory,
    postAdmin,
    getBooks,
    getSaveBooks,
    getCategory,
    lofoIdPost,
    attachmentIdPost,
    bookPost,
    deleteUser,
  };
};
export { useFetch };

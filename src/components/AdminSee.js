import React from "react";
import { Link } from "react-router-dom";

function AdminSee() {
  return (
    <nav className="navbar" style={{ marginTop: "15px" }}>
      <div className="nav-center" style={{ justifyContent: "center" }}>
        <ul className="nav-links">
          <li>
            <Link to="/createcategory">Create category</Link>
          </li>
          <li>
            <Link to="/cheaked">Control Book</Link>
          </li>
          <li>
            <Link to="/userlist">Cantrol User</Link>
          </li>
          <li>
            <Link to="/adminlog">add Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminSee;

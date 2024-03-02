import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => (
  <>
    <nav className="navbar bg-body-tertiary p-2">
      <div className="container-fluid d-flex justify-content-between ">
        <h5>{"Login"? "Login":"Sign Up"}</h5>
        <Link to="/demo">
        <button type="button" className="btn btn-primary btn-sm">{"Login"? "Login":"Sign Up"}</button>
        </Link>
       
      </div>
    </nav>
  </>
);

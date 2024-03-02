import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
  

	
	
	   async function handleSubmit (e) {
		e.preventDefault();
		let formu=new FormData(e.target)
		let email=formu.get("email")
		let password=formu.get("password")
		console.log('Password:', password);
		console.log('Email:', email);
		let res=await actions.signUp(email,password)
		if(res){
			console.info("valido")
	  
		  } else{
			console.info("invalido")
	  
	  
		  } 
	  

	  };


	return (
		<div className="container">
			<h1>hola</h1>
			<form onSubmit={handleSubmit}>
			<div className="mb-3">
          <label htmlFor="email" className="form-label">
            Dirección de correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailhelp"
            name="email"
			
          />
          <div id="emailhelp" className="form-text">
            Nunca compartiremos tu correo electrónico con nadie más.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="examplecheck1"
          />
          <label className="form-check-label" htmlFor="examplecheck1">
            Recordarme
          </label>
        </div>
		<button type="submit" className="btn btn-primary">
          Registro
        </button>
				

				

				
			</form>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};

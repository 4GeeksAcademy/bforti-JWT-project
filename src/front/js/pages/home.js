import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
  
  
  async function cull (e){
    e.preventDefault()
    let datos=new FormData(e.target)
    let email=datos.get("email")
    let password=datos.get("password")
    console.log({email,password})
    let ok =await actions.login(email,password)
    if(ok){
      console.info("Login valido")

    } else{
      console.info("Login invalido")


    } 


  }
	

	

	return (
		<>
		<div className="m-5 p-4 ">
		 <form onSubmit={cull}>
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
          Enviar
        </button>
      </form>
      <p>
        Este boilerplate viene con **mucha documentación**. Puedes consultarla
        aquí: leer documentación.
        ¡Buena suerte con tu proyecto! 🚀
      </p>
    </div>
		</>
		
	);
};

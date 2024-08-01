import styles from "./Facebookbtn.module.css";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import { app } from "../../credential";
//import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from "../../App";
import { useContext } from "react";
import { GrGoogle } from "react-icons/gr";
import FacebookLogin from "react-facebook-login";
import emailjs from "@emailjs/browser";

const backendUrl = import.meta.env.VITE_BACKEND;

export function FacebookBtn({ setShowLogin }) {
  //const {loginWithRedirect ,getAccessTokenSilently} = useAuth0();
  const { user, setUser } = useContext(UserContext);
  //const auth = getAuth(app);
  async function login(params) {
    const response = await fetch(`${backendUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: params.email,
        password: "1",
      }),
    });
    if (response.ok) {
      const data = await fetch(`${backendUrl}/user/protected`, {
        credentials: "include",
      });
      if (data.ok) {
        return setUser(await data.json());
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  async function authentication(object) {
    const register = await fetch(`${backendUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: object.name,
        email: object.email,
        password: "1",
        tercero: true,
      }),
    });
    if (register.ok) {
      const sendEmail = () => {
        emailjs
          .send(
            "service_fummu1u",
            "template_u4639sc",
            {
              to_name: object.name,
              to_email: object.email,
              message: "¡Gracias por registrarte!",
            },
            "rLKlxYuL7bCRIIRjV"
          )
          .then(
            () => {
              console.log("SUCCESS!");
              setOkey("¡Registro exitoso! Ahora inicia sesión.");
            },
            (error) => {
              console.error("FAILED...", error.text);
              setNotOkey("Error al enviar el correo de confirmación.");
            }
          );
      };
      sendEmail();
      login(object);
      console.log("talvez funciono");
    } else {
      login(object);
    }
  }
  const facebookLog = (response) => {
    console.log(response);
    if (response.status) {
      setShowLogin(false);
      location.reload();
    }
    authentication(response).then();
  };

  return (
    <>
      <FacebookLogin
        appId="982520500336766"
        autoLoad={true}
        fields="name,email"
        callback={facebookLog}
        textButton={false}
        cssClass={styles.facebook}
      ></FacebookLogin>
    </>
  );
}

{
  //<button onClick={handleLogin} className={styles.googleBtn}><GrGoogle /> Iniciar con google </button>
}
/*const handleLogin = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const credentials = await signInWithPopup(provider,auth)
        console.log(credentials);
      } catch (error) {
        console.error(error);
      }
    };*/

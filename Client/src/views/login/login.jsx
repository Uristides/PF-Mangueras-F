import { useContext, useState } from "react";
import styles from "./login.module.css";
import { GoogleBtn } from "../../components/GoogleBtn/Googlebtn";
import { UserContext } from "../../App";
const backendUrl = import.meta.env.VITE_BACKEND;
import emailjs from "@emailjs/browser";

export function Login({ sesion }) {
  const { user } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [loged, setLoged] = useState(false);
  const [info, setInfo] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });
  const [okey, setOkey] = useState("");
  const [notOkey, setNotOkey] = useState("");
  const [errors, setErrors] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  const handleChangue = (e) => {
    const { name, value } = e.target;
    setOkey("");
    setNotOkey("");
    if (name === "correo") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (regex.test(value)) {
        setInfo((state) => ({
          ...state,
          correo: value,
        }));
        setErrors((state) => ({
          ...state,
          correo: "",
        }));
      } else {
        setErrors((state) => ({
          ...state,
          correo: "Formato de correo invalido",
        }));
      }
    } else if (name === "contraseña") {
      if (value.length > 7) {
        setInfo((state) => ({ ...state, contraseña: value }));
        setErrors((state) => ({ ...state, contraseña: "" }));
      } else {
        setErrors((state) => ({
          ...state,
          contraseña: "Al menos 8 caracteres",
        }));
      }
    } else if (name === "nombre") {
      const regex = /^[a-zA-Z\s]+$/;
      if (regex.test(value)) {
        setInfo((state) => ({ ...state, nombre: value }));
        setErrors((state) => ({ ...state, nombre: "" }));
      } else {
        setErrors((state) => ({
          ...state,
          nombre: "Solo puedes escribir letras en este campo",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loged) {
        const response = await fetch(`${backendUrl}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: info.correo,
            password: info.contraseña,
          }),
        });

        if (response.ok) {
          sesion();
          setOkey("¡Inicio de sesión exitoso!");
        } else {
          setNotOkey("Contraseña o correo inválidos");
        }
      } else {
        const response = await fetch(`${backendUrl}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: info.nombre,
            email: info.correo,
            password: info.contraseña,
          }),
        });

        if (response.ok) {
          const sendEmail = () => {
            emailjs
              .send(
                "service_fummu1u",
                "template_u4639sc",
                {
                  to_name: info.nombre,
                  to_email: info.correo,
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
          sesion();
        } else {
          setNotOkey("Correo en uso");
        }
      }
    } catch (error) {
      console.error(error.message);
      setNotOkey("Ocurrió un error durante el registro/inicio de sesión.");
    }
  };

  return (
    <main className={styles.main}>
      <h1>{loged ? "Iniciar sesión" : "Registrarse"}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {!loged && (
          <label className={styles.label}>
            Nombre de usuario:
            <input
              type="text"
              name="nombre"
              onChange={handleChangue}
              className={styles.input}
            />
            {errors.nombre&&<span className={styles.error}>{errors.nombre}</span>}
          </label>
        )}
        <label className={styles.label}>
          Ingresar correo electrónico:
          <input
            type="email"
            required
            name="correo"
            onChange={handleChangue}
            className={styles.input}
          />
          {errors.correo&&<span className={styles.error}>{errors.correo}</span>}
        </label>
        <label className={styles.label}>
          Tu contraseña:
          <input
            type="password"
            required
            name="contraseña"
            minLength="8"
            onChange={handleChangue}
            className={styles.input}
          />
          {errors.contraseña&&<span className={styles.error}>{errors.contraseña}</span>}
        </label>
        {loged ? (
          <button
            type="submit"
            className={styles.button}
            disabled={errors.correo || errors.contraseña}
          >
            Iniciar sesión
          </button>
        ) : (
          <button
            type="submit"
            className={styles.button}
            disabled={errors.correo || errors.nombre || errors.contraseña}
          >
            Registrarse
          </button>
        )}
        {okey && <span className={styles.ok}>{okey}</span>}
        {notOkey && <span className={styles.error}>{notOkey}</span>}

        <button
          onClick={(e) => {
            e.preventDefault();
            setLoged(!loged);
            setNotOkey("");
          }}
          className={styles.switchButton}
        >
          {loged
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Iniciar sesión"}
        </button>
        {loged && <GoogleBtn></GoogleBtn>}
      </form>
    </main>
  );
}

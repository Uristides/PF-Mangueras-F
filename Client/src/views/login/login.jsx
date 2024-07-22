import { useContext, useState } from 'react';
import styles from './login.module.css';
import { FacebookBtn } from '../../components/FacebookBtn/Facebookbtn';
import { FaFacebookF } from 'react-icons/fa';
import { UserContext } from '../../App';
const backendUrl = import.meta.env.VITE_BACKEND;
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export function Login({ sesion }) {
  const { user } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [loged, setLoged] = useState(false);
  const [info, setInfo] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
  });
  const [okey, setOkey] = useState('');
  const [notOkey, setNotOkey] = useState('');
  const [errors, setErrors] = useState({
    nombre: 'Solo puedes poner letras en este campo',
    correo: 'Por favor, introduce un correo electrónico válido.',
    contraseña: 'La contraseña debe tener al menos 8 caracteres',
  });
  const handleChangue = (e) => {
    const { name, value } = e.target;
    setOkey('');
    setNotOkey('');
    if (name === 'correo') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (regex.test(value)) {
        setInfo((state) => ({
          ...state,
          correo: value,
        }));
        setErrors((state) => ({
          ...state,
          correo: '',
        }));
      } else {
        setErrors((state) => ({
          ...state,
          correo: 'Formato de correo invalido',
        }));
      }
    } else if (name === 'contraseña') {
      if (value.length > 7) {
        setInfo((state) => ({ ...state, contraseña: value }));
        setErrors((state) => ({ ...state, contraseña: '' }));
      } else {
        setErrors((state) => ({
          ...state,
          contraseña: 'Al menos 8 caracteres',
        }));
      }
    } else if (name === 'nombre') {
      const regex = /^[a-zA-Z\s]+$/;
      if (regex.test(value)) {
        setInfo((state) => ({ ...state, nombre: value }));
        setErrors((state) => ({ ...state, nombre: '' }));
      } else {
        setErrors((state) => ({
          ...state,
          nombre: 'Solo puedes escribir letras en este campo',
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loged) {
        console.log('Logged: , ingreso');

        const response = await fetch(`${backendUrl}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email: info.correo,
            password: info.contraseña,
          }),
        });

        if (response.ok) {
          sesion();
          setOkey('¡Inicio de sesion exitoso!');
        } else {
          setNotOkey('contraseña o correo invalidos');
        }
      } else {
        const response = await fetch(`${backendUrl}/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            name: info.nombre,
            email: info.correo,
            password: info.contraseña,
          }),
        });

        if (response.ok) {
          const sendEmail = () => {
            emailjs
              .sendForm(
                "service_fummu1u",
                "template_u4639sc",
                { to_email: info.correo },
                {
                  publicKey: "rLKlxYuL7bCRIIRjV",
                }
              )
              .then(
                () => {
                  console.log("SUCCESS!");
                },
                (error) => {
                  console.log("FAILED...", error.text);
                }
              );
          };

          sendEmail();
          sesion();
          setOkey('¡Registro exitoso! Ahora inicia sesión.');
        } else {
          setNotOkey('correo en uso');
        }
      }
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  };
  return (
    <main className={styles.main}>
      <h1>{loged ? 'Iniciar sesión' : 'Registrarse'}</h1>
      <form className={styles.form}>
        {!loged && (
          <label className={styles.label}>
            Nombre de usuario :
            <input
              type='text'
              name='nombre'
              onChange={handleChangue}
              className={styles.input}
            ></input>
            <span className={styles.error}>{errors.nombre}</span>
          </label>
        )}
        <label className={styles.label}>
          Ingresar correo electrónico :
          <input
            type='email'
            required
            name='correo'
            onChange={handleChangue}
            className={styles.input}
          />
          <span className={styles.error}>{errors.correo}</span>
        </label>
        <label className={styles.label}>
          Tu contraseña :
          <input
            type='password'
            required
            name='contraseña'
            minLength='8'
            onChange={handleChangue}
            className={styles.input}
          />
          <span className={styles.error}>{errors.contraseña}</span>
        </label>
        {loged && (
          <button
            type='submit'
            className={styles.button}
            onClick={handleSubmit}
            disabled={errors.correo || errors.contraseña}
          >
            Iniciar sesión
          </button>
        )}
        {!loged && (
          <button
            className={styles.button}
            onClick={handleSubmit}
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
            setNotOkey('');
          }}
          className={styles.switchButton}
        >
          {loged
            ? '¿No tienes cuenta? Regístrate'
            : '¿Ya tienes cuenta? Iniciar sesión'}
        </button>
        {loged && (
          <div className={styles.facebookButton}>
            {' '}
            {showLogin ? (
              <FacebookBtn setShowLogin={setShowLogin}></FacebookBtn>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                disabled={user}
                className={styles.facebookButton}
              >
                <FaFacebookF />
              </button>
            )}
          </div>
        )}
      </form>
    </main>
  );
}

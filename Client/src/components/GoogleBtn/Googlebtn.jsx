import styles from './Googlebtn.module.css';

import { app } from '../../credential';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { GrGoogle } from "react-icons/gr";
const backendUrl = import.meta.env.VITE_BACKEND;


export function GoogleBtn({ setShowLogin }) {
  const {loginWithRedirect ,getAccessTokenSilently} = useAuth0();
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  async function login(params) {
    const response = await fetch(`${backendUrl}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: params.email,
        password: '',
      }),
    });
    if (response.ok) {
      const data = await fetch(`${backendUrl}/user/protected`, {
        credentials: 'include',
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: object.displayName,
        email: object.email,
        password: '',
        tercero: true,
      }),
    });
    if (register.ok) {
      login(object);
      console.log("talvez funciono");
    } else {
      login(object);
    }
  }
  const handleLogin = async () => {
    try {
      await loginWithRedirect();

      const token = await getAccessTokenSilently();
      console.log("Access Token:", token);

    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <>
    <button onClick={loginWithRedirect} className={styles.googleBtn}><GrGoogle /> Iniciar con google </button>
    </>
  );
}


import styles from './Facebookbtn.module.css';
import FacebookLogin from 'react-facebook-login';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { FaFacebookF } from 'react-icons/fa';
const backendUrl = import.meta.env.VITE_BACKEND;
export function FacebookBtn({ setShowLogin }) {
  const { user, setUser } = useContext(UserContext);

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
        setShowLogin(false);
        return setUser(await data.json());
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  async function auth(object) {
    const register = await fetch(`${backendUrl}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: object.name,
        email: object.email,
        password: '',
        tercero: true,
      }),
    });
    if (register.ok) {
      login(object);
    } else {
      login(object);
    }
  }
  const facebookResponse = (response) => {
    auth(response).then();
    console.log(response);
  };

  return (
    <FacebookLogin
      appId='982520500336766'
      autoLoad={true}
      cssClass={styles.facebookButton}
      fields='name,email'
      callback={facebookResponse}
      textButton={<FaFacebookF />}
    ></FacebookLogin>
  );
}

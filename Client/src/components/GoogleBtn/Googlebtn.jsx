import styles from './Googlebtn.module.css';
import { GoogleAuthProvider,getAuth,signInWithPopup } from "firebase/auth";
import { app } from '../../credential';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { GrGoogle } from "react-icons/gr";
const backendUrl = import.meta.env.VITE_BACKEND;
//import FacebookLogin from 'react-facebook-login';
//import { FaFacebookF } from 'react-icons/fa';

export function GoogleBtn({ setShowLogin }) {
  const provider = new GoogleAuthProvider();
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
    const loginGoogle = ()=>{
      const auth =getAuth();
      signInWithPopup(auth,provider).then((response)=>{
        console.log(response.user);
        authentication(response.user)
        const credentials = GoogleAuthProvider.credentialFromResult(response);
        
      }).catch((error)=>{
        console.error(error.message);
      })
    }
  
  return (
    <>
    <button onClick={loginGoogle} className={styles.googleBtn}><GrGoogle /> Sign in with Google </button>
    </>
  );
}

  {/*<FacebookLogin
    appId='982520500336766'
    autoLoad={true}
    cssClass={styles.facebookButton}
    fields='name,email'
    callback={facebookResponse}
    textButton={<FaFacebookF />}
  ></FacebookLogin>*/}
  /* async function login(params) {
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
   };*/ 
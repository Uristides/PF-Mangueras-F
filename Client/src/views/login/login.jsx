import { useState } from "react"
import styles from "./login.module.css";

export function Login({sesion}) {
    
    const [loged, setLoged] = useState(false)
    const [info , setInfo] = useState({
        nombre:"",
        correo:"",
        contraseña:""
    })
    const[errors,setErrors] = useState({
        nombre:"Solo puedes poner letras en este campo",
        correo:"Por favor, introduce un correo electrónico válido.",
        contraseña:"La contraseña debe tener al menos 8 caracteres"
    });
    const handleChangue = (e)=>{
        const {name, value} = e.target;
        if (name === "correo") {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (regex.test(value)) {
                setInfo((state)=>({
                    ...state,
                    correo:value
                }))
                setErrors((state)=>({
                    ...state,correo:""
                }))
            }else{setErrors((state)=>({...state,correo:"Formato de correo invalido"}))}
        }
        else if (name === "contraseña") {
            if (value.length>7) {
                setInfo((state)=>({...state,contraseña:value}))
                setErrors((state)=>({...state,contraseña:""}))
            }else{
                setErrors((state)=>({...state,contraseña:"Al menos 8 caracteres"}))
            }
        }
        else if (name === "nombre") {
            const regex = /^[a-zA-Z\s]+$/;
            if (regex.test(value)) {
                setInfo((state)=>({...state,nombre:value}))
                setErrors((state)=>({...state,nombre:""}))
            }else{
                setErrors((state)=>({...state,nombre:"Solo puedes escribir letras en este campo"}))
            }
        }
    }
    const [okey, setOkey] = useState("")
    const handleSubmit = async(e)=>{
        e.preventDefault();
        alert("logeadoooo")
    }
    return(
        <main className={styles.main}>
            <h1>{loged ? "Iniciar sesión" : "Registrarse"}</h1>
            <form className={styles.form} >
                {!loged && 
                <label className={styles.label}> Nombre de usuario :
                <input type="text" name="nombre" onChange={handleChangue}className={styles.input}></input>
                <span className={styles.error}>{errors.nombre}</span>
                </label>                }
                <label className={styles.label}>
                    Ingresar correo electrónico : 
                    <input
                        type="email"
                        required
                        name="correo"
                        onChange={handleChangue}
                        className={styles.input}
                    />
                    <span className={styles.error}>{errors.correo}</span>
                </label>
                <label className={styles.label}>
                    Tu contraseña : 
                    <input
                        type="password"
                        required
                        name="contraseña"
                        minLength="8"
                        onChange={handleChangue}
                        className={styles.input}
                    />
                        <span className={styles.error}>{errors.contraseña}</span>
                </label>
                {loged &&<button type="submit" className={styles.button} onClick={handleSubmit} disabled={!errors.correo && !errors.nombre && !errors}>
                    Iniciar sesión  
                </button>}
                {!loged && <button className={styles.button} onClick={handleSubmit}>Registrarse</button>}
                {okey && <span className={styles.ok}>{okey}</span>}
                
              
                
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setLoged(!loged);
                    }}
                    className={styles.switchButton}
                >
                    {loged ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Iniciar sesión"}
                </button>
            </form>
        </main>
    )
}
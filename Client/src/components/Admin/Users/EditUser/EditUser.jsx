import { useParams, useNavigate } from "react-router-dom"
import { editUser } from "../../../../redux/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from "react";
import { UserContext } from "../../../../App";
import { User } from "@auth0/auth0-react";
const backendUrl = import.meta.env.VITE_BACKEND;

const EditUser = ({sesion})=>{
    const {id: userId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      };

    const{ user: loggedUser } = useContext(UserContext)
    console.log("Logged user: ", loggedUser)


    const [ user, setUser ] = useState({})

    const [ updatedUser, setUpdatedUser ] = useState({
        id: userId,
        name: '',
        email: '',
        password: user?.password,
        tercero: '',
        status: '',
        rol: '',
    })

    useEffect(()=>{

        const getUser = async(id)=>{
            try {
                const { data } = await axios.get(`${backendUrl}/user/id/${id}`)
                if(data) {
                    setUser(data)
                    setUpdatedUser({
                        id: userId,
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        tercero: data.tercero,
                        status: data.status,
                        rol: data.rol, 
                    })
                }

            } catch (error) {
                
            }
        }

        getUser(userId)
    },[userId])

    console.log("Fetched user: ", user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editUser(updatedUser));
      };

    const handleChange = (e)=>{
        const { name, value } = e.target;

        setUpdatedUser({
            ...updatedUser,
            [name]: value
        })

    }

    const logout = async () => {
        const response = await fetch(`${backendUrl}/user/logout`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
    
        if (response.ok) {
          deleteCookie("lacookie");
          sesion();
          location.reload();
        }
      };

    if(loggedUser.id == user.id && user.rol !== "Admin"){
          logout()
    }

   

    const resetUser = ()=>{
        setUpdatedUser(user)
    }

console.log("Updated user: ", updatedUser)

    return(
        <div>
            <button 
            style={{margin: "15px", width: '70px', border: 'solid 1px black', borderRadius: '20em', textDecoration: 'underline',backgroundColor: '#99e49b', cursor: 'pointer'} }
            onClick={()=>{navigate('/admin/users')}
            }>Atras</button>
            <p><strong>Editar usuario de correo: </strong></p>
            <h3>{user.email}</h3>
            <div>
                <form onSubmit={handleSubmit}>

                    {/* <div>
                    <label  >Nombre de usuario</label>
                    <input
                    type="text"
                    name="name"
                    value={updatedUser.name}
                    onChange={handleChange}
                     /> */}
                    {/* </div> */}
{/* 
                    <div>
                    <label  >Correo</label>
                    <input
                    type="text"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label  >Password</label>
                    <input
                    type="password"
                    name="password"
                    value={updatedUser.password}
                    onChange={handleChange}
                    />
                    </div> */}

                    <div>
                    <label>Role</label>
                    <select name="rol" value={updatedUser.rol} onChange={handleChange}>
                     
                        <option value='User'>Usuario</option>
                        <option value="Admin">Admin</option>
                    </select>
                    </div>
                    <div>
                    <label  >Status: </label>
                    <select name="status" value={updatedUser.status} onChange={handleChange}>
                        
                        <option value={true}>Activo</option>
                        <option value={false}>Desactivado</option>
                    </select>
                    </div>         

                    <button type="submit">Editar</button>
                </form>
            </div>

            <div>
            </div>
            <button onClick={resetUser}>Reset</button>
        </div>
    )
}


export default EditUser
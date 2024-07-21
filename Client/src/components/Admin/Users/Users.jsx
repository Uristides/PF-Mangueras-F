import { useState, useEffect } from "react";
import IndividualUser from "./IndividualUser";
import styles from './Users.module.css'
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND;


const Users = ()=>{


    const [users, setUsers] = useState([])

    useEffect(()=>{

        const getAllUsers = async()=>{
            try {
                const {data} = await axios.get(`${backendUrl}/user`)
                if(data) setUsers(data)
                
            } catch (error) {
                console.log("Error in getAllUsers: ", error.message)
            }
        }
        getAllUsers()
        
    }, [])

    return(
        <div>
            <div className={styles.usersList}>
            <div className={styles.usersHeader}>
            <p>id</p>
            <p>name</p>
            <p>email</p>
            <p>tercero</p>
            <p>carrito</p>
            <p>rol</p>
            <p></p>

            </div>
            {users ? users.map((person)=>(
                <IndividualUser key={person.id} data={person} />
            )): <p>Sin usuarios</p>}
            
            </div>
        </div>
    )
}

export default Users;
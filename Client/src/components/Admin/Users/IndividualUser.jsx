import { Link } from "react-router-dom";
import styles from "./IndividualUser.module.css"

const IndividualUser = (props)=>{
    const {id, name, email, tercero, status, rol, cart } = props.data


    return(

        <div>
            <div className={styles.eachUser}>

                <p>{id}</p>
                <p>{name}</p>
                <p>{email}</p>
                <p>{String(tercero)}</p>
                <p>{cart.map((orden)=><p>{orden}</p>)}</p>
                <p>{String(status)}</p>
                <p>{String(rol)}</p>
                <p><Link to={`/admin/users/edit/${id}`}>Edit</Link></p> 

            </div>
        </div>
    )
}

export default IndividualUser;
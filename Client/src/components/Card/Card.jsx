import styles from "./Card.module.css"
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { FaCartPlus } from "react-icons/fa6";

const Card = (props)=>{

    const {id, name, brand, price, image, diameter,longitude, stock, type, description, available} = props.data

    const items = useSelector((state)=>state.cart.items)
    const dispatch = useDispatch()

    const handleAddToCart = ()=>{
        dispatch(addItem(props.data))
    }
    
    console.log("In Card(s): ", items)
    return(
        <article className={styles.card} key={id}>
            <h1>{name}</h1>
            <h2>{brand}</h2>
            <h2>${price}</h2>
            <img
            src={image}
            alt="manguera pic"
            className={styles.img}
            />
            <button onClick={handleAddToCart}className={styles.btn}><FaCartPlus> </FaCartPlus></button>
        </article>
    )
}

export default Card;
        // "id": 1,
        //   "image": "https://tauber.com.mx/storage/customer/images/312005_B7_STV_1_2_100.JPG",
        //   "name": "Manguera1",
        //   "price": 50.0,
        //   "diameter": 1.5,
        //   "longitude": {
        //     "feet": [50.0, 100.0],
        //     "meters": [15.24, 30.48]
        // "brand": "MarcaA",
        //   "stock": 10,
        //   "type": "Doméstico",
        //   "description": "Manguera de alta calidad para uso doméstico",
        //   "available": true
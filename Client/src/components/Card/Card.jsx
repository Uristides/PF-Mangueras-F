import styles from "./Card.module.css"
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom"


const Card = (props)=>{

        // "id": 1,
		// "name": "AquaFlex",
		// "image": "https://th.bing.com/th?id=OPHS.eyiN15kcAhBeCQ474C474&w=200&h=220&c=17&pid=21.1",
		// "price": "35",
		// "diameter": "1.0",
		// "longitude": "15, 30",
		// "brand": "HydroPro",
		// "type": "Domestico",
		// "description": "Manguera de alta calidad, flexible y resistente para uso doméstico.",
		// "available": true,
		// "stockId": null

    const {id, name, image, price, diameter, longitude, brand, type, description, available, stockId} = props.data



 
    
    return(
        
        <article>
                <Link to={`/detail/${id}`}>
                <article className={styles.card} key={id}>
                    <h1>{name}</h1>
                    <h2>{brand}</h2>
                    <h2>${price}</h2>
                    <img
                    src={image}
                    alt="manguera pic"
                    className={styles.img}
                     />
                </article>
                </Link>
                <button onClick={addItem}className={styles.btn}><FaCartPlus> </FaCartPlus></button>
        </article>
    )
}

export default Card;

            {/*<article className={styles.card} key={id}>
                <h1>{name}</h1>
                <h2>{brand}</h2>
                <h2>${price}</h2>
                <img
                src={image}
                alt="manguera pic"
                className={styles.img}
                />
                <button onClick={handleAddToCart}className={styles.btn}><FaCartPlus> </FaCartPlus></button>
            </article>*/}
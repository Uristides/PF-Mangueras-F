import EditItem from '../Edit/EditItem';
import styles from './ProductItem.module.css'
import { Link, Route, Routes } from 'react-router-dom';


const ProductItem = (props) => {
    const { id, name, brand, type, price, stock, available, longitude, show } = props.data;




    return (

        <div>
        <div className={styles.productItem}>
            <p>{id}</p>
            <p>{name}</p>
            <p>{brand}</p>
            <p>{type}</p> 
            <p>{price}$</p>
            <p>{stock}</p>
            {<p style={{color: available ? 'green': 'red'}}>{String(available)}</p>}
            {<p style={{color: show ? 'green': 'red'}}>{String(show)}</p>}
            <p><Link to={`/admin/products/edit/${id}`}>Edit</Link></p>
        </div>
        </div>
    );
};

export default ProductItem;

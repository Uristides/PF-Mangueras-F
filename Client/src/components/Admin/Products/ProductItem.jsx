import React from 'react';
import styles from './ProductItem.module.css'

const ProductItem = (props) => {
    const { id, name, brand, type, price, stock, available, longitude, show } = props.data;




    return (
        <div className={styles.productItem}>
            <p>{id}</p>
            <p>{name}</p>
            <p>{brand}</p>
            <p>{type}</p> 
            <p>{price}$</p>
            <p>{stock}</p>
            {<p style={{color: available ? 'green': 'red'}}>{String(available)}</p>}
            {<p style={{color: show ? 'green': 'red'}}>{String(show)}</p>}
            <p>Editar</p>
        </div>
    );
};

export default ProductItem;

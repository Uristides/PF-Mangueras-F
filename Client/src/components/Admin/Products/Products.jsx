import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from '../../../redux/itemsSlice';
import ProductItem from './ProductItem';
import styles from './Products.module.css';

const Products = () => {
    const [products, setProducts] = useState([]);

    const mangueras = useSelector((state) => state.items.allItems);
    const status = useSelector((state) => state.items.status);

    const dispatch = useDispatch();

    console.log("Mangueras: ", mangueras);

    useEffect(() => {
        setProducts(mangueras);
    }, [mangueras]);

    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchItems());
        }
    }, [status, dispatch]);

    return (
        <div>
            <div>Products Component here</div>
            
            <div className={styles.productList}>
            <div className={styles.productHeader}>
                    <p>ID</p>
                    <p>Name</p>
                    <p>Brand</p>
                    <p>Type</p>
                    <p>Price</p>
                    <p>Stock</p>
                    <p>Available</p>
                    <p> </p>
                </div>
                {products?.map((mang) => (
                    <ProductItem key={mang.id} data={mang} />
                ))}
            </div>
        </div>
    );
};

export default Products;

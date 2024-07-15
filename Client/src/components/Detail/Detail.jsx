import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  console.log('Prodcut in detail: ', product);

  useEffect(() => {
    const getbyId = async (id) => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/products/${id}`
        );
        if (data) setProduct(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getbyId(id);
  }, [id]);

  return (
    <div>
      Detail here
      <h1>{product?.name}</h1>
      <p>{product.brand}</p>
      <img src={product.image} alt='pic' />
      <h3>$ {product.price}</h3>
      <button>Add to cart</button>
      <select>
        <option>1</option>
        <option>2</option>
      </select>
      <br />
      <p>{product.description}</p>
    </div>
  );
};

export default Detail;

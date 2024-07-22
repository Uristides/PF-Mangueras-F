import { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/cartSlice';
import { UserContext } from '../../App';
import styles from './removeButton.module.css';

const RemoveButton = ({ id }) => {
  const itemId = id;

  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const [removedItem, setRemovedItem] = useState({
    id: user.id,
    item: '',
  });

  useEffect(() => {
    setRemovedItem((prevState) => ({
      ...prevState,
      item: itemId.toString(),
    }));
  }, [user.id, itemId]);

  const handleClick = () => {
    dispatch(removeFromCart(removedItem));
  };

  return (
    <button onClick={handleClick} className={styles.removeButton}>
      Quitar
    </button>
  );
};

export default RemoveButton;

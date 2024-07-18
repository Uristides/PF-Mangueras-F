import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const AddButton = (props) => {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);

  // Initialize state with the user ID and an empty item field
  const [itemInfo, setItemInfo] = useState({
    id: user.id,
    item: ''
  });

  // Update the itemInfo state whenever props.data changes
  useEffect(() => {
    console.log("Props in AddButton component: ", props);
    console.log("User ID: ", user.id);
    setItemInfo((prevState) => ({
      ...prevState,
      item: props.data
    }));
  }, [props.data, user.id]);

  // Handle click event to dispatch the addToCart action
  const handleClick = () => {
    console.log("Item info: ", itemInfo);
    dispatch(addToCart(itemInfo));
  };

  return (
    <button 
      onClick={handleClick}
      disabled={!props.available} // Disable button if the item is not available
    >
      Agregar al Carrito
    </button>
  );
};

export default AddButton;

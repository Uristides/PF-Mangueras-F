import { UserContext } from "../../../../App";
import { useContext, useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND;

const CreateReview = (props) => {
  const { id: productId } = props.data;
  const { user } = useContext(UserContext);

  const [productReview, setProductReview] = useState({
    comment: "",
    rating: 0,
    mangueraId: Number(productId),
    userId: user.id,
  });

  console.log("ProductReview: ", productReview)

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert the rating value to a number
    const updatedValue = name === "rating" ? Number(value) : value;

    setProductReview({
      ...productReview,
      [name]: updatedValue,
    });
  };

  const handleSubmit = async()=>{
    try {

      const { data } = await axios.post(`${backendUrl}/products/reviews/`, productReview)
      if (data){
        alert("Resena agregada exitosamente!") 
        window.location.reload()
      }
    } catch (error) {
      console.log("Error in submiting rating", error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating</label>
          <select
            name="rating"
            onChange={handleChange}
            value={productReview.rating}
          >
            <option value="" disabled>Select a rating</option>
            <option >Escoge Rating</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <label>Comentario</label>
          <input
            value={productReview.comment}
            name="comment" // Ensure the name is set to "comment"
            onChange={handleChange} // Add the onChange handler
          />
        </div>
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default CreateReview;

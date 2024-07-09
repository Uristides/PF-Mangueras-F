

const Card = ({name, brand, price, image})=>{

    return(
        <div>
            <h1>{name}</h1>
            <h2>{brand}</h2>
            <h2>{price}</h2>
            <img
            src={image}
            alt="manguera pic"
            />

        </div>
    )
}

export default Card;
import './Card.css'

const Card = ({name, brand, price, image})=>{


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

    return(
        <div className='individual-card'>
            <h1>{name}</h1>
            <h2>{brand}</h2>
            <h2>${price}</h2>
            <img
            src={image}
            alt="manguera pic"
            />

        </div>
    )
}

export default Card;
import { mangueras } from "../assets/data";
import Card from "../Card/Card";
import './Cards.css'



const Cards = ()=>{

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

    const data = mangueras.filter(mang => mang.available === true && mang.stock > 0)

    return(
        <div>

            <div className="card-div">

            {data.map(mang => (
                <Card
                id={mang.id}
                name={mang.name}
                price={mang.price}
                diameter={mang.diameter}
                length = {mang.longitude}
                brand={mang.brand}
                stock={mang.stock}
                type={mang.type}
                description={mang.description}
                />
                ))}
                </div>

        </div>
    )
}

export default Cards;
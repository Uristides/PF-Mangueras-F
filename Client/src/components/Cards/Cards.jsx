import  mangueras  from "../../../../db.json";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./Cards.module.css"



const Cards = ()=>{
    const paginas = 10;
const [products , setProducts] = useState([...mangueras]);
const [currentPage , setCurrentPage] = useState(0);
const data = mangueras.filter(mang => mang.available === true && mang.stock > 0)
useEffect(()=>{
    setProducts([...data].splice(0,paginas))
},[])

const restart = ()=>{
    setCurrentPage(0);
    setProducts([...data].splice(0,paginas))
}
const nextPage = ()=>{
    const next = currentPage + 1;
    const Index = next * paginas;
    if (Index >= data.length) return;
    setProducts([...data].splice(Index,paginas))
    setCurrentPage(next)
}
const prev = ()=>{
    const prevPage = currentPage - 1;
    if(prevPage < 0) return;
    const first = prevPage * paginas;
    setProducts([...data].splice(first,paginas))
    setCurrentPage(prevPage);
}

    
    return(
        <section className={styles.section}>

            <article className={styles.Card}>

            {products.map(mang => (
                <Card
                id={mang.id}
                name={mang.name}
                image={mang.image}
                price={mang.price}
                diameter={mang.diameter}
                length = {mang.longitude.feet}
                brand={mang.brand}
                stock={mang.stock}
                type={mang.type}
                description={mang.description}
                />
                ))}
            </article>
            <article className={styles.pagination}>
                <button onClick={prev}className={styles.button} >⬅️ Previous</button>
                <button  onClick={restart} className={styles.refresh}>{currentPage + 1}</button>
                <button onClick={nextPage} className={styles.button} >Next ➡️</button>
            </article>
        </section>
    )
}

export default Cards;
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
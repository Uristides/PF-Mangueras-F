import { mangueras } from "../assets/data";
import Card from "../Cards/Cards";



const Cards = ()=>{

    const data = mangueras.filter(mang => mang.available === true)

    return(
        <div>
            {data.map(mang => (
                <Card
                    name={mang.name}
                    
                 />
            ))}

        </div>
    )
}

export default Cards;
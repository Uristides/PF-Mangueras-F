import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"
import axios from "axios"
const backendUrl = import.meta.env.VITE_BACKEND;



const CheckoutButton = ({totalPrice})=>{

    const { user } = useContext(UserContext)

    const [id, setId] = useState(user.id)
    const [total, setTotal] = useState()
    const [ possibleCheckout, setPossibleCheckout ] = useState(false)

    useEffect(()=>{
        setId(user.id)
        setTotal(totalPrice)
        if(total > 1) setPossibleCheckout(true)
    })

    const checkedOut = 
    {id: id,
        total: total}

    console.log("Checking out: ",checkedOut )

    
    //  console.log("Id: ", id)

    const handleCheckout = async()=>{
        const checkoutOrder = {
            id: id,
            totalAmount: total
        }
        try {
            const { data } = await axios.post(`${backendUrl}/user/buyCart/`, checkoutOrder)
            if(data) {
                
                setTotal(0)
                alert("Productos comprados exitosamente! Envio de 100 meses")
            }
            
        } catch (error) {
            console.log("Error in handleCheckout", error.message)
            
        }
    }



    return(
        <button
        onClick={handleCheckout}
        disabled={!id && !possibleCheckout}>
            Checkout
        </button>
    )
}

export default CheckoutButton;
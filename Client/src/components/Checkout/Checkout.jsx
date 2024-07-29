import CheckoutButton from "./CheckoutButton";
import { useLocation } from "react-router-dom";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('YOUR_PUBLIC_KEY');



const Checkout = ()=>{

    const location = useLocation()
    const {totalPrice} = location.state || {}


    console.log("Location totalPrice state: ", totalPrice)
    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>
                Your total: {totalPrice}
            </div>
            <div>
                <CheckoutButton totalPrice={totalPrice} />
                
            </div>
        </div>
    )
}

export default Checkout;
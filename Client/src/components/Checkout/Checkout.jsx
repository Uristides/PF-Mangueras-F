import CheckoutButton from "./CheckoutButton";
import { useLocation } from "react-router-dom";
import styles from './Checkout.module.css'

const Checkout = ()=>{

    const location = useLocation()
    const {totalPrice} = location.state || {}


    console.log("Location totalPrice state: ", totalPrice)
    return(
        <div className={styles.checkoutContainer}>
            <div className={styles.yourTotal}>
                <h3>
                Your total: ${totalPrice}
                </h3>
            </div>
            <div>
                <CheckoutButton totalPrice={totalPrice} />
            </div>
        </div>
    )
}

export default Checkout;
import { Route, Routes } from 'react-router-dom'
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import Products from "../../components/Admin/Products/Products";
import Users from '../../components/Admin/Users/Users'
import Orders from '../../components/Admin/Orders/Orders';
import styles from './Dashboard.module.css'


const Dashboard = ()=>{

    return(
        <div className={styles.adminDashboard}>
            <div className={styles.sidebar}>
                <Sidebar/>
            </div>
                
            <div className={styles.adminContent}>
                <Routes>
                    <Route path="products" element={<Products/>} />
                    <Route path="users" element={<Users/>} />
                    <Route path='orders' element={<Orders />} />
                    {/* <Route path="/admin/create-product" element={<Component here></Component>} */}
                </Routes>
            </div>

        </div>
        
    )
}

export default Dashboard;
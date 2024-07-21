import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { fetchItems } from '../../redux/itemsSlice';
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import Products from "../../components/Admin/Products/Products";
import Users from '../../components/Admin/Users/Users'
import Orders from '../../components/Admin/Orders/Orders';
import CreateForm from '../../components/Admin/CreateForm/CreateForm';
import EditItem from '../../components/Admin/Edit/EditItem';
import styles from './Dashboard.module.css'
import { useEffect } from 'react';
import { fetchTypes } from '../../redux/typesSlice';


const Dashboard = ()=>{

   

    return(
        <div className={styles.adminDashboard}>
            <div className={styles.sidebar}>
                <h3 style={{color: '#3d6a3e'}}>Panel de Administrador</h3>
                <hr className={styles.hrTag}/>
                <Sidebar/>
            </div>
                
            <div className={styles.adminContent}>
                <Routes>
                    <Route path="products/*" element={<Products/>} />
                    <Route path="products/edit/:id" element={<EditItem />} />
                    <Route path="users" element={<Users/>} />
                    <Route path='orders' element={<Orders />} />
                    <Route path="create-product" element={<CreateForm/>}/>
                    
                </Routes>              
            </div>

        </div>
        
    )
}

export default Dashboard;
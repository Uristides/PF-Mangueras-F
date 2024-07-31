/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserById,
  editUser,
  fetchUserReviews,
} from '../../redux/userSlice';
import EditModal from '../Profile/editModal/EditModal';
import ConfirmModal from '../Profile/confirmModal/ConfirmModal';
import { BsPersonCircle } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineUserDelete } from 'react-icons/ai';
import styles from './Profile.module.css';

const Profile = ({ data, sesion }) => {
  const dispatch = useDispatch();
  localStorage.setItem('user', JSON.stringify(data));
  const userID = JSON.parse(localStorage.getItem('user'));
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dataUser = useSelector((state) => state.user.item);
  const dataReviews = useSelector((state) => state.user.reviews);
  const products = useSelector((state) => state.items.items);
  const dataHistory = false;

  useEffect(() => {
    dispatch(fetchUserById(userID.id));
    dispatch(fetchUserReviews(userID.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerEditUser = (newUser) => {
    dispatch(editUser(newUser));
    setShowModalEdit(false);
  };

  return (
    <>
      {showModalEdit && (
        <EditModal
          setShowModalEdit={() => {
            setShowModalEdit(false);
          }}
          data={dataUser}
          handlerEditUser={handlerEditUser}
        />
      )}
      {showModal && (
        <ConfirmModal
          setShowModal={() => setShowModal(false)}
          sesion={sesion}
          data={dataUser}
        />
      )}
      <div className={styles.profileContainer}>
        <div className={styles.mainContent}>
          <div className={styles.deleteButtonContainer}>
            <AiOutlineUserDelete
              onClick={() => setShowModal(true)}
              className={styles.deleteButton}
            />
          </div>
          <BsPersonCircle className={styles.profileImage} />
          <div className={styles.profileInfo}>
            <h2 className={styles.profileName}>
              Usuario: {dataUser?.name}
              <p
                className={styles.editButton}
                onClick={() => setShowModalEdit(true)}
              >
                <CiEdit />
              </p>
            </h2>
            <h3 className={styles.profileEmail}>Email: {dataUser?.email}</h3>
            <h3 className={styles.profileRole}>Rol: {dataUser?.rol}</h3>
          </div>
        </div>
        <div className={styles.sideContent}>
          <div className={styles.purchaseHistory}>
            {dataHistory ? (
              dataHistory.map((item, index) => (
                <div className={styles.purchaseHistoryItem} key={index}>
                  <p>Compra {item}</p>
                </div>
              ))
            ) : (
              <div className={styles.purchaseHistoryItem}>
                <p className={styles.noReviews}>No hay compras realizadas</p>
              </div>
            )}
          </div>
          <div className={styles.purchaseHistory}>
            {dataReviews.length ? (
              dataReviews?.map((item, index) => (
                <div className={styles.purchaseHistoryItem} key={index}>
                  <p className={styles.comment}>
                    {item.comment === '' ? 'No hay comentarios' : item.comment}
                  </p>
                  <p>Rating: {'⭐'.repeat(item.rating)}</p>
                  <p>
                    Producto:{' '}
                    {
                      products.filter(
                        (product) => product.id === item.mangueraId
                      )[0]?.name
                    }
                  </p>
                </div>
              ))
            ) : (
              <div className={styles.purchaseHistoryItem}>
                <p className={styles.noReviews}>No hay comentarios</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

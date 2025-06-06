import { useEffect, useState, useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchUserById,
  editUser,
  fetchUserReviews,
  fetchUserOrders,
} from "../../redux/userSlice";
import EditModal from "../Profile/editModal/EditModal";
import ConfirmModal from "../Profile/confirmModal/ConfirmModal";
import { UserContext } from "../../App";
import { BsPersonCircle } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { AiOutlineUserDelete } from "react-icons/ai";
import styles from "./Profile.module.css";

const Profile = ({ data, sesion }) => {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  localStorage.setItem("user", JSON.stringify(data));
  const userID = user.id;
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dataUser = useSelector((state) => state.user.item);
  const dataReviews = useSelector((state) => state.user.reviews);
  const products = useSelector((state) => state.items.items);
  const orders = useSelector((state) => state.user.orders);

  useEffect(() => {
    dispatch(fetchUserById(userID));
    dispatch(fetchUserReviews(userID));
    dispatch(fetchUserOrders(userID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerEditUser = (newUser) => {
    dispatch(editUser(newUser));
    setShowModalEdit(false);
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}hs`;
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
          <p>Historial de compras</p>
          <div className={styles.purchaseHistory}>
            {orders ? (
              orders.slice(-3).map((item, index) => (
                <Link
                  to={`/profile/order/${item.id}`}
                  key={index}
                  className={styles.purchaseHistoryItemLink}
                >
                  <div className={styles.purchaseHistoryItem}>
                    <p>N° de pedido: {item?.id.slice(0, 7)}...</p>
                    <p>Monto: ${item?.amount}</p>
                    <p>Fecha: {formatDateTime(item?.creation_date)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles.purchaseHistoryItem}>
                <p className={styles.noReviews}>No hay compras realizadas</p>
              </div>
            )}
          </div>
          <p>Historial de comentarios</p>
          <div className={styles.purchaseHistory}>
            {dataReviews.length ? (
              dataReviews?.map((item, index) => (
                <Link
                  to={`/detail/${item.mangueraId}`}
                  className={styles.purchaseHistoryItemLink}
                >
                  <div className={styles.purchaseHistoryItem} key={index}>
                    <p>Rating: {"⭐".repeat(item.rating)}</p>
                    <p>
                      Producto:{" "}
                      {
                        products.find(
                          (product) => product.id === item.mangueraId
                        )?.name
                      }
                    </p>
                    <p className={styles.comment}>
                      {item.comment === ""
                        ? "No hay comentarios"
                        : item.comment}
                    </p>
                  </div>
                </Link>
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

/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { editUser } from '../../../redux/userSlice';
import styles from './ConfirmModal.module.css';

const backendUrl = import.meta.env.VITE_BACKEND;

const ConfirmModal = ({ setShowModal, sesion, data }) => {
  const dispatch = useDispatch();
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  const logout = async () => {
    const response = await fetch(`${backendUrl}/user/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      deleteCookie('lacookie');
      sesion();
      location.reload();
    }
  };

  const logoutUser = () => {
    dispatch(editUser({ id: data.id, status: false }));
    logout();
  };
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>Are you sure you want to deactivate your account?</p>
        <div className={styles.buttonsContainer}>
          <button className={styles.cancelButton} onClick={setShowModal}>
            Cancel
          </button>
          <button className={styles.deleteButton} onClick={logoutUser}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

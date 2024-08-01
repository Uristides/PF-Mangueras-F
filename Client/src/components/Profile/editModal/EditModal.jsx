/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './EditModal.module.css';

const EditModal = ({ setShowModalEdit, data, handlerEditUser }) => {
  const [inputValue, setInputValue] = useState(data.name);
  const [error, setError] = useState('');

  const validateInput = (value) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!value) {
      return 'El campo no puede estar vacío';
    }
    if (value.length < 3) {
      return 'El campo debe tener al menos 3 caracteres';
    }
    if (value.length > 20) {
      return 'El campo no puede exceder los 20 caracteres';
    }
    if (!regex.test(value)) {
      return 'El campo solo puede contener letras y espacios';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    setError(validateInput(value));
  };

  const saveChanges = () => {
    if (!error) {
      handlerEditUser({ id: data.id, name: inputValue });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.inputContainer}>
          <input
            type='text'
            placeholder='Name'
            className={styles.input}
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className={styles.errorContainer}>
            {error && <div className={styles.error}>{error}</div>}
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.cancelButton} onClick={setShowModalEdit}>
            Cancel
          </button>
          <button
            className={styles.saveButton}
            onClick={saveChanges}
            disabled={!!error}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};


export default EditModal;



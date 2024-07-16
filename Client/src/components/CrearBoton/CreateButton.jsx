import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CreateButton.module.css';

const CreateButton = () => {
  return (
    <Link to="/create" className={styles.createLink}>
      <button className={styles.createButton}>Crear Nueva Manguera</button>
    </Link>
  );
};

export default CreateButton;

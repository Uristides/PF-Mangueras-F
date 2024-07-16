import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.aboutUs}>
      <p>
        Bienvenido a <strong>The Hose Factory</strong>, tu tienda en línea de confianza especializada en mangueras de riego de alta calidad para jardineros, uso doméstico y agrícola. Nuestro objetivo es proporcionar soluciones de riego eficientes y duraderas que faciliten el cuidado de tus plantas y cultivos, asegurando siempre un suministro adecuado de agua.
      </p>

      <h2>Nuestra Historia</h2>
      <p>
        Nacimos de la pasión por la jardinería y la agricultura sostenible. Entendemos la importancia de un sistema de riego confiable para mantener tus jardines, huertos y campos en las mejores condiciones. Con años de experiencia en el sector, decidimos crear <strong>The Hose Factory</strong> para ofrecer productos que combinan innovación, resistencia y eficiencia.
      </p>

      <h2>Nuestra Misión</h2>
      <p>En <strong>The Hose Factory</strong>, nuestra misión es:</p>
      <ul>
        <li><strong>Proveer productos de alta calidad:</strong> Nos comprometemos a ofrecer una gama de mangueras de riego que cumplen con los más altos estándares de durabilidad y funcionalidad.</li>
        <li><strong>Satisfacción del cliente:</strong> Nos dedicamos a brindar un servicio al cliente excepcional, desde el asesoramiento en la elección del producto hasta el soporte postventa.</li>
        <li><strong>Fomentar la sostenibilidad:</strong> Creemos en prácticas de riego que ayudan a conservar los recursos hídricos y promuevan la sostenibilidad ambiental.</li>
      </ul>

      <h2>Nuetros Productos</h2>
      <p>Ofrecemos una variedad de mangueras de riego diseñadas para satisfacer las necesidades de:</p>
      <ul>
        <li><strong>Jardineros:</strong> Mangueras flexibles y fáciles de manejar, perfectas para el cuidado de jardines y pequeñas áreas verdes.</li>
        <li><strong>Uso doméstico:</strong> Soluciones de riego prácticas y eficientes para el hogar, ideales para patios, jardines y huertos familiares.</li>
        <li><strong>Uso agrícola:</strong> Mangueras robustas y de alto rendimiento, diseñadas para soportar las exigencias de grandes campos y cultivos.</li>
      </ul>

      <h2>Por Qué Elegirnos</h2>
      <ul>
        <li><strong>Calidad Garantizada:</strong> Cada uno de nuestros productos pasa por estrictos controles de calidad.</li>
        <li><strong>Variedad y Disponibilidad:</strong> Tenemos una amplia selección de mangueras para todas las necesidades de riego.</li>
        <li><strong>Atención Personalizada:</strong> Nuestro equipo está siempre listo para ayudarte y ofrecerte la mejor asesoría.</li>
        <li><strong>Envíos Rápidos:</strong> Nos aseguramos de que tus pedidos lleguen a tiempo y en perfectas condiciones.</li>
      </ul>

      <h2>Contáctanos</h2>
      <p>
        Estamos aquí para ayudarte con cualquier pregunta o inquietud que puedas tener. No dudes en ponerte en contacto con nosotros a través de nuestro formulario de contacto, correo electrónico o redes sociales.
      </p>
      <p>
        Gracias por elegir <strong>The Hose Factory</strong>. Juntos, cultivemos un futuro más verde y saludable.
      </p>
    </section>
  );
};

export default About;

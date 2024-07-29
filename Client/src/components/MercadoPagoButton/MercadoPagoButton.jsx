import React from 'react';
import { Wallet } from '@mercadopago/sdk-react';

const MercadoPagoButton = ({ preferenceId }) => {
  return (
    <div>
      <Wallet
        initialization={{ preferenceId }}
        customization={{ texts: { valueProp: 'Pagar con Mercado Pago' } }}
      />
    </div>
  );
};

export default MercadoPagoButton;

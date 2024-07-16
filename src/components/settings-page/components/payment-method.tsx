import React from 'react';
import styles from './payment-method.module.scss';

const PaymentMethod = ({ method, isSelected, onSelect }:any) => {
  return (
    <div
      className={styles.paymentMethod}
      style={{ border: isSelected ? '1px solid rgb(255, 59, 92)' : '' }}
      onClick={() => onSelect(method.name)}
    >
      <span className={styles.radio}>{isSelected && <span></span>}</span>
      <div className={styles.paymentMethodLogo}>
        <img src={method.icon} alt="" style={{ width: '20px', height: '20px' }} />
      </div>
      <div className={styles.paymentMethodName}>{method.name}</div>
    </div>
  );
};

export default PaymentMethod;

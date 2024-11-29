import React from 'react';
import styles from './payment-method.module.scss';

const PaymentMethod = ({ darkTheme, method, isSelected, onSelect }:any) => {
  return (
    <div
      className={`${styles.paymentMethod} ${method.isAvailable?'':'opacity-30'}`}
      style={{ border: isSelected ? '1px solid rgb(255, 59, 92)' : '' }}
      onClick={() => method.isAvailable&&onSelect(method.name)}
    >
      <span className={styles.radio}>{isSelected && <span></span>}</span>
      <div className={styles.paymentMethodLogo}>
        <img src={method.icon} alt="" style={{ width: '20px', height: '20px' }} />
      </div>
      <div className={`${styles.paymentMethodName} ${darkTheme&&'text-white'}`}>{method.name}</div>
    </div>
  );
};

export default PaymentMethod;

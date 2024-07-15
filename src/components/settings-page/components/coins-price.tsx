import React from 'react'
import styles from './coins-price.module.scss';

import coin from '../svg-components/coin.svg';
const CoinsPrice = ({index, coinsAmount, coinsPrice, onAmountSelection, selected }:any) => {
  
  const textColor = selected ? 'white' : '';
  return (
    <div className={styles.price} style={{ backgroundColor: selected ? "rgb(255, 59, 92)" : ""}} onClick={() => onAmountSelection(index)}>
      <div className={styles.coinsAmount} style={{color: textColor}}>
        <img src={coin} alt='' style={{ width: '16px', height: '16px', marginRight: '5px',  }} />
        {coinsAmount}
      </div>
      <div className={styles.coinsPrice} style={{color: textColor}}>QAR {coinsPrice}</div>
    </div>
  );
};

export default CoinsPrice
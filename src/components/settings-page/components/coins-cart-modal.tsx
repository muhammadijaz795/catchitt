import React, { useEffect } from 'react'
import styles from './coins-cart-modal.module.scss';
import { Modal, ThemeProvider, createTheme } from "@mui/material";
import { Box, IconButton } from '@mui/material';
import closeIcon from '../../../assets/closeIcon.png';
import coin from '../svg-components/coin.svg';
const CoinsCartModal = ({ coinData:{coinsAmount, coinsPrice}, darkTheme = '', palette = createTheme({palette: {mode: 'light'}}), openCartModal, onCloseCartModal, next }: any) => {

    return (
        <ThemeProvider theme={palette}>
            <Modal
                open={openCartModal}
                onClose={onCloseCartModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={CustomCartModalStyle}>
                    <div className={styles.rechargeModalHeader}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '60%',
                            }}
                        >
                            <p className={darkTheme ? 'text-white' : ''}>{coinsAmount} Cesium</p>
                            <div style={{ width: '40px !important' }}>

                                <IconButton onClick={onCloseCartModal}>
                                    <img src={closeIcon} alt='' style={{ width: '20px', height: '20px' }} />
                                </IconButton>
                            </div>
                        </div>
                    </div>

                    <div
                        className="modal-content-container"
                        style={{
                            width: '100%',
                            flex: '1',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            padding: '10px'
                        }}
                    >
                        <div className={styles.cartItemsContainer}>
                            <div className={styles.cartItem}>
                                <div className={styles.itemDetails}>
                                    <img src={coin} alt='' style={{ width: '40px', height: '40px', marginRight: '5px' }} />
                                    <p className={darkTheme ? 'text-white' : ''}>{coinsAmount} Cesium</p>
                                </div>
                                <div className={styles.itemPrice}>
                                    <p className={darkTheme ? 'text-white' : ''}>${coinsPrice}</p>
                                </div>
                            </div>

                            <div className={styles.cartItem}>
                                <div className={styles.itemDetails}>
                                    <img src={coin} alt='' style={{ width: '40px', height: '40px', marginRight: '5px' }} />
                                    <p className={darkTheme? 'text-white':''}>200 Cesium</p>
                                </div>
                                <div className={styles.itemPrice}>
                                    <p className={darkTheme? 'text-white':''}>Free</p>
                                </div>
                            </div>


                        </div>

                        <hr />


                        <div className={styles.cartSubItemsContainer}>
                            <div className={styles.cartItem}>
                                <div className={styles.itemDetails}>

                                    <p className={darkTheme? 'text-white':''}>Subtotal</p>
                                </div>
                                <div className={styles.itemPrice}>
                                    <p className={darkTheme? 'text-white':''}>${coinsPrice
                                }</p>
                                </div>
                            </div>

                            <div className={styles.cartItem}>
                                <div className={styles.itemDetails}>

                                    <p className={darkTheme? 'text-white':''}>Tax</p>
                                </div>
                                <div className={styles.itemPrice}>
                                    <p className={darkTheme? 'text-white':''}>$0</p>
                                </div>
                            </div>


                        </div>



                        <div className={styles.cartTotalContainer}>
                            <div className={styles.cartItem}>
                                <div className={styles.itemDetails}>

                                    <p className={darkTheme? 'text-white':''}>Subtotal</p>
                                </div>
                                <div className={styles.itemPrice}>
                                    <p className={darkTheme? 'text-white':''}>${coinsPrice}</p>
                                </div>
                            </div>



                        </div>



                    </div>

                    {/* footer */}
                    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                        <button onClick={next} className={styles.btnFullWidth}>
                            <p className={darkTheme? 'text-white':''}>Proceed To Payment Method</p>
                        </button>
                    </div>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default CoinsCartModal

const CustomCartModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    minWidth: 430,
    minHeight: 509,
    // maxWidth: '600px',
    // maxHeight: '549px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}

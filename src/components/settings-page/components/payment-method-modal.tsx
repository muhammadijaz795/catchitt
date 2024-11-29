import React from 'react'
import styles from './payment-method-modal.module.scss';
import { Box, IconButton, Modal, ThemeProvider } from '@mui/material';

import paypal from '../../../assets/paypal.svg';
import squarePay from '../../../assets/square-pay.svg';
import cc from '../../../assets/cc.png';
import stripe from '../../../assets/stripe.svg';
import PaymentMethod from './payment-method';

const PaymentMethodModal = ({ darkTheme, palette, openPaymentModal, onClosePaymentModal, next, coinData:{coinsPrice} }: any) => {



    const [selectedMethod, setSelectedMethod] = React.useState('PayPal');
    const handleSelectPaymentMethod = (method: string) => {
        setSelectedMethod(method);
        // onSelectPaymentMethod(method);
    };

    const paymentMethodSelected = () => {

        next(selectedMethod);

    }

    const paymentMethods = [
        { name: 'PayPal', icon: paypal, isAvailable: true },
        { name: 'Square', icon: squarePay, isAvailable:false },
        { name: 'Credit Card', icon: cc, isAvailable:false },
        { name: 'Stripe', icon: stripe, isAvailable:false },
        // Add more payment methods as needed
    ];




    return (
        <ThemeProvider theme={palette}>
        <Modal
            open={openPaymentModal}
            onClose={onClosePaymentModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={CustomPaymentModalStyle}>


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

                    <div className={styles.paymentInstructions}>
                        <p className={`${styles.title} ${darkTheme&&'text-white'}`}>Payment Method</p>
                        <p style={{ color: 'rgb(255, 59, 92)' }}>Choose your payment method</p>
                        <p className={darkTheme&&'text-white'} style={{ width: '70%', textAlign: 'center' }}>You will not be charged until you confirm this order
                            on the next page.</p>
                    </div>

                    <div className={styles.paymentMethods}>
                        {paymentMethods.map((method) => {
                            return (
                                <PaymentMethod
                                    darkTheme={darkTheme}
                                    key={method.name}
                                    method={method}
                                    isSelected={selectedMethod === method.name}
                                    onSelect={(method: string) => handleSelectPaymentMethod(method)}
                                />
                            );
                        })}
                    </div>
                </div>
                {/* footer */}
                <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                    <button onClick={paymentMethodSelected} className={styles.btnFullWidth}>
                        <p>Pay QAR {coinsPrice}</p>
                    </button>
                </div>
            </Box>
        </Modal>
        </ThemeProvider>
    )   
}

export default PaymentMethodModal



const CustomPaymentModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    minWidth: 526,
    minHeight: 429,
    // maxWidth: '600px',
    // maxHeight: '549px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}

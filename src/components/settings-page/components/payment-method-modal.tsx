import React from 'react'
import styles from './payment-method-modal.module.scss';
import { Box, IconButton, Modal } from '@mui/material';
 
import paypal from '../../../assets/paypal.svg';
import squarePay from '../../../assets/square-pay.svg';
import cc from '../../../assets/cc.png';
import stripe from '../../../assets/stripe.svg';
import PaymentMethod from './payment-method';

const PaymentMethodModal = ({ openPaymentModal, onClosePaymentModal, next }: any) => {

   

    const [selectedMethod, setSelectedMethod] = React.useState('paypal');
    const handleSelectPaymentMethod = (method: string) => {
        setSelectedMethod(method);
        // onSelectPaymentMethod(method);
    };

    const paymentMethodSelected =() => {
        
            next(selectedMethod);
        
    }

    const paymentMethods = [
        { name: 'PayPal', icon: paypal },
        { name: 'Square', icon: squarePay },
        { name: 'Credit Card', icon: cc },
        { name: 'Stripe', icon: stripe },
        // Add more payment methods as needed
    ];

 
   
  
  return (
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
                            flex:'1',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent:'space-around',
                            padding: '10px'
                            
                           
                        }}
                    >

                        <div className={styles.paymentInstructions}>
                            <p className={styles.title}>Payment Method</p>
                            <p style={{color:'rgb(255, 59, 92)'}}>Choose your payment method</p>
                            <p style={{width:'70%', textAlign:'center'}}>You will not be charged until you confirm this order
                                on the next page.</p>
                        </div>


                        <div className={styles.paymentMethods}>
                            {paymentMethods.map((method) => {
                                return (
                                    <PaymentMethod
                                        key={method.name}
                                        method={method}
                                        isSelected={selectedMethod === method.name}
                                        onSelect={(method:string) => handleSelectPaymentMethod(method)}
                                    />
                                );
                            })}
                           
                             
                        </div>
                    </div>
                    {/* footer */}
                    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                        <button onClick={paymentMethodSelected} className={styles.btnFullWidth}>
                            <p>Pay QAR 19.50</p>
                        </button>
                    </div>
                </Box>
            </Modal>
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

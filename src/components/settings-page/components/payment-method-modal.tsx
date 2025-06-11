import React, { useState } from 'react'
import styles from './payment-method-modal.module.scss';
import { Box, Card, Checkbox, CircularProgress, Grid, IconButton, InputAdornment, Modal, TextField, ThemeProvider, createTheme, Avatar } from '@mui/material';

import paypal from '../../../assets/paypal.svg';
import squarePay from '../../../assets/square-pay.svg';
import cc from '../../../assets/cc.png';
import stripe from '../../../assets/stripe.svg';
import PaymentMethod from './payment-method';
import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SecurityIcon from '@mui/icons-material/Security'
import { useSelector } from 'react-redux';

const PaymentMethodModal = ({ darkTheme = '', palette = createTheme({palette: {mode: 'light'}}), openPaymentModal, onClosePaymentModal, next, coinData: {coinsAmount, coinsPrice, coinsUnit} }: any) => {
    const userProfile = useSelector((state: any) => state?.reducers?.profile);
    const [selectedMethod, setSelectedMethod] = React.useState('PayPal');
    const [isProceedToBuy, setIsProceedToBuy] = React.useState(false);
      const [showCardFields, setShowCardFields] = useState(false);

    const handleSelectPaymentMethod = (method: string) => {
        setSelectedMethod(method);
        // onSelectPaymentMethod(method);
    };
    const paymentMethodSelected = () => {
        setIsProceedToBuy(true);
        next(selectedMethod);
    }
    const paymentMethods = [
        { name: 'PayPal', icon: paypal, isAvailable: true },
        // { name: 'Square', icon: squarePay, isAvailable:false },
        // { name: 'Credit Card', icon: cc, isAvailable:false },
        // { name: 'Stripe', icon: stripe, isAvailable:false },
        // Add more payment methods as needed
    ];

    React.useEffect(() => {
        return () => {
            setIsProceedToBuy(false);
        }
    }, []);
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
                        padding: '10px',
                    }}>
                        <div className="flex justify-between items-start  border-b pb-3 ">
                            <div className="text-lg ">
                            Order summary
                            <p className="text-xs text-[#008568] flex gap-1">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.06498 4.65681L7.63998 4.38931C7.58258 4.35403 7.51355 4.34291 7.44797 4.35837C7.38239 4.37382 7.32559 4.41461 7.28998 4.47181L5.62748 7.13681L4.72748 6.11181C4.70612 6.08649 4.67993 6.06567 4.65045 6.05056C4.62096 6.03545 4.58877 6.02635 4.55574 6.02379C4.52271 6.02124 4.4895 6.02527 4.45804 6.03566C4.42658 6.04605 4.3975 6.06258 4.37248 6.08431L3.99248 6.41681C3.94229 6.4607 3.9115 6.52265 3.90681 6.58916C3.90213 6.65566 3.92394 6.72132 3.96748 6.77181L5.31248 8.30931C5.36383 8.36943 5.4287 8.41653 5.50177 8.44672C5.57484 8.47691 5.65402 8.48935 5.73283 8.48301C5.81164 8.47666 5.88782 8.45172 5.95512 8.41023C6.02242 8.36873 6.07892 8.31187 6.11998 8.24431L8.14499 5.00431C8.21749 4.88431 8.18248 4.72931 8.06498 4.65431V4.65681Z" fill="#008568"/>
                                <path d="M1.25 3.13591V6.30341C1.25 9.84341 4.94 11.7659 5.815 12.1709C5.935 12.2259 6.065 12.2259 6.185 12.1709C7.06 11.7659 10.75 9.84591 10.75 6.30341V3.13591C10.75 2.83591 10.485 2.58841 10.185 2.56341C9.42 2.49841 7.965 2.18091 6.3475 0.813407C6.24997 0.732056 6.127 0.6875 6 0.6875C5.873 0.6875 5.75003 0.732056 5.6525 0.813407C4.035 2.18091 2.5775 2.49841 1.815 2.56341C1.515 2.58841 1.25 2.83341 1.25 3.13591ZM2.25 6.30341V3.52091C3.1625 3.38591 4.525 2.97841 6 1.81841C7.475 2.97841 8.8375 3.38591 9.75 3.51841V6.30341C9.75 7.69841 9.03 8.81841 8.11 9.68591C7.47794 10.269 6.76779 10.7612 6 11.1484C5.2331 10.761 4.52381 10.2687 3.8925 9.68591C2.9725 8.81841 2.25 7.69841 2.25 6.30341Z" fill="#008568"/>
                                </svg>
                                Your info is private and secure.</p>
                            </div>
                            <IconButton onClick={onClosePaymentModal}>
                                <CloseIcon className="w-8 h-8 text-black" />
                            </IconButton>
                        </div>

                        <div className="flex justify-between items-center border-b py-3">
                            <h2 className="text-sm font-semibold text-black">Account</h2>
                            <div className="flex justify-between items-center mt-1">
                            <Avatar src={userProfile?.avatar} alt={userProfile?.username} sx={{ width: 20, height: 20 }}/>
                            <span className="text-sm font-medium">{userProfile?.username}</span>
                            </div>
                        </div>

                        <div className="mb-4 border-b py-3">
                            <div className="flex justify-between mt-1">
                            <span className="text-sm font-semibold ">Total</span>
                            <span className="text-sm font-medium">{coinsUnit}{coinsPrice}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                            <span className="text-sm">{coinsAmount} Coins</span>
                            <span className="text-sm font-medium">{coinsUnit}{coinsPrice}</span>
                            </div>
                        </div>

                    <div className={styles.paymentInstructions}>
                        <p className={`${styles.title} ${darkTheme&&'text-white'}`}>Payment Method</p>
                        {/* <p style={{ color: 'rgb(255, 59, 92)' }}>Choose your payment method</p>
                        <p className={darkTheme&&'text-white'} style={{ width: '70%', textAlign: 'center' }}>You will not be charged until you confirm this order
                            on the next page.</p> */}
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
                    {/* card debit */}

                    <Card className="p-4 border border-gray-300 cursor-pointer mt-2 d-none" onClick={() => setShowCardFields(true)}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className={`w-3 h-3 rounded-full ${showCardFields ? "bg-red-600" : "border border-gray-400"}`} />
                            <span className="text-sm font-semibold">Add Credit Or Debit Card</span>
                            <div className="ml-auto flex gap-1">
                            <svg style={{transform: 'scale(1.3)', marginLeft: '5px', marginRight: '5px'}} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 -86.5 256 256" version="1.1" preserveAspectRatio="xMidYMid">
                                <defs>
                                    <linearGradient x1="45.9741966%" y1="-2.00617467%" x2="54.8768726%" y2="100%" id="linearGradient-1">
                                        <stop stop-color="#222357" offset="0%"></stop>
                                        <stop stop-color="#254AA5" offset="100%"></stop>
                                    </linearGradient>
                                </defs>
                                <g><path d="M132.397094,56.2397455 C132.251036,44.7242808 142.65954,38.2977599 150.500511,34.4772086 C158.556724,30.5567233 161.262627,28.0430004 161.231878,24.5376253 C161.17038,19.1719416 154.805357,16.804276 148.847757,16.7120293 C138.454628,16.5505975 132.412467,19.5178668 127.607952,21.7625368 L123.864273,4.24334875 C128.684163,2.02174043 137.609033,0.084559486 146.864453,-7.10542736e-15 C168.588553,-7.10542736e-15 182.802234,10.7236802 182.879107,27.3511501 C182.963666,48.4525854 153.69071,49.6210438 153.890577,59.05327 C153.959762,61.912918 156.688728,64.964747 162.669389,65.7411565 C165.628971,66.133205 173.800493,66.433007 183.0636,62.1665965 L186.699658,79.11693 C181.718335,80.931115 175.314876,82.6684285 167.343223,82.6684285 C146.895202,82.6684285 132.512402,71.798691 132.397094,56.2397455 M221.6381,81.2078555 C217.671491,81.2078555 214.327548,78.8940005 212.836226,75.342502 L181.802894,1.24533061 L203.511621,1.24533061 L207.831842,13.1835926 L234.360459,13.1835926 L236.866494,1.24533061 L256,1.24533061 L239.303345,81.2078555 L221.6381,81.2078555 M224.674554,59.6067505 L230.939643,29.5804456 L213.781755,29.5804456 L224.674554,59.6067505 M106.076031,81.2078555 L88.9642665,1.24533061 L109.650591,1.24533061 L126.754669,81.2078555 L106.076031,81.2078555 M75.473185,81.2078555 L53.941265,26.7822953 L45.2316377,73.059396 C44.2092367,78.2252115 40.1734431,81.2078555 35.6917903,81.2078555 L0.491982464,81.2078555 L0,78.886313 C7.22599245,77.318119 15.4359498,74.7890215 20.409585,72.083118 C23.4537265,70.4303645 24.322383,68.985166 25.3217224,65.0569935 L41.8185094,1.24533061 L63.68098,1.24533061 L97.1972855,81.2078555 L75.473185,81.2078555" fill="url(#linearGradient-1)" transform="translate(128.000000, 41.334214) scale(1, -1) translate(-128.000000, -41.334214) "></path>
                                </g>
                            </svg>
                            <svg style={{transform: 'scale(1.3)'}} xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 -11 70 70" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.3945 34.7619C33.0114 36.8184 29.92 38.0599 26.5421 38.0599C19.0047 38.0599 12.8945 31.8788 12.8945 24.254C12.8945 16.6291 19.0047 10.448 26.5421 10.448C29.92 10.448 33.0114 11.6895 35.3945 13.7461C37.7777 11.6895 40.869 10.448 44.247 10.448C51.7843 10.448 57.8945 16.6291 57.8945 24.254C57.8945 31.8788 51.7843 38.0599 44.247 38.0599C40.869 38.0599 37.7777 36.8184 35.3945 34.7619Z" fill="#ED0006"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.3945 34.7619C38.3289 32.2296 40.1896 28.4616 40.1896 24.254C40.1896 20.0463 38.3289 16.2783 35.3945 13.7461C37.7777 11.6895 40.869 10.448 44.247 10.448C51.7843 10.448 57.8945 16.6291 57.8945 24.254C57.8945 31.8788 51.7843 38.0599 44.247 38.0599C40.869 38.0599 37.7777 36.8184 35.3945 34.7619Z" fill="#F9A000"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.3946 13.7461C38.329 16.2784 40.1897 20.0463 40.1897 24.254C40.1897 28.4616 38.329 32.2295 35.3946 34.7618C32.4603 32.2295 30.5996 28.4616 30.5996 24.254C30.5996 20.0463 32.4603 16.2784 35.3946 13.7461Z" fill="#FF5E00"/>
                            </svg>
                            </div>
                        </div>

                        {showCardFields && (
                            <>
                            <Box sx={{ p: 1, maxWidth: 600 }}>
                                <Grid container spacing={2}>
                                {/* Card Number */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    label="Card number"
                                    placeholder="1234 3213 2313 3213"
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <CreditCardIcon sx={{ color: 'gray' }} />
                                        </InputAdornment>
                                        ),
                                        sx: {
                                        backgroundColor: '#f3f4f6', // light gray
                                        height: '41px',
                                        },
                                    }}
                                    />
                                </Grid>

                                {/* Cardholder Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    label="Cardholder name"
                                    placeholder="Cardholder name"
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        sx: {
                                        backgroundColor: '#f3f4f6',
                                        height: '41px',
                                        },
                                    }}
                                    />
                                </Grid>

                                {/* Expiration Date */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    label="Expiration date"
                                    placeholder="MM/YY"
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        sx: {
                                        backgroundColor: '#f3f4f6',
                                        height: '41px',
                                        },
                                    }}
                                    />
                                </Grid>

                                {/* Security Code */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    label="Security code"
                                    placeholder="CVV/CVC"
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <SecurityIcon sx={{ color: 'gray' }} />
                                        </InputAdornment>
                                        ),
                                        sx: {
                                        backgroundColor: '#f3f4f6',
                                        height: '41px',
                                        },
                                    }}
                                    />
                                </Grid>
                                </Grid>
                            </Box>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Checkbox id="linkCard" />
                                <label htmlFor="linkCard">
                                Link this payment method for faster checkout. If you don’t wish to link, uncheck the box now or unlink it later on the payment methods page.
                                </label>
                            </div>
                            </>
                        )}
                        </Card>

                    {/* end debit */}


                    <p className="text-[10px] text-gray-600 mt-4">
                            By tapping <strong>Pay now</strong>, you agree to the <strong>Terms of Purchase for Coins</strong>. By using any amount of Coins within 14 days after tapping <strong>Pay now</strong>, you acknowledge and confirm that you will no longer be eligible for a refund of this order.
                        </p>
                        <p className="text-[10px] text-gray-600 mt-1">
                            By continuing this purchase, you confirm that you live in <strong>Pakistan</strong>.
                        </p>
                </div>
                {/* footer */}
                <div style={{ display: 'flex', gap: '16px', flexDirection: 'column',  borderTop: '1px solid rgb(229, 231, 235)', width: '100%',  alignItems: 'center', paddingTop: '10px' }}>
                    <button onClick={paymentMethodSelected} className={`${styles.btnFullWidth} } w-28 ml-auto`}>
                      {isProceedToBuy?<CircularProgress style={{width:'1.5rem',height:'1.5rem',color:'white',margin:'0 0.5rem'}} />:<p>Pay now</p>}
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

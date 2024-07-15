import React, { useState } from 'react'
import styles from './unfollow-popup-module.scss';
import {Box, Modal,Button } from '@mui/material';
import { defaultAvatar } from '../../../icons';

const API_KEY = process.env.VITE_API_URL;
const UnfollowPopup = ({ openUnfollowPopup, onUnfollow, onCancel, user }: any) => {
    console.log("UnfollowPopup")
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("Unfollow");


    const handleFollowClick = async ( ) => {
       
        
     setLoading(true);

    
        const accountId = user?.followed_userID?._id;
        const token = localStorage.getItem('token');
      
        if(token){
 
              
            try {
                 
                console.log("userID to unfollow")
                console.log(user)
                const response = await fetch(`${API_KEY}/profile/follow/${accountId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // Handle success as needed
                    console.log(`user: ${accountId} is followed`);
                    // Update the followedAccounts state
                    text == "Unfollow" ? setText("Follow") : setText("Unfollow")
                    setLoading(false);
                
                }else{
                    setLoading(false);
                }
            } catch (error) {
                // Handle error as needed
                setLoading(false);
                console.log(error)
            }
            
        }
    };
    return (
       <Modal
            open={openUnfollowPopup}
                
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={CustomSuccessPaymentModalStyle}>
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent: 'space-between',
                    alignItems:'center',
                    height: '342px', 
                    padding:'10px'

                }}>
                    <img 
                        style={{
                            height:'100px',
                            width:'100px',
                            borderRadius: '50%',
                        }}
                        srcSet={user?.followed_userID?.avatar || defaultAvatar} alt="" />
                <p style={{
                    textAlign:'center'
                }}>If you changed your mind you will have to request to follow {user?.followed_userID?.name} aggain.</p>
               
                 <Button
                        variant="contained"
                        sx={filledButton}
                        onClick={handleFollowClick}
                    // disabled={notAcceptable}
                    >
                        {loading ? "..." : text}
                    </Button>
                <Button
                        variant="contained"
                        sx={secondaryBtn}
                        onClick={onCancel}
                    // disabled={notAcceptable}
                    >
                        Close
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

 

const CustomSuccessPaymentModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    width: 359,
    minHeight: 342,
    // maxWidth: '600px',
    // maxHeight: '549px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}

var filledButton = {
    fontFamily: 'Poppins !important',
    display: 'flex !important',
    width: '100% !important',
    height: '48px !important',
    padding: '0 16px !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    borderRadius: '6px !important',
    background: 'var(--foundation-primary-primary-500, rgb(255, 59, 92)) !important',
    textTransform: 'none !important'
};

var secondaryBtn = {
    ...filledButton, 
    color: 'var(--foundation-primary-primary-500, rgb(255, 59, 92)) !important',
    background: 'white',
    border: '1px solid var(--foundation-primary-primary-500, rgb(255, 59, 92))'

}
export default UnfollowPopup

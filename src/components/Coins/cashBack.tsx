import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InvitationCodeModal from './inviteModel';

const CashbackCard = () => {
  const [openInviteModel, setOpenInviteModel] = useState(false);
  const handleOpenInvitationCodeModal = () => setOpenInviteModel(true);
  const handleCloseInviteModel = () => setOpenInviteModel(false);

  return (
    <>
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mx: 'auto',
        mb: 4
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#FF4D67',
          mr: 2,
          fontSize: 30
        }}
      >
        5%
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
          <svg width="15" style={{marginRight: '5px'}} height="18" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5542 0.5C9.88028 0.5 11.1521 1.02678 12.0897 1.96447C13.0274 2.90215 13.5542 4.17392 13.5542 5.5V8.5C14.3498 8.5 15.1129 8.81607 15.6755 9.37868C16.2381 9.94129 16.5542 10.7044 16.5542 11.5V17.5C16.5542 18.2956 16.2381 19.0587 15.6755 19.6213C15.1129 20.1839 14.3498 20.5 13.5542 20.5H3.5542C2.75855 20.5 1.99549 20.1839 1.43288 19.6213C0.87027 19.0587 0.554199 18.2956 0.554199 17.5V11.5C0.554199 10.7044 0.87027 9.94129 1.43288 9.37868C1.99549 8.81607 2.75855 8.5 3.5542 8.5V5.5C3.5542 4.17392 4.08098 2.90215 5.01867 1.96447C5.95635 1.02678 7.22812 0.5 8.5542 0.5ZM8.5542 12.5C8.04962 12.4998 7.56363 12.6904 7.19365 13.0335C6.82367 13.3766 6.59704 13.8468 6.5592 14.35L6.5542 14.5C6.5542 14.8956 6.6715 15.2822 6.89126 15.6111C7.11102 15.94 7.42338 16.1964 7.78883 16.3478C8.15428 16.4991 8.55642 16.5387 8.94438 16.4616C9.33234 16.3844 9.68871 16.1939 9.96841 15.9142C10.2481 15.6345 10.4386 15.2781 10.5158 14.8902C10.5929 14.5022 10.5533 14.1001 10.402 13.7346C10.2506 13.3692 9.99424 13.0568 9.66534 12.8371C9.33644 12.6173 8.94976 12.5 8.5542 12.5ZM8.5542 2.5C7.75855 2.5 6.99549 2.81607 6.43288 3.37868C5.87027 3.94129 5.5542 4.70435 5.5542 5.5V8.5H11.5542V5.5C11.5542 4.70435 11.2381 3.94129 10.6755 3.37868C10.1129 2.81607 9.34985 2.5 8.5542 2.5Z" fill="black"/>
          </svg>

          Recharge to unlock 5% cash back up to USD250 on your next Coin purchase
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', mt: 0.5 }}>
          Code auto-filled,&nbsp;
          <Link onClick={handleOpenInvitationCodeModal} underline="none" sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
            Change code <EditOutlinedIcon sx={{ fontSize: 16, ml: 0.5 }} />
          </Link>
        </Typography>
      </Box>
    </Card>
    <InvitationCodeModal open={openInviteModel} onClose={handleCloseInviteModel} />
    </>
  );
};

export default CashbackCard;

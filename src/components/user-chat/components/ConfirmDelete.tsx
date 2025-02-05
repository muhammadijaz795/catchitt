import * as React from 'react';
import { useEffect, useState } from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ConfirmDelete({ isDarkTheme, msg, handleClose, deleteHandler }: any) {
  const API_KEY = process.env.VITE_API_URL;
  const [PrivacyValue, setPrivacyValue] = useState('Friends');
  const token = localStorage.getItem('token');
  const loggedUserId = localStorage.getItem('userId');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log((event.target as HTMLInputElement).value)
    setPrivacyValue((event.target as HTMLInputElement).value);
  };

  const lightThemePalette = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const darkThemePalette = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    // <React.Fragment>
    <ThemeProvider theme={isDarkTheme ? darkThemePalette : lightThemePalette}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={Boolean(msg)}
        PaperProps={{
          style: {
            width: '600px',
            maxWidth: '90%',
            borderRadius: '10px'
          },
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography style={{ color: '#000 !important', fontSize: '24px', }} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Delete Message?
          </Typography>
          <CloseIcon
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              color: theme.palette.grey[500],
            })}
            style={{
              cursor: 'pointer',
              margin: '20px'
            }}
          />
        </div>
        <DialogContent dividers style={{ padding: '24px' }}>
          <Typography gutterBottom style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Deleting a message for yourself allows you to delete your copy of messages you've sent or received This has no effect on your recipients' chats          </Typography>
        </DialogContent>
        <DialogActions style={{ maxWidth: 'fit-content', marginLeft: 'auto', padding: '10px', gap:'15px' }}>
          {msg?.receiverId !== loggedUserId &&<button className='py-2' style={{ color: '#fff', backgroundColor: 'rgb(255, 59, 92)', minWidth: '100px' }} autoFocus>Delete for everyone</button>}
          <button onClick={()=>deleteHandler(msg)} className='py-2' style={{ color: '#fff', backgroundColor: 'rgb(255, 59, 92)', minWidth: '100px' }} autoFocus>Delete for me</button>
          <button className='py-2' style={{ color: isDarkTheme?'#fff':'rgb(22, 24, 35)', backgroundColor: isDarkTheme?'#282828':'', borderColor: 'rgba(22, 24, 35, 0.12)', minWidth: '100px', }} onClick={handleClose}>Cancel</button>
        </DialogActions>
      </BootstrapDialog>
    </ThemeProvider>
    // </React.Fragment>
  );
}
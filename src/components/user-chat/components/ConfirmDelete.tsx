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

export default function ConfirmDelete({ isDarkTheme }: any) {
  const [open, setOpen] = useState(false);
  const API_KEY = process.env.VITE_API_URL;
  const [PrivacyValue, setPrivacyValue] = useState('Friends');
  const token = localStorage.getItem('token');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log((event.target as HTMLInputElement).value)
    setPrivacyValue((event.target as HTMLInputElement).value);
  };


  useEffect(() => {
    getChatPrivacySettings();
  }, []);

  const getChatPrivacySettings = async () => {
    try {
      const response = await fetch(`${API_KEY}/profile/privacy-settings`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const res = await response.json();
      setPrivacyValue(res.data.allowMessagesFrom);
    } catch (error) {
      console.log('error blocking user', error);
    }
  };

  const handleUserChatSetting = async () => {
    try {
      const response = await fetch(`${API_KEY}/profile/privacy-settings`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ allowMessagesFrom: PrivacyValue }),
      });
      const res = await response.json();
    } catch (error) {
      console.log('error blocking user', error);
    }
    setOpen(false);
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
      <SettingsIcon style={{ cursor: 'pointer' }} onClick={handleClickOpen} />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            width: '700px',
            maxWidth: '90%',
            borderRadius: '10px'
          },
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography style={{ color: '#000 !important', fontSize: '24px', }} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Message settings
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
            Who can send you direct messages
          </Typography>
          <Typography gutterBottom style={{ fontSize: '12px' }}>
            With any option, you can receive messages from users that you’ve sent messages to. Friends are your followers that you follow back.
          </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons"
              value={PrivacyValue}
              onChange={handleChange}
              style={{ marginTop: '15px', }}
            >
              <FormControlLabel
                value="Friends"
                control={<Radio style={{ color: (PrivacyValue == 'Friends' || PrivacyValue == 'Everyone') ? 'rgb(255, 59, 92)' : '' }} />}
                label="Friends"
              />
              <FormControlLabel
                value="No one"
                control={<Radio style={{ color: PrivacyValue === 'No one' ? 'rgb(255, 59, 92)' : '' }} />}
                label={<div style={{ width: 'max-content' }}>No one</div>}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions style={{ maxWidth: 'fit-content', marginLeft: 'auto', padding: '24px' }}>
          <button style={{ color: isDarkTheme?'#fff':'rgb(22, 24, 35)', backgroundColor: isDarkTheme?'#282828':'', borderColor: 'rgba(22, 24, 35, 0.12)', minWidth: '165px', }} onClick={handleClose}>Cancel</button>
          <button style={{ color: '#fff', backgroundColor: 'rgb(255, 59, 92)', minWidth: '165px' }} onClick={handleUserChatSetting} autoFocus>Save</button>
        </DialogActions>
      </BootstrapDialog>
    </ThemeProvider>
    // </React.Fragment>
  );
}
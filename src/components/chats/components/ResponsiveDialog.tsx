import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import ResponsiveSelect from './ResponsiveSelect'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <SettingsIcon style={{cursor:'pointer'}} onClick={handleClickOpen} />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            width: '700px',
            maxWidth: '90%',
            borderRadius:'10px'
          },
        }}
      >
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <Typography style={{color:'#000 !important',fontSize:'24px',}} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Message settings
            </Typography>
            <CloseIcon  
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    color: theme.palette.grey[500],
                 })} 
                style={{
                    cursor:'pointer',
                    margin:'20px'
                }}
            />
        </div>
        <DialogContent dividers style={{padding:'24px'}}>
          <Typography gutterBottom style={{fontSize:'16px',fontWeight:'bold'}}>
                Who can send you direct messages
          </Typography>
          <Typography gutterBottom style={{fontSize:'12px'}}>
                With any option, you can receive messages from users that you’ve sent messages to. Friends are your followers that you follow back.
          </Typography>
          <ResponsiveSelect/>
        </DialogContent>
        <DialogActions style={{ maxWidth: 'fit-content', marginLeft: 'auto',padding:'24px'}}>
          <button style={{color: 'rgb(22, 24, 35)', borderColor: 'rgba(22, 24, 35, 0.12)', minWidth: '165px',}} onClick={handleClose}>Cancel</button>
          <button style={{color:'#fff',backgroundColor:'rgb(255, 59, 92)',minWidth: '165px'}} onClick={handleClose} autoFocus>Save</button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
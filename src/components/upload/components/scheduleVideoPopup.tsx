import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@mui/material';

interface ScheduleVideoPopupProps {
  open: boolean;
  onClose: () => void;
  onAllow: () => void;
}

const scheduleeVideoPopup = ({ open, onClose, onAllow }: ScheduleVideoPopupProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 1,
          maxWidth: 500,
          width: '90%',
        },
      }}
    >
      <DialogContent sx={{ px: 2, pb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Allow your video to be saved for scheduled posting?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          When you schedule a video, the video is saved on our servers before it is posted.
          All videos posted to Seezitt must follow Seezitt Community Guidelines.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'flex-end', gap: 1, px: 2, pb: 2 }}>
        <Button variant="contained" sx={{
            backgroundColor: '#F2F2F2',
            textTransform: 'capitalize',
            '&:hover': { backgroundColor: '#f3f3f3',  boxShadow: 'none',
            },
            color: '#000',
            boxShadow: 'none',
            px: 1.5,
            py: 0.5
          }} onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onAllow}
          sx={{
            textTransform: 'capitalize',
            backgroundColor: '#ff2b60',
            '&:hover': { backgroundColor: '#e62755',  boxShadow: 'none',
            },
            color: 'white',
            boxShadow: 'none',
            px: 1.5,
            py: 0.5
          }}
        >
          Allow
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default scheduleeVideoPopup;

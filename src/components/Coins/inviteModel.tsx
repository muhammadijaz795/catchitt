import React from 'react';
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

const InvitationCodeModal = ({ open, onClose }: { open: any; onClose: any; }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
          Enter an invitation code
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={2}
        >
          <Typography
            variant="body2"
            sx={{ color: '#888', fontSize: '0.875rem', cursor: 'pointer' }}
          >
            Learn more
          </Typography>
          <ArrowForwardIosIcon sx={{ fontSize: '0.75rem', ml: 0.5, color: '#888' }} />
        </Box>

        <TextField
          fullWidth
          placeholder="Enter code"
          variant="outlined"
          sx={{ mb: 2, border: '2px solid #000', borderRadius: '8px', input: { p: 1.5 }, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />

        <Typography
          variant="caption"
          sx={{ fontSize: '0.75rem', color: '#666', mb: 2 }}
          display="block"
        >
          By tapping “Confirm”, you agree to the{' '}
          <Box component="span" fontWeight="bold">
            Collect Cash Back Together Terms and Conditions.
          </Box>
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            fullWidth
            sx={{ mr: 1, color: 'rgba(22, 24, 35, 1)', textTransform: 'none', borderRadius: '8px', border: '1px solid rgba(22, 24, 35, 0.12)' }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ ml: 1, textTransform: 'none', borderRadius: '8px', backgroundColor: '#fe2c55' }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InvitationCodeModal;

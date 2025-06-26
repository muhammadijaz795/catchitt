import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Stack,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const InviteCard = () => {
  const [checked, setChecked] = useState(true);

  return (
    <Box
      sx={{
        width: 320,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "white",
        fontFamily: "sans-serif",
        px: 2,
        pt: 8
      }}
    >
      {/* Avatars */}
      <Stack direction="row" justifyContent="center" spacing={-1.5} mb={2}>
        <Avatar
          src="https://randomuser.me/api/portraits/women/68.jpg"
          sx={{ width: 56, height: 56, border: '2px solid #fff' }}
        />
        <Avatar
          src="https://randomuser.me/api/portraits/men/45.jpg"
          sx={{ width: 56, height: 56, border: '2px solid #fff' }}
        />
      </Stack>

      {/* Heading */}
      <Typography fontWeight={700} mb={1}>
        tomhades invites you to GO LIVE Together
      </Typography>

      {/* Subtext */}
      <Typography variant="body2" color="text.secondary" mb={2}>
        LIVE videos are public. Your followers may be notified and a recording of the LIVE video will be available to the host.
      </Typography>

      {/* Divider */}
      <Divider sx={{ my: 2 }} />

      {/* Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={() => setChecked(!checked)}
            icon={<RadioButtonUncheckedIcon sx={{ color: '#f43f5e' }} />}
            checkedIcon={<CheckCircleIcon sx={{ color: '#f43f5e' }} />}
          />
        }
        label={
          <Typography variant="body2" color="text.secondary">
            Turn off invitations for this LIVE video
          </Typography>
        }
      />

      {/* Buttons */}
      <Stack direction="row" spacing={2} mt={3} justifyContent="center">
        <Button variant="outlined" sx={{ flex: 1, borderRadius: 2, color: '#000',
            borderColor: '#000', }}>
          Decline
        </Button>
        <Button
          variant="contained"
          sx={{
            flex: 1,
            borderRadius: 2,
            
            bgcolor: '#f43f5e',
            '&:hover': { bgcolor: '#e11d48' },
          }}
        >
          Invite
        </Button>
      </Stack>
    </Box>
  );
};

export default InviteCard;

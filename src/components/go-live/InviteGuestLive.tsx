import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Switch,
  Stack,
  Divider,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const LiveInviteCard = () => {
  return (
    <Box
       sx={{
        width: 320,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "white",
        fontFamily: "sans-serif",
        pt: 8,
        px: 2
      }}
    >
      {/* Avatars */}
      <Stack direction="row" spacing={-1} justifyContent="center" mb={2}>
        <Avatar
          src="https://randomuser.me/api/portraits/women/68.jpg"
          sx={{ width: 60, height: 60, border: '3px solid white' }}
        />
        <Avatar
          src="https://randomuser.me/api/portraits/men/75.jpg"
          sx={{ width: 60, height: 60, border: '3px solid white' }}
        />
      </Stack>

      {/* Title */}
      <Typography
        variant="subtitle1"
        align="center"
        fontWeight={600}
        gutterBottom
      >
        <strong>tomhades</strong> invites you to <strong>GO LIVE Together</strong>
      </Typography>

      {/* Description */}
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        mb={2}
      >
        LIVE videos are public. Your followers may be notified and a recording of
        the LIVE video will be available to the host.
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Checkbox Option */}
      <FormControlLabel
        control={
          <Checkbox
            icon={<CheckCircle sx={{ color: '#f43f5e' }} />}
            checkedIcon={<CheckCircle sx={{ color: '#f43f5e' }} />}
            defaultChecked
          />
        }
        label="Turn off invitations for this LIVE video"
        sx={{
          '.MuiTypography-root': {
            fontSize: 14,
            color: 'text.secondary',
          },
        }}
      />

      {/* Action Buttons */}
      <Stack direction="row" spacing={2} mt={3}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            textTransform: 'none',
            borderColor: '#ddd',
            color: '#000',
          }}
        >
          Decline
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            textTransform: 'none',
            bgcolor: '#f43f5e',
            '&:hover': {
              bgcolor: '#e11d48',
            },
          }}
        >
          Invite
        </Button>
      </Stack>
    </Box>
  );
};

export default LiveInviteCard;

import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Switch,
  Avatar
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { styled } from '@mui/material/styles';
import AboutMeFaqs from './AboutMeFaqs'; // Assuming you have a component for FAQs

interface AboutMeSettingsProps {
  onBack: () => void;
  profileDetails: any;
}

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 24,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#FF2C55',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 20,
    height: 20,
    boxShadow: 'none',
  },
  '& .MuiSwitch-track': {
    borderRadius: 12,
    backgroundColor: '#EFEFEF',
    opacity: 1,
  },
}));
interface SettingsPanelProps {
  profileDetails: any;
}


const AboutMeSettings: React.FC<AboutMeSettingsProps> = ({ onBack, profileDetails }) => {
  const [enabled, setEnabled] = useState(false);
  console.log('profile Details in aboutSettings', profileDetails);

  const [showFaqs, setShowFaqs] = useState(false);
  if(showFaqs) {
    return (
      <AboutMeFaqs
        onBack={() => {setShowFaqs(false); console.log("Closed FAQs" )}}
      />
    );
  }
  return (
    <Box sx={{ maxWidth: 360, mx: 'auto',  position: 'fixed', right: 0, top: 0, height: '100vh', bgcolor: '#fff', zIndex: 2 }}>
      {/* Header */}
      <Box textAlign={'left'} display="flex" alignItems="center" justifyContent="space-between" mb={3} >
        <Box display="flex" alignItems="center">
          <IconButton onClick={onBack} size="small">
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" ml={1}>
            About me
          </Typography>
        </Box>
        <IconButton onClick={() => setShowFaqs(true)}>
          <HelpOutlineIcon />
        </IconButton>
      </Box>

      {/* Toggle and label */}
      <Box display="flex" px={2} textAlign={'left'} justifyContent="space-between" alignItems="center" mb={1}>
        <Typography fontWeight={600}>
          Show an intro of yourself and your community
        </Typography>
        <CustomSwitch
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
      </Box>

      <Typography px={2} textAlign={'left'} color="text.secondary" fontSize={14} mb={3}>
        Add an 'Intro to tell your viewers what your LIVE is about. Viewers will see this when they join your LIVE.
      </Typography>

      {/* Preview Card */}
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          color: '#fff',
          borderRadius: 2,
          p: 2,
          display: 'flex',
          gap: 1.5,

        }}
        mx={2} textAlign={'left'}
      >

        <Avatar
            src={ profileDetails?.details?.avatar }
            alt={ profileDetails?.details?.name }
            sx={{ width: 40, height: 40 }}
        />

        <Box>
          <Typography fontWeight={600} fontSize={14} mb={0.5}>
            {profileDetails?.details?.name || ''}
          </Typography>
          <Typography fontSize={14} lineHeight="1.5">
            {profileDetails?.details?.bio || "Welcome to my LIVE! Leave a comment to interact with me and other viewers. Follow my account if you enjoy today's video!"}
            
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutMeSettings;

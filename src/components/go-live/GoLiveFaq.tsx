import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Paper,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTranslation } from 'react-i18next';

interface LiveGoalFAQProps {
  onBack: () => void;
}

const LiveGoalFAQ = ({ onBack }: LiveGoalFAQProps) => {
  const { t, i18n } = useTranslation();
  const commentBoxes = [
    {
      text: t('livestream.help_achieve_goal'),
      avatar: "/avatar1.png", // Replace with real path or src
    },
    {
      text: t('livestream.example_extra_minutes'),
      avatar: "/avatar2.png",
    },
    {
      text: t('livestream.example_dancing'),
      avatar: "/avatar3.png",
    },
    {
      text: t('livestream.example_gym'),
      avatar: "/avatar4.png",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderRadius: 3,
        maxWidth: 350,
        mx: 'auto',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'left',
        position: 'fixed',
        top: 6,
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="center" mb={2} px={2} height={50}>
        <IconButton onClick={onBack} sx={{ color: '#fff', position: 'absolute', top: 6, left: 8 }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" textAlign="center" fontWeight="600" ml={1}>
          {t('livestream.faqs')}
        </Typography>
      </Box>
      <Box  sx={{
    maxHeight: 'calc(100vh - 5rem)',
    overflowY: 'auto',
    px: 2,
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
    },
    scrollbarWidth: 'thin', // For Firefox
    scrollbarColor: '#ffffff transparent', // For Firefox
  }}>
      {/* Question */}
      <Typography fontWeight="600" mb={1}>
        {t('livestream.what_is_live_goal')}
      </Typography>

      <Typography variant="body2" color="grey.300" mb={1}>
        {t('livestream.live_goal_description')}
      </Typography>
      <Typography variant="body2" color="grey.300" mb={1}>
        {t('livestream.live_goal_gift_info')}
      </Typography>
      <Typography variant="body2" color="grey.300" mb={1}>
       {t('livestream.live_goal_gift_options')}
      </Typography>
      <Typography variant="body2" color="grey.300" mb={2}>
        {t('livestream.live_goal_description_tip')}
      </Typography>

      {/* Examples */}
      {commentBoxes.slice(0, 2).map(({ text, avatar }, i) => (
        <Paper
          key={i}
          sx={{
            backgroundColor: '#2c2c2c',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 1,
            borderRadius: 2,
            mb: 1,
          }}
        >
          <Avatar src={avatar} sx={{ width: 30, height: 30 }} />
          <Typography variant="body2" color="grey.200">
            {text}
          </Typography>
        </Paper>
      ))}

      {/* Be relevant */}
      <Typography fontWeight="600" mt={2} mb={1}>
        • {t('livestream.be_relevant')}
      </Typography>
      <Typography variant="body2" color="grey.300" mb={2}>
        {t('livestream.be_relevant_tip')}
      </Typography>

      {commentBoxes.slice(2).map(({ text, avatar }, i) => (
        <Paper
          key={i}
          sx={{
            backgroundColor: '#2c2c2c',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 1,
            borderRadius: 2,
            mb: 1,
          }}
        >
          <Avatar src={avatar} sx={{ width: 30, height: 30 }} />
          <Typography variant="body2" color="grey.200">
            {text}
          </Typography>
        </Paper>
      ))}

      {/* Be attainable */}
      <Typography fontWeight="600" mt={2} mb={1}>
        • {t('livestream.be_attainable')}
      </Typography>
      <Typography variant="body2" color="grey.300">
        {t('livestream.be_attainable_tip')}  
      </Typography>
      </Box>
    </Box>
  );
};

export default LiveGoalFAQ;

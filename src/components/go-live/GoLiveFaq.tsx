import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Paper,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface LiveGoalFAQProps {
  onBack: () => void;
}

const LiveGoalFAQ = ({ onBack }: LiveGoalFAQProps) => {
  const commentBoxes = [
    {
      text: "Help me achieve my first goal and I’ll sing a song.",
      avatar: "/avatar1.png", // Replace with real path or src
    },
    {
      text: "I’ll go LIVE for extra minutes if I achieve my first goal.",
      avatar: "/avatar2.png",
    },
    {
      text: "I am at dancing. I will dance disco if I make it.",
      avatar: "/avatar3.png",
    },
    {
      text: "I love gym workout. I’ll do 20 sit-ups if I achieve the goal.",
      avatar: "/avatar4.png",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#1e1e1e',
        color: '#fff',
        p: 2,
        borderRadius: 3,
        maxWidth: 400,
        mx: 'auto',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'left',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
        <IconButton onClick={onBack} sx={{ color: '#fff', position: 'absolute', top: 10, left: 8 }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" textAlign="center" fontWeight="600" ml={1}>
          FAQs
        </Typography>
      </Box>

      {/* Question */}
      <Typography fontWeight="600" mb={1}>
        What is LIVE Goal?
      </Typography>

      <Typography variant="body2" color="grey.300" mb={1}>
        LIVE goals can help you become more popular.
      </Typography>
      <Typography variant="body2" color="grey.300" mb={1}>
        YmJ can set a LIVE goal with up to 3 Gifts. Viewers can send the Gifts during your LIVE streams to achieve the goal with you. When you achieve a goal, there will be a special effect to celebrate.
      </Typography>
      <Typography variant="body2" color="grey.300" mb={1}>
        Setting Gifts of different Coin amounts is a great way to provide options for your viewers to show appreciation to your LIVE.
      </Typography>
      <Typography variant="body2" color="grey.300" mb={2}>
        A brief and clear description can attract more viewers.
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
        • Be relevant
      </Typography>
      <Typography variant="body2" color="grey.300" mb={2}>
        Having a LIVE goal relevant to the theme of your LIVE might motivate your viewers more.
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
        • Be attainable
      </Typography>
      <Typography variant="body2" color="grey.300">
        A LIVE goal will expire in 4 hours, so make sure your LIVE goal is attainable and not too challenging in the time limit.
      </Typography>
    </Box>
  );
};

export default LiveGoalFAQ;

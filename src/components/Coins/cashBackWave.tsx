import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActionArea,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { coinsImage } from '../../icons';


const CashBackWaveCard = () => {
  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        p: 1,
        mx: 'auto',
        my: 3
      }}
    >
      <CardActionArea
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
        }}
      >
        {/* Coin Image */}
        <Box
          component="img"
          src={coinsImage}
          alt="Coins"
          sx={{
            width: 100,
            height: 100,
            objectFit: 'contain',
            mr: 2,
          }}
        />

        {/* Text Content */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Cash Back Wave
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Apr 23 – Apr 30
          </Typography>
        </Box>

        {/* Arrow Icon */}
        <IconButton size="small">
          <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </CardActionArea>
    </Card>
  );
};

export default CashBackWaveCard;

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
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';


const CashBackWaveCard = () => {

  interface Languages {
    code: string;
    name: string;
    country_code: string;
  }
        
  const languages: Languages[] = [
      {
          code: 'en',
          name: 'English',
          country_code: 'gb',
      },
      {
          code: 'ar',
          name: 'العربية',
          country_code: 'sa',
      },
  ];
    
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t, i18n } = useTranslation();

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
            {t('Cash Back Wave')}
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

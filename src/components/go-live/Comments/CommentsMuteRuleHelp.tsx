import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Container,
} from "@mui/material";
import { useTranslation } from 'react-i18next';
const MuteRulesHelp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  return (
    <Container
      maxWidth="xs"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        width: 360, 
        p: '0 !important',

      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          p: 1,
          borderBottom: '1px solid #E6E6E6',
          position: 'relative'
        }}
      >
        <IconButton onClick={onBack} sx={{position: 'absolute', left: '0'}}>
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.69141 1.25L1.69141 7.25L7.69141 13.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </IconButton>
        <Typography variant="body1" fontWeight="bold">
          {t('livestream.mute_rules')}
        </Typography>
      </Box>

      {/* Center Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {t('livestream.reduce_spam_with_mute')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 280, px: 2 }}>
          {t('livestream.mute_unwanted_comments')}
        </Typography>
      </Box>

        <Box textAlign={'left'} mt={2}>
            <Typography fontWeight="bold" mb={1}>
                {t('livestream.how_it_works')}
            </Typography>

            <Box textAlign={'left'} component="ul" sx={{ pl: 2, mb: 2, display: "flex", flexDirection: 'column', gap: 2 }}>
                <li >
                <Typography variant="body2" color="text.secondary">
                    • {t('livestream.mute_rule_instruction')}
                </Typography>
                </li>
                <li>
                <Typography variant="body2" color="text.secondary">
                    • {t('livestream.exact_match_rule_description')}
                </Typography>
                </li>
                <li>
                <Typography variant="body2" color="text.secondary">
                    • {t('livestream.example_boring_rule')}
                </Typography>
                </li>
            </Box>
        </Box>
      {/* Button */}
      <Box sx={{ p: 4 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#ff2d55",
            textTransform: "none",
            fontWeight: "500",
            fontSize: "1rem",
            borderRadius: 2,
            py: 1.2,
            "&:hover": {
              backgroundColor: "#e0244d",
            },
          }}
          onClick={onBack} 
        >
          {t('livestream.got_it')}
        </Button>
      </Box>
    </Container>
  );
}
export default MuteRulesHelp;

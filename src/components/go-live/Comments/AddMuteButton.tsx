// AddMuteButton.tsx
import React from "react";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTranslation } from 'react-i18next';

interface AddMuteButtonProps {
  onBack: () => void;
  onConfirm: () => void;
  comment: string;
}

const AddMuteButton: React.FC<AddMuteButtonProps> = ({ onBack, onConfirm, comment }) => {
  const { t, i18n } = useTranslation();
  return (
    <Container
      maxWidth="xs"
      sx={{ bgcolor: "white",  width: 360, 
        p: '0 !important', }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderBottom: "1px solid #eee",
          py: 2,
        }}
      >
        <IconButton onClick={onBack} sx={{ position: "absolute", left: 8 }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography fontWeight="bold">{t('livestream.add_mute_rule')}</Typography>
      </Box>

      {/* Message */}
      <Box sx={{  p: 1, textAlign: "left" }}>
        <Typography variant="body1" fontSize="0.95rem">
          {t('livestream.mute_summary')}
          <Typography component="span" fontWeight="bold" display="inline">
            "{comment}"
          </Typography>{" "}
          {t('livestream.mute_rest_of_live')}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: 2,
          px: 3,
          mt: 0,
        }}
      >
        <Button
          variant="outlined"
          onClick={onBack}
          fullWidth
          sx={{
            textTransform: "none",
            bgcolor: "#f2f2f2",
            color: "#000",
            border: "none",
            fontWeight: "bold",
            py: 1.2,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#e0e0e0",
            },
          }}
        >
          {t('livestream.cancel')}
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#ff2d55",
            textTransform: "none",
            fontWeight: "bold",
            py: 1.2,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#e0244d",
            },
          }}
          onClick={onConfirm}
        >
          {t('livestream.add')}
        </Button>
      </Box>
    </Container>
  );
};

export default AddMuteButton;

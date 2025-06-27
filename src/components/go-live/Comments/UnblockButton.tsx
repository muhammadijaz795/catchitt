// AddMuteButton.tsx
import React from "react";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const UnblockButton: React.FC<{ user: any, onBack: () => void, onConfirm: () => void }> = ({ user, onBack, onConfirm }) => {
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
        <Typography fontWeight="bold">Unblock</Typography>
      </Box>

      {/* Message */}
      <Box sx={{  py: 1, px: 3, textAlign: "left" }}>
        <Typography variant="body1" fontSize="1rem">
          Can watch your LIVE after 
          <Typography component="span" fontWeight="bold" display="inline">
            { " " + user?.name + " " }
          </Typography>
          revoke
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
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
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
        >
          Confirm
        </Button>
      </Box>
    </Container>
  );
};

export default UnblockButton;

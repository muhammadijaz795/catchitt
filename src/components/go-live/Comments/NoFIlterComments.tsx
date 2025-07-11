import React from "react";
import { Box, Typography, Button } from "@mui/material";

const NoFilteredComments: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{
        px: 2,
        py: 4,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        No filtered comments yet
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        {t('livestream.community_flagged_apear')}
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#ffb6c1",
          color: "#fff",
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 2,
          px: 6,
          py: 1.5,
          "&:hover": {
            backgroundColor: "#ffa5b4",
          },
        }}
      >
        Approve
      </Button>
    </Box>
  );
};

export default NoFilteredComments;

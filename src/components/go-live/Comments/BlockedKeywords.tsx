import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AddKeyword from "./AddKeywords";
import FaqScreen from "./BlockedKeywordFaqs"; // ← Import your FAQ screen

const BlockedKeywords: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  if (showAddKeyword) {
    return <AddKeyword onBack={() => setShowAddKeyword(false)} />;
  }

  if (showFAQ) {
    return <FaqScreen onBack={() => setShowFAQ(false)} />;
  }
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
          justifyContent: "space-between",
          mb: 4,
          p: 0,
          pb: 1,
          borderBottom: '1px solid #E6E6E6'
        }}
      >
        <IconButton onClick={onBack}>
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.69141 1.25L1.69141 7.25L7.69141 13.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </IconButton>
        <Typography variant="body1" fontWeight="bold">
          Blocked keywords
        </Typography>
        <IconButton onClick={() => setShowFAQ(true)}>
          <HelpOutlineIcon />
        </IconButton>
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
        <AddIcon sx={{ fontSize: 50 ,fontWeight: '400 !important', color: "grey.400", mb: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold">
          Add keyword
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 280, px: 2 }}>
          We’ll block LIVE comments with words, phrases, and emoji you add as keywords.
        </Typography>
      </Box>

      {/* Button */}
      <Box sx={{ p: 4 }}>
        <Button
        onClick={() => setShowAddKeyword(true)}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#ff2d55",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: 2,
            py: 1.2,
            "&:hover": {
              backgroundColor: "#e0244d",
            },
          }}
        >
          Add keyword
        </Button>
      </Box>
    </Container>
  );
}
export default BlockedKeywords;

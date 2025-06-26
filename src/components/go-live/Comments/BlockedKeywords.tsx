import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddKeyword from "./AddKeywords";
import FaqScreen from "./BlockedKeywordFaqs";

import {
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BlockedKeywords: React.FC<{
  onBack: () => void;
  onSave: (keywords: { keyword: string; blockSimilarVersion: boolean }[]) => void;
}> = ({ onBack, onSave }) => {
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [blockedKeywords, setBlockedKeywords] = useState<
    { keyword: string; blockSimilarVersion: boolean }[]
  >([]);

  const handleSave = () => {
    console.log(blockedKeywords);
    console.log('blocked Keywords...');
    onSave(blockedKeywords);
    onBack(); // optional: go back after saving
  };

  if (showAddKeyword) {
    return (
      <AddKeyword
        onBack={() => setShowAddKeyword(false)}
        onAddKeyword={(newKeyword) =>
          setBlockedKeywords((prev) => [...prev, newKeyword])
        }
      />
    );
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
          p: 1,
          borderBottom: '1px solid #E6E6E6'
        }}
      >
        <IconButton onClick={onBack}>
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
            <path d="M7.69141 1.25L1.69141 7.25L7.69141 13.25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </IconButton>
        <Typography variant="body1" fontWeight="bold">
          Blocked keywords
        </Typography>
        <Button
          onClick={handleSave}
          sx={{ color: "#ff2d55", fontWeight: 600, fontSize: "0.9rem", textTransform: "none" }}
        >
          Save
        </Button>
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
        <AddIcon sx={{ fontSize: 50, fontWeight: '400 !important', color: "grey.400", mb: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold">
          Add keyword
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 280, px: 2 }}>
          We’ll block LIVE comments with words, phrases, and emoji you add as keywords.
        </Typography>
      </Box>

      {/* Add Keyword Button */}
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
      {/* Blocked Keywords List */}
{blockedKeywords.length > 0 && (
  <Box px={2} pb={2}>
    <Typography
      variant="subtitle2"
      sx={{ color: "gray", fontWeight: 600, mb: 1, textAlign: "left" }}
    >
      Blocked Keywords
    </Typography>

    <List disablePadding>
      {blockedKeywords.map((item, index) => (
        <ListItem
          key={index}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() =>
                setBlockedKeywords((prev) =>
                  prev.filter((_, i) => i !== index)
                )
              }
              sx={{ color: "#ff1744" }}
            >
              <DeleteIcon />
            </IconButton>
          }
          sx={{ pl: 0, py: 0.5 }}
        >
          <ListItemText
            primary={
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.keyword}
              </Typography>
            }
            secondary={
              item.blockSimilarVersion ? (
                <Typography variant="caption" color="text.secondary">
                  Blocking similar versions
                </Typography>
              ) : null
            }
          />
        </ListItem>
      ))}
    </List>
  </Box>
)}
    </Container>
  );
};

export default BlockedKeywords;

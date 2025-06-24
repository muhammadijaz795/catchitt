import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FilterComments from "./Comments/FilterComments";
import BlockedKeywords from "./Comments/BlockedKeywords";

// Styled switch (same as before)
const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#ff2d55',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  '& .MuiSwitch-track': {
    borderRadius: 12,
    backgroundColor: '#d3d3d3',
    opacity: 1,
  },
}));

const Comments: React.FC = () => {
 const [showFilterScreen, setShowFilterScreen] = useState(false);
  const [showBlockedKeywords, setShowBlockedKeywords] = useState(false); // NEW STATE
  const [allowComments, setAllowComments] = useState(true);
  const [showMostSent, setShowMostSent] = useState(true);

  // Show Filter Screen
  if (showFilterScreen) {
    return <FilterComments onBack={() => setShowFilterScreen(false)} />;
  }

  // Show Blocked Keywords Screen
  if (showBlockedKeywords) {
    return <BlockedKeywords onBack={() => setShowBlockedKeywords(false)} />;
  }

  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 9rem)",
        overflowY: "auto",
        bgcolor: "white",
        borderRadius: 2,
        mx: "auto",
        width: "100%",
        maxWidth: 360,
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          borderBottom: "1px solid #e0e0e0",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: 'center'
        }}
      >
        <IconButton sx={{ position: "absolute", left: 1 }} size="small">
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography fontWeight="bold" fontSize="1.1rem" sx={{ ml: 1 }}>
          Comment Settings
        </Typography>
      </Box>

      {/* Content */}
      <List dense>
        <Box textAlign="left" px={2} pt={2} pb={1}>
          <Typography fontWeight={600} variant="caption" color="text.secondary">
            Manage comments
          </Typography>
        </Box>

        <ListItem>
          <ListItemText primary="Allow comments" />
          <ListItemSecondaryAction>
            <StyledSwitch
              edge="end"
              checked={allowComments}
              onChange={() => setAllowComments(!allowComments)}
            />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button onClick={() => setShowFilterScreen(true)}>
          <ListItemText primary="Filter comments" secondary="On" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button onClick={() => setShowBlockedKeywords(true)}>
          <ListItemText primary="Blocked keywords" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button>
          <ListItemText primary="Star Comment" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <ListItemText primary="Show the most sent comment" />
          <ListItemSecondaryAction>
            <StyledSwitch
              edge="end"
              checked={showMostSent}
              onChange={() => setShowMostSent(!showMostSent)}
            />
          </ListItemSecondaryAction>
        </ListItem>

        <Box textAlign="left" px={2} pt={3} pb={1}>
          <Typography fontWeight={600} variant="caption" color="text.secondary">
            Manage viewers
          </Typography>
        </Box>

        <ListItem button>
          <ListItemText primary="Mute duration" secondary="Entire LIVE" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button>
          <ListItemText
            primary="Mute rules"
            secondary="Add rules to mute viewers who comment specific words, phrases, and emojis."
          />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Box>
  );
};

export default Comments;

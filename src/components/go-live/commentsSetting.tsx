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
import StarComment from "./Comments/StarComments";
import CommentsMuteRules from "./Comments/CommentsMuteRules";
import MutedAccounts from "./Comments/MutedAccounts";
import { useSearchParams } from 'react-router-dom';

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

interface CommentsProps {
  updateSettings: (id: string, settings: { allowComments?: boolean; showMostSent?: boolean }) => void;
  onBack: () => void;
}

const Comments: React.FC<CommentsProps> = ({ updateSettings, onBack }) => {
  const [showFilterScreen, setShowFilterScreen] = useState(false);
  const [showBlockedKeywords, setShowBlockedKeywords] = useState(false); // NEW STATE
  const [allowComments, setAllowComments] = useState(true);
  const [showMostSent, setShowMostSent] = useState(true);
  const [showStarComment, setShowStarComment] = useState(false);
  const [showMuteRules, setShowMuteRules] = useState(false);
  const [showMutedAccounts, setShowMutedAccounts] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('streamId');

    if (showMuteRules) {
  return <CommentsMuteRules onBack={() => setShowMuteRules(false)} />;
}
if (showStarComment) {
  return <StarComment onBack={() => setShowStarComment(false)} />;
}
  // Show Filter Screen
  if (showFilterScreen) {
    return <FilterComments onUpdate={(data) => updateSettings(id, { filterComments: data })} onBack={() => setShowFilterScreen(false)} />;
  }

  // Show Blocked Keywords Screen
  if (showBlockedKeywords) {
    return <BlockedKeywords onBack={() => setShowBlockedKeywords(false)}  onSave={(blockedKeywords) =>
        {
          console.log('block keywords in parent..')
          console.log(blockedKeywords);
          updateSettings(id, {
          commentSettings: {
            blockedKeywords: blockedKeywords,
          },
        })
      }
      } />;
  }
if (showMutedAccounts) {
    return <MutedAccounts onBack={() => setShowMutedAccounts(false)} />;
  }
  return (
    <Box
      sx={{
       
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
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: 'center'
        }}
      >
        <IconButton sx={{ position: "absolute", left: 1 }} size="small" onClick={onBack}>
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.69141 1.25L1.69141 7.25L7.69141 13.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </IconButton>
        <Typography fontWeight="bold" variant="body1" sx={{ ml: 1 }}>
          Comment Settings
        </Typography>
      </Box>

      {/* Content */}
      <List dense sx={{ maxHeight: "calc(100vh - 7rem)",
        overflowY: "auto",}}>
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
              onChange={() => {
                const newAllowComments = !allowComments;
                setAllowComments(newAllowComments);
                updateSettings(id, { allowComments: newAllowComments });
              }}
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

        <ListItem button onClick={() => setShowStarComment(true)}>
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
              onChange={() => {
                const newShowMostSent = !showMostSent;
                setShowMostSent(newShowMostSent);
                updateSettings(id, { showMostSent: newShowMostSent });
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>

        <Box textAlign="left" px={2} pt={3} pb={1}>
          <Typography fontWeight={600} variant="caption" color="text.secondary" >
            Manage viewers
          </Typography>
        </Box>

        <ListItem button >
          <ListItemText primary="Mute duration" secondary="Entire LIVE" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button onClick={() => setShowMutedAccounts(true)}>
          <ListItemText primary="Blocked Accounts"  />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={() => setShowMuteRules(true)}>
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

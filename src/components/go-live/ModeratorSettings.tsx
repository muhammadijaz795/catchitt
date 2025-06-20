import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GroupIcon from '@mui/icons-material/Group';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddModerators from './AddModerator';
const moderators = [
  {
    name: 'Gretchen Schleifer',
    status: "didn't watch your LIVE in last 30 days",
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'Lindsey Saris',
    status: "didn't watch your LIVE in last 30 days",
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    name: 'Kierra Rosser',
    status: "didn't watch your LIVE in last 30 days",
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    name: 'Giana Workman',
    status: "didn't watch your LIVE in last 30 days",
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    name: 'Lincoln Torff',
    status: "didn't watch your LIVE in last 30 days",
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
];

type ModeratorsListProps = {
  onBack: () => void;
};

export default function ModeratorsList({ onBack }: ModeratorsListProps) {

    const [activeView, setActiveView] = useState<null | 'moderators'>(null);
    
  return (
    <>
    <Box sx={{  maxWidth: 360, mx: 'auto', position: 'fixed', right: 0, top: 0, height: '100vh', bgcolor: '#fff', zIndex: 2 }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #EFEFEF' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" onClick={onBack}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Moderators</Typography>
          <Box>
            <IconButton>
              <PersonAddIcon  />
            </IconButton>
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <List>
        {moderators.map((mod, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar sx={{ width: 54, height: 54 }} src={mod.avatar} />
            </ListItemAvatar>
            <ListItemText
              sx={{ px: 1 }}
              primary={<Typography fontWeight="600">{mod.name}</Typography>}
              secondary={<Typography variant="caption" fontSize={12} fontWeight={500} color="text.secondary">{mod.status}</Typography>}
            />
            <Button variant="contained" size="small" sx={{ borderRadius: 1, textTransform: 'none', padding: '6px 12px', backgroundColor: '#FF2C55' }}>
              Manage
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
    <AddModerators onBack={() => setActiveView(null)} />
    </>
  );
}

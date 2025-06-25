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
              <svg width="20" height="21" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.661 7.36213C9.4142 7.54749 9.25 7.81328 9.25 8.25C9.25 8.80228 8.80229 9.25 8.25 9.25C7.69772 9.25 7.25 8.80228 7.25 8.25C7.25 7.18672 7.70818 6.32751 8.46005 5.76288C9.1787 5.22317 10.0967 5 11 5C12.0779 5 12.987 5.32418 13.6436 5.94499C14.2951 6.56101 14.6046 7.38116 14.6531 8.2005C14.7483 9.8042 13.864 11.5687 12.2461 12.4932C12.099 12.5773 12.008 12.6462 11.9529 12.6958C12.0783 13.0886 11.9509 13.5345 11.6034 13.7974C11.163 14.1307 10.5359 14.0438 10.2026 13.6034C10.2026 13.6034 10.2031 13.6041 10.2016 13.6021L10.2005 13.6007C9.9606 13.278 9.865 12.855 9.9137 12.4585C9.9974 11.777 10.4727 11.2031 11.2539 10.7568C12.2157 10.2071 12.7065 9.15911 12.6567 8.3189C12.6328 7.91625 12.4898 7.60656 12.2695 7.39822C12.0542 7.19468 11.6721 7 11 7C10.3981 7 9.9411 7.15183 9.661 7.36213Z" fill="#111111"/>
              <path d="M11 18C11.8284 18 12.5 17.3284 12.5 16.5C12.5 15.6716 11.8284 15 11 15C10.1716 15 9.5 15.6716 9.5 16.5C9.5 17.3284 10.1716 18 11 18Z" fill="#111111"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 11.5C0 5.42487 4.92487 0.5 11 0.5C17.0751 0.5 22 5.42487 22 11.5C22 17.5751 17.0751 22.5 11 22.5C4.92487 22.5 0 17.5751 0 11.5ZM11 2.5C6.02944 2.5 2 6.52944 2 11.5C2 16.4706 6.02944 20.5 11 20.5C15.9706 20.5 20 16.4706 20 11.5C20 6.52944 15.9706 2.5 11 2.5Z" fill="#111111"/>
              </svg>
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

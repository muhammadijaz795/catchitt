import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Box
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';
import UnMuteButton from "./UnmuteButton";

// const mutedUsers = [
//   {
//     _id: '655fc1f193289d9edfaea217',
//     name: 'Giana Workman 1',
//     username: 'Giann34 1',
//     avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
//   },
//   {
//     _id: '655fc1f193289d9edfaea217',
//     name: 'Giana Workman 2',
//     username: 'Giann34 2',
//     avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
//   },
//   {
//     _id: '655fc1f193289d9edfaea217',
//     name: 'Giana Workman 3',
//     username: 'Giann34 3',
//     avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
//   },
// ];

export default function MutedAccounts({ onBack }: { onBack: () => void }) {
  const [mutedUsers, setMutedUsers] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showAddMuteButton, setShowAddMuteButton] = useState(false);

  const filteredUsers = mutedUsers.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.username.toLowerCase().includes(searchTerm.toLowerCase()));

  function loadMutedUsers()
  {
    let endpoint = `${process.env.VITE_API_URL}/live-stream/v2/get-muted-users`;
    let requestOptions =
    {
      method: 'GET',
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };

    fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((response) => response.data.mutedUsers && setMutedUsers(response.data.mutedUsers))
    .catch((error) => console.error('Fetch error:', error));
  };

  function toggleMuteUser()
  {
    let endpoint = `${process.env.VITE_API_URL}/live-stream/roomId/mute/${selectedUser._id}`;
    let requestOptions =
    {
      method: 'POST',
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };

    fetch(endpoint, requestOptions)
    .catch((error) => console.error('Fetch error:', error));
  };

  useEffect(() => {
    loadMutedUsers()
  }, []);

  if(showAddMuteButton)
  {
    return <UnMuteButton user={selectedUser} onBack={() => { setSelectedUser(null); setShowAddMuteButton(false); }} onConfirm={() => { toggleMuteUser(); setShowAddMuteButton(false); }} />;
  }

  return (
    <Box sx={{ maxWidth: 360, mx: 'auto', bgcolor: '#fff', position: 'fixed', right: 0, top: 0, zIndex: 3 }}>
      <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                mb: 2,
                p: 1,
                borderBottom: "1px solid #eee",
              }}
            >
              <IconButton
                onClick={onBack}
                sx={{ position: "absolute", left: 0 }}
              >
              <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.69141 1.25L1.69141 7.25L7.69141 13.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>        </IconButton>
              <Typography fontWeight="bold" variant="body1">
                Muted Account
              </Typography>
      </Box>

      <Box sx={{ px: 2,  }}>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#F2F2F2',
                borderRadius: '12px',
                px: 1,
                height: 44,
                mb: 1,
            }}
            >
            <SearchIcon sx={{ color: 'text.disabled', fontSize: 20, mr: 1 }} />
            <input
                type="text"
                placeholder="Search accounts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '14px',
                flex: 1,
                color: '#000',
                }}
            />
            </Box>


        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          These accounts are muted for the rest of the LIVE
        </Typography>

        <List>
          {filteredUsers.map((user, index) => (
            <ListItem key={index} disableGutters secondaryAction={
              <Button
                onClick={() => { setSelectedUser(user); setShowAddMuteButton(true); }}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  px: 2,
                  height: 32,
                  color: '#000',
                  borderColor: '#000'
                }}
              >
                Unmute
              </Button>
            }>
              <ListItemAvatar>
                <Avatar src={user.avatar} sx={{ width: 48, height: 48 }} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography fontWeight="bold">{user.name}</Typography>}
                secondary={<Typography variant="caption" color="text.secondary">{user.username}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      {mutedUsers.length < 1 && (
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
                No mute accounts
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 280, px: 2 }}>
                Edit this list by tapping "Manage" on a viewer's personal card
              </Typography>
            </Box>
      )}
      
    </Box>
  );
}

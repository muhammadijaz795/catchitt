import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';

const initialUsers = [
  { id: 1, name: 'Gretchen Schleifer', username: 'Gretcn2', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', isModerator: false },
  { id: 2, name: 'Lindsey Saris', username: 'Linds3', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', isModerator: false },
  { id: 3, name: 'Kierra Rosser', username: 'Kierraros', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', isModerator: false },
  { id: 4, name: 'Giana Workman', username: 'Giann34', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', isModerator: true },
  { id: 5, name: 'Lincoln Torff', username: 'Maydolll', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', isModerator: false },
];

type Props = {
  onBack: () => void;
};

export default function AddModerators({ onBack }: Props) {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleModerator = (id: number) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, isModerator: !user.isModerator } : user
      )
    );
  };

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', bgcolor: '#fff', height: '100vh' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #EFEFEF' }}>
        <Toolbar>
          <IconButton edge="start" onClick={onBack}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
            Add Moderators
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search accounts"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#999' }} />
              </InputAdornment>
            ),
            sx: { borderRadius: 2, backgroundColor: '#f5f5f5' }
          }}
        />
      </Box>

      <List>
        {filteredUsers.map((user) => (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar sx={{ width: 54, height: 54 }} src={user.avatar} />
            </ListItemAvatar>
            <ListItemText
              sx={{ px: 1 }}
              primary={<Typography fontWeight={600}>{user.name}</Typography>}
              secondary={<Typography variant="caption">{user.username}</Typography>}
            />
            <Button
              variant={user.isModerator ? 'outlined' : 'contained'}
              size="small"
              sx={{
                borderRadius: 1,
                padding: '6px 14px',
                backgroundColor: user.isModerator ? '#fff' : '#FF2C55',
                color: user.isModerator ? '#000' : '#fff',
                borderColor: '#ccc',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: user.isModerator ? '#f5f5f5' : '#e02045',
                },
              }}
              onClick={() => handleToggleModerator(user.id)}
            >
              {user.isModerator ? 'Remove' : 'Add'}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

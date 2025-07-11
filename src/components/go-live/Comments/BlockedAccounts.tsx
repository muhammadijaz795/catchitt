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
import UnblockButton from "./UnblockButton";
import { socket } from '../../../src/lib/socket';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const isPostLive = window.location.pathname.includes('/postlive') ? true : false;

export default function BlockedAccounts({ customProps, onBack }: { customProps: any, onBack: () => void }) {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showConfirmUnblock, setShowConfirmUnblock] = useState(false);

  const filteredUsers = customProps.blockedUsers.items.filter((user: any) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.username.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredConsumers = customProps.consumers.filter((user: any) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.username.toLowerCase().includes(searchTerm.toLowerCase())).filter((item: any) => item.id !== localStorage.getItem('userId') && !filteredUsers.some((user: any) => user.id === item.id || user._id === item._id || user._id === item.id || user.id === item._id));

  function toggleBlockedUser()
  {
    let endpoint = `${process.env.VITE_API_URL}/profile/${selectedUser.id ?? selectedUser._id}/block`;
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

    customProps.setBlockedUsers((prev: any) => ({ ...prev, items: prev.items.some((item: any) => item._id === selectedUser._id) ? prev.items.filter((item: any) => item._id !== selectedUser._id) : [...prev.items, selectedUser] }));
    isPostLive && removeUserFromLiveStreamRoom(selectedUser)
  };

  function removeUserFromLiveStreamRoom(user: any)
  {
    const payload =
    {
      accessToken: localStorage.getItem('token'),
      liveStreamRoomId: searchParams.get('streamId'),
      userId: user.id ?? user._id,
    };

    socket.emit('removeUserFromLiveStreamRoom', payload);
  };

  if(showConfirmUnblock)
  {
    return <UnblockButton user={selectedUser} onBack={() => { setSelectedUser(null); setShowConfirmUnblock(false); }} onConfirm={() => { toggleBlockedUser(); setShowConfirmUnblock(false); }} />;
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
                {t('livestream.blocked_account')}
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
                placeholder={t('livestream.search_accounts')}
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
          {t('livestream.blocked_account_description')}
        </Typography>

        <List>
          {filteredUsers.map((user: any, index: number) => (
            <ListItem key={index} disableGutters secondaryAction={
              <Button
                variant="outlined"
                onClick={() => { setSelectedUser(user); setShowConfirmUnblock(true); }}
                size="small"
                disabled={window.location.pathname.includes('/postlive')}
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
                {t('livestream.unblock')}
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
        <List>
          {filteredConsumers.map((user: any, index: number) => (
            <ListItem key={index} disableGutters secondaryAction={
              <Button
                variant="outlined"
                onClick={() => { setSelectedUser(user); setShowConfirmUnblock(true); }}
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
                {t('livestream.block')}
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
      {customProps.blockedUsers.items.length < 1 && customProps.consumers.length < 1 && (
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
                {t('livestream.no_blocked_accounts')}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 280, px: 2 }}>
                Edit this list by tapping "Manage" on a viewer's personal card
              </Typography> */}
            </Box>
      )}
      
    </Box>
  );
}

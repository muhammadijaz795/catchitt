import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  IconButton
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';

import ModeratorsList from './ModeratorSettings'; // your moderators component

// Custom Switch styling
const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#FF2C55',
      '& + .MuiSwitch-track': {
        backgroundColor: '#EFEFEF',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 16,
    height: 16,
    boxShadow: 'none',
  },
  '& .MuiSwitch-track': {
    borderRadius: 10,
    backgroundColor: '#EFEFEF',
    opacity: 1,
  },
}));

// Settings data
const settingsData = [
  { title: 'Moderators', type: 'link', component: 'moderators' },
  { title: 'Practice mode', description: 'This pre-LIVE session is only visible to you.', type: 'link' },
  { title: 'About me', description: 'Introduce yourself and your LIVE.', type: 'link' },
  { title: 'LIVE setup for client acquisition', type: 'link' },
  { title: 'Multi-guest fun kit', description: 'Explore interactive features and playbooks for your multi-guest LIVE.', type: 'link' },
  { title: 'Video quality', type: 'link' },
  { title: 'Audience controls', description: 'This LIVE is limited to those aged 18 years and old..', type: 'switch', value: true },
  { title: 'LIVE Gifts', type: 'switch', value: false },
  { title: 'Gift Gallery', description: 'Enable Gift Gallery to allow viewers to light up the Gifts in your Gift Gallery and become title gifters during your LIVE.', type: 'switch', value: true },
  { title: 'Rankings', type: 'link' },
  { title: 'Comment settings', type: 'link' },
  { title: 'Content disclosure', type: 'link' },
];

const SettingsPanel = () => {
const [activeView, setActiveView] = useState<null | 'moderators'>(null);

  const renderContent = () => {
    switch (activeView) {
      case 'moderators':
        return <ModeratorsList onBack={() => setActiveView(null)} />;
      // Future components can go here
      default:
        return null;
    }
  };

  return (
    <>
      {activeView === null ? (
        <Box sx={{ maxWidth: 360, mx: 'auto', position: 'fixed', right: 0, top: 0, height: '100vh', bgcolor: '#fff', zIndex: 2 }}>
          <Typography variant="h6" fontWeight={600} borderBottom="1px solid #EFEFEF" pb={1}>
            Settings
          </Typography>
          <Typography variant="body2" fontWeight={600} textAlign="left" color="text.secondary" sx={{ mt: 1, mb: 2, pl: 1.5 }}>
            These settings apply to all LIVE videos.
          </Typography>

          <List disablePadding sx={{ height: 'calc(100vh - 5.5rem) !important', overflowY: 'auto' }}>
            {settingsData.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  onClick={() => item.type === 'link' && item.component && setActiveView(item.component)}
                  sx={{ py: 1.5, cursor: item.type === 'link' ? 'pointer' : 'default', alignItems: 'flex-start' }}
                  secondaryAction={
                    item.type === 'switch' ? (
                      <CustomSwitch edge="end" checked={item.value} />
                    ) : (
                      <IconButton edge="end">
                        <ChevronRightIcon />
                      </IconButton>
                    )
                  }
                >
                  <ListItemText
                    primary={<Typography fontWeight={600} fontSize={15}>{item.title}</Typography>}
                    secondary={
                      item.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 12 }}>
                          {item.description}
                        </Typography>
                      )
                    }
                  />
                </ListItem>
                {index !== settingsData.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      ) : (
        renderContent()
      )}
    </>
  );
};

export default SettingsPanel;

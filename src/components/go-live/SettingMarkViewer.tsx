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
  IconButton,
  ListItemIcon,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MicOffIcon from '@mui/icons-material/MicOff';
import BlockIcon from '@mui/icons-material/Block';
import FlagIcon from '@mui/icons-material/Flag';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import { styled } from '@mui/material/styles';

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

const settingsData = [
  {
    title: 'Mark viewer',
    description: 'Prioritize their comments and other interactions in your LIVE.',
    color: '#2B2B2B',
    type: 'switch',
    value: true,
    icon: <ModeStandbyIcon />,
  },
  {
    title: 'Add moderator',
    type: 'link',
    icon: <PersonAddAlt1Icon />,
    color: '#2B2B2B',
  },
  {
    title: 'Mute account',
    type: 'switch',
    value: true,
    icon: <MicOffIcon />,
    color: '#2B2B2B',
  },
  {
    title: 'Block',
    type: 'switch',
    value: false,
    icon: <BlockIcon />,
    color: '#FF2C55',
  },
  {
    title: 'Report',
    type: 'link',
    icon: <FlagIcon />,
    color: '#FF2C55',
  },
];

const SettingsMarkViewer = () => {
  const [activeView, setActiveView] = useState<string | null>(null);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" fontWeight={600} borderBottom="1px solid #EFEFEF" pb={1}>
        Settings
      </Typography>

      <List disablePadding sx={{ maxHeight: 'calc(100vh - 5.5rem)', overflowY: 'auto' }}>
        {settingsData.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem
              // button={item.type === 'link'}
              onClick={() => item.type === 'link' && setActiveView(item.title)}
              sx={{ py: 1.5 }}
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
              {item.icon && (
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {React.cloneElement(item.icon, { style: { color: item.color } })}
                </ListItemIcon>
              )}
              <ListItemText
                primary={
                  <Typography fontWeight={600} fontSize={15} sx={{ color: item.color }}>
                    {item.title}
                  </Typography>
                }
                secondary={
                  item.description && (
                    <Typography variant="body2" sx={{ fontSize: 12 }} color="text.secondary">
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
  );
};

export default SettingsMarkViewer;
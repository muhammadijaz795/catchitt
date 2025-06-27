import React, {useState} from 'react';
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
import CommentsSetting from './CommentsSetting'
import MutedAccounts from './Comments/MutedAccounts';

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
        backgroundColor: '#EFEFEF', // green
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
    borderRadius: 20 / 2,
    backgroundColor: '#EFEFEF', // gray
    opacity: 1,
  },
}));


const settingsData = [
  // {
  //   title: 'Practice mode',
  //   description: 'This pre-LIVE session is only visible to you.',
  //   type: 'link',
  // },
  // {
  //   title: 'About me',
  //   description: 'Introduce yourself and your LIVE.',
  //   type: 'link',
  // },
  // {
  //   title: 'LIVE setup for client acquisition',
  //   description: '',
  //   type: 'link',
  // },
  // {
  //   title: 'Multi-guest fun kit',
  //   description: 'Explore interactive features and playbooks for your multi-guest LIVE.',
  //   type: 'link',
  // },
  // {
  //   title: 'Video quality',
  //   description: '',
  //   type: 'link',
  // },
  {
    title: 'Hear your voice',
    description: 'Use headphones to hear how you sound to viewers',
    type: 'switch',
    value: true,
  },
  {
    title: 'Rankings',
    description: '',  
    type: 'link',
  },
  // {
  //   title: 'Gift Gallery',
  //   description: 'Enable Gift Gallery to allow viewers to light up the Gifts in your Gift Gallery and become title gifters during your LIVE.',
  //   type: 'switch',
  //   value: true,
  // },
  {
     title: 'Topics',
    description: 'Topic couldn’t be changed during LIVE',
    // type: 'link',
  },
  {
    title: 'Comment settings',
    description: '',
    type: 'link',
    view: 'CommentsSetting',
  },
   {
    title: 'Moderators',
    description: '',
    type: 'link',
  },
  {
    title: 'Muted Accounts',
    description: 'These accounts are muted for the rest of the LIVE',
    type: 'link',
    view: 'MutedAccounts',
  },
   {
    title: 'Blocked Accounts',
    description: '',
    type: 'link',
  },
];

const SettingsPanel = ({customProps}: {customProps: any}) => {
  const [activeView, setActiveView] = useState<any>(null);
  
  if (activeView == 'CommentsSetting') {
    return <CommentsSetting onBack={() => setActiveView(null)} />;
  }
  else if(activeView == 'MutedAccounts')
  {
    return <MutedAccounts customProps={customProps} onBack={() => setActiveView(null)} />;
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', right: 0, top: 0 }}>
      <Typography variant="h6" fontWeight={600} borderBottom={'1px solid #EFEFEF'} pb={1}>
        Settings
      </Typography>
      {/* <Typography variant="body2" fontWeight={600} textAlign={'left'} color="text.secondary" sx={{ mt: 1, mb: 2 }}>
        These settings apply to all LIVE videos.
      </Typography> */}

      


      <List disablePadding sx={{ height: 'calc(100vh - 5.5rem) !important', overflowY: 'auto' }}>
        {settingsData.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem
                button={item.type === 'link'}
                onClick={() => setActiveView(item.view)} // 👈 Use function from object
                secondaryAction={
                  item.type === 'switch' ? (
                    <CustomSwitch edge="end" checked={item.value} />
                  ) : (
                    <IconButton edge="end">
                      <ChevronRightIcon />
                    </IconButton>
                  )
                }
                alignItems="flex-start"
                sx={{ py: 1.5 }}
              >

              <ListItemText
                primary={
                  <Typography fontWeight={600} fontSize={15}>
                    {item.title}
                  </Typography>
                }
                secondary={
                  item.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5, fontSize: 12 }}
                    >
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

export default SettingsPanel;

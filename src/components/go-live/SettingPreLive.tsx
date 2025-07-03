import React, { Component, useState } from 'react';
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
import MutedAccounts from './Comments/MutedAccounts'; // your moderators component
import BlockedAccounts from './Comments/BlockedAccounts';
import ModeratorsList from './ModeratorSettings'; // your moderators component
import AboutMe from './AboutSettings'; // your moderators component
import Comments from './commentsSetting'; // your moderators component
import axios from 'axios';


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

//phase 2
// Settings data
const settingsData = [
  // { title: 'Moderators', type: 'link', component: 'moderators'  as const },
  // { title: 'Practice mode', description: 'This pre-LIVE session is only visible to you.', type: 'link' },
  { title: 'About me', description: 'Introduce yourself and your LIVE.', type: 'link', component: 'AboutMe'  as const },
  // { title: 'LIVE setup for client acquisition', type: 'link' },
  // { title: 'Multi-guest fun kit', description: 'Explore interactive features and playbooks for your multi-guest LIVE.', type: 'link' },
  // { title: 'Video quality', type: 'link' },
  // { title: 'Audience controls', description: 'This LIVE is limited to those aged 18 years and old..', type: 'switch', value: true },
  // { title: 'LIVE Gifts', type: 'switch', value: false },
  // { title: 'Gift Gallery', description: 'Enable Gift Gallery to allow viewers to light up the Gifts in your Gift Gallery and become title gifters during your LIVE.', type: 'switch', value: true },
  // { title: 'Rankings', type: 'link' },
  { title: 'Comment settings', type: 'link', component: 'comments'  as const },
  // { title: 'Content disclosure', type: 'link' },
  { title: 'Muted Accounts', description: 'These accounts are muted for the rest of the LIVE', type: 'link', component: 'MutedAccounts'  as const },
  { title: 'Blocked Accounts', type: 'link', component: 'BlockedAccounts'  as const },
];

interface SettingsPanelProps {
  profileDetails: any;
  customProps: any
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ profileDetails, customProps }) => {
  const [activeView, setActiveView] = useState<null | 'moderators' | 'comments' | 'AboutMe' | 'MutedAccounts' | 'BlockedAccounts'>(null);


const updateSettings = async (
  id: string,
  settings: { allowComments?: boolean; showMostSent?: boolean } = {}
) => {
  // Destructure incoming settings with default values
  const { allowComments = true, showMostSent = true } = settings;

  const API_KEY = process.env.VITE_API_URL;
  const token = localStorage.getItem('token');  
  const API_URL = `${API_KEY}/live-stream/v2/settings/${id}`;

  const config = {
    headers: {
      "Content-Type": "application/json", // Use application/json for PATCH
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    hearYourVoice: true,
    moderators: [""],  // default empty string
    commentSettings: {
      allowComments: allowComments,
      duration: 0,
      filterComments: {
        spamComments: true,
        unkindComments: true,
        communityFlaggedComments: true,
        showInFeed: true,
      },
      showMostSentComments: showMostSent,
      blockedKeyworkds: [
        {
          keyword: "", // empty string
          blockSimilarVersion: true,
        },
      ],
    },
    muteRules: [
      {
        comment: "", // empty string
        duration: 0,
      },
    ],
    mutedUsers: [""],
    blockedUsers: [""],
  };

  try {
    const response = await axios.patch(API_URL, data, config);
    console.log(response.data, "response data");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};



  const renderContent = () => {
  switch (activeView) {
    case 'moderators':
      return <ModeratorsList onBack={() => setActiveView(null)} />;
    case 'AboutMe':
      return <AboutMe profileDetails={profileDetails} onBack={() => setActiveView(null)} />;
      case 'comments':
      return <Comments updateSettings={updateSettings} onBack={() => setActiveView(null)} />;
    case 'MutedAccounts':
      return <MutedAccounts customProps={customProps} onBack={() => setActiveView(null)} />;
    case 'BlockedAccounts':
      return <BlockedAccounts customProps={customProps} onBack={() => setActiveView(null)} />;
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
                  onClick={() => item.type === 'link' && item.component && setActiveView(item.component as 'moderators' | 'comments' | 'AboutMe' | 'MutedAccounts' | 'BlockedAccounts')}
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

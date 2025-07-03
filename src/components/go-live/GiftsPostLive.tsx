import React, { useState, useEffect } from 'react';

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

import SettingsPanel from "./SettingPostLive"; // Renamed from SettingsPostLive to SettingsPanel for clarity
import BlockedFaqs from "./BlockedKeywordsFaqs";

// Image imports (keeping them as is)
import LiveGiftLive from '../../assets/postLive/Live-gifts.svg';
import FlipCameraLive from '../../assets/postLive/Flip-camera.svg';
import MirrorVideoLive from '../../assets/postLive/Mirror-video.svg';
import MuteAudioLive from '../../assets/postLive/Mute-microphone.svg';
import PauseLive from '../../assets/postLive/Pause-live.svg';
import SettingsLive from '../../assets/postLive/Settings.svg';
import CommentsLive from '../../assets/postLive/comment.svg';
import AboutLive from '../../assets/postLive/About-me.svg';
import CompaignLive from '../../assets/postLive/Compaigns.svg';
import ContentDisclosureLive from '../../assets/postLive/Content-disclosure.svg';
import AIGeneratedLive from '../../assets/postLive/AI-generated.svg';
import AboutMe from './AboutSettings';


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
    borderRadius: 20 / 2,
    backgroundColor: '#EFEFEF',
    opacity: 1,
  },
}));

// phase 2
const GiftsData = [
  // {
  //   title: 'Live Gifts',
  //   rightdescription: 'New Gift series',
  //   type: 'link',
  //   image: <img src={LiveGiftLive} alt="Live Gifts" style={{ width: 24, height: 24 }} />,
  //   id: 'live-gifts', // Added ID,
  // },
  // {
  //   title: 'Flip Camera',
  //   description: '',
  //   type: 'link',
  //   image: <img src={FlipCameraLive} alt="Flip Camera" style={{ width: 24, height: 24 }} />,
  //   id: 'flip-camera', // Added ID
  // },
  // {
  //   title: 'Mirror Video',
  //   description: '',
  //   type: 'switch',
  //   value: true,
  //   image: <img src={MirrorVideoLive} alt="Mirror Video" style={{ width: 24, height: 24 }} />,
  //   id: 'mirror-video', // Added ID
  // },
  // {
  //   title: 'Mute Microphone',
  //   description: '',
  //   type: 'switch',
  //   value: true,
  //   image: <img src={MuteAudioLive} alt="Mute Microphone" style={{ width: 24, height: 24 }} />,
  //   id: 'mute-microphone', // Added ID
  // },
  // {
  //   title: 'Pause Live',
  //   description: '',
  //   type: 'link',
  //   image: <img src={PauseLive} alt="Pause Live" style={{ width: 24, height: 24 }} />,
  //   id: 'pause-live', // Added ID
  // },
  {
    title: 'Settings',
    description: '', // Keep description empty if not used for this item
    id: 'settings', // This is the ID for the SettingsPanel
    type: 'link',
    image: <img src={SettingsLive} alt="Settings" style={{ width: 24, height: 24 }} />,
  },
  // {
  //   title: 'Comments',
  //   description: '',
  //   id: 'comments', // Adding an ID for Comments to potentially open BlockedFaqs
  //   type: 'link',
  //   image: <img src={CommentsLive} alt="Comments" style={{ width: 24, height: 24 }} />,
  // },
  {
    title: 'About Me',
    description: '',
    type: 'link',
    image: <img src={AboutLive} alt="About Me" style={{ width: 24, height: 24 }} />,
    id: 'about-me', // Added ID
  },
  // {
  //   title: 'Campaigns',
  //   rightdescription: 'New Gift series',
  //   type: 'link',
  //   image: <img src={CompaignLive} alt="Campaigns" style={{ width: 24, height: 24 }} />,
  //   id: 'campaigns', // Added ID
  // },
  // {
  //   title: 'Content Disclosure',
  //   description: '',
  //   type: 'link',
  //   image: <img src={ContentDisclosureLive} alt="Content Disclosure" style={{ width: 24, height: 24 }} />,
  //   id: 'content-disclosure', // Added ID
  // },
  // {
  //   title: 'AI Generated Content',
  //   description: 'Add this label to tell viewers your content was generated or edited with AI. Learn more',
  //   type: 'switch',
  //   value: true,
  //   image: <img src={AIGeneratedLive} alt="AI Generated Content" style={{ width: 24, height: 24 }} />,
  //   id: 'ai-generated', // Added ID
  // },
  // {
  //   description: 'Need help? Report a problem',
  //   id: 'help-report', // Added ID
  // },
];

    

    

const GiftsPanel = ({customProps}: {customProps: any}) => {

  const [profileDetails, setProfileDetails] = useState<any>({
      details: [],
      isLoading: false,
    });

    useEffect(() => {
      loadProfileDetails();
    }, []);

    function loadProfileDetails()
    {
        let endpoint = `${process.env.VITE_API_URL}/profile`;
        let requestOptions =
        {
        method: 'GET',
        headers:
        {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        };

        setProfileDetails((prev: any) => ({ ...prev, isLoading: true }));

        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((response) => setProfileDetails((prev: any) => ({ ...prev, details: response.data, isLoading: false })))
        .catch((error) => console.error('Fetch error:', error));
    };

  // Use a single state to manage which component is active
  // 'list' for the main list, or the ID of the component to show
  const [activePanel, setActivePanel] = useState('list'); // Default to showing the list

  const handleItemClick = (itemId:any) => {
    // Determine which panel to show based on the clicked item's ID
    if (itemId === 'settings') {
      setActivePanel('settings');
    } else if (itemId === 'comments') { // Assuming 'Comments' opens BlockedFaqs
      setActivePanel('blocked-faqs');
    } else if (itemId === 'about-me') {
      setActivePanel('about-me');
    }
    // Add more conditions here for other panels
  };

  // Function to go back to the main list
  const handleClosePanel = () => {
    setActivePanel('list');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', right: 0, top: 0, position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {activePanel === 'list' && (
        <List disablePadding sx={{ height: 'calc(100vh - 5.5rem) !important', overflowY: 'auto' }}>
          {GiftsData.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                onClick={() => item.id && item.type === 'link' && handleItemClick(item.id)} // Only clickable if it has an ID and is a 'link' type
                secondaryAction={
                  item.type ? (
                    item.type === 'switch' ? (
                      <CustomSwitch edge="end" checked={item.value} />
                    ) : (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {/* Render rightdescription if it exists */}
                          {item.rightdescription && (
                            <Typography sx={{ fontSize: 12, mr: 1, color: 'text.secondary' }}>
                              {item.rightdescription}
                            </Typography>
                          )}
                          <IconButton edge="end">
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </>
                    )
                  ) : null
                }
                alignItems="flex-start"
                sx={{ py: 1.5, cursor: (item.id && item.type === 'link') ? 'pointer' : 'default' }}
              >
                {item.image && (
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                    {item.image}
                  </ListItemIcon>
                )}

                <ListItemText
                  primary={
                    item.title && (
                      <Typography fontWeight={600} fontSize={15}>
                        {item.title}
                      </Typography>
                    )
                  }
                  secondary={
                    // Prefer 'description' if it exists, otherwise use 'rightdescription' if no title
                    (item.description || (!item.title && item.rightdescription)) && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: 12, mt: item.title ? 0.5 : 0 }}
                      >
                        {item.description || item.rightdescription}
                      </Typography>
                    )
                  }
                />
              </ListItem>
              {index !== GiftsData.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}

      {activePanel === 'settings' && (
        // onClose={handleClosePanel}
        <SettingsPanel  customProps={customProps} />
      )}
      {activePanel === 'about-me' && (
        <AboutMe onBack={handleClosePanel}  profileDetails={profileDetails} />
      )}

      {activePanel === 'blocked-faqs' && (
        <BlockedFaqs onClose={handleClosePanel} />
      )}

      {/* Add more conditional renderings for other panels here */}

    </Box>
  );
};

export default GiftsPanel;
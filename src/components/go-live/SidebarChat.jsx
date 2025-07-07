import React, { useState, useRef, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Avatar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Divider,
  Paper
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { caesium,defaultGreyBackground } from '../../icons';
import { emoji, mic, paperClip } from '../../icons';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { io } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import CustomMediaPicker from '../user-chat/components/CustomMediaPicker';
import  styles  from './PostLive.module.scss';
import TopViewersImage from '../../assets/postLive/TopViewers.png';
import { socket } from '../../src/lib/socket';





const SidebarChat = ({ selectedLiveVideo, showSidebar, onHideSidebar, profileDetails, showFaqsSidebar }) => {
  const [showTopViewers, setShowTopViewers] = useState(false);
  const [isShowRanking, setIsShowRanking] = useState(true);
  const [message, setMessage] = useState('');
  console.log('load old messages');
  console.log(selectedLiveVideo?.details?.messages)
  const [messages, setMessages] = useState([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showFollowDiv, setShowFollowDiv] = useState(true);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuMsgId, setMenuMsgId] = useState(null);
  const [currentMessageUserData, setCurrentMessageUserData] = useState(null);
  const [openReport, setOpenReport] = useState(false);
  const messagesEndRef = useRef(null);
  const [darkTheme, setdarkTheme] = useState('');
  const socketRef = useRef();
  const SERVER_URL = 'https://prodapi.seezitt.com';
  const [isConnected, setIsConnected] = useState(false);
  console.log('profileDetails',profileDetails.details)
  const profileData = profileDetails.details || {};
  const token = localStorage.getItem('token');
  const loggedInUserId = localStorage.getItem('userId');
  const [newJoiner, setNewJoiner] = useState(null);
  const [messageType, setMessageType] = useState('text');
  const [uploadedFile, setUploadedFile] = useState('');
  const [openUploadPic, setOpenUploadPic] = useState(false);
  const [filePreview, setFilePreview] = useState('');

  console.log('selectedLiveVideo in sidebarChat', selectedLiveVideo);
  // Static data for the component
  // const selectedLiveVideo = {
  //   details: {
  //     owner: staticOwner,
  //     topViewersGifts: staticTopViewers
  //   }
  // };

    const openProfile = Boolean(anchorElProfile);

  const handleHideSidebar = () => {
    onHideSidebar();
  };

  const handleClickHeart = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  const [openFaq, setOpenFaq] = useState(false);
  const handleClickOpenFaq = () => setOpenFaq(true);
  const handleCloseFaq = () => setOpenFaq(false);

  const [searchParams] = useSearchParams();
  const streamId = searchParams.get('streamId');

  const handleToggle = (event, msg) => {
    if (msg) {
      setCurrentMessageUserData({
        avatar: msg.userImage,
        username: msg.name,
        name: msg.name,
        followersNumber: Math.floor(Math.random() * 1000),
        likesNum: Math.floor(Math.random() * 500),
        isFollowed: false,
        _id: msg.id
      });
    }
    setAnchorElProfile(anchorElProfile ? null : event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };

  const handleMenuOpen = (event, msgId) => {
    setMenuAnchor(event.currentTarget);
    setMenuMsgId(msgId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuMsgId(null);
  };

  const handleReply = (msgId) => {
    const msg = messages.find(m => m.id === msgId);
    if (msg) {
      setMessage(`@${msg.name} `);
    }
    handleMenuClose();
  };

  const handleFollow = (userId) => {
    setIsFollowed(!isFollowed);
    if (currentMessageUserData?._id === userId) {
      setCurrentMessageUserData({
        ...currentMessageUserData,
        isFollowed: !currentMessageUserData.isFollowed
      });
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // if (socket) {  // Use the passed socket instead of socketRef.current
      const messageData = {
        userId: profileData?._id || '',
        userFullName: profileData?.name || '',
        userName: profileData?.username, 
        userEmail: profileData?.email,
        userImage: profileData?.avatar || profileData?.cover,
        accessToken: localStorage.getItem('token'),
        message: message,
        liveStreamRoomId: streamId
      };
      console.log('here.. send message', messageData);
      console.log(socket);
      socket.emit('sendNewMessageToLiveStreamRoom', messageData, (response) => {
        console.log('Callback Response:', response);
        if (!response) {
          console.warn('No response received from server');
        }
      });
      
      setMessage('');
    // } else {
    //   console.error('Socket not available');
    // }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
          var themeColor = window.localStorage.getItem('theme');
  
      if (themeColor == 'dark') {
          setdarkTheme('');
      } else {
          // setdarkTheme(style.lightTheme);
      }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (selectedLiveVideo?.details?.messages) {
      setMessages(selectedLiveVideo.details.messages);
    }
  }, [selectedLiveVideo]);

    // useEffect(() => {
      const joinRoom = () => {
        console.log("start room")
        console.log(profileDetails.details)
        console.log('my profile data in joinRoom', profileData);
            if (!profileData || !profileData._id) return;

        console.log('profileData',profileData);
        const joinLiveStreamRoom = {
          userId: profileData?._id || '',
          liveStreamRoomId: streamId || '',
          accessToken: token ?? '',
          userFullName: profileData?.name || '',
          name: profileData?.name,
          userName: profileData?.username,
          userEmail: profileData?.email,
          userImage: profileData?.avatar || profileData?.cover,
        };
    
        console.log('joinLiveStreamRoom', joinLiveStreamRoom);
        if(socket){
          socket.emit('joinLiveStreamRoom', joinLiveStreamRoom, (response) => {
            console.log('Joined live stream room response:', response);
          });
        }
      };
    
      
    // }, [profileData]); 
  
    
    
   useEffect(() => {
        joinRoom();
        // joinLiveStreamRoom(streamId);
    }, []);

   useEffect(() => {
      socketListerns();
    }, []);

    const socketListerns = () => {
      if(socket){
        socket.on('sent-gift', (data) => {
            console.log(`Received message: ${JSON.stringify(data)}`);
            const giftId = data?.gift?.id;
            const gift = data?.gift;

            if (giftId && gift) {
              sendGift1(giftId, gift);
            } else {
              console.warn('Gift data is missing or malformed:', data);
            }
      });
      
      socket.on('getNewMessageFromLiveStreamRoom', (data) => {
            console.log(`Received message: ${JSON.stringify(data)}`);
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              name: data?.userFullName,
              userName: data?.userName,
              userImage: data?.userImage,
              message: data.message,
              timestamp: new Date()
            }]);
      });

           socket.on('joinedliveStreamRoom', (data) => {
            console.log('joined listner called..')
            // setTotalMembers(totalMembers+1);
            setNewJoiner(data);
            setTimeout(()=>{
              setNewJoiner(null);
            },10000)
            console.log(`Received message of joinedliveStreamRoom: ${JSON.stringify(data)}`);
          });

          socket.on('top-viewers', (response) => {
            console.log('top viewers response:', response);
          });
      }
      
    }

  return (
    // <Grid item  sx={{ zIndex:'9999', position: 'absolute', top: 0, right: 0, height: '100vh', width: '20.5rem', bgcolor: '#fafafa', transform: showSidebar ? "translateX(0)" : "translateX(100%)", borderLeft: '1px solid #ddd', p: 0 }}>
      <Box sx={{ height: '100vh', bgcolor: '#fafafa', mx: 'auto', p:0 }}>
                  <Box
                    sx={{
                        bgcolor: '#fff',
                        borderRadius: 1,
                        boxShadow: 1,
                        position: 'relative',
                        height: '100vh'
                    }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center',position: 'relative', p: 1, borderBottom: '1px solid rgba(22, 24, 35, 0.2)' }}>
                         {/* <span className='absolute left-3 top-3.5' onClick={handleHideSidebar}>
                            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5005 8.62453H13.4095L8.84513 13.1889C8.6987 13.3353 8.6987 13.5728 8.84513 13.7192L9.90578 14.7799C10.0523 14.9263 10.2897 14.9263 10.4361 14.7799L16.921 8.29505C17.3603 7.8557 17.3603 7.14339 16.921 6.70404L10.4361 0.219212C10.2897 0.0727628 10.0523 0.0727628 9.90578 0.219212L8.84513 1.27987C8.6987 1.42632 8.6987 1.66375 8.84513 1.8102L13.4094 6.37453H4.5005C4.29338 6.37453 4.1255 6.54242 4.1255 6.74953V8.24953C4.1255 8.4566 4.29338 8.62453 4.5005 8.62453ZM3.00049 1.49951C3.00049 1.29241 2.83259 1.12451 2.62549 1.12451H1.12549C0.91838 1.12451 0.750488 1.29241 0.750488 1.49951V13.4995C0.750488 13.7066 0.91838 13.8745 1.12549 13.8745H2.62549C2.83259 13.8745 3.00049 13.7066 3.00049 13.4995V1.49951Z" fill="#161823"/>
                            </svg>
                        </span> */}
                        <Typography fontWeight={700} fontSize={18}>
                        LIVE chat
                        </Typography>
                    </Box>
                         {
                        showTopViewers? (
                           <Box
                            sx={{
                              width: 360,
                              bgcolor: "#fff",
                              height: "100vh",
                              borderLeft: "1px solid #ddd",
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            {/* Header */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                px: 2,
                                py: 1.5,
                                borderBottom: "1px solid #eee",
                                flexShrink: 0,
                              }}
                            >
                               <IconButton size="small" onClick={() => setShowTopViewers(!showTopViewers)}>   
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.93934 6L0.859825 1.92048C0.713392 1.77405 0.713392 1.5366 0.859825 1.39016L1.39019 0.859834C1.53663 0.713389 1.77404 0.713389 1.92051 0.859834L5.99999 4.93935L10.0795 0.859834C10.2259 0.713389 10.4634 0.713389 10.6098 0.859834L11.1402 1.39016C11.2866 1.5366 11.2866 1.77405 11.1402 1.92048L7.06067 6L11.1402 10.0795C11.2866 10.2259 11.2866 10.4634 11.1402 10.6098L10.6098 11.1402C10.4634 11.2866 10.2259 11.2866 10.0795 11.1402L5.99999 7.06065L1.92051 11.1402C1.77404 11.2866 1.53663 11.2866 1.39019 11.1402L0.859825 10.6098C0.713392 10.4634 0.713392 10.2259 0.859825 10.0795L4.93934 6Z" fill="#161823"/>
                                  </svg>
                                </IconButton>
                              <Typography variant="subtitle1" fontWeight={600}>
                                Top viewers
                              </Typography>
                              <Box>
                                <Tooltip onClick={() => showFaqsSidebar()} title="Help" arrow
                                  slotProps={{
                                    tooltip: {
                                      sx: {
                                        bgcolor: 'rgba(16, 162, 197, 1)',
                                        fontSize: '1rem',
                                        color: '#fff',
                                      },
                                    },
                                  }}
                                >
                                  <IconButton size="small" onClick={()=> showFaqsSidebar()}>
                                    <HelpOutlineIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>

                            {/* Scrollable Content */}
                          {selectedLiveVideo?.details?.topViewersGifts.length > 0 ?  <Box
                              sx={{
                                p: 2,
                                overflowY: 'auto',
                                flex: 1, // Fills remaining space
                              }}
                            >
                              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                <Typography sx={{fontSize: 14}}>#</Typography>
                                <Typography sx={{fontSize: 14}}>Name</Typography>
                                <Typography sx={{ display: "flex", alignItems: "center", fontSize: 14 }}>
                                  <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />
                                  Coins
                                </Typography>
                              </Box>

                              <Stack spacing={1}>
                                {selectedLiveVideo?.details?.topViewersGifts?.map((viewer, index) => {
                                  const numberColor =
                                    index === 0
                                      ? "#f33"
                                      : index === 1
                                      ? "#d99900"
                                      : index === 2
                                      ? "#eab308"
                                      : "#000";

                                  return (
                                    <Box
                                      key={viewer.userId}
                                      sx={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 2fr 1fr",
                                        justifyContent: "space-between",
                                        fontSize: 14,
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          textAlign: "left",
                                          color: numberColor,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {index + 1}
                                      </Typography>
                                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                        <Typography sx={{ color: "#000", fontWeight: 400 }}>
                                          {viewer.name}
                                        </Typography>
                                      </Box>
                                      <Typography sx={{ fontSize: 14, textAlign: "right" }} fontWeight={500}>
                                        {viewer.totalCoins}
                                      </Typography>
                                    </Box>
                                  );
                                })}
                              </Stack>
                            </Box>
                            : (
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, height: 'calc(100vh - 12.5rem)' }}>
                                <img src={TopViewersImage} alt="" />
                                <Typography fontSize={13} fontWeight={600} mt={0.5}>
                                    Viewers
                                </Typography>
                            </Box>
                            )}

                            {/* Footer */}
                            <Box
                              sx={{
                                bgcolor: "#fff",
                                p: 2,
                                borderTop: "1px solid #eee",
                                flexShrink: 0,
                              }}
                            >
                              <Typography variant="body2" fontWeight={500} gutterBottom>
                                {selectedLiveVideo?.details?.owner?.name || ''}
                              </Typography>
                              <Button
                                onClick={() => setShowTopViewers(false)}
                                variant="outlined"
                                fullWidth
                                sx={{ textTransform: "none", borderColor: "#f33", color: "#f33" }}
                              >
                                Send Gifts
                              </Button>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ mt: 0.5, display: "block" }}
                              >
                                💗 Send Gifts to support and help desiLiv***
                              </Typography>
                            </Box>
                          </Box>

                          
                         ): (                       
                            <Box>
                                {
                                  <>
                                <Box
                                    sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    mt: 1.5,
                                    mb: 1,
                                    p: 1,
                                }}
                                onClick={() => setShowTopViewers(true)}
                            >
                                <Typography fontWeight={500} fontSize={16}>
                                    Top viewers
                                </Typography>
                                <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
                            </Box>
                            {/* <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    pb: 2, 
                                    borderBottom: "1px solid rgba(22, 24, 35, 0.2)"                               }}
                            >
                                <Typography variant="body1" fontWeight="600" sx={{ flexGrow: 1, textAlign: 'center' }}>
                                    Top viewers
                                </Typography>
                                <IconButton sx={{ color: '#666', padding: 0 }}>
                                    <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                            </Box> */}
                            
                                    </>
                              } 
    


                                {<Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid rgba(22, 24, 35, 0.2)' }}>
                                {selectedLiveVideo?.details?.topViewersGifts?.[0] && (
                                        <Box textAlign="center" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                          <Typography sx={{ pl: 2 }}>
                                            <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M4.854 7.03912C13.931 6.58712 16.2 3.45913 16.797 1.95312H26.052V44.9061H16.632V13.2561C13.048 14.6691 9.332 15.2341 4.854 15.2341V7.03912Z" fill="url(#paint0_linear_2018_18436)"/>
                                              <mask id="mask0_2018_18436" maskUnits="userSpaceOnUse" x="4" y="1" width="23" height="44">
                                                <path d="M4.854 6.69412C13.931 6.21912 16.2 3.53813 16.797 1.95312H26.052V44.9861H16.632V13.1091C13.048 14.5961 9.332 15.3151 4.854 15.3151V6.69412Z" fill="url(#paint1_linear_2018_18436)"/>
                                              </mask>
                                              <g mask="url(#mask0_2018_18436)">
                                                <path d="M16.0239 30.7789L25.6969 10.2109L35.2399 48.6629L18.3329 50.7469L16.0239 30.7789Z" fill="url(#paint2_linear_2018_18436)"/>
                                                <path opacity="0.7" d="M21.5439 10.6244C19.6419 11.9704 17.3829 12.7744 16.4909 13.1474C15.4009 16.2304 13.2209 22.8454 13.2209 23.5174C13.2209 24.1904 21.7419 23.2374 26.0029 22.6774L27.1929 5.85938C25.4089 7.54138 23.4469 9.27938 21.5439 10.6244Z" fill="url(#paint3_linear_2018_18436)"/>
                                              </g>
                                              <defs>
                                                <linearGradient id="paint0_linear_2018_18436" x1="15.453" y1="-0.836875" x2="34.42" y2="58.2941" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FCF4D6"/>
                                                  <stop offset="0.469" stop-color="#F2CC83"/>
                                                  <stop offset="1" stop-color="#EEB865"/>
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_2018_18436" x1="20.119" y1="72.4851" x2="-3.785" y2="24.1631" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FF88C1"/>
                                                  <stop offset="1" stop-color="white"/>
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_2018_18436" x1="21.1489" y1="20.6129" x2="27.5279" y2="38.8819" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FBE0AE"/>
                                                  <stop offset="1" stop-color="#F6DBA8" stop-opacity="0"/>
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_2018_18436" x1="16.7879" y1="12.8674" x2="20.3649" y2="15.3684" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#DFA874"/>
                                                  <stop offset="1" stop-color="#F4D7A2" stop-opacity="0"/>
                                                </linearGradient>
                                              </defs>
                                            </svg>
                                          </Typography>
                                          <Box>
                                            <Avatar
                                              src={selectedLiveVideo.details.topViewersGifts[0].avatar || "https://i.pravatar.cc/50"}
                                              alt={selectedLiveVideo.details.topViewersGifts[0].name}
                                              sx={{
                                                width: 48,
                                                height: 48,
                                                mx: 'auto',
                                                border: '2px solid rgba(245, 214, 151, 1)',
                                              }}
                                            />
                                            <Typography fontSize={13} fontWeight={600} mt={0.5}>
                                              {selectedLiveVideo.details.topViewersGifts[0].name}
                                            </Typography>
                                            <Box display="flex" justifyContent="center" alignItems="center" mt={0.2}>
                                              <Box component="span" sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}>
                                                <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />
                                              </Box>
                                              <Typography fontSize={13}>{selectedLiveVideo.details.topViewersGifts[0].totalCoins}</Typography>
                                            </Box>
                                          </Box>
                                        </Box>
                                )}
    
                                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2}}>
                                {selectedLiveVideo?.details?.topViewersGifts?.[1] && (
                                    <Box textAlign="center" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                      <Typography sx={{ px: 0 }}>
                                        <svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M1.06 9.91016H5.823C5.823 9.25683 5.88133 8.6035 5.998 7.95017C6.138 7.27217 6.35967 6.66483 6.663 6.12817C6.96633 5.56817 7.36333 5.12483 7.854 4.79817C8.36733 4.44817 8.986 4.27283 9.71 4.27217C10.784 4.27217 11.6597 4.61083 12.337 5.28817C13.037 5.94217 13.387 6.86416 13.387 8.05416C13.387 8.8015 13.212 9.46716 12.862 10.0512C12.5294 10.6408 12.1039 11.1729 11.602 11.6272C11.1113 12.0938 10.5623 12.5255 9.955 12.9222C9.37277 13.2796 8.80055 13.6531 8.239 14.0422C7.22527 14.7402 6.2215 15.4526 5.228 16.1792C4.29467 16.8792 3.47733 17.6495 2.776 18.4902C2.06618 19.3258 1.49861 20.2724 1.096 21.2922C0.698667 22.3422 0.5 23.5795 0.5 25.0042H18.5V20.7302H6.909C7.50332 19.901 8.21009 19.1586 9.009 18.5242C9.803 17.8942 10.6203 17.3108 11.461 16.7742C12.3017 16.2135 13.1303 15.6528 13.947 15.0922C14.787 14.5322 15.5343 13.9135 16.189 13.2362C16.8433 12.5359 17.376 11.7311 17.765 10.8552C18.1617 9.96783 18.36 8.9055 18.36 7.66817C18.36 6.47817 18.1267 5.40417 17.66 4.44617C17.2361 3.51762 16.6142 2.69303 15.838 2.03017C15.043 1.36242 14.1285 0.851703 13.143 0.525165C12.1176 0.171314 11.0397 -0.00619922 9.955 0.000165257C8.485 0.000165257 7.17767 0.256832 6.033 0.770165C4.9446 1.23663 3.98404 1.95748 3.232 2.87217C2.484 3.75883 1.92333 4.80917 1.55 6.02317C1.17667 7.2145 1.01333 8.5105 1.06 9.91117" fill="url(#paint0_linear_2018_18458)"/>
                                          <defs>
                                            <linearGradient id="paint0_linear_2018_18458" x1="3.412" y1="1.59617" x2="10.969" y2="25.0042" gradientUnits="userSpaceOnUse">
                                              <stop stop-color="#ECEFF1"/>
                                              <stop offset="1" stop-color="#BDC5CC"/>
                                            </linearGradient>
                                          </defs>
                                        </svg>
                                      </Typography>
                                      <Box display={'flex'}>
                                        <Avatar
                                          src={selectedLiveVideo.details.topViewersGifts[1].avatar || "https://i.pravatar.cc/50"}
                                          alt={selectedLiveVideo.details.topViewersGifts[1].name}
                                          sx={{
                                            width: 48,
                                            height: 48,
                                            mx: 'auto',
                                            border: '2px solid rgba(245, 214, 151, 1)',
                                          }}
                                        />
                                        <Box pl={1}>
                                          <Typography fontSize={13} fontWeight={600} mt={0.5}>
                                            {selectedLiveVideo.details.topViewersGifts[1].name}
                                          </Typography>
                                          <Box display="flex" justifyContent="center" alignItems="center" mt={0.2}>
                                            <Box component="span" sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}>
                                              <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />
                                            </Box>
                                            <Typography fontSize={13}>{selectedLiveVideo.details.topViewersGifts[1].totalCoins}</Typography>
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                  )}

                                  {selectedLiveVideo?.details?.topViewersGifts?.[2] && (
                                    <Box textAlign="center" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                      <Typography sx={{ px: 0 }}>
                                        <svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          {/* Bronze crown icon SVG for 3rd place */}
                                          <path d="M7.76986 10.28V13.74C8.36986 13.74 8.9932 13.7633 9.63986 13.81C10.3085 13.8333 10.9199 13.96 11.4739 14.19C12.0191 14.3914 12.49 14.7542 12.8239 15.23C13.1925 15.714 13.3769 16.4173 13.3769 17.34C13.3769 18.5173 12.9962 19.452 12.2349 20.144C11.4735 20.814 10.5392 21.1487 9.43186 21.148C8.71586 21.148 8.09253 21.0213 7.56186 20.768C7.06927 20.5267 6.63311 20.1843 6.28186 19.763C5.92707 19.3074 5.65742 18.7914 5.48586 18.24C5.29998 17.6335 5.19507 17.005 5.17386 16.371H0.501862C0.478528 17.779 0.674528 19.0253 1.08986 20.11C1.52853 21.194 2.1402 22.1167 2.92486 22.878C3.70886 23.6167 4.65486 24.182 5.76286 24.574C6.89353 24.9673 8.13953 25.1637 9.50086 25.163C10.6775 25.163 11.8082 24.9897 12.8929 24.643C13.9367 24.3185 14.911 23.8024 15.7659 23.121C16.5965 22.451 17.2539 21.6203 17.7379 20.629C18.2459 19.6363 18.4999 18.5057 18.4999 17.237C18.4999 15.8523 18.1192 14.664 17.3579 13.672C16.5959 12.68 15.5459 12.0337 14.2079 11.733V11.664C15.3385 11.3413 16.1809 10.73 16.7349 9.83C17.3115 8.93 17.5999 7.89167 17.5999 6.715C17.5999 5.63033 17.3575 4.67267 16.8729 3.842C16.392 3.01354 15.7439 2.29428 14.9699 1.73C14.192 1.14511 13.3115 0.710971 12.3739 0.45C11.4039 0.15 10.4345 0 9.46586 0C8.22053 0 7.08986 0.207667 6.07386 0.623C5.08769 0.997112 4.19152 1.57502 3.44386 2.319C2.7292 3.05767 2.16386 3.946 1.74786 4.984C1.35586 5.99933 1.13653 7.13 1.08986 8.376H5.76286C5.73953 7.12933 6.03953 6.10267 6.66286 5.296C7.30886 4.46533 8.25453 4.05 9.49986 4.05C10.3999 4.05 11.1959 4.32667 11.8879 4.88C12.5799 5.43333 12.9262 6.22967 12.9269 7.269C12.9269 7.96167 12.7535 8.515 12.4069 8.929C12.0835 9.345 11.6569 9.66833 11.1269 9.899C10.596 10.1113 10.0352 10.2395 9.46486 10.279C8.86486 10.3257 8.29953 10.3257 7.76886 10.279" fill="url(#paint0_linear_2018_18473)"/>
                                          <defs>
                                            <linearGradient id="paint0_linear_2018_18473" x1="9.49486" y1="25.442" x2="9.49486" y2="2.306" gradientUnits="userSpaceOnUse">
                                              <stop stop-color="#D7B5A2"/>
                                              <stop offset="1" stop-color="#FBDFCC"/>
                                            </linearGradient>
                                          </defs>
                                        </svg>
                                      </Typography>
                                      <Box display={'flex'}>
                                        <Avatar
                                          src={selectedLiveVideo.details.topViewersGifts[2].avatar || "https://i.pravatar.cc/50"}
                                          alt={selectedLiveVideo.details.topViewersGifts[2].name}
                                          sx={{
                                            width: 48,
                                            height: 48,
                                            mx: 'auto',
                                            border: '2px solid rgba(245, 214, 151, 1)',
                                          }}
                                        />
                                        <Box pl={1}>
                                          <Typography fontSize={11} fontWeight={600} mt={0.5}>
                                            {selectedLiveVideo.details.topViewersGifts[2].name}
                                          </Typography>
                                          <Box display="flex" justifyContent="center" alignItems="center" mt={0.2}>
                                            <Box component="span" sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}>
                                              <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />
                                            </Box>
                                            <Typography fontSize={12}>{selectedLiveVideo.details.topViewersGifts[2].totalCoins}</Typography>
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                  )}
                                </Box>        
                                </Box>
                          }      
    
                                
    
                                <Box sx={{ bgcolor: '#fff', height: '100%', fontFamily: 'sans-serif' }}>
                                </Box>
                                <>
                                <Box
                                  onClick={handleClickHeart}
                                  sx={{bottom:'12rem'}}
                                  className="cursor-pointer absolute bottom-40 bg-white h-16 flex items-center justify-center w-16 shadow-xl rounded-full right-3 z-50"
                                >
                                  <svg
                                    style={{ transform: 'scale(1.25)' }}
                                    width="80"
                                    height="80"
                                    viewBox="0 0 80 80"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <defs>
                                      <linearGradient id="paint0_linear" x1="40" y1="25" x2="40" y2="55" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#CF4C49" />
                                        <stop offset="1" stopColor="#CE201B" />
                                      </linearGradient>
                                    </defs>
                                    <path
                                      d="M40.6499 54.7851C40.458 54.9149 40.2316 54.9843 39.9999 54.9843C39.7682 54.9843 39.5418 54.9149 39.3499 54.7851C36.2733 52.7301 23.3333 43.5851 23.3333 34.9567C23.3333 23.8234 36.4166 22.04 39.9999 29.5401C43.5833 22.04 56.6666 23.8234 56.6666 34.9567C56.6666 43.5867 43.7266 52.7301 40.6499 54.7817V54.7851Z"
                                      fill="url(#paint0_linear)"
                                    />
                                  </svg>
                                </Box>
                                {showHeart && (
                                  <Box className={styles.floatingGift} sx={{ fontSize: 40 }}>
                                    <svg
                                    style={{ transform: 'scale(1.25)' }}
                                    width="80"
                                    height="80"
                                    viewBox="0 0 80 80"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <defs>
                                      <linearGradient id="paint0_linear" x1="40" y1="25" x2="40" y2="55" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#CF4C49" />
                                        <stop offset="1" stopColor="#CE201B" />
                                      </linearGradient>
                                    </defs>
                                    <path
                                      d="M40.6499 54.7851C40.458 54.9149 40.2316 54.9843 39.9999 54.9843C39.7682 54.9843 39.5418 54.9149 39.3499 54.7851C36.2733 52.7301 23.3333 43.5851 23.3333 34.9567C23.3333 23.8234 36.4166 22.04 39.9999 29.5401C43.5833 22.04 56.6666 23.8234 56.6666 34.9567C56.6666 43.5867 43.7266 52.7301 40.6499 54.7817V54.7851Z"
                                      fill="url(#paint0_linear)"
                                    />
                                  </svg>
                                  </Box>
                                )}
                                </>
                                  
                                <Box sx={{  height: 'calc(100vh - 14.5rem)', overflowY: 'auto' }}>
                                          <Box sx={{ px: 2, py: 1, height: 'calc(100vh - 14.5rem)', overflowY: 'auto' }}>
                                            <>
                                              {messages && messages.map((msg) => (
                                                <Box
                                                  key={msg.id}
                                                  display="flex"
                                                  alignItems="flex-start"
                                                  mb={1}
                                                  position="relative"
                                                  sx={{
                                                    '&:hover .options-button': {
                                                      visibility: 'visible',
                                                    },
                                                  }}
                                                >
                                                  
                                                  <Avatar onClick={(e) => handleToggle(e, msg)} src={msg.userImage} sx={{ width: 24, height: 24, mr: 1 }} />
                                                  <Box flex="1" sx={{textAlign: 'left', wordBreak: 'break-word'}}>
                                                    <Typography  fontSize={13} fontWeight={600}>{msg.name}</Typography>
                                                    <Typography fontSize={13}>{msg.message}</Typography>
                                                  </Box>
    
                                                  
                                                  <Menu
                                                            anchorEl={anchorElProfile}
                                                            open={openProfile}
                                                            onClose={handleCloseProfile}
                                                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                                                            PaperProps={{
                                                            elevation: 3,
                                                            sx: {
                                                                width: 300,
                                                                borderRadius: 2,
                                                                p: 2,
                                                                overflow: "visible",
                                                            },
                                                            }}
                                                        >
                                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                                <Box display="flex" alignItems="center">
                                                              
                                                                <Avatar
                                                                    src={currentMessageUserData?.avatar}
                                                                    alt="Profile"
                                                                    sx={{ width: 40, height: 40, mr: 1 }}
                                                                />
                                                                <Box>
                                                                    <Typography fontWeight="bold">{currentMessageUserData?.username ||''}</Typography>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                    {currentMessageUserData?.name ||''}
                                                                    </Typography>
                                                                </Box>
                                                                </Box>
                                                                <IconButton size="small" onClick={handleCloseProfile}>
                                                                <CloseIcon />
                                                                </IconButton>
                                                            </Box>
    
                                                            
                                                              <Box display="flex" alignItems="center" gap={2} mt={2} mb={2}>
                                                                  <Typography fontWeight="bold">{currentMessageUserData?.followersNumber ||0}</Typography>
                                                                  <Typography color="text.secondary">Followers</Typography>
                                                                  <Typography fontWeight="bold">{currentMessageUserData?.likesNum ||0}</Typography>
                                                                  <Typography color="text.secondary">Likes</Typography>
                                                              </Box>
                                                            <Box display="flex" gap={2}>
                                                                <Button
                                                                fullWidth
                                                                variant="contained"
                                                                sx={{ bgcolor: "#ff2d55", "&:hover": { bgcolor: "#e6264f" } }}
                                                                onClick={()=> {
                                                                  handleFollow(currentMessageUserData?._id); 
                                                                  setCurrentMessageUserData({...currentMessageUserData, isFollowed: !currentMessageUserData?.isFollowed}); 
                                                                  }}
                                                                >
                                                                {currentMessageUserData?.isFollowed ? 'UnFollow':'Follow'}
                                                                </Button>
                                                                <Button fullWidth variant="outlined" onClick={()=> setOpenReport(true)}>
                                                                Report
                                                                </Button>
                                                            </Box>
                                                        </Menu>
    
                                                  <Box
                                                    className="options-button"
                                                      sx={{
                                                        cursor: 'pointer',
                                                        ml: 1,
                                                        visibility: 'hidden', // hidden by default
                                                      }} ml="auto"  onClick={(e) => handleMenuOpen(e, msg.name)}>
                                                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.66016 12C2.66016 10.8954 3.55559 10 4.66016 10C5.76471 10 6.66016 10.8954 6.66016 12C6.66016 13.1045 5.76471 14 4.66016 14C3.55559 14 2.66016 13.1045 2.66016 12ZM10.6602 12C10.6602 10.8954 11.5556 10 12.6602 10C13.7647 10 14.6602 10.8954 14.6602 12C14.6602 13.1045 13.7647 14 12.6602 14C11.5556 14 10.6602 13.1045 10.6602 12ZM18.6602 12C18.6602 10.8954 19.5556 10 20.6602 10C21.7647 10 22.6602 10.8954 22.6602 12C22.6602 13.1045 21.7647 14 20.6602 14C19.5556 14 18.6602 13.1045 18.6602 12Z" fill="#161823"/>
                                                      </svg>
                                                  </Box>
    
                                                </Box>
                                              ))}
                                              <div ref={messagesEndRef} />
                                              <Menu
                                                anchorEl={menuAnchor}
                                                open={Boolean(menuAnchor)}
                                                onClose={handleMenuClose}
                                                PaperProps={{
                                                  elevation: 4,
                                                  sx: {
                                                      mt: 1,
                                                      borderRadius: 2,
                                                      minWidth: 250,
                                                      boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                                                  },
                                                  }}
                                                  anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                    }} 
                                              >
    
                                                {/* <MenuItem onClick={() => handleReport(menuMsgId!)}>Report</MenuItem> */}
    
                                                <MenuItem  sx={{ py: 1.25 , '&:hover': { bgcolor: '#f5f5f5'}}}>
                                                    <ListItemIcon>
                                                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.7727 18.8672C8.97271 18.8672 7.39771 18.5047 6.05188 17.7839C4.74007 17.1113 3.65482 16.0681 2.93104 14.7839C2.18855 13.3963 1.81683 11.8405 1.85188 10.2672C1.85188 8.58385 2.21438 7.11302 2.93521 5.84635C3.65857 4.57576 4.73362 3.54123 6.03104 2.86719C7.36438 2.15885 8.89771 1.80469 10.631 1.80469C12.3144 1.80469 13.7935 2.12552 15.0727 2.76302C16.3644 3.39219 17.3644 4.29219 18.0727 5.46719C18.8128 6.69691 19.1884 8.11149 19.156 9.54635C19.156 11.013 18.8144 12.213 18.131 13.1464C17.4519 14.063 16.4935 14.5255 15.256 14.5255C14.481 14.5255 13.8644 14.3589 13.4144 14.0255C13.1836 13.8414 12.9985 13.6065 12.8735 13.3391C12.7484 13.0717 12.6869 12.779 12.6935 12.4839L12.9727 12.6089C12.78 13.1936 12.3915 13.694 11.8727 14.0255C11.3012 14.3728 10.6411 14.5465 9.97271 14.5255C9.28713 14.5518 8.60862 14.3789 8.01926 14.0276C7.42991 13.6764 6.95496 13.1619 6.65188 12.5464C6.32154 11.8742 6.15723 11.1326 6.17271 10.3839C6.17271 9.57135 6.32688 8.85885 6.63104 8.24635C6.93266 7.63416 7.40435 7.12188 7.98962 6.77087C8.5749 6.41985 9.24894 6.24498 9.93104 6.26719C10.681 6.26719 11.306 6.43802 11.8144 6.78385C12.331 7.11719 12.6894 7.59219 12.8727 8.20469L12.5935 8.54635V6.86302C12.5935 6.75251 12.6374 6.64653 12.7156 6.56839C12.7937 6.49025 12.8997 6.44635 13.0102 6.44635H13.956C14.0666 6.44635 14.1725 6.49025 14.2507 6.56839C14.3288 6.64653 14.3727 6.75251 14.3727 6.86302V11.8839C14.3727 12.2464 14.4644 12.5089 14.6519 12.6839C14.8519 12.8464 15.1185 12.9255 15.4519 12.9255C16.0269 12.9255 16.4727 12.613 16.7935 11.9839C17.1269 11.3464 17.2935 10.5505 17.2935 9.60885C17.2935 8.33802 17.0144 7.23802 16.4519 6.30469C15.9135 5.38042 15.1131 4.63656 14.1519 4.16719C13.0768 3.63967 11.8908 3.37817 10.6935 3.40469C9.31854 3.40469 8.09771 3.69219 7.03104 4.26719C6.00107 4.81853 5.14863 5.65075 4.57271 6.66719C3.96934 7.76191 3.66604 8.99667 3.69354 10.2464C3.69354 11.6589 3.98521 12.8922 4.57271 13.9464C5.15604 14.988 5.98938 15.7839 7.07271 16.3464C8.26001 16.93 9.57099 17.2173 10.8935 17.1839H15.0977C15.2082 17.1839 15.3142 17.2278 15.3923 17.3059C15.4705 17.384 15.5144 17.49 15.5144 17.6005V18.4505C15.5144 18.561 15.4705 18.667 15.3923 18.7451C15.3142 18.8233 15.2082 18.8672 15.0977 18.8672H10.7727ZM10.356 12.9839C11.0727 12.9839 11.6394 12.7505 12.0519 12.2839C12.481 11.8172 12.6935 11.1839 12.6935 10.3839C12.6935 9.58385 12.481 8.95052 12.0519 8.48385C11.8377 8.24898 11.5742 8.06441 11.2803 7.94339C10.9864 7.82237 10.6693 7.76788 10.3519 7.78385C9.64354 7.78385 9.08104 8.01719 8.65188 8.48385C8.23938 8.95052 8.03104 9.58385 8.03104 10.3839C8.03104 11.1839 8.23938 11.8172 8.65604 12.2839C8.87135 12.5161 9.13443 12.699 9.42719 12.8198C9.71995 12.9407 10.0354 12.9966 10.3519 12.9839H10.356Z" fill="#161823"/>
                                                        </svg>
                                                    </ListItemIcon>
                                                    <ListItemText primary="Reply" />
                                                </MenuItem>
    
                                              </Menu>
                                            </>
                                            
    
                                            {selectedLiveVideo?.details?.topViewersGifts.length > 0 &&  <Divider textAlign="center" sx={{ fontSize: 12, mb: 1 }}>
                                            New
                                            </Divider>
                                                  }
    
                                            <Box
                                              sx={{
                                                  bgcolor: '#f8f8f8',
                                                  px: 2,
                                                  py: 1,
                                                  borderRadius: 1,
                                                  mb: 2,
                                              }}
                                            >
                                            {newJoiner && <Typography fontSize={12} color="text.secondary">🌿 {newJoiner?.name || ''}  joined</Typography> }
                                            <Typography fontSize={12} fontWeight={500}>
                                            {newJoiner && newJoiner?.from == loggedInUserId && <>💲 Welcome to Seezitt LIVE! Have fun interacting with others in real time. Creators must be 18 or older to go LIVE. Viewers must be 18 or older to recharge and send Gifts. Remember to follow our Community Guidelines.</>}
                                            </Typography>
                                            
                                            </Box>
                                            
                                        </Box>
    
                                        {/* Floating Banner */}
                                        {!isFollowed && showFollowDiv && <Paper
                                            elevation={3}
                                            sx={{
                                            position: 'absolute',
                                            bottom: '3.5rem',
                                            zIndex: 2,
                                            left: '2.5%',
                                            width: '95%',
                                            p: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            borderRadius: 2,
                                            border: '1px solid #eee',
                                            mb: 1,
                                            flexDirection: 'column',
                                            }}
                                        >
                                            <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} mb={1}>
                                                <Avatar src={selectedLiveVideo?.details?.owner?.photo} sx={{ width: 40, height: 40, mr: 1 }} />
    
                                                <Box flexGrow={1}>
                                                <Typography fontSize={13} fontWeight={600}>Hi {profileData?.username},</Typography>
                                                <Typography fontSize={12} color="text.secondary">
                                                    Stay tuned for my LIVE!
                                                </Typography>
                                                </Box>
                                                <IconButton onClick={() => setShowFollowDiv(false)} size="small" sx={{position: 'absolute', top: 8, right: 4}}>
                                                <CloseIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
    
                                             <Box px={2} mb={1} width={'100%'} m={'auto'} onClick={()=>handleFollow(selectedLiveVideo?.details?.owner?.id)}>
                                                <Box
                                                sx={{
                                                    bgcolor: '#ff2e63',
                                                    color: '#fff',
                                                    py: 1,
                                                    borderRadius: 1.5,
                                                    textAlign: 'center',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                                >
                                                + Follow
                                                </Box>
                                            </Box>
                                        </Paper>}
    
                                        {/* Follow Button */}
                                        <CustomMediaPicker isDarkTheme={false} isPickerVisible={isPickerVisible} setIsPickerVisible={setIsPickerVisible} setMessageType={setMessageType} setMessage={setMessage} setUploadedFile={setUploadedFile} setOpenUploadPic={setOpenUploadPic} setFilePreview={setFilePreview} />
    
                                        {/* Chat Input */}
                                      
                                        <Box
                                            px={2}
                                            pb={2}
                                            sx={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              position: 'absolute',
                                              bottom: 0,
                                              left: 0,
                                              background: '#fff',
                                              pt: 2,
                                              gap: 1,
                                            }}
                                          >
                                            <TextField
                                              fullWidth
                                              placeholder="Say something nice"
                                              variant="outlined"
                                              size="small"
                                              value={message}
                                              onChange={(e) => setMessage(e.target.value)}
                                              onKeyPress={handleKeyPress}
                                              InputProps={{
                                                endAdornment: (
                                                  <InputAdornment position="end">
                                                    {/* Emoji button inside TextField */}
                                                    <IconButton onClick={() => setIsPickerVisible(!isPickerVisible)}>
                                                      <img
                                                        className="w-6 h-6 object-contain rounded-full"
                                                        src={emoji}
                                                        alt="emoji-icon"
                                                      />
                                                    </IconButton>
                                                  </InputAdornment>
                                                ),
                                                sx: { borderRadius: 2, color: darkTheme ? '#fff' : '#000', },
                                              }}
                                            />
    
                                            {/* Send button outside TextField */}
                                            <IconButton onClick={handleSendMessage}>
                                              <SendIcon />
                                            </IconButton>
                                          </Box>
                                </Box>
                            </Box>  
                            )}
                  </Box>
    </Box>
  );
};

export default SidebarChat;
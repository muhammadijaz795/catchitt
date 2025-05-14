import { SideNavBar } from './goLiveSidebar';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, Chip, AppBar, Typography, Collapse, CardMedia, Stack, Avatar, Grid, CardContent, Button, Toolbar, Paper, Divider, TextField, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

function LiveWithChat() {


  type LiveStream = {
    id: string;
    title: string;
    username: string;
    viewers: number;
    imageUrl: string;
    userAvatar: string;
  };
  
  const dummyData: LiveStream[] = [
    {
      id: '1',
      title: 'Watch now and interact with others in real time!',
      username: '🔥G u j  ج ﻟ آ r x S I M B 🔺🔥',
      viewers: 9,
      imageUrl: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-1533004581829-aab5b0d67147?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: '2',
      title: 'lag ke',
      username: 'jia ( ͡° ͜ʖ ͡°)',
      viewers: 4,
      imageUrl: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-fb-1492571002-e2c96d7a6823.jpg?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: '3',
      title: 'Event ws 9.50k',
      username: 'ROOM TARKAM MAS R',
      viewers: 7,
      imageUrl: 'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-1611689283666-173278c4384eimage?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];


  
  const Esports: LiveStream[] = [
    {
      id: '1',
      title: 'Watch now and interact ',
      username: '🔥G u j  ج ﻟ آ r x S I M B 🔺🔥',
      viewers: 9,
      imageUrl: '  https://plus.unsplash.com/premium_photo-1671379041175-782d15092945?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-1619365647820-cf41703f74faimage?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
    },
    {
      id: '2',
      title: 'lag ke',
      username: 'jia ( ͡° ͜ʖ ͡°)',
      viewers: 4,
      imageUrl: 'https://images.unsplash.com/photo-1509909756405-be0199881695?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-1550087903695-7c004a4e6a85?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: '3',
      title: 'Event ws 9.50k',
      username: 'ROOM TARKAM MAS R',
      viewers: 7,
      imageUrl: 'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-1611689283666-173278c4384eimage?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];
  const LiveStreamCard = ({ stream }: { stream: LiveStream }) => (
    <Box sx={{ borderRadius: 2, width: "100%", position: 'relative', mr: 2, textAlign: 'left' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={stream.imageUrl}
          height="160"
          alt={stream.title}
          sx={{ borderRadius: 2, maxHeight: 260 }}
        />
        <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', alignItems: 'center', gap: 0 }}>
            <span   className='w-9 rounded-sm text-sm ml-3 text-center text-white ' style={{ background: 'linear-gradient(113.02deg, #FF1764 0%, #ED3495 94.15%)'}}>
                Live
            </span>
          
          <span
          className='px-2'
            style={{borderRadius: 'none', background: '#00000080', fontSize: '13px', color: 'white', height: 20, display: 'flex', alignItems: 'center' }}
          >
            <PersonIcon sx={{ fontSize: 14 }} />
            {stream.viewers}
            </span>
        </Box>
      </Box>
      <Box sx={{ mt: 1, px: 0.5, pb: 1.5 }}>
      <Stack direction="row" spacing={1} mt={0.5}>
        <Avatar src={stream.userAvatar} sx={{ width: 24, height: 24 }} />
        <Box>
            <Typography variant="body2" fontWeight={500} noWrap>
            {stream.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
            {stream.username}
            </Typography>
        </Box>
        </Stack>
      </Box>
    </Box>
  );


const firstRowGifts = [
  { label: 'Star', emoji: '🌟', price: 99 },
  { label: 'Rose', emoji: '🌹', price: 1 },
  { label: 'Gold Boxing Glove', emoji: '🥊', price: 10 },
  { label: 'May 1', emoji: '👂', price: 1 },
  { label: 'Rosa', emoji: '🌹', price: 10 },
  { label: 'Cheer For You', emoji: '🎉', price: 1499 },
];

const secondRowGifts = [
  { label: 'Boom', emoji: '💥', price: 20 },
  { label: 'Fire', emoji: '🔥', price: 15 },
  { label: 'Love', emoji: '💖', price: 30 },
  { label: 'Clap', emoji: '👏', price: 7 },
  { label: 'Crown', emoji: '👑', price: 50 },
  { label: 'Smile', emoji: '😊', price: 5 },
];
const [expanded, setExpanded] = useState(false);


const renderGiftRow = (gifts) => (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        pb: 2,
      }}
    >
      {gifts.map((gift, index) => (
        <Box
          key={index}
          sx={{
            minWidth: 100,
            mx: 1,
            textAlign: 'center',
            flexShrink: 0,
          }}
        >
          <Box sx={{ fontSize: 32 }}>{gift.emoji}</Box>
          <Typography sx={{ fontSize: 14, mt: 0.5, whiteSpace: 'nowrap' }}>
            {gift.label}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 0.5 }}>
            <Box
              component="span"
              sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}
            >
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.77006 13.4193C11.3139 13.4193 14.1867 10.5464 14.1867 7.0026C14.1867 3.45878 11.3139 0.585938 7.77006 0.585938C4.22623 0.585938 1.35339 3.45878 1.35339 7.0026C1.35339 10.5464 4.22623 13.4193 7.77006 13.4193Z" fill="#FFEC9B"/>
                    <path d="M7.76998 11.9557C10.5084 11.9557 12.7283 9.73581 12.7283 6.9974C12.7283 4.25898 10.5084 2.03906 7.76998 2.03906C5.03157 2.03906 2.81165 4.25898 2.81165 6.9974C2.81165 9.73581 5.03157 11.9557 7.76998 11.9557Z" fill="#FACE15"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7093 7.4349C12.7219 7.29075 12.7283 7.14483 12.7283 6.9974C12.7283 4.259 10.5084 2.03906 7.76998 2.03906C5.03158 2.03906 2.81165 4.259 2.81165 6.9974C2.81165 7.14483 2.81808 7.29075 2.83068 7.4349C3.05217 4.90139 5.17899 2.91406 7.76998 2.91406C10.361 2.91406 12.4878 4.90139 12.7093 7.4349Z" fill="#FABC15"/>
                </svg>
            </Box>
            <Typography sx={{ fontSize: 14 }}>{gift.price}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );



  return (
    
        
        <Box sx={{display: 'flex', flexDirection: 'column' }}>
      
          {/* Top Navigation Bar */}
          {/* <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
              <Avatar src="/profile.jpg" sx={{ mr: 2 }} />
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                p.21.frankfut
              </Typography>
              <Button variant="outlined">Subscribe</Button>
              <Button variant="contained" color="error" sx={{ ml: 2 }}>Follow</Button>
            </Toolbar>
          </AppBar> */}

          {/* Main Content Grid */}
          <Grid container sx={{ flex: 1,}}>
            
            {/* Video Section */}
            <Grid item xs={9} sx={{ position: 'relative', bgcolor: '#000' }}>
                <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 2,
                      py: 1,
                      bgcolor: '#fff',
                      borderBottom: '1px solid #eee',
                      margin: '0 auto',
                    }}
                  >
                    {/* Left Side: Avatar and Info */}
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        alt="User"
                        src="/profile.jpg" // Replace with real image path
                        sx={{ width: 48, height: 48 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          p.21.frankfut ★彡[NIKU]彡★
                        </Typography>
                        <Typography variant="body2"sx={{ display: 'flex', alignItems: 'center' }} color="text.secondary">
                          Tapați &nbsp;&nbsp;
                          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.72998 2.9974C4.57841 2.9974 3.64155 3.9342 3.64155 5.0939C3.64155 6.2536 4.57841 7.19036 5.72998 7.19036C6.88158 7.19036 7.81845 6.2536 7.81845 5.0939C7.81845 3.9342 6.88158 2.9974 5.72998 2.9974ZM2.30821 5.0939C2.30821 3.20148 3.83835 1.66406 5.72998 1.66406C7.62161 1.66406 9.15178 3.20148 9.15178 5.0939C9.15178 6.9863 7.62161 8.5237 5.72998 8.5237C3.83835 8.5237 2.30821 6.9863 2.30821 5.0939ZM12.0633 5.33073C11.3719 5.33073 10.7912 5.90463 10.7912 6.63776C10.7912 7.37086 11.3719 7.94476 12.0633 7.94476C12.7547 7.94476 13.3354 7.37086 13.3354 6.63776C13.3354 5.90463 12.7547 5.33073 12.0633 5.33073ZM9.45788 6.63776C9.45788 5.1908 10.6132 3.9974 12.0633 3.9974C13.5134 3.9974 14.6688 5.1908 14.6688 6.63776C14.6688 8.0847 13.5134 9.2781 12.0633 9.2781C10.6132 9.2781 9.45788 8.0847 9.45788 6.63776ZM5.72998 10.9799C3.94881 10.9799 2.44182 12.1714 1.96334 13.8061C1.91162 13.9828 1.73713 14.1 1.55669 14.0635L0.903278 13.9313C0.722841 13.8948 0.605161 13.7183 0.653061 13.5406C1.25727 11.2984 3.29959 9.64653 5.72998 9.64653C8.16038 9.64653 10.2027 11.2984 10.8069 13.5406C10.8548 13.7183 10.7371 13.8948 10.5567 13.9313L9.90328 14.0635C9.72285 14.1 9.54835 13.9828 9.49665 13.8061C9.01815 12.1714 7.51118 10.9799 5.72998 10.9799ZM11.73 11.6992C11.3781 11.6992 11.0859 11.7467 10.8415 11.8254C10.6663 11.8819 10.4656 11.8192 10.3818 11.6553L10.0782 11.0618C9.99435 10.8979 10.0588 10.6955 10.2302 10.6284C10.6702 10.4561 11.1693 10.3658 11.73 10.3658C12.9603 10.3658 13.8643 10.8023 14.4912 11.5098C15.0137 12.0994 15.3057 12.8343 15.4785 13.5416C15.5221 13.7205 15.4041 13.8962 15.2235 13.9322L14.5697 14.0626C14.3892 14.0986 14.2148 13.9811 14.1694 13.8027C14.0261 13.2403 13.8113 12.7528 13.4933 12.394C13.1392 11.9944 12.6096 11.6992 11.73 11.6992Z" fill="#161823"/>
                          </svg>

                           4 &nbsp;&nbsp;
                          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.95659 2.89709C4.24213 3.09789 3.62277 3.54704 3.20993 4.16376C2.71659 4.89042 2.42326 5.99042 3.02326 7.55709C3.48993 8.78376 4.55659 10.0338 5.75659 11.1038C6.6603 11.91 7.64178 12.6246 8.68659 13.2371C9.73141 12.6246 10.7129 11.91 11.6166 11.1038C12.8166 10.0338 13.8833 8.78376 14.3499 7.55709C14.9499 5.99042 14.6599 4.89042 14.1666 4.16376C13.7546 3.54768 13.1365 3.0986 12.4233 2.89709C10.5999 2.52709 9.57659 3.69709 8.68659 4.95709C7.79659 3.69709 6.76326 2.53042 4.95326 2.89709H4.95659ZM8.68993 3.14709C9.75659 1.80709 11.2266 1.29376 12.6899 1.59042C13.4599 1.74376 14.5533 2.35042 15.2733 3.41709C16.0266 4.52376 16.3433 6.08042 15.5999 8.03376C15.0166 9.55709 13.7666 10.9771 12.5066 12.1004C11.4364 13.0614 10.2599 13.8968 8.99993 14.5904L8.68993 14.7538L8.37993 14.5904C7.11995 13.8968 5.94342 13.0614 4.87326 12.1004C3.61326 10.9771 2.36326 9.55709 1.77993 8.03376C1.03659 6.08042 1.35326 4.52376 2.10659 3.41709C2.82326 2.35042 3.91993 1.74376 4.68993 1.59042C6.15326 1.29042 7.62326 1.80709 8.68993 3.14709Z" fill="#161823"/>
                          </svg>
                           17.6K
                        </Typography>
                      </Box>
                    </Stack>

                    {/* Right Side: Buttons */}
                    <Stack direction="row" spacing={1}>
                      <IconButton sx={{borderRadius: '4px', color: '#000', border: '1px solid #1618231F'}}>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_2018_18635"  maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
                            <path d="M20.6599 0H0.659912V20H20.6599V0Z" fill="white"/>
                            </mask>
                            <g mask="url(#mask0_2018_18635)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5976 3.17495C11.5976 2.58272 12.3069 2.27873 12.7358 2.68715L19.2621 8.90241C19.8364 9.44937 19.8164 10.3717 19.2188 10.8931L12.7141 16.5689C12.2784 16.9491 11.5976 16.6397 11.5976 16.0614V13.4894C11.5976 13.4894 4.61344 12.2312 2.3731 16.3434C2.16423 16.7268 1.35008 16.8609 1.51557 14.948C2.20761 11.4273 3.62196 5.93084 11.5976 5.93084V3.17495Z" fill="#161823"/>
                            <path opacity="0.03" fill-rule="evenodd" clip-rule="evenodd" d="M16.4137 6.21094L17.7085 8.80069C17.9376 9.2588 17.8276 9.81386 17.4411 10.1499L11.6423 15.1923C11.6423 15.1923 11.3616 16.5957 12.2036 16.5957C13.0456 16.5957 19.7817 10.421 19.7817 10.421C19.7817 10.421 20.0624 9.57897 19.2204 8.73696C18.3784 7.89496 16.4137 6.21094 16.4137 6.21094Z" fill="#161823"/>
                            <path opacity="0.09" fill-rule="evenodd" clip-rule="evenodd" d="M11.5974 6.22916V13.5265C11.5974 13.5265 4.91355 12.5847 2.82022 15.7719C0.805979 18.8387 0.990969 12.3084 4.02327 9.05644C7.05557 5.80443 11.5974 6.22916 11.5974 6.22916Z" fill="#161823"/>
                            </g>
                        </svg>

                      </IconButton>
                      <IconButton sx={{borderRadius: '4px', color: '#000', border: '1px solid #1618231F', padding: '7.5px 6px'}}>
                          <svg width="25" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.65991 12C2.65991 10.8954 3.55534 10 4.65991 10C5.76446 10 6.65991 10.8954 6.65991 12C6.65991 13.1045 5.76446 14 4.65991 14C3.55534 14 2.65991 13.1045 2.65991 12ZM10.6599 12C10.6599 10.8954 11.5554 10 12.6599 10C13.7645 10 14.6599 10.8954 14.6599 12C14.6599 13.1045 13.7645 14 12.6599 14C11.5554 14 10.6599 13.1045 10.6599 12ZM18.6599 12C18.6599 10.8954 19.5554 10 20.6599 10C21.7645 10 22.6599 10.8954 22.6599 12C22.6599 13.1045 21.7645 14 20.6599 14C19.5554 14 18.6599 13.1045 18.6599 12Z" fill="#161823"/>
                          </svg>
                      </IconButton>
                      <Button variant="outlined" sx={{color: '#000', borderColor: '#1618231F', textTransform : 'capitalize'}}>Subscribe</Button>
                      <Button variant="contained" sx={{ background: '#FE2C55', color: '#fff' , textTransform : 'capitalize'}} >
                        Follow&nbsp;
                        <Box component="span" sx={{ bgcolor: '#fff', color: '#000', borderRadius: '50%', px: 0.5,py: 0.5, fontSize: 12, ml: 0.5 }}>
                          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.45422 4.32C8.25155 3.94667 7.95822 3.664 7.57422 3.472C7.20089 3.26933 6.75822 3.168 6.24622 3.168C5.36089 3.168 4.65155 3.46133 4.11822 4.048C3.58489 4.624 3.31822 5.39733 3.31822 6.368C3.31822 7.40267 3.59555 8.21333 4.15022 8.8C4.71555 9.376 5.48889 9.664 6.47022 9.664C7.14222 9.664 7.70755 9.49333 8.16622 9.152C8.63555 8.81067 8.97689 8.32 9.19022 7.68H5.71822V5.664H11.6702V8.208C11.4676 8.89067 11.1209 9.52533 10.6302 10.112C10.1502 10.6987 9.53689 11.1733 8.79022 11.536C8.04355 11.8987 7.20089 12.08 6.26222 12.08C5.15289 12.08 4.16089 11.84 3.28622 11.36C2.42222 10.8693 1.74489 10.192 1.25422 9.328C0.774221 8.464 0.534221 7.47733 0.534221 6.368C0.534221 5.25867 0.774221 4.272 1.25422 3.408C1.74489 2.53333 2.42222 1.856 3.28622 1.376C4.15022 0.885333 5.13689 0.639999 6.24622 0.639999C7.59022 0.639999 8.72089 0.965333 9.63822 1.616C10.5662 2.26667 11.1796 3.168 11.4782 4.32H8.45422Z" fill="#323442" fill-opacity="0.8"/>
                          </svg>
                        </Box>
                      </Button>
                    </Stack>
                </Box>
                <Box sx={{ width: '100%', height: '95%' }}>
                    {/* Placeholder for Video */}
                    <Typography color="white" align="center" >
                    Video Player Area
                    </Typography>

                    {/* Gift Bar */}
                    <Box sx={{ position: 'absolute', bottom: 0, width: '100%', bgcolor: '#111', p: 1, display: 'flex', justifyContent: 'space-around' }}>
                         <Box
                                sx={{
                                    bgcolor: '#1c1c1c',
                                    color: '#fff',
                                    borderRadius: 2,
                                    p: 2,
                                    width: '100%',
                                    maxWidth: 1100,
                                    mx: 'auto',
                                }}
                                >
                                {/* First Row */}
                                {renderGiftRow(firstRowGifts)}

                                {/* Arrow Toggle */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1 }}>
                                    <IconButton
                                    onClick={() => setExpanded((prev) => !prev)}
                                    sx={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        transition: 'transform 0.2s ease',
                                        color: '#fff',
                                        border: '1px solid #555',
                                        borderRadius: 1,
                                        mt: -1,
                                        height: '7rem'
                                    }}
                                    >
                                    <ExpandMoreIcon sx={{transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',}} />
                                    </IconButton>
                                </Box>

                                {/* Second Row (Expandable) */}
                                <Collapse in={expanded}>
                                    {renderGiftRow(secondRowGifts)}
                                </Collapse>


                                {/* Bottom: Coin Balance and Get Coins */}
                                <Box
                                    sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    px: 1,
                                    pt: 1,
                                    borderTop: '1px solid #333',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        Coin Balance:
                                    </Typography>
                                    <Box
                                        component="span"
                                        sx={{ color: 'gold', fontSize: 18, mx: 0.5 }}
                                    >
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.77006 13.4193C11.3139 13.4193 14.1867 10.5464 14.1867 7.0026C14.1867 3.45878 11.3139 0.585938 7.77006 0.585938C4.22623 0.585938 1.35339 3.45878 1.35339 7.0026C1.35339 10.5464 4.22623 13.4193 7.77006 13.4193Z" fill="#FFEC9B"/>
                                            <path d="M7.76998 11.9557C10.5084 11.9557 12.7283 9.73581 12.7283 6.9974C12.7283 4.25898 10.5084 2.03906 7.76998 2.03906C5.03157 2.03906 2.81165 4.25898 2.81165 6.9974C2.81165 9.73581 5.03157 11.9557 7.76998 11.9557Z" fill="#FACE15"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7093 7.4349C12.7219 7.29075 12.7283 7.14483 12.7283 6.9974C12.7283 4.259 10.5084 2.03906 7.76998 2.03906C5.03158 2.03906 2.81165 4.259 2.81165 6.9974C2.81165 7.14483 2.81808 7.29075 2.83068 7.4349C3.05217 4.90139 5.17899 2.91406 7.76998 2.91406C10.361 2.91406 12.4878 4.90139 12.7093 7.4349Z" fill="#FABC15"/>
                                        </svg>

                                    </Box>
                                    <Typography variant="body2" fontWeight="500">
                                        0
                                    </Typography>
                                    </Box>

                                    <Button
                                    variant="outlined"
                                    sx={{
                                        borderColor: '#FE2C55',
                                        color: '#FE2C55',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        px: 2,
                                        mx: 1,
                                        '&:hover': {
                                        borderColor: '#d62949',
                                        backgroundColor: '#2a2a2a',
                                        },
                                    }}
                                    >
                                    Get Coins
                                    </Button>
                                </Box>
                         </Box>
                    </Box>
                </Box>
                <Box sx={{px: 2}}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" fontSize={'22px'} color={'#161823'} fontWeight={600}>
                        Recommended LIVE videos
                        </Typography>
                    
                    </Box>
                    <Grid container spacing={2}>
                        {dummyData.map((stream) => (
                            <Grid item xs={12} sm={6} key={stream.id}>
                                <LiveStreamCard stream={stream} />
                            </Grid>
                        ))}
                    </Grid>
                </Box> 
            </Grid>

            {/* Right Sidebar */}
            <Grid item xs={3} sx={{ bgcolor: '#fafafa', borderLeft: '1px solid #ddd', p: 0 }}>
              <Box
                sx={{
                    bgcolor: '#fff',
                    borderRadius: 1,
                    boxShadow: 1,
                    position: 'relative'
                }}>
                <Box sx={{ display: 'flex', justifyContent: 'center',position: 'relative', p: 1, borderBottom: '1px solid rgba(22, 24, 35, 0.2)' }}>
                     <span className='absolute left-3 top-3.5'>
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5005 8.62453H13.4095L8.84513 13.1889C8.6987 13.3353 8.6987 13.5728 8.84513 13.7192L9.90578 14.7799C10.0523 14.9263 10.2897 14.9263 10.4361 14.7799L16.921 8.29505C17.3603 7.8557 17.3603 7.14339 16.921 6.70404L10.4361 0.219212C10.2897 0.0727628 10.0523 0.0727628 9.90578 0.219212L8.84513 1.27987C8.6987 1.42632 8.6987 1.66375 8.84513 1.8102L13.4094 6.37453H4.5005C4.29338 6.37453 4.1255 6.54242 4.1255 6.74953V8.24953C4.1255 8.4566 4.29338 8.62453 4.5005 8.62453ZM3.00049 1.49951C3.00049 1.29241 2.83259 1.12451 2.62549 1.12451H1.12549C0.91838 1.12451 0.750488 1.29241 0.750488 1.49951V13.4995C0.750488 13.7066 0.91838 13.8745 1.12549 13.8745H2.62549C2.83259 13.8745 3.00049 13.7066 3.00049 13.4995V1.49951Z" fill="#161823"/>
                        </svg>
                    </span>
                    <Typography fontWeight={700} fontSize={18}>
                    LIVE chat
                    </Typography>
                </Box>
                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 1.5,
                    mb: 1,
                    p: 1,
                    }}
                >
                    <Typography fontWeight={500} fontSize={16}>
                    Top viewers
                    </Typography>
                    <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
                </Box>

                 <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                    {/* Viewer 1 */}
                        <Box textAlign="center" sx={{display: 'flex' , alignItems: 'center', gap: 2}}>
                            <Typography
                            sx={{
                                pl: 2,
                            }}
                            >
                                <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.854 7.03912C13.931 6.58712 16.2 3.45913 16.797 1.95312H26.052V44.9061H16.632V13.2561C13.048 14.6691 9.332 15.2341 4.854 15.2341V7.03912Z" fill="url(#paint0_linear_2018_18436)"/>
                                    <mask id="mask0_2018_18436"  maskUnits="userSpaceOnUse" x="4" y="1" width="23" height="44">
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
                            <Box >
                                    <Avatar
                                        src="https://i.pravatar.cc/50?img=1"
                                        alt="Alinuska"
                                        sx={{
                                        width: 48,
                                        height: 48,
                                        mx: 'auto',
                                        border: '2px solid rgba(245, 214, 151, 1)',
                                        }}
                                    />
                                    <Typography fontSize={13} fontWeight={600} mt={0.5}>
                                        Alinuska
                                    </Typography>
                                    <Box display="flex" justifyContent="center" alignItems="center" mt={0.2}>
                                        <Box component="span" sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}>
                                            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.29997 13.9193C10.8438 13.9193 13.7166 11.0464 13.7166 7.5026C13.7166 3.95878 10.8438 1.08594 7.29997 1.08594C3.75614 1.08594 0.883301 3.95878 0.883301 7.5026C0.883301 11.0464 3.75614 13.9193 7.29997 13.9193Z" fill="#FFEC9B"/>
                                                <path d="M7.30013 12.4557C10.0385 12.4557 12.2585 10.2358 12.2585 7.4974C12.2585 4.75898 10.0385 2.53906 7.30013 2.53906C4.56172 2.53906 2.3418 4.75898 2.3418 7.4974C2.3418 10.2358 4.56172 12.4557 7.30013 12.4557Z" fill="#FACE15"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2394 7.9349C12.252 7.79075 12.2585 7.64483 12.2585 7.4974C12.2585 4.759 10.0385 2.53906 7.30013 2.53906C4.56173 2.53906 2.3418 4.759 2.3418 7.4974C2.3418 7.64483 2.34823 7.79075 2.36083 7.9349C2.58232 5.40139 4.70914 3.41406 7.30013 3.41406C9.89112 3.41406 12.0179 5.40139 12.2394 7.9349Z" fill="#FABC15"/>
                                            </svg>
                                        </Box>
                                        <Typography fontSize={13}>1</Typography>
                                    </Box>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2}}>
                            <Box textAlign="center" sx={{display: 'flex' , alignItems: 'center', gap: 2}}>
                                <Typography
                                sx={{
                                    px: 0
                                }}
                                >
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
                                                src="https://i.pravatar.cc/50?img=1"
                                                alt="Alinuska"
                                                sx={{
                                                width: 48,
                                                height: 48,
                                                mx: 'auto',
                                                border: '2px solid rgba(245, 214, 151, 1)',
                                                }}
                                            />
                                        <Box pl={1}>
                                            <Typography fontSize={13} fontWeight={600} mt={0.5}>
                                                MK6
                                            </Typography>
                                        
                                            <Box display="flex" justifyContent="center" alignItems="center" mt={0.2}>
                                                <Box component="span" sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}>
                                                    <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.29997 13.9193C10.8438 13.9193 13.7166 11.0464 13.7166 7.5026C13.7166 3.95878 10.8438 1.08594 7.29997 1.08594C3.75614 1.08594 0.883301 3.95878 0.883301 7.5026C0.883301 11.0464 3.75614 13.9193 7.29997 13.9193Z" fill="#FFEC9B"/>
                                                        <path d="M7.30013 12.4557C10.0385 12.4557 12.2585 10.2358 12.2585 7.4974C12.2585 4.75898 10.0385 2.53906 7.30013 2.53906C4.56172 2.53906 2.3418 4.75898 2.3418 7.4974C2.3418 10.2358 4.56172 12.4557 7.30013 12.4557Z" fill="#FACE15"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2394 7.9349C12.252 7.79075 12.2585 7.64483 12.2585 7.4974C12.2585 4.759 10.0385 2.53906 7.30013 2.53906C4.56173 2.53906 2.3418 4.759 2.3418 7.4974C2.3418 7.64483 2.34823 7.79075 2.36083 7.9349C2.58232 5.40139 4.70914 3.41406 7.30013 3.41406C9.89112 3.41406 12.0179 5.40139 12.2394 7.9349Z" fill="#FABC15"/>
                                                    </svg>
                                                </Box>
                                                <Typography fontSize={13}>1</Typography>
                                            </Box>
                                        </Box>
                                </Box>
                            </Box>

                            <Box textAlign="center" sx={{display: 'flex' , alignItems: 'center', gap: 2}}>
                                <Typography
                                sx={{
                                    px: 0
                                }}
                                >
                                <svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                                src="https://i.pravatar.cc/50?img=1"
                                                alt="Alinuska"
                                                sx={{
                                                width: 48,
                                                height: 48,
                                                mx: 'auto',
                                                border: '2px solid rgba(245, 214, 151, 1)',
                                                }}
                                            />
                                        <Box pl={1}>
                                            <Typography fontSize={11} fontWeight={600} mt={0.5}>
                                                Timus Marina
                                            </Typography>
                                        
                                            <Box display="flex" justifyContent="center" alignItems="center" mt={0.2}>
                                                <Box component="span" sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}>
                                                    <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.29997 13.9193C10.8438 13.9193 13.7166 11.0464 13.7166 7.5026C13.7166 3.95878 10.8438 1.08594 7.29997 1.08594C3.75614 1.08594 0.883301 3.95878 0.883301 7.5026C0.883301 11.0464 3.75614 13.9193 7.29997 13.9193Z" fill="#FFEC9B"/>
                                                        <path d="M7.30013 12.4557C10.0385 12.4557 12.2585 10.2358 12.2585 7.4974C12.2585 4.75898 10.0385 2.53906 7.30013 2.53906C4.56172 2.53906 2.3418 4.75898 2.3418 7.4974C2.3418 10.2358 4.56172 12.4557 7.30013 12.4557Z" fill="#FACE15"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2394 7.9349C12.252 7.79075 12.2585 7.64483 12.2585 7.4974C12.2585 4.759 10.0385 2.53906 7.30013 2.53906C4.56173 2.53906 2.3418 4.759 2.3418 7.4974C2.3418 7.64483 2.34823 7.79075 2.36083 7.9349C2.58232 5.40139 4.70914 3.41406 7.30013 3.41406C9.89112 3.41406 12.0179 5.40139 12.2394 7.9349Z" fill="#FABC15"/>
                                                    </svg>
                                                </Box>
                                                <Typography fontSize={12}>2</Typography>
                                            </Box>
                                        </Box>
                                </Box>
                            </Box>
                        </Box>

                        
                 </Box>

                  <Box sx={{ bgcolor: '#fff', height: '100%', fontFamily: 'sans-serif' }}>
                        {/* Chat Messages */}
                        <Box sx={{ px: 2, pt: 1, maxHeight: 360, overflowY: 'auto' }}>
                            {/* Message 1 */}
                            <Typography fontSize={13} mb={0.5} color="text.secondary">
                            Ap uitetė
                            </Typography>

                            <Box display="flex" alignItems="flex-start" mb={1}>
                            <Avatar src="https://i.pravatar.cc/50?img=2" sx={{ width: 24, height: 24, mr: 1 }} />
                            <Box>
                                <Typography fontSize={13} fontWeight={600}>Mk6</Typography>
                                <Typography fontSize={13}>Uai</Typography>
                            </Box>
                            </Box>

                            {/* Message 2 with badges */}
                            <Box display="flex" alignItems="flex-start" mb={1}>
                            <Avatar src="https://i.pravatar.cc/50?img=4" sx={{ width: 24, height: 24, mr: 1 }} />
                            <Box>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                <Typography fontSize={13} fontWeight={600}>arthouseconstruct1</Typography>
                                <Chip label="10" size="small" sx={{ height: 18, fontSize: 10 }} />
                                <Chip label="1" size="small" color="error" sx={{ height: 18, fontSize: 10 }} />
                                </Box>
                                <Typography fontSize={13}>
                                Ca alina mio trimis laifu si imi spune ca nui si nu pot sa intru nici sa ma uit in laiw la tine
                                </Typography>
                            </Box>
                            </Box>

                            {/* Message 3 with badge */}
                            <Box display="flex" alignItems="flex-start" mb={1}>
                            <Avatar src="https://i.pravatar.cc/50?img=5" sx={{ width: 24, height: 24, mr: 1 }} />
                            <Box>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                <Typography fontSize={13} fontWeight={600}>arthouseconstruct1</Typography>
                                <Chip label="10" size="small" sx={{ height: 18, fontSize: 10 }} />
                                <Chip label="No. 2" size="small" color="error" sx={{ height: 18, fontSize: 10 }} />
                                </Box>
                                <Typography fontSize={13}>Teai uitat</Typography>
                            </Box>
                            </Box>

                            {/* Message 4 */}
                            <Box display="flex" alignItems="flex-start" mb={1}>
                            <Avatar src="https://i.pravatar.cc/50?img=6" sx={{ width: 24, height: 24, mr: 1 }} />
                            <Box>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                <Typography fontSize={13} fontWeight={600}>💎 Dorina</Typography>
                                <Chip label="16" size="small" color="primary" sx={{ height: 18, fontSize: 10 }} />
                                </Box>
                                <Typography fontSize={13}>Privetik</Typography>
                            </Box>
                            </Box>

                            {/* Message 5 */}
                            <Box display="flex" alignItems="flex-start" mb={2}>
                            <Avatar src="https://i.pravatar.cc/50?img=4" sx={{ width: 24, height: 24, mr: 1 }} />
                            <Box>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                <Typography fontSize={13} fontWeight={600}>arthouseconstruct1</Typography>
                                <Chip label="10" size="small" sx={{ height: 18, fontSize: 10 }} />
                                <Chip label="1" size="small" color="error" sx={{ height: 18, fontSize: 10 }} />
                                </Box>
                                <Typography fontSize={13}>Da da</Typography>
                            </Box>
                            </Box>

                            {/* New Divider */}
                            <Divider textAlign="center" sx={{ fontSize: 12, mb: 1 }}>
                            New
                            </Divider>

                            {/* System Message */}
                            <Box
                            sx={{
                                bgcolor: '#f8f8f8',
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                mb: 2,
                            }}
                            >
                            <Typography fontSize={12} fontWeight={500}>
                                💲 Welcome to Seezitt LIVE! Have fun interacting with others in real time. Creators must be 18 or older to go LIVE. Viewers must be 18 or older to recharge and send Gifts. Remember to follow our Community Guidelines.
                            </Typography>
                            </Box>

                            {/* Joined message */}
                            <Typography fontSize={12} color="text.secondary">🌿 truwhofacer213 joined</Typography>
                        </Box>

                        {/* Floating Banner */}
                        <Paper
                            elevation={3}
                            sx={{
                            position: 'relative',
                            mx: 2,
                            mt: 2,
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
                                <Avatar src="https://i.pravatar.cc/50?img=7" sx={{ width: 40, height: 40, mr: 1 }} />
                                <Box flexGrow={1}>
                                <Typography fontSize={13} fontWeight={600}>Hi Jannifer</Typography>
                                <Typography fontSize={12} color="text.secondary">
                                    Stay tuned for my LIVE!
                                </Typography>
                                </Box>
                                <IconButton size="small" sx={{position: 'absolute', top: 8, right: 4}}>
                                <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            <Box px={2} mb={1} width={'100%'} m={'auto'}>
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
                        </Paper>

                        {/* Follow Button */}
                        

                        {/* Chat Input */}
                        <Box px={2} pb={2}>
                            <TextField
                            fullWidth
                            placeholder="Say something nice"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                    <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                                ),
                                sx: { borderRadius: 2 },
                            }}
                            />
                        </Box>
                  </Box>
             </Box>

             
            </Grid>
          </Grid>

          
        </Box>


     
  );
}

export default LiveWithChat;

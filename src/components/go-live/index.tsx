import { SideNavBar } from './goLiveSidebar';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, Chip, AppBar, Typography, Card, CardMedia, Stack, Avatar, Grid, CardContent, Button, Toolbar, Paper } from '@mui/material';
import LiveStreaming from './liveStream';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '../profile/svg-components/ShareIcon';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LiveWithChat from './liveWithChat';
import  styles  from './GoLive.module.scss';

function GoLive() {
  function scrollToTop()
  {
    document.querySelectorAll('*').forEach(el => el.scrollTo({ top: 0, behavior: 'smooth' }));
  };
  const chipLabels = [
    'All',
    'Entertainment',
    'Beauty & Style',
    'Performance',
    'Sports & Outdoors',
    'Talent',
    'Nature',
    'Comedy',
    'Vlogs',
    'Tech',
    'Talent',
    'Nature',
    'Comedy',
    'Vlogs',
    'Tech',
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [mediaByCategory, setMediaByCategory] = useState({
    selectedCategory: 'all',
    items: [],
    page: 1,
  });

  const scroll = (direction: 'left' | 'right') => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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

  const dummyData2: LiveStream[] = [
    {
      id: '1',
      title: 'Watch now and interact ',
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

  const RecomendedCard = ({ stream }: { stream: LiveStream }) => (
    <Box sx={{ borderRadius: 2, width: "100%", position: 'relative', mr: 2, textAlign: 'left' }}>
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <CardMedia
          component="img"
          image={stream.imageUrl}
          alt={stream.title}
          sx={{ borderRadius: 2, maxHeight: 185, height: 185 }}
        />
      </Box>
      <Box sx={{ mt: 1, px: 0.5, pb: 1.5 }}>
      <Stack direction="row" spacing={1} mt={0.5}>
        <Avatar src={stream.userAvatar} sx={{ width: 24, height: 24 }} />
        <Box>
            <Typography variant="body2" fontWeight={500} >
            {stream.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" >
            {stream.username}
            </Typography>
        </Box>
        </Stack>
      </Box>
    </Box>
  );
 const [darkTheme, setdarkTheme] = useState('');
    const [darkThemeblack, setdarkThemeblack] = useState('');
    const [textColor, setTextColor] = useState('black');
    const [textColorClass, setTextColorClass] = useState(styles.textBlackColor);

  useEffect(() => {
          var themeColor = window.localStorage.getItem('theme');
          
          if(themeColor == "dark"){ 
              setdarkTheme(styles.darkTheme);
              setdarkThemeblack(styles.darkThemeblack);
              setTextColor("white");
              setTextColorClass(styles.textWhiteColor);
          }else{
              // setdarkTheme(style.lightTheme);
              setTextColor("black");
              setTextColorClass(styles.textBlackColor);
          }
      });
  

  return (
    <div className='flex' style={{ background: '#000' }}>
      <SideNavBar />
      <div className={`${darkTheme} w-[calc(100%-16rem)] ml-auto bg-white `}>
        <LiveWithChat darkTheme={darkTheme} />

      </div>
      <button className='bg-[#FE2C55] rounded-full p-1 fixed right-2 bottom-2' onClick={scrollToTop}>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.1367 6.77725C13.168 6.74626 13.1927 6.70939 13.2097 6.66877C13.2266 6.62815 13.2353 6.58458 13.2353 6.54058C13.2353 6.49657 13.2266 6.45301 13.2097 6.41239C13.1927 6.37177 13.168 6.3349 13.1367 6.30391L8.70671 1.87058C8.51921 1.68331 8.26504 1.57812 8.00004 1.57812C7.73504 1.57812 7.48087 1.68331 7.29337 1.87058L2.86004 6.30391C2.8288 6.3349 2.804 6.37177 2.78708 6.41239C2.77015 6.45301 2.76144 6.49657 2.76144 6.54058C2.76144 6.58458 2.77015 6.62815 2.78708 6.66877C2.804 6.70939 2.8288 6.74626 2.86004 6.77725L3.79671 7.71058C3.82825 7.74241 3.86588 7.76756 3.90736 7.78451C3.94884 7.80147 3.99332 7.80989 4.03812 7.80927C4.08293 7.80865 4.12715 7.799 4.16815 7.78089C4.20914 7.76279 4.24606 7.73661 4.27671 7.70391L7.00004 4.83058V11.5806C7.00004 11.669 7.03516 11.7538 7.09767 11.8163C7.16018 11.8788 7.24497 11.9139 7.33337 11.9139H8.66671C8.75511 11.9139 8.8399 11.8788 8.90241 11.8163C8.96492 11.7538 9.00004 11.669 9.00004 11.5806V4.82725L11.7234 7.70724C11.7542 7.73972 11.7913 7.76564 11.8325 7.78346C11.8736 7.80127 11.9179 7.81061 11.9627 7.81092C12.0075 7.81124 12.0519 7.80251 12.0932 7.78527C12.1346 7.76803 12.1721 7.74262 12.2034 7.71058L13.1367 6.77725ZM2.66671 12.9139C2.5783 12.9139 2.49352 12.949 2.43101 13.0115C2.36849 13.0741 2.33337 13.1588 2.33337 13.2472V14.5806C2.33337 14.669 2.36849 14.7538 2.43101 14.8163C2.49352 14.8788 2.5783 14.9139 2.66671 14.9139H13.3334C13.4218 14.9139 13.5066 14.8788 13.5691 14.8163C13.6316 14.7538 13.6667 14.669 13.6667 14.5806V13.2472C13.6667 13.1588 13.6316 13.0741 13.5691 13.0115C13.5066 12.949 13.4218 12.9139 13.3334 12.9139H2.66671Z" fill="white"/>
        </svg>
      </button>
    </div>
  );
}

export default GoLive;

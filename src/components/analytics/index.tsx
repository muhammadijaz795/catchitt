import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Divider, MenuItem, Menu, ThemeProvider, createTheme, Box, Typography, Grid, Card, CardMedia, CardContent, Tabs, Tab, Container, Select, Chip, IconButton } from '@mui/material';
import OverviewTab from './OverviewTab';
import ContentTab from './ContentTab';
import ViewersTab from './ViewersTab';
import FollowersTab from './FollowersTab';
import { ANALYTICS_OVERVIEW_TIME_PERIODS, ANALYTICSTABS } from '../../utils/constants';
import styles from './style.module.scss';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const articles = [
    {
      title: "Posting Sub-only videos to strengthen the bond with your",
      description: "Ever wonder what gets someone to hit that \"Subscribe\" button? The chanc",
      image: "https://img.freepik.com/free-vector/mass-media-design-concept_98292-7567.jpg?semt=ais_hybrid&w=740",
    },
    {
      title: "LIVE for your business: engage, convert, and grow",
      description: "Whether you have a side gig, a small business, or a global enterprise, LIVE",
      image: "https://img.freepik.com/premium-photo/vintage-typewriter-with-inserted-sheet-paper-foggy-urban-landscape-dark-river_266732-15963.jpg?semt=ais_hybrid&w=740",
    },
    {
      title: "Unlocking LIVE monetization",
      description: "Get more from your LIVEs! Explore all the ways you can monetize your",
      image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Setting up your Subscription",
      description: "At Seezit, we love building communities, and our new",
      image: "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
  ];
  const trendingVideos = [
    {
      title: '32kg Mop it’s not enough',
      username: '@Anatoly',
      views: '34M',
      duration: '0:18',
      thumbnail: 'https://images.pexels.com/photos/4588428/pexels-photo-4588428.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Most beautiful statue in the world',
      username: '@VerticalRio',
      views: '39M',
      duration: '0:15',
      thumbnail: 'https://images.pexels.com/photos/3658663/pexels-photo-3658663.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        title: 'Extreme Buldak Ramen',
        username: '@MalaysiaFoodie',
        views: '34M',
        duration: '0:22',
        thumbnail: 'https://images.pexels.com/photos/4506261/pexels-photo-4506261.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      {
        title: '32kg Mop it’s not enough',
        username: '@Anatoly',
        views: '34M',
        duration: '0:18',
        thumbnail: 'https://images.pexels.com/photos/4588428/pexels-photo-4588428.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
  ];
  
  const recommendedVideos = [
    {
      title: 'That was embarrassing...',
      username: '@Mike',
      views: '53M',
      duration: '0:10',
      thumbnail: 'https://images.pexels.com/photos/1340373/pexels-photo-1340373.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Extreme Buldak Ramen',
      username: '@MalaysiaFoodie',
      views: '34M',
      duration: '0:22',
      thumbnail: 'https://images.pexels.com/photos/4506261/pexels-photo-4506261.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

const Analytics = () => {
  const { tab } = useParams();
  const [currentTab, setCurrentTab] = useState(ANALYTICSTABS.OVERVIEW);
  const [analyticsData, setAnalyticsData] = useState<any>('');
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [darkTheme, setDarkTheme] = useState<string>('');

  const navigate = useNavigate();
  const API_KEY = process.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const open = Boolean(anchorEl);

  const switchTab = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setCurrentTab(Number(event.currentTarget.id));
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const getUserAnalytics = async (period = 7) => {
    try {
      const periodsInMilliSeconds = 1000 * 60 * 60 * 24 * period;
      const gap = Date.now() - periodsInMilliSeconds;
      const startingDate = new Date(gap);
      const today = new Date();
      const startDate = `${startingDate.getFullYear()}-${String(startingDate.getMonth() + 1).padStart(2, '0')}-${String(startingDate.getDate()).padStart(2, '0')}`;
      const endDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

      const response = await fetch(
        `${API_KEY}/analytics/web-user?startDate=${startDate}&endDate=${endDate}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = await response.json();
      setAnalyticsData(res?.data);
    } catch (error) {
      console.log('Error fetching analytics data:', error);
    }
  };

  useEffect(() => {
    if (tab) {
      switch (tab.toLowerCase()) {
        case 'overview':
          setCurrentTab(ANALYTICSTABS.OVERVIEW);
          break;
        case 'content':
          setCurrentTab(ANALYTICSTABS.CONTENT);
          break;
        case 'viewers':
          setCurrentTab(ANALYTICSTABS.VIEWERS);
          break;
        case 'followers':
          setCurrentTab(ANALYTICSTABS.FOLLOWERS);
          break;
        default:
          break;
      }
    }
  }, [tab]);

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
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    getUserAnalytics(selectedPeriod);
  }, [selectedPeriod]);

  useEffect(() => {
    const themeColor = localStorage.getItem('theme');
    if (themeColor === 'dark') {
      setDarkTheme(styles.darkTheme);
    }
  }, []);
  const [tabIndex, setTabIndex] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
    const videos = tabIndex === 0 ? trendingVideos : recommendedVideos;

  const lightTheme = createTheme({ palette: { mode: 'light' } });
  const darkThemePalette = createTheme({ palette: { mode: 'dark' } });

  return (
    <ThemeProvider theme={darkTheme === '' ? lightTheme : darkThemePalette}>
      <header className={`text-gray-600 body-font ${darkTheme === '' ? 'bg-transparent' : styles.header} border-b px-4 mt-10`}>
        <div className="flex flex-wrap flex-col md:flex-row items-center justify-between">
          {/* <nav className="flex flex-wrap items-center text-base text-gray-400"> */}
            {/* <a onClick={switchTab} className={`${currentTab === ANALYTICSTABS.OVERVIEW ? 'text-gray-500 font-semibold border-b border-gray-800' : ''} py-3 mr-5 ${darkTheme === '' ? 'hover:text-gray-900' : 'hover:text-white'} cursor-pointer`} id={ANALYTICSTABS.OVERVIEW.toString()}>Overview</a>
            <a onClick={switchTab} className={`${currentTab === ANALYTICSTABS.CONTENT ? 'text-gray-500 font-semibold border-b border-gray-800' : ''} py-3 mr-5 ${darkTheme === '' ? 'hover:text-gray-900' : 'hover:text-white'} cursor-pointer`} id={ANALYTICSTABS.CONTENT.toString()}>Content</a> */}
            {/* Uncomment these lines to enable Viewers and Followers tabs */}
            {/* <a onClick={switchTab} className={`${currentTab === ANALYTICSTABS.VIEWERS ? 'text-gray-500 font-semibold border-b border-gray-800' : ''} py-3 mr-5 ${darkTheme === '' ? 'hover:text-gray-900' : 'hover:text-white'} cursor-pointer`} id={ANALYTICSTABS.VIEWERS.toString()}>Viewers</a> */}
            {/* <a onClick={switchTab} className={`${currentTab === ANALYTICSTABS.FOLLOWERS ? 'text-gray-500 font-semibold border-b border-gray-800' : ''} py-3 ${darkTheme === '' ? 'hover:text-gray-900' : 'hover:text-white'} cursor-pointer`} id={ANALYTICSTABS.FOLLOWERS.toString()}>Followers</a> */}
          {/* </nav> */}
          <h6 className='h6 d-flex align-items-center font-semibold m-0 text-black'>Key metrics <svg className='ml-1' width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.4758 8.83939C0.376032 8.75408 0.294046 8.64994 0.234525 8.53293C0.175004 8.41593 0.139114 8.28834 0.128904 8.15746C0.118694 8.02658 0.134363 7.89498 0.175018 7.77016C0.215673 7.64533 0.280516 7.52974 0.365846 7.42998L2.80783 4.58117L0.366846 1.73336C0.277126 1.63436 0.208162 1.51839 0.164027 1.39229C0.119893 1.26619 0.101485 1.13252 0.109891 0.99919C0.118297 0.865855 0.153347 0.735557 0.212969 0.615999C0.27259 0.496441 0.355574 0.390048 0.457015 0.303108C0.558456 0.216168 0.676297 0.150445 0.803571 0.109824C0.930846 0.0692029 1.06497 0.0545083 1.19802 0.066608C1.33107 0.0787077 1.46035 0.117356 1.57821 0.18027C1.69607 0.243183 1.80012 0.329086 1.88421 0.432899L4.60408 3.60657C4.83691 3.8783 4.96488 4.22434 4.96488 4.58217C4.96488 4.94 4.83691 5.28604 4.60408 5.55776L1.88521 8.73144C1.71262 8.93264 1.46717 9.05704 1.20286 9.07729C0.938552 9.09754 0.677022 9.01196 0.4758 8.83939Z" fill="black"/>
            </svg>
          </h6>
          <div className={`inline-flex lg:justify-end ml-5 lg:ml-0 my-2 ${darkTheme === '' ? 'bg-white' : 'bg-white'}`}>
            <button
              aria-label="duration-period"
              id="duration-period"
              aria-controls={open ? 'duration-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              className={`inline-flex mx-2 items-center  border-0 py-2 px-3 focus:outline-none  rounded-full text-sm`}
            >
              Last {selectedPeriod} Days &#129087;
            </button>
            <Menu
              id="duration-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    padding: '10px',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              }}
            >
              {Object.keys(ANALYTICS_OVERVIEW_TIME_PERIODS).map((period: string, index: number) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    setSelectedPeriod(ANALYTICS_OVERVIEW_TIME_PERIODS[period as keyof typeof ANALYTICS_OVERVIEW_TIME_PERIODS]);
                    setAnchorEl(null);
                  }}
                >
                  <span className={`font-bold ${ANALYTICS_OVERVIEW_TIME_PERIODS[period as keyof typeof ANALYTICS_OVERVIEW_TIME_PERIODS] === selectedPeriod ? 'text-[rgb(255,59,92)]' : ''}`}>
                    {period}
                  </span>
                </MenuItem>
              ))}
            </Menu>
            {/* <button
              className={`inline-flex gap-1 items-center ${darkTheme === '' ? 'bg-gray-100' : 'bg-gray-800'} border-0 py-2 px-3 focus:outline-none ${darkTheme === '' ? 'hover:bg-gray-200' : 'hover:bg-gray-900'} rounded-full text-sm`}
            >
              <svg fill="#000000" viewBox="0 0 537.794 537.795" width={15} height={15}>
                <path d="M463.091,466.114H74.854c-11.857,0-21.497,9.716-21.497,21.497v28.688c0,11.857,9.716,21.496,21.497,21.496h388.084 c11.857,0,21.496-9.716,21.496-21.496v-28.688C484.665,475.677,474.949,466.114,463.091,466.114z" />
                <path d="M253.94,427.635c4.208,4.208,9.716,6.35,15.147,6.35c5.508,0,11.016-2.142,15.147-6.35l147.033-147.033 c8.339-8.338,8.339-21.955,0-30.447l-20.349-20.349c-8.339-8.339-21.956-8.339-30.447,0l-75.582,75.659V21.497 C304.889,9.639,295.173,0,283.393,0h-28.688c-11.857,0-21.497,9.562-21.497,21.497v284.044l-75.658-75.659 c-8.339-8.338-22.032-8.338-30.447,0l-20.349,20.349c-8.338,8.338-8.338,22.032,0,30.447L253.94,427.635z" />
              </svg>
              Download data
            </button> */}
          </div>
        </div>
      </header>

      <OverviewTab analyticsData={analyticsData} isDarkTheme={!!darkTheme} />
        <div className='flex gap-4'>
            <div className="w-[70%]">
             <ContentTab isDarkTheme={darkTheme} />

            <Container sx={{ mt: 4 }}>
            <h5 className="text-base font-semibold mb-4 flex items-center">
                    Inspirations
                    <svg className='ml-1' width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.4758 8.83939C0.376032 8.75408 0.294046 8.64994 0.234525 8.53293C0.175004 8.41593 0.139114 8.28834 0.128904 8.15746C0.118694 8.02658 0.134363 7.89498 0.175018 7.77016C0.215673 7.64533 0.280516 7.52974 0.365846 7.42998L2.80783 4.58117L0.366846 1.73336C0.277126 1.63436 0.208162 1.51839 0.164027 1.39229C0.119893 1.26619 0.101485 1.13252 0.109891 0.99919C0.118297 0.865855 0.153347 0.735557 0.212969 0.615999C0.27259 0.496441 0.355574 0.390048 0.457015 0.303108C0.558456 0.216168 0.676297 0.150445 0.803571 0.109824C0.930846 0.0692029 1.06497 0.0545083 1.19802 0.066608C1.33107 0.0787077 1.46035 0.117356 1.57821 0.18027C1.69607 0.243183 1.80012 0.329086 1.88421 0.432899L4.60408 3.60657C4.83691 3.8783 4.96488 4.22434 4.96488 4.58217C4.96488 4.94 4.83691 5.28604 4.60408 5.55776L1.88521 8.73144C1.71262 8.93264 1.46717 9.05704 1.20286 9.07729C0.938552 9.09754 0.677022 9.01196 0.4758 8.83939Z" fill="black"/>
                    </svg>
                </h5>
                {/* Tabs */}
                <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2, borderBottom: '1px solid #00000014' }}>
                    <Tab label="Trending" sx={{textTransform: 'capitalize'}} />
                    <Tab label="Recommended" sx={{textTransform: 'capitalize'}} />
                </Tabs>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
                <Tabs
                        value={tabIndex}
                        textColor="inherit"
                        indicatorColor="none"
                        sx={{ mb: 2,  borderRadius: 2, minHeight: '40px' }}
                        >
                        <Tab
                            label="Posts"
                            sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            minHeight: '40px',
                            backgroundColor: tabIndex === 0 ? '#000' : '#0000000D',
                            color: tabIndex === 0 ? '#fff' : '#000',
                            borderRadius: 2,
                            px: 3,
                            mx: 1,
                            }}
                        />
                        <Tab
                            label="Creator"
                            sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            minHeight: '40px',
                            backgroundColor: tabIndex === 1 ? '#000' : '#0000000D',
                            color: tabIndex === 1 ? '#fff' : '#000',
                            borderRadius: 2,
                            px: 3,
                            mx: 1,
                            }}
                        />
                        </Tabs>
                    <Select sx={{backgroundColor: 'white', border: 'none'}} size="small" defaultValue="all">
                    <MenuItem value="all">All regions</MenuItem>
                    <MenuItem value="us">United States</MenuItem>
                    <MenuItem value="asia">Asia</MenuItem>
                    </Select>
                </Box>
                {/* Filter Chips */}
                <Box display="flex" alignItems="center" mb={3} gap={1}>
      <IconButton sx={{ backgroundColor: 'white' , boxShadow: '0px 0px 9px 0px #e4e6eb'}} onClick={() => scroll('left')}>
        <ChevronLeft />
      </IconButton>
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 1,
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // Chrome
        }}
      >
        {chipLabels.map((label, idx) => (
          <Chip sx={{ border: 'none'}} key={idx} label={label} clickable variant="outlined" />
        ))}
      </Box>
      <IconButton sx={{ backgroundColor: 'white' , boxShadow: '0px 0px 9px 0px #e4e6eb'}} onClick={() => scroll('right')}>
        <ChevronRight />
      </IconButton>
    </Box>

                {/* Video Grid */}
                <Grid container spacing={2}>
                    {videos.map((video, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
                        <CardMedia
                            component="img"
                            image={video.thumbnail}
                            alt={video.title}
                            sx={{ objectFit: 'cover', height: '280px' }}
                        />
                        <Box
                            sx={{
                            position: 'absolute',
                            top: '1%',
                            left: 1,
                            color: '#fff',
                            padding: '2px 6px',
                            borderRadius: 1,
                            fontSize: 12,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                            }}
                        >
                            {/* <img style={{ height: '2.5rem'}} src="data:image/png;base64,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" alt="" /> */}
                            <img style={{ height: '2.5rem'}} src="https://s3-alpha-sig.figma.com/img/ab49/e101/99d8c7ae2f0bea8d5cb521ab02cf4a97?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=izb7yJKI3MxrbnmjISi9UIP4UCRvlC1e3wLo874eW-~sKtrumeBW2gRlJjxTVbgXjEX-5yeF6pr7x77S1XmI5BP7fiag195L9kqPB0Gqq7YWmmRoI2jPfyONiQPS9oAwi8AO4F-Ipt9eBqFJXEUvbHZYNGNMBfUeZldZ1Ep7fjItb60bTQz59009iISIMMPE06KC3Vu9Z6Rf4k7RkD8s8Nzr4UNZhaPaqO9Wc9BfDEyEDxC4P43ZFTI~3sLskTR2lbwD6OJGQGJexKXNuUnWL3AXv4tMs19POoEDWzD00Lkd5xBFE7UnUWmgSstUdmP2F0isKJm3unj5P8ELyUlU-w__" alt="" />
                            <span className='position-absolute text-lg text-[#47494F] font-semibold'>1</span>
                        </Box>
                        <Box
                            sx={{
                            position: 'absolute',
                            top: '70%',
                            left: 8,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            color: '#fff',
                            padding: '2px 6px',
                            borderRadius: 1,
                            fontSize: 12,
                            display: 'flex'
                            }}
                        >
                           <svg className='mr-1' width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.1732 8.18794C2.2747 8.13544 2.4067 8.05944 2.6077 7.94344L6.9577 5.43194C7.1587 5.31594 7.2907 5.23944 7.3867 5.17794C7.4767 5.12044 7.4997 5.09794 7.4997 5.09794H7.4987C7.56047 5.02928 7.59474 4.94024 7.59492 4.84789C7.5951 4.75553 7.5612 4.66635 7.4997 4.59744C7.4997 4.59744 7.4762 4.57444 7.3867 4.51694C7.24541 4.42943 7.10238 4.34475 6.9577 4.26294L2.6077 1.75144C2.46458 1.66694 2.31971 1.58543 2.1732 1.50694C2.13294 1.48417 2.09079 1.46493 2.0472 1.44944H2.0482C1.9577 1.43016 1.86325 1.44502 1.78304 1.49118C1.70283 1.53733 1.64252 1.61151 1.6137 1.69944C1.6137 1.69944 1.6057 1.73094 1.6007 1.83744C1.5957 1.95144 1.5952 2.10394 1.5952 2.33594V7.35894C1.5952 7.59094 1.5952 7.74344 1.6002 7.85744C1.6052 7.96394 1.6137 7.99544 1.6137 7.99544V7.99444C1.64231 8.08236 1.70239 8.15661 1.7824 8.20294C1.86241 8.24927 1.95671 8.2644 2.0472 8.24544C2.0472 8.24544 2.0787 8.23694 2.1732 8.18794ZM0.425203 1.31444C0.549265 0.932464 0.810387 0.609958 1.1582 0.409138C1.50601 0.208319 1.91586 0.143414 2.3087 0.226945C2.4697 0.260945 2.6172 0.328945 2.7482 0.396945C2.8782 0.463945 3.0357 0.554945 3.2202 0.661445L7.5962 3.18794C7.7812 3.29444 7.9382 3.38544 8.0612 3.46444C8.1857 3.54394 8.3182 3.63794 8.4282 3.75994C8.697 4.05839 8.84574 4.4458 8.84574 4.84744C8.84574 5.24909 8.697 5.6365 8.4282 5.93494C8.31991 6.0495 8.19662 6.1489 8.0617 6.23044C7.9382 6.30944 7.7812 6.40044 7.5962 6.50694L3.2202 9.03344C3.0352 9.13994 2.8782 9.23094 2.7482 9.29844C2.60988 9.37471 2.46187 9.4319 2.3082 9.46844C1.91544 9.55184 1.5057 9.48687 1.158 9.28606C0.810303 9.08525 0.549258 8.76282 0.425203 8.38094C0.380165 8.22975 0.355778 8.07317 0.352703 7.91544C0.345703 7.76894 0.345703 7.58744 0.345703 7.37394V2.32094C0.345703 2.10744 0.345703 1.92594 0.352703 1.77994C0.355778 1.62222 0.380165 1.46563 0.425203 1.31444Z" fill="white"/>
                            </svg>
                            {video.views}  <svg className='ml-2 mr-1' width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.77979 0.222656C6.96329 0.222656 6.12179 0.633156 5.54729 1.30316C4.98629 0.623656 4.14979 0.222656 3.27979 0.222656C2.51753 0.22345 1.78673 0.526606 1.24773 1.0656C0.708735 1.6046 0.405579 2.3354 0.404785 3.09766C0.404785 4.63566 1.22779 6.17016 2.85179 7.65866C3.30979 8.07816 3.84079 8.49116 4.47579 8.92016C4.66929 9.05066 4.85029 9.16866 5.01229 9.26716L5.12279 9.33566C5.16379 9.36166 5.19612 9.38132 5.21979 9.39466C5.31229 9.44616 5.41979 9.47316 5.53029 9.47316C5.64079 9.47316 5.74829 9.44616 5.84129 9.39416C5.86462 9.38082 5.89679 9.36116 5.93779 9.33516L6.04829 9.26666C6.22956 9.15524 6.40828 9.03971 6.58429 8.92016C7.21929 8.49116 7.75029 8.07816 8.20829 7.65866C9.83179 6.16966 10.6553 4.63516 10.6553 3.09766C10.6553 1.51216 9.36529 0.222656 7.77979 0.222656ZM9.40479 3.09766C9.40479 4.25516 8.71379 5.47516 7.35179 6.72466C6.89088 7.14683 6.39956 7.53454 5.88179 7.88466C5.75929 7.96766 5.64779 8.03566 5.54129 8.10016L5.52979 8.10716L5.51829 8.10016C5.41179 8.03516 5.30029 7.96716 5.17779 7.88466C4.66054 7.53383 4.16926 7.14616 3.70778 6.72466C2.34528 5.47516 1.65479 4.25516 1.65479 3.09766C1.65531 2.66684 1.82669 2.25382 2.13132 1.94919C2.43595 1.64456 2.84897 1.47319 3.27979 1.47266C3.83229 1.47266 4.36779 1.75116 4.67679 2.19966C4.70829 2.24516 4.95679 2.61116 5.00329 2.68166C5.05898 2.76729 5.13482 2.83796 5.22415 2.8875C5.31349 2.93703 5.41361 2.96391 5.51574 2.96578C5.61788 2.96766 5.71891 2.94447 5.81001 2.89825C5.90111 2.85203 5.97948 2.78419 6.03829 2.70066C6.08779 2.63016 6.34679 2.26516 6.38129 2.21816C6.70028 1.77266 7.26229 1.47316 7.77979 1.47316C8.2106 1.47369 8.62362 1.64506 8.92825 1.94969C9.23288 2.25432 9.40426 2.66734 9.40479 3.09816V3.09766Z" fill="white"/>
                            </svg>
                            {video.duration}
                        </Box>
                        <CardContent sx={{ px: 1, py: 1.5 }}>
                            <Typography variant="body2" fontWeight={600} noWrap>
                            {video.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" noWrap>
                            {video.username}
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                <button className='w-100 my-4 bg-[#0000000D]'>View More</button>
                </Container>
            </div>
            <div className=" w-[30%] py-6">
                <h5 className="text-base font-semibold mb-4 flex items-center">
                    Knowledge for you 
                    <svg className='ml-1' width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.4758 8.83939C0.376032 8.75408 0.294046 8.64994 0.234525 8.53293C0.175004 8.41593 0.139114 8.28834 0.128904 8.15746C0.118694 8.02658 0.134363 7.89498 0.175018 7.77016C0.215673 7.64533 0.280516 7.52974 0.365846 7.42998L2.80783 4.58117L0.366846 1.73336C0.277126 1.63436 0.208162 1.51839 0.164027 1.39229C0.119893 1.26619 0.101485 1.13252 0.109891 0.99919C0.118297 0.865855 0.153347 0.735557 0.212969 0.615999C0.27259 0.496441 0.355574 0.390048 0.457015 0.303108C0.558456 0.216168 0.676297 0.150445 0.803571 0.109824C0.930846 0.0692029 1.06497 0.0545083 1.19802 0.066608C1.33107 0.0787077 1.46035 0.117356 1.57821 0.18027C1.69607 0.243183 1.80012 0.329086 1.88421 0.432899L4.60408 3.60657C4.83691 3.8783 4.96488 4.22434 4.96488 4.58217C4.96488 4.94 4.83691 5.28604 4.60408 5.55776L1.88521 8.73144C1.71262 8.93264 1.46717 9.05704 1.20286 9.07729C0.938552 9.09754 0.677022 9.01196 0.4758 8.83939Z" fill="black"/>
                    </svg>
                </h5>
                <div className={`${darkTheme?'bg-[#181818]':'bg-white'} shadow text-left rounded-lg p-3`} >
                    {articles.map((item, idx) => (
                    <div key={idx} className="flex items-start align-items-center justify-between border-b py-3 last:border-0">
                        <div className="pr-4">
                        <h3 className="font-medium text-sm text-black">{item.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        </div>
                        <img src={item.image} alt={item.title} className="w-16 h-24 object-cover rounded-md" />
                    </div>
                    ))}
                </div>
            </div>
        </div>
        {/* <ViewersTab />
        <FollowersTab /> */}
    </ThemeProvider>
  );
};

export default Analytics;

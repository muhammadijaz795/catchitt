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
                {/* Tabs */}
                <Tabs value={tabIndex} onChange={handleTabChange} textColor="primary" indicatorColor="primary" sx={{ mb: 2, borderBottom: '1px solid #00000014' }}>
                    <Tab label="Trending" />
                    <Tab label="Recommended" />
                </Tabs>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
                <Tabs
                        value={tabIndex}
                        textColor="inherit"
                        indicatorColor="none"
                        sx={{ mb: 2,  borderRadius: 2, minHeight: '48px' }}
                        >
                        <Tab
                            label="Posts"
                            sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            minHeight: '48px',
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
                            minHeight: '48px',
                            backgroundColor: tabIndex === 1 ? '#000' : '#0000000D',
                            color: tabIndex === 1 ? '#fff' : '#000',
                            borderRadius: 2,
                            px: 3,
                            mx: 1,
                            }}
                        />
                        </Tabs>
                    <Select size="small" defaultValue="all">
                    <MenuItem value="all">All regions</MenuItem>
                    <MenuItem value="us">United States</MenuItem>
                    <MenuItem value="asia">Asia</MenuItem>
                    </Select>
                </Box>
                {/* Filter Chips */}
                <Box display="flex" alignItems="center" mb={3} gap={1}>
      <IconButton onClick={() => scroll('left')}>
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
          <Chip key={idx} label={label} clickable variant="outlined" />
        ))}
      </Box>
      <IconButton onClick={() => scroll('right')}>
        <ChevronRight />
      </IconButton>
    </Box>

                {/* Video Grid */}
                <Grid container spacing={2}>
                    {videos.map((video, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
                        <CardMedia
                            component="img"
                            image={video.thumbnail}
                            alt={video.title}
                            sx={{ objectFit: 'cover', height: '280px' }}
                        />
                        <Box
                            sx={{
                            position: 'absolute',
                            bottom: 8,
                            left: 8,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            color: '#fff',
                            padding: '2px 6px',
                            borderRadius: 1,
                            fontSize: 12,
                            }}
                        >
                            {video.views} • {video.duration}
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
        <ViewersTab />
        <FollowersTab />
    </ThemeProvider>
  );
};

export default Analytics;

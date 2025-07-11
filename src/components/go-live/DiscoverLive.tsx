import { SideNavBar } from './goLiveSidebar';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, Chip, AppBar, Typography, Card, CardMedia, Stack, Avatar, Grid, CardContent, Button, Toolbar, Paper } from '@mui/material';
import LiveStreaming from './liveStream';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '../profile/svg-components/ShareIcon';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import { defaultGreyBackground } from '../../icons';
import style from './index.module.scss';
import { useTranslation } from 'react-i18next';

function DiscoverLive() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const [mediaByCategory, setMediaByCategory] = useState({
    selectedCategory: 'all',
    items: [],
  });

  const scroll = (direction: 'left' | 'right') => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const authUser = JSON.parse(localStorage.getItem('profile') || '{}') || null;


  const [recommendedLiveVideos, setRecommendedLiveVideos] = useState<any>(
    {
      items: [],
      isLoading: false,
    }
  );

  function loadRecommendedLiveVideos()
  {
    let endpoint = `${process.env.VITE_API_URL}/live-stream`;
    let requestOptions =
    {
      method: 'GET',
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };

    setRecommendedLiveVideos((prev: any) => ({ ...prev, isLoading: true }));

    fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((response) =>
      {
        setRecommendedLiveVideos((prev: any) => ({ ...prev, items: response.data, isLoading: false }));
        setMediaByCategory({selectedCategory: 'all', items: response.data});
      }
    )
    .catch((error) => console.error('Fetch error:', error));
  };

  const [postCategories, setPostCategories] = useState<any>(
    {
      items: [],
      isLoading: false,
    }
  );

  function loadPostCategories()
  {
    let endpoint = `${process.env.VITE_API_URL}/live-stream/v2/categories`;
    let requestOptions =
    {
      method: 'GET',
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };

    setPostCategories((prev: any) => ({ ...prev, isLoading: true }));

    fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((response) => setPostCategories((prev: any) => ({ ...prev, items: response.data, isLoading: false })))
    .catch((error) => console.error('Fetch error:', error));
  };

  function scrollToTop()
  {
    document.querySelectorAll('*').forEach(el => el.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  function filterPostsByCategory(category: any)
  {
    setMediaByCategory(
      {
        selectedCategory: category.name,
        items: category.name == 'all' ? recommendedLiveVideos.items : recommendedLiveVideos.items.filter((item: any) => item.topic.topicName == category.name),
      }
    );
  };

  const groupedStreams = recommendedLiveVideos.items.reduce((acc: any, stream: any) => {
  const topicName = stream.topic.topicName;
  if (!acc[topicName]) {
    acc[topicName] = [];
  }
  acc[topicName].push(stream);
  return acc;
}, {});
    const [isDarkTheme, setIsDarkTheme] = useState('');

useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setIsDarkTheme(style.darkTheme);
        }
    });
  useEffect(() => {
    loadRecommendedLiveVideos();
    loadPostCategories();
  }, []);

  type LiveStream = {
    id: string;
    title: string;
    username: string;
    viewers: number;
    imageUrl: string;
    userAvatar: string;
  };

 
  
  const LiveStreamCard = ({ stream }: { stream: any }) => (
    <Box sx={{ borderRadius: 2, width: "100%", position: 'relative', mr: 2, textAlign: 'left' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={stream.thumbnail || defaultGreyBackground}
          height="160"
          alt={stream.streamTitle}
          sx={{ borderRadius: 2, maxHeight: 260 }}
          onError={(event: any) => event.target.src != defaultGreyBackground && (event.target.src = defaultGreyBackground)}
        />
        <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', alignItems: 'center', gap: 0 }}>
            <span   className='w-9 rounded-sm text-sm ml-3 text-center text-white ' style={{ background: 'linear-gradient(113.02deg, #FF1764 0%, #ED3495 94.15%)'}}>
                {t('livestream.live')}
            </span>
          <span
          className='px-2'
            style={{borderRadius: 'none', background: '#00000080', fontSize: '13px', color: 'white', height: 20, display: 'flex', alignItems: 'center' }}
          >
            <PersonIcon sx={{ fontSize: 14 }} />
            {stream?.consumers?.length}
            </span>
        </Box>
      </Box>
      <Box sx={{ mt: 1, px: 0.5, pb: 1.5 }}>
      <Stack direction="row" spacing={1} mt={0.5}>
        <Avatar src={stream.owner.photo} sx={{ width: 24, height: 24 }} />
        <Box>
            <Typography variant="body2" fontWeight={500} noWrap>
            {stream.streamTitle}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
            {stream.owner.name}
            </Typography>
        </Box>
        </Stack>
      </Box>
    </Box>
  );

  const RecommendedCard = ({ stream }: { stream: any }) => (
    <Box sx={{ borderRadius: 2, width: "100%", position: 'relative', mr: 2, textAlign: 'left' }}>
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <CardMedia
          component="img"
          image={stream.icon || defaultGreyBackground}
          alt={stream.name}
          sx={{ borderRadius: 2, maxHeight: 185, height: 185 }}
          onError={(event: any) => event.target.src != defaultGreyBackground && (event.target.src = defaultGreyBackground)}
        />
      </Box>
      <Box sx={{ mt: 1, px: 0.5, pb: 1.5 }}>
      <Stack direction="row" spacing={1} mt={0.5}>
        {/* <Avatar src={stream.userAvatar} sx={{ width: 24, height: 24 }} /> */}
        <Box>
            <Typography variant="body2" fontWeight={500} >
            {stream.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" >
            {stream.watching} {t('livestream.watching')}
            </Typography>
        </Box>
        </Stack>
      </Box>
    </Box>
  );
  return (
    <div className={`${isDarkTheme} flex`} style={{ background: '#000' }}>
      <SideNavBar />
      <div className='w-[calc(100%-16rem)] ml-auto bg-white '>
        <div className='py-3 px-10'> 
          <div>
            <Box display="flex" alignItems="center" mb={3} gap={1}>
              <IconButton
                sx={{ backgroundColor: 'white', boxShadow: '0px 0px 9px 0px #e4e6eb' }}
                onClick={() => scroll('left')}
              >
                <ChevronLeft />
              </IconButton>
              <Box
                ref={scrollRef}
                sx={{
                  display: 'flex',
                  overflowX: 'auto',
                  gap: 1,
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {postCategories.items.map((item: any) => (
                  <Chip
                    sx={{ border: 'none', borderRadius: '8px', backgroundColor: '#1618230F', fontSize: '14px' }}
                    key={item._id}
                    label={item.name}
                    clickable
                    variant="outlined"
                    onClick={() => filterPostsByCategory(item)}
                  />
                ))}
              </Box>
              <IconButton
                sx={{ backgroundColor: 'white', boxShadow: '0px 0px 9px 0px #e4e6eb' }}
                onClick={() => scroll('right')}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          </div>

          <LiveStreaming posts={mediaByCategory.items}/>
          <hr className='my-4'/>
          {Object.entries(groupedStreams).map(([topicName, streams]) => (
          <Box key={topicName}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontSize={'22px'} color={'#161823'} fontWeight={600}>
                  {topicName}
                  </Typography>
                  {/* <Typography fontWeight={400} variant="body2" color="#16182399" sx={{ cursor: 'pointer' }}>
                  View all
                  </Typography> */}
              </Box>
              <Grid container spacing={2}>
                  {(streams as any[]).map((stream: any) => (
                      <Grid item xs={12} sm={6} md={4} key={stream._id}>
                        <Link 
                         to={stream?.owner?.id === authUser?._id
      ? `/postlive?streamId=${stream?.id}`
      : `/golive?streamId=${stream.id}`}

                         reloadDocument={false} style={{ textDecoration: 'none' }}>
                          <LiveStreamCard stream={stream} />
                        </Link>
                      </Grid>
                  ))}
              </Grid>
          </Box>
          ))}
          {/* recommended streams */}
          <Box  sx={{ mt: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontSize={'22px'} color={'#161823'} fontWeight={600}>
                  {t('livestream.recommended_categories')}
                  </Typography>
                  <Link to="/live/category" reloadDocument={false} style={{ textDecoration: 'none' }}>
                  <Typography fontWeight={400} variant="body2" color="#16182399" sx={{ cursor: 'pointer' }}>
                  {t('livestream.view_all')}
                  </Typography>
                  </Link>
              </Box>
              <Box display="flex" flexWrap="wrap" gap={3}>
                {postCategories.items.slice(0, 14).map((item: any) => (
                  <Box key={item._id} sx={{ width: 'calc((100% - 144px) / 7)' }}>
                  <Link to={`/live/category/${item.name}`} reloadDocument={false} style={{ textDecoration: 'none' }}>
                    <RecommendedCard stream={item} />
                  </Link>
                  </Box>
                ))}
              </Box>

          </Box>

          <Box className={style.liveEvents}  sx={{ mt: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontSize={'22px'} color={'#161823'} fontWeight={600}>
                  {t('livestream.live_events')}
                  </Typography>
                  <Typography fontWeight={400} variant="body2" color="#16182399" sx={{ cursor: 'pointer' }}>
                  {t('livestream.view_all')}
                  </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                  <Card sx={{ borderRadius: 3, boxShadow: 0, textAlign: 'left', background: '#16182308' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                        <span   className='w-16 rounded-sm text-xs py-0.5 text-center text-white ' style={{ background: 'linear-gradient(113.02deg, #FF1764 0%, #ED3495 94.15%)'}}>
                            {t('livestream.live_event')}
                        </span>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {t('livestream.welcome_to_my_live')}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar
                            src="/path-to-avatar.jpg" // Replace with actual path
                            alt="Yakout"
                            sx={{ width: 32, height: 32 }}
                          />
                          <Typography variant="body1" fontWeight="bold">
                            YAKOUT
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            1.1M {t('livestream.followers')}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                          <CalendarTodayIcon fontSize="small" color="action" />
                          <Typography variant="body2">Wednesday, Apr 30, 2025</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                          <AccessTimeIcon fontSize="small" color="action" />
                          <Typography variant="body2">9:00 PM – 9:30 PM</Typography>
                        </Box>

                        <Box>
                          <Button variant="contained"  sx={{ borderRadius: 2, background: '#FE2C55', }}>
                            {t('livestream.register')}
                          </Button>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
          </Box>
        </div>

      </div>
      <button className='bg-[#FE2C55] rounded-full p-1 fixed right-2 bottom-2' onClick={scrollToTop}>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.1367 6.77725C13.168 6.74626 13.1927 6.70939 13.2097 6.66877C13.2266 6.62815 13.2353 6.58458 13.2353 6.54058C13.2353 6.49657 13.2266 6.45301 13.2097 6.41239C13.1927 6.37177 13.168 6.3349 13.1367 6.30391L8.70671 1.87058C8.51921 1.68331 8.26504 1.57812 8.00004 1.57812C7.73504 1.57812 7.48087 1.68331 7.29337 1.87058L2.86004 6.30391C2.8288 6.3349 2.804 6.37177 2.78708 6.41239C2.77015 6.45301 2.76144 6.49657 2.76144 6.54058C2.76144 6.58458 2.77015 6.62815 2.78708 6.66877C2.804 6.70939 2.8288 6.74626 2.86004 6.77725L3.79671 7.71058C3.82825 7.74241 3.86588 7.76756 3.90736 7.78451C3.94884 7.80147 3.99332 7.80989 4.03812 7.80927C4.08293 7.80865 4.12715 7.799 4.16815 7.78089C4.20914 7.76279 4.24606 7.73661 4.27671 7.70391L7.00004 4.83058V11.5806C7.00004 11.669 7.03516 11.7538 7.09767 11.8163C7.16018 11.8788 7.24497 11.9139 7.33337 11.9139H8.66671C8.75511 11.9139 8.8399 11.8788 8.90241 11.8163C8.96492 11.7538 9.00004 11.669 9.00004 11.5806V4.82725L11.7234 7.70724C11.7542 7.73972 11.7913 7.76564 11.8325 7.78346C11.8736 7.80127 11.9179 7.81061 11.9627 7.81092C12.0075 7.81124 12.0519 7.80251 12.0932 7.78527C12.1346 7.76803 12.1721 7.74262 12.2034 7.71058L13.1367 6.77725ZM2.66671 12.9139C2.5783 12.9139 2.49352 12.949 2.43101 13.0115C2.36849 13.0741 2.33337 13.1588 2.33337 13.2472V14.5806C2.33337 14.669 2.36849 14.7538 2.43101 14.8163C2.49352 14.8788 2.5783 14.9139 2.66671 14.9139H13.3334C13.4218 14.9139 13.5066 14.8788 13.5691 14.8163C13.6316 14.7538 13.6667 14.669 13.6667 14.5806V13.2472C13.6667 13.1588 13.6316 13.0741 13.5691 13.0115C13.5066 12.949 13.4218 12.9139 13.3334 12.9139H2.66671Z" fill="white"/>
        </svg>
      </button>
    </div>
  );
}

export default DiscoverLive;

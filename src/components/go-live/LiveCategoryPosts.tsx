import { SideNavBar } from './goLiveSidebar';
import { useRef, useState, useEffect } from 'react';
import { Box, Typography, CardMedia, Stack, Avatar, Grid, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useParams } from 'react-router-dom';
import { defaultGreyBackground } from '../../icons';
import  style  from './GoLive.module.scss';

function LiveCategoryPosts() {
  const { categoryName } = useParams();
  const scrollRef = useRef<HTMLDivElement>(null);
const [isDarkTheme, setIsDarkTheme] = useState('');
      
      useEffect(() => {
              var themeColor = window.localStorage.getItem('theme');
              if (themeColor == 'dark') {
                  setIsDarkTheme(style.darkTheme);
              }
          });
  const scroll = (direction: 'left' | 'right') => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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

  const groupedStreams = recommendedLiveVideos.items.reduce((acc: any, stream: any) => {
  const topicName = stream.topic.topicName;
  if (!acc[topicName]) {
    acc[topicName] = [];
  }
  acc[topicName].push(stream);
  return acc;
}, {});

  const filteredStreams = categoryName ? { [categoryName]: groupedStreams[categoryName] || [] } : groupedStreams; 
  const filteredCategory = postCategories.items.find((item: any) => item.name.toLowerCase() === categoryName?.toLowerCase());
  
  useEffect(() => {
    loadRecommendedLiveVideos();
    loadPostCategories();
  }, []);

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
                Live
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

 const RecommendedCard = ({ stream }: { stream: any }) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        width: "100%",
        position: "relative",
        mr: 2,
        textAlign: "left",
        display: "flex",
        gap: 2,
      }}
    >
      <CardMedia
        component="img"
        image={stream.icon || defaultGreyBackground}
        alt={stream.name}
        sx={{
          borderRadius: 2,
          height: 220,
          width: 150,
          objectFit: "cover",
        }}
        onError={(event: any) =>
          event.target.src !== defaultGreyBackground &&
          (event.target.src = defaultGreyBackground)
        }
      />
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {stream.name || ''}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {stream.watching || 0} watching
        </Typography>
        {/* <Chip label="RPG" size="small" sx={{ mb: 1 }} /> */}
        <Typography variant="body2" color="text.secondary">
          {stream.description || ''}
        </Typography>
        {/* <Typography variant="body2" sx={{ mt: 1 }}>
          View on{" "}
          <Link to={"https://en.wikipedia.org/wiki/Mobile_Legends:_Bang_Bang"} >
            Wikipedia
          </Link>{" "}
          or view{" "}
          <Link to={"https://en.wikipedia.org/wiki/Mobile_Legends:_Bang_Bang"} >
            license
          </Link>
        </Typography> */}
      </Box>
    </Box>
  );
};
  return (
    <div className={`${isDarkTheme} flex w-full min-h-screen`} style={{ background: '#000' }}>
      <SideNavBar />
      <div className='w-[calc(100%-16rem)] ml-auto bg-white '>
        <div className='py-3 px-10'>
          <Box  sx={{ mt: 4 }}>
              <Box display="flex" flexWrap="wrap" gap={3} mb={3}>
                {filteredCategory &&
                  <Box key={filteredCategory._id} sx={{ maxWidth: 'calc(100% - 25vw)', width: '100%' }}>
                    <RecommendedCard stream={filteredCategory} />
                  </Box>
                }
              </Box>
          </Box>
          {Object.entries(filteredStreams).map(([topicName, streams]) => (
          <Box key={topicName}>
              <Grid container spacing={2}>
                  {(streams as any[]).map((stream: any) => (
                      <Grid item xs={12} sm={6} md={4} key={stream._id}>
                        <Link to={`/golive?streamId=${stream.id}`} reloadDocument={false} style={{ textDecoration: 'none' }}>
                          <LiveStreamCard stream={stream} />
                        </Link>
                      </Grid>
                  ))}
              </Grid>
          </Box>
          ))}
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

export default LiveCategoryPosts;

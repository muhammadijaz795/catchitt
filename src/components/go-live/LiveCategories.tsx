import { SideNavBar } from './goLiveSidebar';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, Chip, Typography, CardMedia, Stack } from '@mui/material';
import { defaultGreyBackground } from '../../icons';
import { Link } from 'react-router-dom';
import  style  from './GoLive.module.scss';

function LiveCategories() {
 const [isDarkTheme, setIsDarkTheme] = useState('');
      
      useEffect(() => {
              var themeColor = window.localStorage.getItem('theme');
              if (themeColor == 'dark') {
                  setIsDarkTheme(style.darkTheme);
              }
          });
  


  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
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

  useEffect(() => {
    loadPostCategories();
  }, []);

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
            {stream.watching} watching
            </Typography>
        </Box>
        </Stack>
      </Box>
    </Box>
  );
  return (
    <div className={`${isDarkTheme} flex`} style={{ background: '#000' }}>
      <SideNavBar />
      <div className='w-[calc(100%-16rem)] ml-auto '>
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
          <Box  sx={{ mt: 4 }}>
              <Box display="flex" flexWrap="wrap" gap={3}>
                {postCategories.items.map((item: any) => (
                  <Box key={item._id} sx={{ width: 'calc((100% - 144px) / 7)' }}>
                  <Link to={`/live/category/${item.name}`} reloadDocument={false} style={{ textDecoration: 'none' }}>
                    <RecommendedCard stream={item} />
                  </Link>
                  </Box>
                ))}
              </Box>

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

export default LiveCategories;

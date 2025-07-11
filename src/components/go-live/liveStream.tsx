import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Badge } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LiveStreaming = ({posts}: any) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const { t, i18n } = useTranslation();
  
  function handleNext()
  {
    setCurrentVideoIndex(prev => prev === posts.length - 1 ? 0 : prev + 1);
  };
  
  function handlePrevious()
  {
    setCurrentVideoIndex(prev => prev === 0 ? posts.length - 1 : prev - 1);
  };

  const currentVideo = posts[currentVideoIndex];
  const authUser = JSON.parse(localStorage.getItem('profile') || '{}') || null;
  // console.log('my auth user...');
  // console.log(authUser?._id);

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        display: 'flex',
        position: 'relative',
        boxShadow: 3,
        backgroundColor: '#000',
        aspectRatio: '832 / 382', // Maintain original ratio
      }}
    >
      {!currentVideo ? (
        <Box
                      sx={{
                        minHeight: "90vh",
                        backgroundColor: "#0f0f0f",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        minWidth: "100%",
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" mb={1}>
                        {t('livestream.nostreams')}
                      </Typography>
                      <Typography variant="body2" color="#aaa" mb={3}>
                        {t('livestream.gobacktoexplore')}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#2c2c2c",
                          color: "white",
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#3a3a3a",
                          },
                        }}
                      >
                        {t('livestream.goback')}
                      </Button>
                    </Box>
      ) : (
      <>
      {/* Background image / video */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${currentVideo?.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Left overlay content */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0) 100%)',
          color: '#fff',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <span   className='w-9 rounded-sm text-sm ml-3' style={{ background: 'linear-gradient(113.02deg, #FF1764 0%, #ED3495 94.15%)'}}>
            {t('livestream.live')}
        </span>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {currentVideo?.streamTitle}
        </Typography>
        <Typography variant="subtitle2" color="green">
          {currentVideo?.owner?.name}
        </Typography>
        <Typography variant="caption">{currentVideo?.consumers?.length} {t('livestream.watching')}</Typography>
      </Box>

      {/* Center button overlay */}
      <Link to={
    currentVideo?.owner?.id === authUser?._id
      ? `/postlive?streamId=${currentVideo?.id}`
      : `/golive?streamId=${currentVideo?.id}`
  } reloadDocument={false} style={{ textDecoration: 'none' }}>
      <Button
        variant="contained"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 5,
          backgroundColor: '#5454544D',
          px: 3,
          py: 1,
          textTransform: 'none',
          fontWeight: 500,
          border: '1px solid #FFFFFF80',
          hover: { backgroundColor: 'transparent' },
        }}
        
      >
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.3194 19.6406H19.3502C19.6816 19.6406 19.9502 19.372 19.9502 19.0406V6.24058C19.9502 5.90921 19.6816 5.64058 19.3502 5.64058H17.3194C16.9881 5.64058 16.7194 5.90921 16.7194 6.24058V19.0406C16.7194 19.372 16.9881 19.6406 17.3194 19.6406Z" fill="white"/>
          <path d="M11.9347 13.8047H13.9654C14.2968 13.8047 14.5654 13.5361 14.5654 13.2047V6.23803C14.5654 5.90666 14.2968 5.63803 13.9654 5.63803H11.9347C11.6033 5.63803 11.3347 5.90666 11.3347 6.23803V13.2047C11.3347 13.5361 11.6033 13.8047 11.9347 13.8047Z" fill="white"/>
          <path d="M6.55038 16.1406H8.58115C8.91252 16.1406 9.18115 15.872 9.18115 15.5406V6.24062C9.18115 5.90925 8.91252 5.64062 8.58115 5.64062H6.55038C6.21901 5.64062 5.95038 5.90925 5.95038 6.24062V15.5406C5.95038 15.872 6.21901 16.1406 6.55038 16.1406Z" fill="white"/>
        </svg>

        {t('livestream.clicktowatch')}
      </Button>
      </Link>

      {/* Bottom-left Play icon */}
      <IconButton
        sx={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          backgroundColor: '#5454544D',
          color: '#fff',
        }}
      >
        <PlayArrowIcon />
      </IconButton>
      <IconButton 
       sx={{
        position: 'absolute',
        bottom: 10,
        left: 50,
        backgroundColor: '#5454544D',
        color: '#fff',
      }}>
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.1793 7.14948V1.67448C18.1793 1.56397 18.1354 1.45799 18.0572 1.37985C17.9791 1.30171 17.8731 1.25781 17.7626 1.25781H16.1084C16.0526 1.25779 15.9974 1.26896 15.946 1.29068C15.8946 1.3124 15.8481 1.34421 15.8093 1.38424C15.7704 1.42426 15.74 1.47168 15.7198 1.52369C15.6996 1.57569 15.6901 1.63122 15.6918 1.68698L15.7834 4.15365C15.0362 3.50294 14.1929 2.97166 13.2834 2.57865C11.6931 1.92639 9.9454 1.75934 8.26036 2.09853C6.57532 2.43773 5.02833 3.26799 3.81428 4.48475C2.60023 5.70151 1.7734 7.25033 1.43796 8.93612C1.10251 10.6219 1.27345 12.3693 1.92924 13.9581C2.58502 15.5469 3.69633 16.9061 5.12317 17.8646C6.55001 18.823 8.22857 19.3377 9.9474 19.3439C11.6662 19.3501 13.3485 18.8475 14.7822 17.8994C16.2159 16.9514 17.337 15.6002 18.0042 14.0161C18.0248 13.9659 18.035 13.9121 18.0341 13.8578C18.0332 13.8036 18.0213 13.7501 17.9991 13.7006C17.9769 13.6511 17.9448 13.6066 17.9049 13.5699C17.8649 13.5332 17.8179 13.505 17.7668 13.487L16.3084 12.9536C16.2037 12.9173 16.0892 12.9221 15.9879 12.9669C15.8866 13.0118 15.8061 13.0934 15.7626 13.1953C15.3025 14.2384 14.5693 15.1378 13.6403 15.7986C12.7114 16.4594 11.6212 16.857 10.4849 16.9495C9.34866 17.0419 8.20853 16.8257 7.18497 16.3238C6.16141 15.8219 5.29242 15.0528 4.66981 14.0978C4.04719 13.1428 3.69407 12.0374 3.64774 10.8984C3.60141 9.75929 3.8636 8.62885 4.4066 7.62647C4.9496 6.62409 5.75326 5.78698 6.73268 5.20357C7.7121 4.62016 8.83091 4.31212 9.97092 4.31198C11.5834 4.31198 13.1543 5.01615 14.2709 6.00365L11.4668 5.91198C11.411 5.91031 11.3555 5.91985 11.3035 5.94003C11.2515 5.96022 11.204 5.99065 11.164 6.02951C11.124 6.06837 11.0922 6.11487 11.0705 6.16625C11.0487 6.21764 11.0376 6.27286 11.0376 6.32865V7.98281C11.0376 8.09332 11.0815 8.1993 11.1596 8.27744C11.2378 8.35558 11.3437 8.39948 11.4543 8.39948H16.9293C17.2608 8.39948 17.5787 8.26778 17.8131 8.03336C18.0476 7.79894 18.1793 7.481 18.1793 7.14948Z" fill="white"/>
        </svg>

      </IconButton>

      {/* Bottom-right Mute */}
      <IconButton
        sx={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          backgroundColor: '#000',
          color: '#fff',
        }}
      >
        <VolumeOffIcon />
      </IconButton>

      {/* Right top/bottom controls */}
      <Box sx={{ position: 'absolute', right: 20, top: '45%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <IconButton sx={{ backgroundColor: '#54545480', color: '#fff' }} onClick={() => handlePrevious()}>
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99997 8.7432L15.4875 14.2307C15.5262 14.2698 15.5723 14.3007 15.6231 14.3219C15.6738 14.3431 15.7283 14.3539 15.7833 14.3539C15.8383 14.3539 15.8928 14.3431 15.9435 14.3219C15.9943 14.3007 16.0404 14.2698 16.0791 14.2307L17.2541 13.0557C17.2932 13.017 17.3242 12.9709 17.3453 12.9201C17.3665 12.8693 17.3774 12.8149 17.3774 12.7599C17.3774 12.7049 17.3665 12.6504 17.3453 12.5996C17.3242 12.5489 17.2932 12.5028 17.2541 12.464L10.4416 5.65153C10.3245 5.53449 10.1656 5.46875 9.99997 5.46875C9.83435 5.46875 9.6755 5.53449 9.55831 5.65153L2.74581 12.464C2.70675 12.5028 2.67576 12.5489 2.6546 12.5996C2.63345 12.6504 2.62256 12.7049 2.62256 12.7599C2.62256 12.8149 2.63345 12.8693 2.6546 12.9201C2.67576 12.9709 2.70675 13.017 2.74581 13.0557L3.91664 14.2265C3.95538 14.2656 4.00146 14.2966 4.05223 14.3177C4.10301 14.3389 4.15747 14.3498 4.21247 14.3498C4.26748 14.3498 4.32194 14.3389 4.37271 14.3177C4.42349 14.2966 4.46957 14.2656 4.50831 14.2265L9.99997 8.7432Z" fill="white"/>
        </svg>
        </IconButton>
        <IconButton sx={{ backgroundColor: '#54545480', color: '#fff' }} onClick={() => handleNext()}>
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99997 11.8764L15.4875 6.38887C15.5262 6.34982 15.5723 6.31882 15.6231 6.29767C15.6738 6.27652 15.7283 6.26562 15.7833 6.26562C15.8383 6.26562 15.8928 6.27652 15.9435 6.29767C15.9943 6.31882 16.0404 6.34982 16.0791 6.38887L17.2541 7.56387C17.2932 7.60261 17.3242 7.64869 17.3453 7.69947C17.3665 7.75024 17.3774 7.8047 17.3774 7.85971C17.3774 7.91471 17.3665 7.96917 17.3453 8.01995C17.3242 8.07072 17.2932 8.11681 17.2541 8.15554L10.4416 14.968C10.3245 15.0851 10.1656 15.1508 9.99997 15.1508C9.83435 15.1508 9.6755 15.0851 9.55831 14.968L2.74581 8.15554C2.70675 8.11681 2.67576 8.07072 2.6546 8.01995C2.63345 7.96917 2.62256 7.91471 2.62256 7.85971C2.62256 7.8047 2.63345 7.75024 2.6546 7.69947C2.67576 7.64869 2.70675 7.60261 2.74581 7.56387L3.91664 6.39304C3.95538 6.35399 4.00146 6.32299 4.05223 6.30184C4.10301 6.28068 4.15747 6.26979 4.21247 6.26979C4.26748 6.26979 4.32194 6.28068 4.37271 6.30184C4.42349 6.32299 4.46957 6.35399 4.50831 6.39304L9.99997 11.8764Z" fill="white"/>
        </svg>
        </IconButton>
      </Box>
      </>
    )}
    </Box>
  );
};

export default LiveStreaming;

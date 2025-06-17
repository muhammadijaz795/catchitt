import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const LiveGoalModal = () => {
  return (
    <Box
      sx={{
        bgcolor: '#1e1e1e',
        color: '#fff',
        p: 2,
        borderRadius: 2,
        width: 400,
        mx: 'auto',
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6">Edit your LIVE goal</Typography>
      </Box>

      <Typography variant="body2" color="gray" mt={1} mb={2}>
        The goal will expire in 4 hours.
      </Typography>

      <Typography fontWeight="600" fontSize={14} mb={1} textAlign={'left'}>
        Describe your goal
      </Typography>

      <Typography
      textAlign={'left'}
        sx={{
          borderRadius: 1,
          mb: 2,
          fontSize: 12,
        }}>
        Help me achieve my first goal and I’ll sing a song
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} pt={2} borderTop="1px solid #444">
        <Typography>Total Gifts: 2</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: '#3a3a3a', color: '#fff', textTransform: 'none', borderRadius: 1 }}
        >
          Gift
        </Button>
      </Box>

      <Grid container spacing={1}>
        {[{ icon: <FavoriteIcon />, label: 'Heart', coins: 10 }, { icon: <LocalFloristIcon />, label: 'Rose', coins: 1 }].map(
          (gift, i) => (
            <Grid item xs={6} key={i}>
              <Card
                sx={{
                  bgcolor: '#2D2D2D',
                  color: '#fff',
                  borderRadius: 2,
                  position: 'relative',
                  minHeight: 150,
                  p: 0,
                }}>
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', top: 6, right: 6, color: 'white' }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box fontSize={32} pt={3} display={'flex'} justifyContent="center">
                        <svg width="43" height="39" viewBox="0 0 43 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.9984 0.715332C27.0698 0.715332 23.5996 2.6927 21.5304 5.70461C19.4615 2.6927 15.9912 0.715332 12.0627 0.715332C5.72454 0.715332 0.578125 5.86175 0.578125 12.1998C0.578125 26.1988 21.5304 38.7832 21.5304 38.7832C21.5304 38.7832 42.4829 26.1988 42.4829 12.1998C42.4829 5.86175 37.3365 0.715332 30.9984 0.715332Z" fill="url(#paint0_radial_3413_36114)"/>
                            <path opacity="0.5" d="M35.75 1.73682C42.0358 11.7547 36.2477 24.9022 29.2941 28.6344C21.6202 32.7594 16.369 30.8214 5.5 24.6536C11.694 32.8642 21.5286 38.7702 21.5286 38.7702C21.5286 38.7702 42.481 26.1856 42.481 12.1868C42.481 7.55109 39.7177 3.54396 35.75 1.73682Z" fill="url(#paint1_radial_3413_36114)"/>
                            <path opacity="0.5" d="M30.9984 0.715332C27.0698 0.715332 23.5996 2.6927 21.5304 5.70461C19.4615 2.6927 15.9912 0.715332 12.0627 0.715332C5.72454 0.715332 0.578125 5.86175 0.578125 12.1998C0.578125 26.1988 21.5304 38.7832 21.5304 38.7832C21.5304 38.7832 42.4829 26.1988 42.4829 12.1998C42.4829 5.86175 37.3365 0.715332 30.9984 0.715332Z" fill="url(#paint2_radial_3413_36114)"/>
                            <path opacity="0.5" d="M30.9984 0.715332C27.0698 0.715332 23.5996 2.6927 21.5304 5.70461C19.4615 2.6927 15.9912 0.715332 12.0627 0.715332C5.72454 0.715332 0.578125 5.86175 0.578125 12.1998C0.578125 26.1988 21.5304 38.7832 21.5304 38.7832C21.5304 38.7832 42.4829 26.1988 42.4829 12.1998C42.4829 5.86175 37.3365 0.715332 30.9984 0.715332Z" fill="url(#paint3_radial_3413_36114)"/>
                            <path opacity="0.24" d="M18.6608 5.37761C19.813 8.08833 17.2594 11.7681 12.9512 13.5883C8.64283 15.4086 4.22975 14.7014 3.07736 12.0038C1.92497 9.30619 4.47855 5.61333 8.78689 3.79308C13.0952 1.97286 17.5083 2.66689 18.6608 5.37761Z" fill="url(#paint4_radial_3413_36114)"/>
                            <path opacity="0.24" d="M32.7018 3.17761C34.3388 4.98475 33.3304 8.55975 30.4626 11.1526C27.5946 13.7455 23.941 14.3871 22.3043 12.58C20.6674 10.7728 21.6757 7.19783 24.5435 4.60499C27.4113 2.01213 31.0649 1.37047 32.7018 3.17761Z" fill="url(#paint5_radial_3413_36114)"/>
                            <path opacity="0.32" d="M31.2082 3.7665C36.9701 5.73081 42.4701 14.2427 33.1726 24.8499C27.607 31.201 21.5309 34.4093 13.8047 33.1521C17.982 36.6355 21.544 38.7832 21.544 38.7832C21.544 38.7832 42.4964 26.1988 42.4964 12.1998C42.4832 5.86175 37.3368 0.715332 30.9987 0.715332C27.0701 0.715332 23.5998 2.6927 21.5309 5.70461C21.5309 5.70461 26.9915 2.32603 31.2082 3.7665Z" fill="url(#paint6_linear_3413_36114)"/>
                            <defs>
                            <radialGradient id="paint0_radial_3413_36114" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.5372 11.3334) rotate(-29.408) scale(32.7855 26.0072)">
                            <stop offset="0.2479" stop-color="#FF0000"/>
                            <stop offset="0.8639" stop-color="#C20000"/>
                            </radialGradient>
                            <radialGradient id="paint1_radial_3413_36114" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.3462 9.32228) rotate(-29.408) scale(28.2271 22.3914)">
                            <stop offset="0.2479" stop-color="#FF0000"/>
                            <stop offset="1" stop-color="#C20000"/>
                            </radialGradient>
                            <radialGradient id="paint2_radial_3413_36114" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.5372 11.3334) rotate(-29.408) scale(32.7855 26.0072)">
                            <stop stop-color="white" stop-opacity="0.25"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                            </radialGradient>
                            <radialGradient id="paint3_radial_3413_36114" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(27.3231 22.4633) rotate(-26.296) scale(23.9321 11.8259)">
                            <stop stop-color="#BD2719" stop-opacity="0.25"/>
                            <stop offset="1" stop-color="#BD2719" stop-opacity="0"/>
                            </radialGradient>
                            <radialGradient id="paint4_radial_3413_36114" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.8665 8.69067) rotate(-21.6908) scale(8.50786 5.28495)">
                            <stop stop-color="white"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                            </radialGradient>
                            <radialGradient id="paint5_radial_3413_36114" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(27.491 7.89234) rotate(-40.7634) scale(7.04403 4.37594)">
                            <stop stop-color="white"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                            </radialGradient>
                            <linearGradient id="paint6_linear_3413_36114" x1="25.8546" y1="53.7341" x2="29.9143" y2="-1.00406" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#860805"/>
                            <stop offset="1" stop-color="#BD2719" stop-opacity="0"/>
                            </linearGradient>
                            </defs>
                        </svg>
                  </Box>
                  <Typography variant="body2" color="gray">
                    {gift.label}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" mb={1} display={'flex'} justifyContent={'center'}>
                    <svg className='pr-1' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6.23828" cy="6.20312" r="5.48047" fill="#FFBC04"/>
                    </svg>
                     {gift.coins}
                  </Typography>
                  
                  <Typography display="flex" justifyContent={'center'} variant="caption" color="white" mt={2} pt={1} borderTop="2px solid #444" >
                    0/1
                    <svg className='pl-1' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.24219 11.258C6.24219 10.9588 6.48469 10.7163 6.78385 10.7163H11.1172C11.4163 10.7163 11.6589 10.9588 11.6589 11.258C11.6589 11.5571 11.4163 11.7996 11.1172 11.7996H6.78385C6.48469 11.7996 6.24219 11.5571 6.24219 11.258Z" fill="#535353"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9933 4.27044C11.8652 3.39504 11.8282 2.24546 11.1771 1.54146C10.8596 1.19819 10.4077 0.978928 9.89589 0.966838C9.38217 0.954704 8.84993 1.15116 8.3588 1.56206C8.34623 1.57257 8.33416 1.58364 8.32262 1.59524L1.29788 8.64801C0.994535 8.95253 0.824219 9.3649 0.824219 9.79477V10.7121C0.824219 11.3087 1.30737 11.7996 1.90963 11.7996H2.81899C3.25109 11.7996 3.66539 11.6276 3.97032 11.3214L10.9933 4.27044ZM9.0614 3.02082C8.84988 2.80929 8.50689 2.80929 8.29537 3.02082C8.08385 3.23236 8.08385 3.57532 8.29537 3.78686L8.83704 4.32852C9.04856 4.54006 9.39154 4.54006 9.60306 4.32852C9.81458 4.11699 9.81458 3.77403 9.60306 3.56249L9.0614 3.02082Z" fill="#535353"/>
                    </svg>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Typography mt={2} mb={2} fontSize={14} textAlign={'left'}>
        Add this LIVE goal automatically
      </Typography>

      <Button
        fullWidth
        sx={{
          bgcolor: '#ff2c5c',
          color: '#fff',
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 'bold',
          py: 1.2,
        }}
      >
        Confirm
      </Button>
    </Box>
  );
};

export default LiveGoalModal;

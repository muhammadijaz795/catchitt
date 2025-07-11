import React, { useState, useEffect } from 'react';
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
  InputBase,
  Switch,
  Typography,
  styled
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LiveGoalFAQ from "./GoLiveFaq";
import { fix } from 'mathjs';
import { useTranslation } from 'react-i18next';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 22,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(16px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#f04e4e',
      '& + .MuiSwitch-track': {
        backgroundColor: '#fff',
        opacity: 1,
        border: 0,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 22,
    height: 22,
    borderRadius: 11,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    opacity: 1,
    backgroundColor: '#f04e4e',
    boxSizing: 'border-box',
  },
}));

const LiveGoalModal = ({liveGoals, addLiveGoalAutomatically, onConfirm, onLiveGoalAdded}: {liveGoals: any, addLiveGoalAutomatically: any, onConfirm: any, onLiveGoalAdded: any}) => {
  const [showAddGiftCard, setShowAddGiftCard] = useState(false);
  const { t, i18n } = useTranslation();
  const handleToggle = () => setShowAddGiftCard(!showAddGiftCard);
  const [showLiveGoalAutomatically, setShowLiveGoalAutomatically] = useState(false);


const [goalDescription, setGoalDescription] = useState(
    t('livestream.help_achieve_goal')
  );
  const [autoAdd, setAutoAdd] = useState(false);

  const [gifts, setGifts] = useState<any>(
    {
      items: [],
      isLoading: false,
    }
  );
  const [selectedGifts, setSelectedGifts] = useState<any>([]);
  const [selectedGift, setSelectedGift] = useState<any>({});
  const [selectedGiftCount, setSelectedGiftCount] = useState<any>(1);
  const [showFaqs, setShowFaqs] = useState(false)

  function loadGifts()
  {
    let endpoint = `${process.env.VITE_API_URL}/gift`;
    let requestOptions =
    {
      method: 'GET',
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };

    setGifts((prev: any) => ({ ...prev, isLoading: true }));

    fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((response) => setGifts((prev: any) => ({ ...prev, items: response.data, isLoading: false })))
    .catch((error) => console.error('Fetch error:', error));
  };

  function removeFromSelectedGifts(gift: any)
  {
    setSelectedGifts((prev: any) => prev.filter((item: any) => item._id !== gift._id));
  };

  useEffect(() => {
    loadGifts();
    setSelectedGifts(liveGoals);
    setAutoAdd(addLiveGoalAutomatically);
  }, []);

  return (
    <>
    {!showFaqs && !showLiveGoalAutomatically  && <>
     {!showAddGiftCard ? (
    <Box
      sx={{
        bgcolor: '#1e1e1e',
        color: '#fff',
        p: 2,
        borderRadius: 2,
        width: 350,
        mx: 'auto',
        position: 'fixed',
        top: 6
      }}
    >
      <Box textAlign={'left'} display="flex" alignItems="center" justifyContent="space-between" mb={3} >
           <IconButton onClick={()=> onConfirm()} size="small" sx={{color:'#FFF'}}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
         <Typography variant="h6">{t('livestream.edit_your_live_goal')}</Typography>
         <IconButton sx={{color:'#FFF'}} onClick={() => {setShowFaqs(true);}}>
          <HelpOutlineIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" color="gray" mt={1} mb={2}>
        {t('livestream.goal_expire')}
      </Typography>

      <Typography fontWeight="600" fontSize={14} mb={1} textAlign={'left'}>
        {t('livestream.describle_your_goal')}
      </Typography>

      <Typography
      textAlign={'left'}
        sx={{
          borderRadius: 1,
          mb: 2,
          fontSize: 12,
        }}>
        {t('livestream.help_achieve_goal')}
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} pt={2} borderTop="1px solid #444">
        <Typography>{t('livestream.total_gifts')} { selectedGifts.length }</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleToggle}
          sx={{ bgcolor: '#3a3a3a', color: '#fff', textTransform: 'none', borderRadius: 1 }}
        >
          {t('livestream.gift')}
        </Button>
      </Box>

      <Grid container spacing={1}
      sx={{
    maxHeight: 'calc(100vh - 22.5rem)',
    overflowY: 'auto',
    px: 2,
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
    },
    scrollbarWidth: 'thin', // For Firefox
    scrollbarColor: '#ffffff transparent', // For Firefox
  }}>
        {selectedGifts.map(
          (gift:any, i:any) => (
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
                onClick={() => removeFromSelectedGifts(gift)}
                  size="small"
                  sx={{ position: 'absolute', top: 6, right: 6, color: 'white' }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ fontSize: 32, justifyItems: 'center' }}>
                    { gift.imageUrl.endsWith('.mp4') ? <video src={gift.imageUrl} autoPlay loop muted style={{ width: 50, height: 50 }} /> : <img src={gift.imageUrl} alt={gift.name} style={{ width: 50, height: 50 }} /> }
                  </Box>
                  <Typography variant="body2" color="gray">
                    {gift.name}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" mb={1} display={'flex'} justifyContent={'center'}>
                    <svg className='pr-1' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6.23828" cy="6.20312" r="5.48047" fill="#FFBC04"/>
                    </svg>
                     {gift.price}
                  </Typography>
                  
                  <Typography display="flex" justifyContent={'center'} variant="caption" color="white" mt={2} pt={1} borderTop="2px solid #444" >
                    0/<span contentEditable suppressContentEditableWarning onBlur={(e) => {setSelectedGifts((prevGifts: any) => prevGifts.map((item: any) => item._id === gift._id ? { ...item, count: e.target.textContent || 0 } : gift)); }}>{gift.count}</span>
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
        {selectedGifts.length < 1 &&
        <Box sx={{backgroundColor: '#2D2D2D', py: 5, width: '100%', borderRadius: 1,mt: 1}}>
          <Typography fontWeight={700} sx={{ cursor: 'pointer'}} onClick={handleToggle}>
            + {t('livestream.add_gift_goal')}
          </Typography>
        </Box>
        }
      </Grid>

      <Typography mt={2} mb={2} fontSize={14} textAlign={'left'}>
        {t('livestream.add_goal_automatically')}
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
        onClick={() => { onLiveGoalAdded(selectedGifts, autoAdd); onConfirm() }}
      >
        {t('livestream.confirm')}
      </Button>
    </Box>
     ) : (
    <Card
      sx={{
        width: 350,
        bgcolor: "#1e1e1e",
        color: "#fff",
        borderRadius: 3,
        padding: 2,
        textAlign: "center",
        position: "fixed",
        top: 6
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {t('livestream.add_gift')}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#aaa", mb: 2, fontSize: 13 }}
      >
        {t('livestream.your_recommended_coin_amount_per_gift')}
        <CircleIcon sx={{ fontSize: 12, color: "gold", mb: "-2px" }} /> 10
      </Typography>

      {/* Grid of gifts */}
      <Grid container spacing={2} justifyContent="center" sx={{
    maxHeight: 'calc(100vh - 16rem)',
    overflowY: 'auto',
    px: 2,
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
    },
    scrollbarWidth: 'thin', // For Firefox
    scrollbarColor: '#ffffff transparent', // For Firefox
  }}>
        {gifts.items.map((gift: any, index: number) => (
          <Grid item xs={4} key={index}>
            <Box onClick={() => setSelectedGift(gift)} sx={{ cursor: 'pointer', backgroundColor: selectedGift?._id === gift._id ? '#2D2D2D' : 'transparent', '&:hover': { backgroundColor: '#2D2D2D' } }}>
              <Box sx={{ fontSize: 32, justifyItems: 'center' }}>
                { gift.imageUrl.endsWith('.mp4') ? <video src={gift.imageUrl} autoPlay loop muted style={{ width: 50, height: 50 }} /> : <img src={gift.imageUrl} alt={gift.name} style={{ width: 50, height: 50 }} /> }
              </Box>
              <Typography sx={{ fontSize: 13, mt: 0.5 }}>{ gift.name }</Typography>
              <Box display="flex" alignItems="center" justifyContent="center">
                <CircleIcon sx={{ fontSize: 12, color: "gold", mr: 0.5 }} />
                <Typography sx={{ fontSize: 12 }}>{ gift.price }</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Input and message */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#2c2c2c",
          borderRadius: 1,
          px: 1.5,
          py: 1,
        }}
      >
        <InputBase
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          defaultValue={selectedGiftCount}
          onChange={(event) => setSelectedGiftCount(event.target.value)}
          sx={{ color: "#fff", fontSize: 14, flex: 1 }}
        />
        <IconButton size="small">
          <EditIcon sx={{ color: "#aaa", fontSize: 18 }} />
        </IconButton>
      </Box>

      <Typography
        variant="caption"
        sx={{ display: "block", color: "#aaa", mt: 1.2 }}
      >
        {t('livestream.likely_reach_goal')}
      </Typography>

      {/* Confirm button */}
      {selectedGiftCount > 0 && Object.keys(selectedGift).length > 0 &&
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          borderRadius: 2,
          backgroundColor: "#ff2e63",
          "&:hover": { backgroundColor: "#ff1e52" },
          textTransform: "none",
        }}
        onClick={()=> { setShowLiveGoalAutomatically(true); setSelectedGifts((prev: any) => [...prev.filter((item:any) => item._id !== selectedGift._id), {...selectedGift, count: selectedGiftCount}]); setSelectedGift({}); setSelectedGiftCount(1); } }
      >
        {t('livestream.confirm')}
      </Button>
      }
    </Card>
     )} </> }
    {!showFaqs && showLiveGoalAutomatically && <Card
      sx={{
        width: 350,
        bgcolor: "#1e1e1e",
        color: "#fff",
        borderRadius: 3,
        padding: 2,
        position: 'fixed',
        top: 6,
        textAlign: "center",
      }}
    >
     <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6">{t('livestream.edit_your_live_goal')}</Typography>
      </Box>

      <Typography variant="body2" color="gray" mt={1} mb={2}>
        {t('livestream.goal_expire')}
      </Typography>

      <Typography fontWeight="600" fontSize={14} mb={1} textAlign={'left'}>
        {t('livestream.describle_your_goal')}
      </Typography>

      <Typography
      textAlign={'left'}
        sx={{
          borderRadius: 1,
          mb: 2,
          fontSize: 12,
        }}>
        {t('livestream.help_achieve_goal')}
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} pt={2} borderTop="1px solid #444">
        <Typography>{t('livestream.total_gifts')} { selectedGifts.length }</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => { handleToggle; setShowLiveGoalAutomatically(false); } }
          sx={{ bgcolor: '#3a3a3a', color: '#fff', textTransform: 'none', borderRadius: 1 }}
        >
          {t('livestream.gift')}
        </Button>
      </Box>
        <Box sx={{
    maxHeight: 'calc(100vh - 10rem)',
    overflowY: 'auto',
    px: 2,
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
    },
    scrollbarWidth: 'thin', // For Firefox
    scrollbarColor: '#ffffff transparent', // For Firefox
  }}>
      {/* Grid of gifts */}
      <Grid container spacing={1} 
      >
        {selectedGifts.map(
          (gift: any, i: any) => (
            <Grid item xs={12} key={i}>
              <Card
                sx={{
                  bgcolor: '#2D2D2D',
                  color: '#fff',
                  borderRadius: 2,
                  position: 'relative',
                  minHeight: 80,
                  p: 0,
                }}>
                <IconButton
                  onClick={() => removeFromSelectedGifts(gift)}
                  size="small"
                  sx={{ position: 'absolute', top: 6, right: 6, color: 'white' }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
                <CardContent sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box fontSize={32} pt={3} display={'flex'} justifyContent="center">
                    <Box sx={{ fontSize: 32, justifyItems: 'center' }}>
                      { gift.imageUrl.endsWith('.mp4') ? <video src={gift.imageUrl} autoPlay loop muted style={{ width: 50, height: 50 }} /> : <img src={gift.imageUrl} alt={gift.name} style={{ width: 50, height: 50 }} /> }
                    </Box>
                        <Box sx={{ ml: 1 }}>
                            <Typography variant="body2" color="gray">
                                {gift.name}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" mb={1} display={'flex'} justifyContent={'center'}>
                                <svg className='pr-1' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="6.23828" cy="6.20312" r="5.48047" fill="#FFBC04"/>
                                </svg>
                                {gift.price}
                            </Typography>
                        </Box>
                  </Box>
                  
                  <Typography display="flex" justifyContent={'center'} variant="caption" color="white" mt={2} pt={1} >
                    0/<span contentEditable suppressContentEditableWarning onBlur={(e) => {setSelectedGifts((prevGifts: any) => prevGifts.map((item: any) => item._id === gift._id ? { ...item, count: e.target.textContent || 0 } : gift)); }}>{gift.count}</span>
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
        {selectedGifts.length < 1 &&
        <Box sx={{backgroundColor: '#2D2D2D', py: 5, width: '100%', borderRadius: 1,mt: 1}}>
          <Typography fontWeight={700} sx={{ cursor: 'pointer'}} onClick={() => { handleToggle; setShowLiveGoalAutomatically(false); } }>
            + {t('livestream.add_gift_goal')}
          </Typography>
        </Box>
        }
       
      </Grid>
        </Box>
     <Box display="flex" justifyContent="space-between" alignItems="center" textAlign={"left"} mt={2}>
        <Box>
          <Typography variant="subtitle2" fontWeight={700}>{t('livestream.add_goal_automatically')}</Typography>
          <Typography variant="caption" color="gray" lineHeight={1.5}>
            {t('livestream.add_this_live_goal_for_future_live_videos')}
          </Typography>
        </Box>
        <CustomSwitch
          checked={autoAdd}
          onChange={() => setAutoAdd(!autoAdd)}
        />
      </Box>

      {/* Confirm button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          borderRadius: 2,
          backgroundColor: "#ff2e63",
          "&:hover": { backgroundColor: "#ff1e52" },
          textTransform: "none",
        }}
        onClick={() => { onLiveGoalAdded(selectedGifts, autoAdd); }}
      >
        {t('livestream.confirm')}
      </Button>
      </Card>
    }

    {showFaqs && <LiveGoalFAQ onBack={() => {setShowFaqs(!showFaqs)}} /> }
    </>
  );
};

export default LiveGoalModal;

// ExploreFilters.jsx
import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Tabs,
  Tab,
  Paper,
  Slide,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import WaterDropIcon from '@mui/icons-material/Opacity';
import ContrastIcon from '@mui/icons-material/Tonality';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const filterOptions = [
  { label: 'On', icon: <FaceRetouchingNaturalIcon /> },
  { label: 'Smooth', icon: <WaterDropIcon /> },
  { label: 'Contrast', icon: <ContrastIcon /> },
  { label: 'Shape', icon: <TagFacesIcon /> },
  { label: 'Nose', icon: <EmojiEmotionsIcon /> },
  { label: 'Smooth', icon: <WaterDropIcon /> },
];

export default function ExploreFilters({ show, setShow }: { show: any, setShow: any }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = React.useState(0);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    if (show) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show, setShow]);

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Box
        ref={panelRef}
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          bgcolor: '#000',
          color: '#fff',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          px: 2,
          py: 1,
          zIndex: 1500,
        }}
      >
        {/* Tabs */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            textColor="inherit"
            TabIndicatorProps={{ style: { backgroundColor: '#fff' } }}
            sx={{
                minHeight: 'unset',  // optional: reduces tab height
                '& .MuiTab-root': {
                    minHeight: 'unset',  // optional: reduces tab height
                    px: 1, // tighter horizontal padding
                },
                }}
          >
            <Tab label="Face" sx={{ textTransform: 'none' }} />
            <Tab label="Makeup" sx={{ textTransform: 'none' }} />
          </Tabs>
          <Button
            startIcon={<RestartAltIcon />}
            sx={{ color: '#fff', textTransform: 'none' }}>
            Reset
          </Button>
        </Box>

        {/* Icons */}
        <Box mt={2} display="flex" gap={2} overflow="auto">
          {filterOptions.map((option, index) => (
            <Paper
              key={index}
              sx={{
                backgroundColor: '#1a1a1a',
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {option.icon}
            </Paper>
          ))}
        </Box>
        {/* Labels */}
        <Box mt={1} display="flex" gap={2} overflow="auto">
          {filterOptions.map((option, index) => (
            <Typography
              key={index}
              variant="caption"
              textAlign="center"
              width={60}
            >
              {option.label}
            </Typography>
          ))}
        </Box>
      </Box>
    </Slide>
  );
}

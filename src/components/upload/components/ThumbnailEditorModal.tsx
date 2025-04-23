import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  Tabs, Tab, Box, Button,
  Typography,
  IconButton
} from '@mui/material';
import DndContainer from './DndContainerNew';
import CloseIcon from '@mui/icons-material/Close';


interface ThumbnailEditorModalProps {
  open: boolean;
  onClose: () => void;
  videoThumbnails: string[];
  selectedThumb: number;
  onSelectThumbnail: (index: number) => void;
  onCustomThumbnail: (file: File) => void;
  currentThumbnail: string | null;
}

const ThumbnailEditorModal: React.FC<ThumbnailEditorModalProps> = ({
  open,
  onClose,
  videoThumbnails,
  selectedThumb,
  onSelectThumbnail,
  onCustomThumbnail,
  currentThumbnail,
}) => {
  // console.log('currentThumbnail', currentThumbnail);
  const [tab, setTab] = useState<'select' | 'upload'>('select');
  const [customCover, setCustomCover] = useState<string | null>(null);
  // const [preview, setPreview] = useState<string>(currentThumbnail || '');
  const [preview, setPreview] = useState<string>('');

  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [linePosition, setLinePosition] = useState(50);
  const [manualSelect, setManualSelect] = useState(false);
  // console.log('current preview');
  // console.log(preview);
 

  const handleSelectFrame = (thumbUrl: string, index: number) => {
    setPreview(thumbUrl);
    onSelectThumbnail(index);
    setManualSelect(true);
    setTimeout(() => setManualSelect(false), 1000); // resume auto detection after 1s
  };

  useEffect(() => {
    if (currentThumbnail) {
      setPreview(currentThumbnail);
    }
  }, [currentThumbnail]);

  const handleCustomUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const url = e.target?.result as string;
      setPreview(url);
      setCustomCover(url);
      onCustomThumbnail(file);
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== lineRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX);
    if (thumbnailsRef.current) {
      setScrollLeft(thumbnailsRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !thumbnailsRef.current) return;
    const moveX = e.clientX - startX;
    thumbnailsRef.current.scrollLeft = scrollLeft - moveX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (thumbnailsRef.current) {
      const container = thumbnailsRef.current;
      const scrollLeft = container.scrollLeft;
      const centerX = scrollLeft + container.offsetWidth / 2;

      let closestIndex = -1;
      let closestDistance = Number.MAX_VALUE;
      let closestCenter = 0;

      for (let i = 0; i < container.children.length; i++) {
        const thumb = container.children[i] as HTMLElement;
        const thumbCenterX = thumb.offsetLeft + thumb.offsetWidth / 2;
        const distance = Math.abs(thumbCenterX - centerX);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
          closestCenter = thumbCenterX;
        }
      }

      if (closestIndex !== -1 && !manualSelect) {
        const selectedThumbnail = videoThumbnails[closestIndex];
        setPreview(selectedThumbnail);
        onSelectThumbnail(closestIndex);
        setLinePosition((closestCenter / container.scrollWidth) * 100);
      }
    }
  };

  useEffect(() => {
    const container = thumbnailsRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [manualSelect, videoThumbnails]);

  return (
    <Dialog open={open} onClose={onClose}  PaperProps={{
      sx: {
        maxWidth: '800px',
        width: '100%',
        minHeight: '30rem',
        margin: 'auto',
      },
    }} >
      <DialogTitle
      sx={{
        px: 1,
        pt: 1,
        pb: 0,
        color: 'black',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
    <Tabs
  value={tab}
  onChange={(_, newVal) => setTab(newVal)}
  sx={{
    mb: 0,
    '& .MuiTab-root': {
      fontWeight: 'bold',
      color: 'gray', // inactive color
    },
    '& .Mui-selected': {
      color: 'black', // active label color
    },
  }}
  TabIndicatorProps={{
    style: {
      backgroundColor: 'black', // underline indicator
    },
  }}
>
  <Tab value="select" label="Select cover" />
  <Tab value="upload" label="Upload cover" />
</Tabs>


      <IconButton onClick={onClose} sx={{ color: 'black' }}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
      <DialogContent sx={{ backgroundColor: '#F5F5F5' }}>
        

        {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '220px', mb: 3 }}>
          {preview && tab == 'select' && (<>
             <img
              src={preview}
              alt="Preview"
              style={{ height: '200px', objectFit: 'contain', borderRadius: '4px' }}
            />
          </>
            
          )}
        </Box> */}

        {tab === 'select' && (
          <>
           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '220px', mb: 3 }}>
            {preview && (<>
                <img
                src={preview}
                alt="Preview"
                style={{ height: '200px', objectFit: 'contain', borderRadius: '4px' }}
              />
            </>
              
            )}
          </Box>
          <Box sx={{ position: 'relative', height: 90, mb: 4 }}>
            <Box
              ref={lineRef}
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: '#00BCD4',
                left: `${linePosition}%`,
                transform: 'translateX(-50%)',
                zIndex: 2,
                transition: 'left 0s',
                cursor: 'ew-resize',
              }}
              onMouseDown={handleMouseDown}
            />
            <Box
              ref={thumbnailsRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              sx={{
                display: 'flex',
                overflowX: 'auto',
                px: 1,
                height: '100%',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
            >
              {videoThumbnails.map((thumb, idx) => (
                <Box
                  key={idx}
                  onClick={() => handleSelectFrame(thumb, idx)}
                  sx={{
                    flexShrink: 0,
                    width: '80px',
                    height: '80px',
                    cursor: 'pointer',
                    border:
                      selectedThumb === idx
                        ? '2px solid #00BCD4'
                        : '2px solid transparent',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    mr: 1,
                  }}
                >
                  <img
                    src={thumb}
                    alt={`Thumb ${idx}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
          </>
        )}

        {tab === 'upload' && (
          <div style={{ marginBottom: '1rem', height: '50vh', display: 'flex', alignItems: 'center' }}>
            <DndContainer
              crop
              text="Drag and drop a file here"
              orText="select a file"
              Format='Supported formats: JPG, JPEG, and PNG.'
              onChangeFile={handleCustomUpload}
              aspect={62 / 127}
            />
          </div>
        )}
      </DialogContent>
        <Box sx={{ backgroundColor: '#fff', display: 'flex', p: 2, justifyContent: 'flex-end' }}>
          <Button variant='contained'   sx={{boxShadow: 'none', textTransform: 'capitalize', backgroundColor: '#0000000D', px: 3, mx: 2, color: 'black', borderRadius: '8px', '&:hover': {
              backgroundColor: '#0000000f',
              boxShadow: 'none'
            }, }}>Upload new</Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{textTransform: 'capitalize', boxShadow: 'none', backgroundColor: '#FE2C55', px: 3, borderRadius: '8px',  '&:hover': {
              backgroundColor: '#FE2C40',
              boxShadow: 'none'
            }, }}
          >
            Confirm
          </Button>
        </Box>
    </Dialog>
  );
};

export default ThumbnailEditorModal;

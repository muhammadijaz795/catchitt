import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  Tabs, Tab, Box, Button,
  Typography, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

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
  const [tab, setTab] = useState<'select' | 'upload'>('select');
  const [preview, setPreview] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [linePosition, setLinePosition] = useState(50);
  const [manualSelect, setManualSelect] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const cropperRef = useRef(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (currentThumbnail) {
      setPreview(currentThumbnail);
    }
  }, [currentThumbnail]);

  const handleSelectFrame = (thumbUrl: string, index: number) => {
    setPreview(thumbUrl);
    onSelectThumbnail(index);
    setManualSelect(true);
    setTimeout(() => setManualSelect(false), 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setTab('upload');
        setShowButtons(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveCroppedImage = async () => {
    if (cropperRef.current) {
      try {
        const canvas = cropperRef.current.getCanvas();
        if (canvas) {
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], 'thumbnail.jpg', { type: 'image/jpeg' });
              onCustomThumbnail(file);
              const imageUrl = URL.createObjectURL(blob);
              setPreview(imageUrl);
              setTab('select');
              setShowButtons(false);
              onClose();
            }
          }, 'image/jpeg', 0.9);
        }
      } catch (error) {
        console.error('Error saving cropped image:', error);
      }
    }
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
    <Dialog 
      open={open} 
      onClose={onClose}  
      PaperProps={{
        sx: {
          maxWidth: '800px',
          width: '100%',
          minHeight: '30rem',
          margin: 'auto',
          borderRadius: '12px',
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 3,
          pt: 2,
          pb: 1,
          color: 'black',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Select cover
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'black' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, newVal) => setTab(newVal)}
          sx={{
            mb: 3,
            '& .MuiTab-root': {
              fontWeight: 'bold',
              color: 'gray',
              textTransform: 'none',
              fontSize: '1rem',
            },
            '& .Mui-selected': {
              color: 'black',
            },
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: 'black',
            },
          }}
        >
          <Tab value="select" label="Select cover" />
          <Tab value="upload" label="Upload cover" />
        </Tabs>
        
        {tab === 'select' && (
          <>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '220px', 
              mb: 3,
              backgroundColor: '#f5f5f5',
              borderRadius: '8px'
            }}>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  style={{ 
                    height: '200px', 
                    objectFit: 'contain', 
                    borderRadius: '4px' 
                  }}
                />
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
          <Box sx={{ 
            position: 'relative',
            height: '400px',
            background: '#f5f5f5',
            mb: 3
          }}>
            {imageSrc ? (
              <Cropper
                ref={cropperRef}
                src={imageSrc}
                stencilProps={{
                  handlers: true,
                  lines: true,
                  movable: true,
                  resizable: true,
                }}
                backgroundWrapperProps={{
                  scaleImage: false,
                  moveImage: false,
                }}
                backgroundProps={{
                  imageStyle: {
                    filter: 'blur(6px) brightness(0.7)'
                  }
                }}
              />
            ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center'
              }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  No image selected
                </Typography>
                <Button
                  variant="contained"
                  onClick={triggerFileInput}
                >
                  Select Image
                </Button>
              </Box>
            )}
          </Box>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </DialogContent>

      <Box sx={{ 
        backgroundColor: '#fff', 
        display: 'flex', 
        p: 2, 
        justifyContent: 'flex-end',
        borderTop: '1px solid #e0e0e0'
      }}>
        {tab === 'upload' ? (
          <>
            <Button
              variant="outlined"
              sx={{ 
                mr: 2,
                color: '#3F78FF', 
                borderColor: '#3F78FF', 
                textTransform: 'none',
                borderRadius: '8px',
              }}
              onClick={triggerFileInput}
            >
              Upload new
            </Button>
            <Button
              variant="contained"
              sx={{ 
                backgroundColor: '#FE2C55', 
                textTransform: 'none',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#FE2C40',
                },
              }}
              onClick={handleSaveCroppedImage}
              disabled={!imageSrc}
            >
              Confirm
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            sx={{ 
              backgroundColor: '#FE2C55', 
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#FE2C40',
              },
            }}
            onClick={onClose}
          >
            Confirm
          </Button>
        )}
      </Box>
    </Dialog>
  );
};

export default ThumbnailEditorModal;
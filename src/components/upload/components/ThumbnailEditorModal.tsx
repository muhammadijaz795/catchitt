import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  Tabs, Tab, Box, Button,
  Typography, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import { CropperRef } from 'react-advanced-cropper';

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
  const [linePercent, setLinePercent] = useState(50); // 0-100
  const [manualSelect, setManualSelect] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState(false);
  const cropperRef = useRef<CropperRef | null>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDraggingRef = useRef(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Set initial preview when currentThumbnail changes
  useEffect(() => {
    if (currentThumbnail) {
      setPreview(currentThumbnail);
    }
  }, [currentThumbnail]);

  // Initialize preview image based on linePercent
 useEffect(() => {
    const index = Math.round((linePercent / 100) * (videoThumbnails.length - 1));
    setPreviewImage(videoThumbnails[index]);
  }, [linePercent, videoThumbnails]);

  // Handle select frame
  const handleSelectFrame = (thumbUrl: string, index: number) => {
    setPreview(thumbUrl);
    onSelectThumbnail(index);
    setManualSelect(true);
    setTimeout(() => setManualSelect(false), 1000);
  };

  // File input handlers
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

  // Save cropped image
  const handleSaveCroppedImage = async () => {
    if (cropperRef.current) {
      try {
        const canvas = cropperRef.current.getCanvas();
        if (canvas) {
          canvas.toBlob((blob: any) => {
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

  // Drag handling for the line
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !thumbnailsRef.current) return;
    const container = thumbnailsRef.current;
    const rect = container.getBoundingClientRect();
    let newPercent = ((e.clientX - rect.left) / rect.width) * 100;
    newPercent = Math.max(0, Math.min(100, newPercent));
    setLinePercent(newPercent);

    // Find closest thumbnail
    const totalThumbnails = videoThumbnails.length;
    const index = Math.round((newPercent / 100) * (totalThumbnails - 1));
    const thumbUrl = videoThumbnails[index];
    setPreviewImage(thumbUrl);
    onSelectThumbnail(index);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

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
      {/* Header with tabs and close button */}
      <DialogTitle
        sx={{
          p: 0,
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
            '& .MuiTab-root': {
              fontWeight: 'bold',
              color: 'gray',
              textTransform: 'none',
              fontSize: '1.25rem',
              padding: 3
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
        <IconButton onClick={onClose} sx={{ color: 'black', mr: 3 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      {/* Content */}
      <DialogContent sx={{ p: 0 }}>
        {tab === 'select' && (
          <>
            {/* Preview Image */}
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
            {/* Slider with draggable line */}
            <Box sx={{ position: 'relative', height: 90, mb: 4 }}>
              {/* Top preview of current slide */}
              {/* {previewImage && (
                <Box sx={{ position: 'absolute', bottom: '100%', mb: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <img src={previewImage} alt="Preview" style={{ height: '80px', objectFit: 'contain', borderRadius: '4px' }} />
                </Box>
              )} */}
              {/* Draggable line */}
              <Box
                ref={lineRef}
                sx={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  backgroundColor: '#00BCD4',
                  left: `${linePercent}%`,
                  transform: 'translateX(-50%)',
                  zIndex: 2,
                  cursor: 'ew-resize',
                }}
                onMouseDown={handleMouseDown}
              />
              {/* Thumbnails container */}
              <Box
                ref={thumbnailsRef}
                sx={{
                  display: 'flex',
                  overflowX: 'auto',
                  px: 1,
                  height: '100%',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                  cursor: 'grab',
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
                {/* Drag and drop icon */}
                <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.4465 47.1592H43.6965C46.6942 47.1515 49.578 46.0103 51.7692 43.9647C53.9605 41.919 55.297 39.1204 55.5106 36.1303C55.7242 33.1402 54.799 30.18 52.9207 27.8437C51.0425 25.5074 48.3501 23.9679 45.384 23.5342C44.7891 19.8075 42.8114 16.4419 39.8452 14.1087C36.879 11.7755 33.1423 10.6461 29.3803 10.9458C25.6183 11.2455 22.1075 12.9523 19.5481 15.7257C16.9887 18.4991 15.5688 22.1353 15.5715 25.9092V25.9217C12.7891 26.0527 10.1694 27.2712 8.27655 29.3146C6.38367 31.3581 5.36895 34.0632 5.45089 36.8475C5.53283 39.6318 6.70487 42.2725 8.71465 44.2011C10.7244 46.1298 13.4112 47.192 16.1965 47.1592H28.6965V32.3092L25.459 35.5467C25.3421 35.6612 25.1851 35.7254 25.0215 35.7254C24.8579 35.7254 24.7008 35.6612 24.584 35.5467L22.809 33.7717C22.6945 33.6549 22.6303 33.4978 22.6303 33.3342C22.6303 33.1706 22.6945 33.0135 22.809 32.8967L29.2465 26.4592C29.598 26.1081 30.0746 25.9109 30.5715 25.9109C31.0684 25.9109 31.5449 26.1081 31.8965 26.4592L38.334 32.8967C38.584 33.1467 38.584 33.5217 38.334 33.7717L36.559 35.5467C36.4422 35.6612 36.2851 35.7254 36.1215 35.7254C35.9579 35.7254 35.8008 35.6612 35.684 35.5467L32.4465 32.3092V47.1592Z" fill="black" fillOpacity="0.34"/>
                </svg>
                <Typography variant="h5" sx={{ mb: 0, color: '#000 !important' }}>
                  Drag and drop a file here
                </Typography>
                <Button
                  sx={{textTransform: 'lowercase'}}
                  variant="text"
                  onClick={triggerFileInput}
                >
                 <span className='text-black'>Or</span>  select a file
                </Button>
                <Typography variant='body2' sx={{color: '#00000052'}}>Supported formats: JPG, JPEG, and PNG.</Typography>
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

      {/* Buttons at bottom */}
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
              sx={{ 
                mr: 2,
                px: 2,
                color: '#000', 
                textTransform: 'none',
                borderRadius: '8px',
                backgroundColor: '#0000000D'
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
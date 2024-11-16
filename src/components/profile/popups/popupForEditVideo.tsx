import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import style from './popupForEditVideo.module.scss';
import { EDIT_VIDEO_ACTIONS } from '../../../utils/constants';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

function PopupForEditVideo({ isDarkTheme, open, targetVideo, handleClose }: any) {

    const [selectedActionIndex, setSelectedActionIndex] = useState(1);

    const lightThemePalette = createTheme({
        palette: {
          mode: 'light',
        },
      });
    
      const darkThemePalette = createTheme({
        palette: {
          mode: 'dark',
        },
      });

    useEffect(() => {
      console.log('PopupForEditVideo mounted',targetVideo)
    }, [targetVideo])
    

    return (
        <ThemeProvider theme={isDarkTheme ? darkThemePalette : lightThemePalette}>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                PaperProps={{
                    style: {
                        width: '900px',
                        maxWidth: '90%',
                        borderRadius: '10px',
                    },
                }}
            >
                <div className={style.EditModal}>
                  <div className={style.modalHeader} >
                    <span className={style.modalTitle}>Edit Video</span>
                    <button className={style.closeIcon} onClick={handleClose}>X</button>
                  </div>
                  <div className={style.modalBody}>
                    <div className={style.content}>
                      <div className={style.actions}>
                        {EDIT_VIDEO_ACTIONS.map((action, index) => (
                          <div className='p-2 text-center'>
                              <img className='m-auto' src={action.icon} alt="music" />
                              <span className='text-sm'>{action.title}</span>
                          </div>
                        ))}
                          
                      </div>
                      <div className={style.recommendedContainer}></div>
                      <div className={style.videoContainer}>
                        <video controls src={targetVideo.reducedVideoUrl} style={{width:'200px', height:'355px'}} />
                      </div>
                    </div>

                  </div>
                </div>
            </BootstrapDialog>
        </ThemeProvider>
    )
}

export default PopupForEditVideo
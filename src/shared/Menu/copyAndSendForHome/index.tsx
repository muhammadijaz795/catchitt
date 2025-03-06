import { styled } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import {
    copyLink,
    embedShare,
    facebookShare,
    linkedInShare,
    send,
    twitterShare,
    whatsappShare,
} from '../../../icons';
import { BASE_URL_FRONTEND } from '../../../utils/constants';
import style from './index.module.scss';
import LinkIcon from '../../../components/shared-video/svg-components/link-icon.svg';

export default function COPY_AND_SEND_MODAL_HOME({
    copyHandler,
    popupHandler,
    bottonSide,
    videoUrl,
    videoTitle,
    userName,
    generateEmbedCodeHandler,
}: any) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function extractVideoId(url: string) {
        const regex = /videos\/(.*?)\/reduced/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const shareToWhatsApp = () => {
        let url = `${BASE_URL_FRONTEND}/${userName}/video/${extractVideoId(videoUrl)}`;
        window.open(`https://api.whatsapp.com/send?text=${videoTitle} - ${url}`, '_blank');
    };

    const shareToFacebook = () => {
        let url = `${BASE_URL_FRONTEND}/${userName}/video/${extractVideoId(videoUrl)}`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };

    const shareToTwitter = () => {
        let url = `${BASE_URL_FRONTEND}/${userName}/video/${extractVideoId(videoUrl)}`;
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${videoTitle}`, '_blank');
    };

    const shareToLinkedIn = () => {
        let url = `${BASE_URL_FRONTEND}/${userName}/video/${extractVideoId(videoUrl)}`;
        window.open(
            `https://www.linkedin.com/shareArticle?url=${url}&title=${videoTitle}`,
            '_blank'
        );
    };

    return (
        <>
            {/* <List component="nav" aria-label="Share Options">
                <ListItemButton onClick={handleClickOpen} className={style.navImpClass}>
                    Share
                </ListItemButton>
            </List> */}
            <List component="nav" aria-label="Device settings" sx={{ bgcolor: 'background.paper' }}>
                <ListItemButton
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    //   aria-label="when device is locked"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickOpen}
                    className={style.navImpClass}
                    // style={{ background: 'transparent' }}
                ></ListItemButton>
            </List>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Share to</DialogTitle>
                <DialogContent >
                    <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                        <div className={style.menuItem} onClick={copyHandler}>
                            <div className="h-7 w-7 flex items-center justify-center bg-red-500 rounded-full">
                                <img src={LinkIcon} style={{width:'1.1rem', height: '1.1rem'}} alt="Copy Link" />
                            </div>
                            <p className={`${style.p} ${style.black_500}`}>Copy link</p>
                        </div>
                    </MenuItem>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                            <div className={style.menuItem} onClick={popupHandler}>
                                <div className="h-7 w-7 flex items-center justify-center bg-white shadow-md rounded-full">
                                    <img src={send} style={{width:'1.1rem', height: '1.1rem'}} alt="Send" />
                                </div>
                                <p className={`${style.p} ${style.fp} ${style.black_500}`}>Send</p>
                            </div>
                        </MenuItem>
                        </Grid>
                        <Grid item xs={3}>

                    <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                        <div className={style.menuItem} onClick={copyHandler}>
                            <div className="h-7 w-7 flex items-center justify-center bg-red-500 rounded-full">
                                <img src={LinkIcon} style={{width:'1.1rem', height: '1.1rem'}} alt="Copy Link" />
                            </div>
                            <p className={`${style.p} ${style.black_500}`}>Copy link</p>
                        </div>
                    </MenuItem>
                    </Grid>
                    <Grid item xs={3}>

                    <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                        <div className={style.menuItem} onClick={generateEmbedCodeHandler}>
                            <img src={embedShare} />
                            <p className={`${style.p} ${style.black_500}`}>Embed</p>
                        </div>
                    </MenuItem>
                    </Grid>
                    <Grid item xs={3}>
                    <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                        <div className={style.menuItem} onClick={shareToWhatsApp}>
                            <img src={whatsappShare} />
                            <p className={`${style.p} ${style.black_500}`}>Whatsapp</p>
                        </div>
                    </MenuItem>
                    </Grid>
                    <Grid item xs={3}>
                    <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                        <div className={style.menuItem} onClick={shareToFacebook}>
                            <img src={facebookShare} />
                            <p className={`${style.p} ${style.black_500}`}>Facebook</p>
                        </div>
                    </MenuItem>
                    </Grid>
                    <Grid item xs={3}>
                    <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                        <div className={style.menuItem} onClick={shareToTwitter}>
                            <img src={twitterShare} />
                            <p className={`${style.p} ${style.black_500}`}>Twitter</p>
                        </div>
                    </MenuItem>
                    </Grid>
                    <Grid item xs={3}>
                    <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                        <div className={style.menuItem} onClick={shareToLinkedIn}>
                            <img src={linkedInShare} />
                            <p className={`${style.p} ${style.black_500}`}>LinkedIn</p>
                        </div>
                    </MenuItem>
                    </Grid>
                </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}

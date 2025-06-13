import { IconButton, styled } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'

import {
    RepostVideo,
    copyLink,
    embedShare,
    facebookShare,
    linkedInShare,
    send,
    twitterShare,
    whatsappShare,
} from '../../../icons';
import { BASE_URL_FRONTEND, showToastSuccess } from '../../../utils/constants';
import style from './index.module.scss';
import LinkIcon from '../../../components/shared-video/svg-components/link-icon.svg';
import { videoRepostHandle } from '../../../redux/AsyncFuncs';

export default function COPY_AND_SEND_MODAL_HOME({
    copyHandler,
    popupHandler,
    bottonSide,
    videoUrl,
    videoTitle,
    userName,
    generateEmbedCodeHandler,
    mediaId,
}: any) {
    const dispatch = useDispatch();
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

    const repostVideoEventHandle = async () => {
        console.log(mediaId);
        showToastSuccess('Media reposted successfully');
        dispatch(videoRepostHandle(mediaId));
        handleClose();
    }
    const ThemeColor = window.localStorage.getItem('theme');
    // console.log('Dark Theme:'+ThemeColor)

    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    
    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setIsDarkTheme(true);
        }
    });


    return (
        <div className='modal-shares'>
            {/* <List component="nav" aria-label="Share Options">
                <ListItemButton onClick={handleClickOpen} className={style.navImpClass}>
                    Share
                </ListItemButton>
            </List> */}
            <List component="nav" style={{
                    height: '3rem',
                    width: '3rem',
                    maxWidth: '3.5rem',
                    maxHeight: '3.5rem',
                    zIndex: 999,
                }} aria-label="Device settings" sx={{ bgcolor: 'background.paper' }}>
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
            <Dialog  open={open} onClose={handleClose} maxWidth='xs'  >
            <DialogTitle className={isDarkTheme ? 'bg-[#181818]' : 'bg-white'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000' }}>
                <span className={`${ThemeColor === 'dark' ? 'text-white' : 'text-black'} font-medium `} >Share to</span>
                <DialogActions onClick={handleClose} sx={{ color: 'inherit', position: 'absolute', right: '1rem', cursor: 'pointer' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.35 6.06095C19.4432 5.96726 19.4954 5.84054 19.4954 5.70845C19.4954 5.57635 19.4432 5.44963 19.35 5.35595L18.65 4.64595C18.6035 4.59908 18.5482 4.56188 18.4873 4.5365C18.4264 4.51112 18.361 4.49805 18.295 4.49805C18.229 4.49805 18.1637 4.51112 18.1027 4.5365C18.0418 4.56188 17.9865 4.59908 17.94 4.64595L12 10.5859L6.06003 4.65095C5.96635 4.55782 5.83962 4.50555 5.70753 4.50555C5.57544 4.50555 5.44871 4.55782 5.35503 4.65095L4.64503 5.36095C4.5519 5.45463 4.49963 5.58135 4.49963 5.71345C4.49963 5.84554 4.5519 5.97226 4.64503 6.06595L10.585 12.0009L4.65003 17.9409C4.5569 18.0346 4.50463 18.1614 4.50463 18.2934C4.50463 18.4255 4.5569 18.5523 4.65003 18.6459L5.36003 19.3559C5.45371 19.4491 5.58044 19.5013 5.71253 19.5013C5.84462 19.5013 5.97135 19.4491 6.06503 19.3559L12 13.4159L17.94 19.3509C18.0337 19.4441 18.1604 19.4963 18.2925 19.4963C18.4246 19.4963 18.5513 19.4441 18.645 19.3509L19.355 18.6409C19.4482 18.5473 19.5004 18.4205 19.5004 18.2884C19.5004 18.1564 19.4482 18.0296 19.355 17.9359L13.415 12.0009L19.35 6.06095Z" fill={`${ThemeColor === 'dark' ? '#000' : '#fff'}`} />
                </svg>
                </DialogActions>
            </DialogTitle>                
            <DialogContent className={isDarkTheme ? 'bg-[#181818] !px-2.5' : 'bg-white !px-2.5'}>
                    <MenuItem className='pb-4' onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                        <div className={style.menuItem} onClick={copyHandler}>
                            <div className="h-12 w-100 overflow-hidden flex items-center justify-between p-2 bg-[#f2f2f2] rounded-md">
                                <span className='overflow-hidden' style={{ maxWidth: '22.5rem' }}>https://web.seezitt.com/kamranaf078e/video/6730f96e97a617aea1ba8581</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.91996 15.7556C3.58903 15.4248 3.32651 15.032 3.14741 14.5997C2.9683 14.1674 2.87612 13.7041 2.87612 13.2362C2.87612 12.7682 2.9683 12.3049 3.14741 11.8726C3.32651 11.4403 3.58903 11.0475 3.91996 10.7167L5.80809 8.82855C5.88181 8.75439 5.92319 8.65406 5.92319 8.54949C5.92319 8.44492 5.88181 8.34459 5.80809 8.27043L5.246 7.70834C5.17201 7.63582 5.07253 7.59519 4.96892 7.59519C4.86531 7.59519 4.76583 7.63582 4.69184 7.70834L2.79579 9.60439C1.86704 10.5765 1.35562 11.8734 1.37094 13.2178C1.38626 14.5622 1.92712 15.8471 2.87779 16.7978C3.82845 17.7485 5.11343 18.2893 6.45779 18.3047C7.80215 18.32 9.09912 17.8086 10.0712 16.8798L11.9633 14.9917C12.0004 14.9549 12.0298 14.9111 12.0499 14.8629C12.07 14.8146 12.0804 14.7629 12.0804 14.7106C12.0804 14.6584 12.07 14.6066 12.0499 14.5584C12.0298 14.5102 12.0004 14.4664 11.9633 14.4296L11.4012 13.8715C11.327 13.7977 11.2267 13.7564 11.1221 13.7564C11.0176 13.7564 10.9173 13.7977 10.8431 13.8715L8.951 15.7596C8.28303 16.4267 7.37757 16.8015 6.4335 16.8015C5.48944 16.8015 4.58397 16.4267 3.916 15.7596L3.91996 15.7556ZM9.30725 5.32939L10.7758 3.86084C11.4068 3.22996 12.2625 2.87554 13.1548 2.87554C14.047 2.87554 14.9027 3.22996 15.5337 3.86084L15.8108 4.13793C16.1238 4.45042 16.3721 4.82156 16.5415 5.23011C16.7109 5.63865 16.7981 6.07659 16.7981 6.51887C16.7981 6.96114 16.7109 7.39908 16.5415 7.80762C16.3721 8.21617 16.1238 8.58731 15.8108 8.8998L14.3462 10.3683C14.2725 10.4425 14.2311 10.5428 14.2311 10.6474C14.2311 10.752 14.2725 10.8523 14.3462 10.9265L14.9043 11.4886C14.9785 11.5623 15.0788 11.6037 15.1834 11.6037C15.288 11.6037 15.3883 11.5623 15.4625 11.4886L16.935 10.02C17.3946 9.56054 17.7591 9.01503 18.0079 8.41463C18.2566 7.81424 18.3846 7.17072 18.3846 6.52084C18.3846 5.87097 18.2566 5.22745 18.0079 4.62706C17.7591 4.02666 17.3946 3.48115 16.935 3.02168L16.6539 2.74459C16.1944 2.285 15.6489 1.92042 15.0485 1.67168C14.4481 1.42295 13.8046 1.29492 13.1548 1.29492C12.5049 1.29492 11.8614 1.42295 11.261 1.67168C10.6606 1.92042 10.1151 2.285 9.65559 2.74459L8.18705 4.20918C8.14994 4.24598 8.1205 4.28976 8.1004 4.33799C8.0803 4.38623 8.06996 4.43796 8.06996 4.49022C8.06996 4.54247 8.0803 4.59421 8.1004 4.64245C8.1205 4.69068 8.14994 4.73446 8.18705 4.77126L8.74517 5.32939C8.78197 5.36649 8.82575 5.39593 8.87398 5.41603C8.92222 5.43613 8.97396 5.44647 9.02621 5.44647C9.07847 5.44647 9.1302 5.43613 9.17844 5.41603C9.22668 5.39593 9.27046 5.36649 9.30725 5.32939Z" fill="black"/>
                                <path d="M6.71462 11.8358C6.67752 11.8726 6.64807 11.9164 6.62798 11.9646C6.60788 12.0129 6.59753 12.0646 6.59753 12.1169C6.59753 12.1691 6.60788 12.2208 6.62798 12.2691C6.64807 12.3173 6.67752 12.3611 6.71462 12.3979L7.2767 12.956C7.3135 12.9931 7.35728 13.0226 7.40552 13.0427C7.45375 13.0628 7.50549 13.0731 7.55775 13.0731C7.61 13.0731 7.66174 13.0628 7.70997 13.0427C7.75821 13.0226 7.80199 12.9931 7.83879 12.956L12.7313 8.05956C12.7684 8.02276 12.7978 7.97898 12.8179 7.93075C12.838 7.88251 12.8484 7.83077 12.8484 7.77852C12.8484 7.72626 12.838 7.67453 12.8179 7.62629C12.7978 7.57805 12.7684 7.53428 12.7313 7.49748L12.1732 6.93935C12.1364 6.90225 12.0926 6.8728 12.0443 6.85271C11.9961 6.83261 11.9444 6.82227 11.8921 6.82227C11.8399 6.82227 11.7881 6.83261 11.7399 6.85271C11.6917 6.8728 11.6479 6.90225 11.6111 6.93935L6.71858 11.8358H6.71462Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                    </MenuItem> 
                    <Grid container spacing={2}>
                    <Grid item xs={3}>
                    <MenuItem onClick={repostVideoEventHandle} style={{ padding: '0px', margin: '0px' }}>
                        <div className={style.menuItem} >
                            <div className=" flex items-center justify-center rounded-full">
                                <img className='!w-14 !h-14' src={RepostVideo}  alt="Copy Link" />
                            </div>
                            <p className={`${ThemeColor === 'dark' ? 'text-white' : 'text-black'} font-medium `} >Repost</p>
                        </div>
                    </MenuItem>
                    </Grid>
                    <Grid item xs={3}>
                        <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                            <div className={style.menuItem} onClick={popupHandler}>
                                <div className=" flex items-center justify-center bg-white shadow-md rounded-full">
                                    <img className='!w-14 !h-14' src={send}  alt="Send" />
                                </div>
                                <p className={`${ThemeColor === 'dark' ? 'text-white' : 'text-black'} font-medium `}>Send to friends</p>
                            </div>
                        </MenuItem>
                        </Grid>
                    
                    <Grid item xs={3}>
                        <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                            <div className={style.menuItem} onClick={generateEmbedCodeHandler}>
                                <img className='!w-14 !h-14' src={embedShare} />
                                <p className={`${ThemeColor === 'dark' ? 'text-white' : 'text-black'} font-medium `}>Embed</p>
                            </div>
                        </MenuItem>
                        </Grid>
                        <Grid item xs={3}>
                        <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                            <div className={style.menuItem} onClick={shareToWhatsApp}>
                                <img className='!w-14 !h-14' src={whatsappShare} />
                                <p className={`${ThemeColor === 'dark' ? 'text-white' : 'text-black'} font-medium `}>Whatsapp</p>
                            </div>
                        </MenuItem>
                        </Grid>
                        <Grid item xs={3}>
                        <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                            <div className={style.menuItem} onClick={shareToFacebook}>
                                <img className='!w-14 !h-14' src={facebookShare} />
                                <p className={`${ThemeColor === 'dark' ? 'text-white' : 'text-black'} font-medium `}>Facebook</p>
                            </div>
                        </MenuItem>
                        </Grid>
                        <Grid item xs={3}>
                        <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                            <div className={style.menuItem} onClick={shareToTwitter}>
                                <img className='!w-14 !h-14' src={twitterShare} />
                                <p className={`${ThemeColor === 'dark' ? 'text-white' : 'text-black'} font-medium `}>Twitter</p>
                            </div>
                        </MenuItem>
                        </Grid>
                        <Grid item xs={3}>
                        <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                            <div className={style.menuItem} onClick={shareToLinkedIn}>
                                <img className='!w-14 !h-14' src={linkedInShare} />
                                <p className={`${ThemeColor === 'dark' ? 'text-white' : 'text-black'} font-medium `}>LinkedIn</p>
                            </div>
                        </MenuItem>
                        </Grid>
                </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}

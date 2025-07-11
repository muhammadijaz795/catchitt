import React, { useState } from 'react';
import { Box, Typography, Button, Avatar, List, ListItem, ListItemText, ListItemIcon, TextField, Link,Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import styles from './golive.module.scss';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import FlipCameraIosOutlinedIcon from '@mui/icons-material/FlipCameraIosOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import thumbnail from '../../assets/thumbnail.png';
import { useTranslation } from 'react-i18next';
const GoLiveGuest = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { t, i18n } = useTranslation();

    const suggestedCreators = [
        {
            id: 1,
            avatar: thumbnail,
            name: 'GamerGuru',
            coHostingWith: 'StreamerPro',
            isCoHosting: true,
        },
    ];

    return (
        <Box sx={{ px: 3, pt: 1 }} style={{ color: '#fff' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h6">Go Live with guests</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link href='#' style={{ color: '#fff',marginRight:'10px' }}>
                        <PeopleOutlineIcon />
                    </Link>
                    <Link href='#' style={{ color: '#fff' }}>
                        <SettingsIcon />
                    </Link>
                </div>
            </Box>
            <hr />
            <Box sx={{ my: 1 }}>
                <List sx={{ m: 0, p: 0 }}>
                    {suggestedCreators.map((creator) => (
                        <ListItem key={creator.id} sx={{ m: 0, p: 0 }}>
                            <ListItemIcon>
                                <Avatar style={{width:'45px',height:'45px'}} src={creator.avatar} />
                            </ListItemIcon>
                            <ListItemText
                                primary={creator.name}
                                secondary={`Co-hosting with ${creator.coHostingWith}`}
                                sx={{
                                    color: 'white', // Primary text color
                                    '& .MuiListItemText-secondary': {
                                        color: 'lightgray', // Secondary text color
                                    },
                                }}
                            />
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Link href='#' style={{ color: '#fff',marginRight:'10px' }}>
                                        <VideocamOutlinedIcon />
                                    </Link>
                                    <Link href='#' style={{ color: '#fff' }}>
                                        <FlipCameraIosOutlinedIcon />
                                    </Link>
                                </div>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box className={styles.requestBox}>
                <div>
                    <PersonOutlineOutlinedIcon style={{fontSize:'60px'}}/>
                    <Typography sx={{ pb: 1 }} variant="h6">No guests requests yet</Typography>
                    <Typography sx={{ pb: 1 }} variant="subtitle1">You can invite friends as guests</Typography>
                    <button className={styles.inviteButton}>{t('livestream.invite')}</button>
                </div>
            </Box>
        </Box>
    );
};

export default GoLiveGuest;
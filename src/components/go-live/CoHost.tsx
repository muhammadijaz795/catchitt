import React, { useState } from 'react';
import { Box, Typography, Button, Avatar, List, ListItem, ListItemText, ListItemIcon, TextField, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './golive.module.scss';
import { useTranslation } from 'react-i18next';

const CoHostWithCreators = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { t, i18n } = useTranslation();

    const suggestedCreators = [
        {
            id: 1,
            avatar: 'https://example.com/avatar1.jpg',
            name: 'GamerGuru',
            coHostingWith: 'StreamerPro',
            isCoHosting: true,
        },
        {
            id: 2,
            avatar: 'https://example.com/avatar2.jpg',
            name: 'MusicMaker',
            coHostingWith: null, // Not co-hosting with anyone
            isCoHosting: false,
        },
        {
            id: 3,
            avatar: 'https://example.com/avatar3.jpg',
            name: 'ArtStar',
            coHostingWith: 'CreativeFlow',
            isCoHosting: true,
        },
        {
            id: 4,
            avatar: 'https://example.com/avatar3.jpg',
            name: 'ArtStar',
            coHostingWith: 'CreativeFlow',
            isCoHosting: true,
        },
        {
            id: 5,
            avatar: 'https://example.com/avatar3.jpg',
            name: 'ArtStar',
            coHostingWith: 'CreativeFlow',
            isCoHosting: true,
        },
        {
            id: 6,
            avatar: 'https://example.com/avatar3.jpg',
            name: 'ArtStar',
            coHostingWith: 'CreativeFlow',
            isCoHosting: true,
        },
        {
            id: 7,
            avatar: 'https://example.com/avatar3.jpg',
            name: 'ArtStar',
            coHostingWith: 'CreativeFlow',
            isCoHosting: true,
        },
    ];

    return (
        <Box sx={{ px: 3, pt: 1 }} style={{ color: '#fff' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h6">Co-host with creators</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link href='#' style={{ color: '#fff',marginRight:'10px' }}>
                        <SearchIcon />
                    </Link>
                    <Link href='#' style={{ color: '#fff' }}>
                        <SettingsIcon />
                    </Link>
                </div>
            </Box>
            <Box sx={{ p: 2 }} style={{ border: '1px solid #bdbdbd', borderRadius: '8px' }}>
                <Typography variant="h6">Quick invites</Typography>
                <Typography variant="body2">Co-host with a recommended creator to make new friends</Typography>
                <button style={{ width: '100%', marginTop: '10px' }} className={styles.buttonWidth}>Send</button>
            </Box>
            <Box sx={{ my: 1 }}>
                <Typography sx={{ my: 1 }} variant="body1">Friends (0)</Typography>
                <Typography sx={{ my: 1 }} variant="body1">Suggested creators</Typography>
                <List className={styles.creatorsView} sx={{ m: 0, p: 0 }}>
                    {suggestedCreators.map((creator) => (
                        <ListItem key={creator.id} sx={{ m: 0, p: 0 }}>
                            <ListItemIcon>
                                <Avatar src={creator.avatar} />
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
                                <button className={styles.buttonWidth}>
                                    {creator.isCoHosting ? 'Join' : t('livestream.invite')}
                                </button>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default CoHostWithCreators;
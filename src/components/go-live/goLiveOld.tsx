import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Box, Button, List, ListItem, ListItemText, SwipeableDrawer, FormGroup, FormControlLabel, Switch, Typography } from '@mui/material';
import { PowerSettingsNew as PowerIcon, Diamond as DiamondIcon, TrendingUp as TrendingUpIcon, ArrowForwardIos as ArrowIcon, MicOff as MicOffIcon, FlipCameraIos as FlipCameraIcon, SwapVert as SwapVertIcon, PauseCircleOutline as PauseIcon, SettingsOutlined as SettingsIcon, CardGiftcardOutlined as GiftIcon, SmsOutlined as SmsIcon, ArticleOutlined as ArticleIcon, SourceOutlined as SourceIcon, MoreHorizOutlined as MoreIcon, PeopleOutlineOutlined as PeopleIcon, QuestionAnswerOutlined as ChatIcon, ShareOutlined as ShareIcon, AutoFixHighOutlined as EnhanceIcon, JoinInnerOutlined as JoinIcon } from '@mui/icons-material';
import styles from './golive.module.scss';
import thumbnail from '../../assets/thumbnail.png';
import FourEqualBlocks from './FourBlocks'
import CoHost from './CoHost'
import GoLiveGuest from './GoLiveGuest';


type Anchor = 'bottom';

function GoLive() {
    const [isRotated, setIsRotated] = useState(false);
    const socketRef = useRef();
    const [permissionState, setPermissionState] = useState(false);
    const [drawerState, setDrawerState] = useState({ bottom: false });
    const [drawerStateHost, setDrawerStateHost] = useState({ bottom: false });
    const [drawerStateGoLive, setDrawerStateGoLive] = useState({ bottom: false });
    const token = localStorage.getItem('token');
    const SERVER_URL = `https://staginglive1.seezitt.com/?token=${token}`;
    const handleToggleRotation = () => {
        setIsRotated(!isRotated);
    };

    const toggleDrawer = (anchor: Anchor, open: boolean) => () => setDrawerState({ ...drawerState, [anchor]: open });
    const toggleDrawerHost = (anchor: Anchor, open: boolean) => () => setDrawerStateHost({ ...drawerStateHost, [anchor]: open });
    const toggleDrawerGoLive = (anchor: Anchor, open: boolean) => () => setDrawerStateGoLive({ ...drawerStateGoLive, [anchor]: open });

    const list = (anchor: Anchor) => (
        <Box role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                    {[
                        { icon: <FlipCameraIcon />, text: "Flip camera" },
                        { icon: <SwapVertIcon />, text: "Mirror your video", switch: true },
                        { icon: <MicOffIcon />, text: "Mute your audio", switch: true },
                        { icon: <PauseIcon />, text: "Pause Live" },
                        { icon: <SettingsIcon />, text: "Settings" },
                        { icon: <GiftIcon />, text: "Live Gifts" },
                        { icon: <SmsIcon />, text: "Comment" },
                        { icon: <ArticleIcon />, text: "About me" },
                        { icon: <SourceIcon />, text: "Content disclosure" },
                    ].map(({ icon, text, switch: hasSwitch }, index) => (
                        <ListItem key={index} className={styles.listBackground}>
                        {icon}
                        <ListItemText primary={text} />
                        {hasSwitch && (
                            <div className="form-check form-switch">
                            <input
                                className={`form-check-input ${styles.listSwitch}`}
                                type="checkbox"
                                role="switch"
                                id={`flexSwitchCheckChecked-${index}`}
                            />
                            </div>
                        )}
                        </ListItem>
                    ))}
                </List>
        </Box>
    );
    const listHost = (anchor: Anchor) => (
        <Box style={{background:'#212529'}} role="presentation" onClick={toggleDrawerHost(anchor, false)} onKeyDown={toggleDrawerHost(anchor, false)}>
            <CoHost/>
        </Box>
    );
    const listGoLive = (anchor: Anchor) => (
        <Box style={{background:'#212529'}} role="presentation" onClick={toggleDrawerGoLive(anchor, false)} onKeyDown={toggleDrawerGoLive(anchor, false)}>
            <GoLiveGuest/>
        </Box>
    );

    useEffect(() => {
        // Connect to the WebSocket server
        const socket = io('wss://staginglive1.seezitt.com');

        // Handle connection events
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');

            // Authenticate with token
            const token = 'your_token_here';
            socket.emit('authenticate', { token });
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Handle incoming stream data
        socket.on('stream_data', (data) => {
            console.log('Received stream data:', data);
            // Process the stream data as needed
        });

        return () => {
            // Disconnect from WebSocket server when component unmounts
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        // Connect to the WebSocket server
        const socket = io('wss://staginglive1.seezitt.com');

        // Handle connection events
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');

            // Authenticate with token
            const token = 'your_token_here';
            socket.emit('authenticate', { token });
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Handle incoming stream data
        socket.on('stream_data', (data) => {
            console.log('Received stream data:', data);
            // Process the stream data as needed
        });

        return () => {
            // Disconnect from WebSocket server when component unmounts
            socket.disconnect();
        };
    }, []);

    function startSocket() {
        console.log("Here");
        if ((socketRef.current as any) && (socketRef.current as any).connected) {
            console.log('Socket already connected.');
            console.log("Here Inside");
            return;
        }
        (socketRef.current as any) = io(SERVER_URL, {
            transports: ['websocket'],
        });
        // const transport = new protooClient.WebSocketTransport(SERVER_URL);

        // console.log('Transport : ', transport);
    }

    return (
        <div style={{ background: '#000' }}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100vw', alignItems: 'center', padding: '10px' }}>
                    <div className={styles.thumbnailParent}>
                        <div className={styles.thumbnail}>
                            <img src={thumbnail} alt="Thumbnail" />
                            <MicOffIcon className={styles.micOffIcon} />
                        </div>
                        <div className={styles.nameHeartCount}>
                            <p>Omar</p>
                            <p>❤️ 3</p>
                        </div>
                        <div className={styles.heartWrapper}>
                            <p>❤️ 3</p>
                        </div>
                    </div>
                    <Link to='/'><PowerIcon style={{ color: '#fff', fontSize: '30px' }} /></Link>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100vw', alignItems: 'center', padding: '10px' }}>
                    <div className={styles.nameHeartCount}>
                        <p><DiamondIcon /> <span>League D5</span></p>
                    </div>
                    <Link to='/' className={styles.viewerTrend}>
                        <TrendingUpIcon style={{ fontSize: '20px' }} /> Viewers +0 <ArrowIcon style={{fontSize:'16px'}} />
                    </Link>
                </Box>

                <Box sx={{ height: 'calc(100vh - 158px)', overflow: 'scroll',background:'#fff' }}>
                    <FourEqualBlocks/>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'absolute', bottom: '0', background: '#000' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Button className={styles.bottomPanel} onClick={toggleDrawerHost('bottom', true)}><JoinIcon /> +Hosts</Button>
                        <Button className={styles.bottomPanel} onClick={toggleDrawerGoLive('bottom', true)}><PeopleIcon /> +Guests</Button>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Button className={styles.bottomPanel}><ChatIcon /> Interact</Button>
                        <Button className={styles.bottomPanel}><ShareIcon /> Share</Button>
                        <Button className={styles.bottomPanel}><EnhanceIcon /> Enhance</Button>
                        <Button className={styles.bottomPanel} onClick={toggleDrawer('bottom', true)}><MoreIcon /> More</Button>
                    </Box>
                </Box>

                <SwipeableDrawer anchor='bottom' open={drawerState.bottom} onClose={toggleDrawer('bottom', false)} onOpen={toggleDrawer('bottom', true)}>
                    {list('bottom')}
                </SwipeableDrawer>
                <SwipeableDrawer anchor='bottom' open={drawerStateHost.bottom} onClose={toggleDrawerHost('bottom', false)} onOpen={toggleDrawerHost('bottom', true)}>
                    {listHost('bottom')}
                </SwipeableDrawer>
                <SwipeableDrawer anchor='bottom' open={drawerStateGoLive.bottom} onClose={toggleDrawerGoLive('bottom', false)} onOpen={toggleDrawerGoLive('bottom', true)}>
                    {listGoLive('bottom')}
                </SwipeableDrawer>
            </Box>
        </div>
    );
}

export default GoLive;
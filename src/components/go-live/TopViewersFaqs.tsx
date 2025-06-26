import {
    Box,
    Typography,
    IconButton,
    Paper,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TopProfiles from '../../assets/postLive/top-viewer-faq-4.png'
import TopViewer1 from '../../assets/postLive/top-viewer-faq-1.png'
import TopViewer2 from '../../assets/postLive/top-viewer-faq-2.png'
import TopViewer3 from '../../assets/postLive/top-viewer-faq-3.png'

interface TopViewersFAQProps {
    onBack: () => void;
}

const TopViewersFAQ: React.FC<TopViewersFAQProps> = ({ onBack }) => {
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                color: '#000',
                mx: 'auto',
                textAlign: 'left',
                position: 'relative',
                height: '90vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                mt: 1,
            }}
        >
            <Box
                mb={2}
                sx={{
                    flexShrink: 0,
                    borderBottom: '1px solid #eee',
                    pb: 1
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                >
                    <Typography variant="body1" fontWeight="600" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Top viewers
                    </Typography>
                    <IconButton sx={{ color: '#666', padding: 0 }}>
                        <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                >
                    <IconButton onClick={onBack} sx={{ color: '#000', padding: 0 }}>
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body1" fontWeight="600" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Frequently asked questions
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    pr: 1
                }}
            >
                <Typography fontWeight="bold" mb={1} sx={{ mt: 2 }}>
                    1. Who can become top viewers?
                </Typography>

                <Typography variant="body2" color="#111111" mb={1}>
                    Top viewers are ranked based on likes, comments, gift count, and watch time. Viewers who send more likes, comments, and gifts will rank higher. Points are calculated by the following rules: 1 like = 1 point (max- 3 points every 10 mins) 1 comment = 1 point (max. 3 points every 10 mins) 1 Coin = 1 point Viewers with no points will be ranked based on how long they have been watching the LIVE. Viewers who are underage in their respective country or region are unable to view top viewer rankings.
                </Typography>
                <Typography variant="body2" color="#111111" mb={1}>
                    Viewers can check the number of Coins they used to send Gifts in this LIVE if they are in the top 99. However, some top viewers' activity information may be concealed depending on their ranking position.
                </Typography>
                <Typography variant="body2" color="#111111" mb={2}>
                    If viewers become the top 2 by sending Gifts, they'll get the chance to have their profile photos shown to everyone at the top of the LIVE.
                </Typography>

                <Typography fontWeight="bold" mb={1} sx={{ mt: 2 }}>
                    2. What can I get if I become a top viewer?
                </Typography>

                <Typography variant="body2" color="#111111" mb={1}>
                    • The top 2 viewers' profile photos will be shown to everyone at the top of the LIVE.
                </Typography>
                <Box
                    sx={{
                        borderRadius: 3,
                        backgroundColor: '#F8F8F8',
                        textAlign: 'center',
                        padding: 4,
                        mb: 2,
                    }}>
                    <Box
                        component="img"
                        src={TopProfiles}
                        alt="Top Viewers Profile Photos"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 1,
                            my: 1,
                        }}
                    />
                </Box>
                <Typography variant="body2" color="#111111" mb={1}>
                    • The top 3 viewers have the chance to get a top viewer badge if the value of the Gifts they send is in the top 3. The top viewer badges will be displayed next to their usernames in the comments, their profiles, and the Top Viewer Ranking. The top 3 viewers' ranking position will also be notified in the comments.
                </Typography>
                <Box
                    sx={{
                        borderRadius: 3,
                        backgroundColor: '#F8F8F8',
                        textAlign: 'center',
                        padding: 4,
                        mb: 2,
                    }}>
                    <Box
                        component="img"
                        src={TopViewer1}
                        alt="Top Viewers Ranking Explanation"
                        sx={{
                            height: 'auto',
                            my: 1,
                            mb: 3,
                        }}
                    />
                    <Box
                        component="img"
                        src={TopViewer2}
                        alt="Top Viewers Ranking Explanation"
                        sx={{
                            height: 'auto',
                            my: 1,
                            mb: 3,
                        }}
                    />
                    <Box
                        component="img"
                        src={TopViewer3}
                        alt="Top Viewers Ranking Explanation"
                        sx={{
                            height: 'auto',
                            my: 1,
                            mb: 3,
                        }}
                    />
                </Box>
                <Typography variant="body2" color="#111111" mb={1}>
                    • The top 99 viewers will be displayed in the Top Viewer Ranking. View the ranking by tapping the number at the top of a LIVE.
                </Typography>
                <Typography fontWeight="bold" mb={1} sx={{ mt: 2 }}>
                    3. Can I choose not to be shown in the rankings?
                </Typography>
                <Typography variant="body2" color="#111111" mb={1}>
                    Yes, If you choose not to be shown in the rankings, go to [Share] &gt; [Settings] &gt; [Rankings] to change your visibility settings.
                </Typography>
            </Box>
        </Box>
    );
};

export default TopViewersFAQ;
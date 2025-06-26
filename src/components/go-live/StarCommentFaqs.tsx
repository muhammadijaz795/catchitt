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

const StarCommentFaqs = ({ onBack }) => {
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
                    <IconButton onClick={onBack} sx={{ color: '#000', padding: 0 }}>
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body1" fontWeight="600" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        FAQs
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
                    What is Star Comment?
                </Typography>

                <Typography variant="body2" color="#111111" mb={1}>
                    Star Comment is a feature that allows viewers to activate their comments with Coins for them to be displayed at the top of the LIVE chat.
                    Star Comment is one of the factors to assess the popularity of content. As such, you may collect Diamonds as Rewards in accordance with the Virtual Items Policy.                
                </Typography>

                <Typography fontWeight="bold" mb={1} sx={{ mt: 2 }}>
                    Can you report Star Comments?
                </Typography>

                <Typography variant="body2" color="#111111" mb={1}>
                    You, as well as any moderators designated by you, will be able to report Star Comments that you believe they violate our Community Guidelines.
                </Typography>
                <Typography fontWeight="bold" mb={1} sx={{ mt: 2 }}>
                    How to turn off Star Comment?
                </Typography>
                <Typography variant="body2" color="#111111" mb={1}>
                    You can turn Off Star Comment through Settings &gt; Comment settings. Once you turn off this feature, viewers will not be able to send Star Comments in your LIVE videos.
                </Typography>
            </Box>
        </Box>
    );
};

export default StarCommentFaqs;
import {
    Box,
    Typography,
    IconButton,
    Paper,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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
                    What can moderators do during my LIVE?
                </Typography>

                <Typography variant="body2" color="#111111" mb={1}>
                    Moderators can manage your comment settings, your muted and blocked account lists, and more.               
                </Typography>

                <Typography fontWeight="bold" mb={1} sx={{ mt: 2 }}>
                    How do I add moderators?
                </Typography>

                <Typography variant="body2" color="#111111" mb={1}>
                    • Before LIVE: GO to Settings &gt; Moderators &gt; Add
                    moderators
                    • During LIVE: Go to Admin settings &gt; Moderators &gt;
                    Add moderators
                    • During LIVE: Tap a viewer's username &gt; Manage &gt;
                    Add moderators
                </Typography>
                <Typography fontWeight="bold" mb={1} sx={{ mt: 2 }}>
                    Can I manage access for each moderator?
                </Typography>
                <Typography variant="body2" color="#111111" mb={1}>
                    Yes, you can either add or remove access for each moderator. Each moderator needs to have at least one fundamental or advanced access.
                </Typography>
            </Box>
        </Box>
    );
};

export default StarCommentFaqs;
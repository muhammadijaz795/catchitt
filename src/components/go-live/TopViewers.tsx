import {
    Box,
    Typography,
    IconButton,
    Paper,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TopViewer1 from '../../assets/postLive/top-viewer-faq-1.png'
import { useTranslation } from 'react-i18next';

interface TopViewersProps {
    onBack: () => void;
}

const TopViewers = ({ onBack }: TopViewersProps) => {
    const { t, i18n } = useTranslation();
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
                        {t('livestream.top_viewers')}
                    </Typography>
                    <IconButton sx={{ color: '#666', padding: 0 }}>
                        <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    pr: 1
                }}
            >
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
                </Box>
        </Box>
    );
};

export default TopViewers;
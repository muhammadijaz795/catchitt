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
import { useTranslation } from 'react-i18next';

interface TopViewersFAQProps {
    onBack: () => void;
}

const TopViewersFAQ: React.FC<TopViewersFAQProps> = ({ onBack }) => {
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
                        {t('livestream.faq')}
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
                    {t('livestream.who_can_be_top_viewer')}
                </Typography>

                <Typography variant="body2" color="#111111" mb={1}>
                    {t('livestream.top_viewer_rules')}
                </Typography>
                <Typography variant="body2" color="#111111" mb={1}>
                    {t('livestream.coin_check_info')}
                </Typography>
                <Typography variant="body2" color="#111111" mb={2}>
                    {t('livestream.top_2_benefit')}
                </Typography>

                <Typography fontWeight="bold" mb={1} sx={{ mt: 2 }}>
                    {t('livestream.what_get_as_top_viewer')}
                </Typography>

                <Typography variant="body2" color="#111111" mb={1}>
                    {t('livestream.profile_photo_reward')}
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
                    <strong>• {t('livestream.top_3_badge_info')}</strong> {t('livestream.badge_conditions')}
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
                    <strong>• {t('livestream.top_99_info')}</strong> {t('livestream.rank_display')}
                </Typography>
                <Typography fontWeight="bold" mb={1} sx={{ mt: 2 }}>
                    {t('livestream.can_hide_ranking')}
                </Typography>
                <Typography variant="body2" color="#111111" mb={1}>
                    {t('livestream.ranking_visibility_change')}
                </Typography>
            </Box>
        </Box>
    );
};

export default TopViewersFAQ;
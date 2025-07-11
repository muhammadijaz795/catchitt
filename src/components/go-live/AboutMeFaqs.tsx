import {
    Box,
    Typography,
    IconButton,
    Paper,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTranslation } from 'react-i18next';

interface AboutMeFaqs {
    onBack: () => void;
}

const TopViewersFAQ: React.FC<AboutMeFaqs> = ({ onBack }) => {
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
                    <IconButton onClick={onBack} sx={{ color: '#000', padding: 0 }}>
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body1" fontWeight="600" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        {t('livestream.faqs')}
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
                    1. {t('livestream.edit_after_publish_question')}
                </Typography>

                <Typography variant="body2" color="#111111" mb={1}>
                    {t('livestream.edit_after_publish_answer')}
                </Typography>
            </Box>
        </Box>
    );
};

export default TopViewersFAQ;
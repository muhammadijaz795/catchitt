import {
    Box,
    Typography,
    IconButton,
    Paper,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface AboutMeFaqs {
    onBack: () => void;
}

const TopViewersFAQ: React.FC<AboutMeFaqs> = ({ onBack }) => {
    return (
        <Box
            sx={{ width: 360, mx: 'auto',  position: 'fixed', right: 0, top: 0, height: '100vh', bgcolor: '#fff', zIndex: 2, }}
        >
            <Box
                mb={2}
                sx={{
                    flexShrink: 0,
                    borderBottom: '1px solid #eee',
                    pb: 1,
                    height: 50,
                    pt: 1.5
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
                    <Typography variant="h6" fontWeight="600" sx={{ flexGrow: 1, textAlign: 'center' }}>
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
                    1. Can I edit it once published?
                </Typography>

                <Typography variant="body2" color="#111111" mb={1}>
                    Yes, feel free to edit it, Once passed Seezitt's safety review, the
                    latest version will automatically replace the previous one.
                </Typography>
            </Box>
        </Box>
    );
};

export default TopViewersFAQ;
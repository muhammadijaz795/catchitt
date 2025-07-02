import {
    Box,
    Typography,
    Button,
    IconButton,
    Paper,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface AddMutedRule {
    onBack: () => void;
}

const AddMutedRule: React.FC<AddMutedRule> = ({ onBack }) => {
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
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2
                    }}
                >
                    <IconButton onClick={onBack} sx={{ color: '#000', padding: 0 }}>
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body1" fontWeight="600" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Add mute rule
                    </Typography>
                    {/* Spacer for alignment */}
                    <Box sx={{ width: 40 }} />
                </Box>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    pr: 1
                }}
            >
                <Typography variant="body2" color="#111111" mb={1}>
                  This will mute O viewers who commented <strong>"Test"</strong> and anyone who comments it for the rest of the LIVE.
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 2,
                    mb: 2
                }}
            >
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: '#FE2C55',
                        color: '#FE2C55',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        px: 4,
                        py: 1,
                        borderRadius: 2,
                        '&:hover': {
                            borderColor: '#d62949',
                            backgroundColor: '#2a2a2a',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#FE2C55',
                        color: '#fff',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        px: 4,
                        py: 1,
                        borderRadius: 2,
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#d62949',
                            boxShadow: 'none',
                        },
                    }}
                >
                    Add
                </Button>
            </Box>
        </Box>
    );
};

export default AddMutedRule;
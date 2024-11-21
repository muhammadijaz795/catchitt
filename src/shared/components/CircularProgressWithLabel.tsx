import { CircularProgress, CircularProgressProps, Box, Typography, ThemeProvider, createTheme } from '@mui/material';

export default function CircularProgressWithLabel(props: CircularProgressProps & { value: number, isDarkTheme?: boolean }) {

    const lightThemePalette = createTheme({
        palette: {
            mode: 'light',
        },
    });

    const darkThemePalette = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={props.isDarkTheme ? darkThemePalette : lightThemePalette}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress {...props} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >{`${Math.round(props.value)}%`}</Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

import { InputAdornment } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { customInputTheme as customTheme } from '../../utils/customInputTheme';
import { StyledTextField } from './styles';

export default function BasicInput(props: any) {
    const { endAdornment, startAdornment, width, height, type, ...restProps } = props;
    const outerTheme = useTheme();
    return (
        <ThemeProvider theme={customTheme(outerTheme)}>
            <StyledTextField
                width={width}
                height={height}
                autoComplete="off"
                InputProps={
                    startAdornment
                        ? {
                              startAdornment: (
                                  <InputAdornment position="start">{startAdornment}</InputAdornment>
                              ),
                          }
                        : endAdornment
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">{endAdornment}</InputAdornment>
                              ),
                          }
                        : {}
                }
                {...restProps}
            />
        </ThemeProvider>
    );
}

import { TextField, styled } from '@mui/material';

function TagsInput({ startAdornment, ...props }: any) {
    const StyledTagInput = styled('div')(() => ({
        width: '100%',
        border: '1px solid #D1D1D1',
        borderRadius: 8,

        '&:hover': {
          borderRadius: 8,
          border: '1px solid #D1D1D1',
          outline: '1px solid #D1D1D1',
        },
        
        '& .MuiFormControl-root': {
            width: '100%',
        },
        '& .MuiInputBase-root': {
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          height: 'auto',
          gap:'0.3rem',
        },
        '& .MuiInputBase-input': {
            flex: 1,
            display: 'block',
            minWidth:'200px'
        },
        '*': {
            border: '0 !important',
            outline: '0 !important',
        },
        '& .MuiButtonBase-root': {
            padding: 0,
            marginTop: '0rem',
            marginBottom: '0rem',
            marginRight: '0.35rem',
            marginLeft: '0rem',
        },
    }));
    return (
        <StyledTagInput>
            <TextField
                {...props}
                multiline
                InputProps={{
                    startAdornment,
                }}
            />
        </StyledTagInput>
    );
}

export default TagsInput;

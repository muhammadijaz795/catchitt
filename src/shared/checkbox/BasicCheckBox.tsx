import { Checkbox, styled } from '@mui/material';

function BasicCheckBox({ ...restProps }) {
    const StyledCheckBox = styled(Checkbox)(() => ({
        padding: '0px',
        width: '20px !important',
        height: '20px !important',
        '& input': {
            width: '20px !important',
            height: '20px !important',
            borderRadius: '4px !important',
        },
        '& svg': {
            color: '#5448B2',
        },
    }));
    return <StyledCheckBox {...restProps} />;
}

export default BasicCheckBox;

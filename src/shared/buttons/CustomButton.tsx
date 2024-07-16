import { Button, CircularProgress, styled } from '@mui/material';

function CustomButton(props: any) {
    const {
        width = '100%',
        height = '40px !important',
        text,
        color,
        islight,
        fontSize = 14,
        fontWeight = 600,
        backgroundColor,
        loading,
        preference,
        ...restProps
    } = props;
    const BasicButton = styled(Button)(({ theme }) => ({
        width,
        height,
        color: color ? color : !islight ? '#FFF !important' : 'rgb(255, 59, 92) !important',
        backgroundColor: backgroundColor
            ? backgroundColor
            : !islight
            ? 'rgb(255, 59, 92) !important'
            : '#FFF !important',
        border: '1px solid rgb(255, 59, 92)',
        fontSize,
        fontWeight,
        [theme.breakpoints.down(600)]: {
            width: '169px  !important',
        },
        [theme.breakpoints.down(500)]: {
            width: '100%  !important',
        },
        textTransform: 'none',
    }));
    return (
        <BasicButton {...restProps} autoCapitalize="none">
            {loading ? (
                <div style={{ width: 20, height: 20 }}>
                    <CircularProgress />
                </div>
            ) : (
                text
            )}
        </BasicButton>
    );
}

export default CustomButton;

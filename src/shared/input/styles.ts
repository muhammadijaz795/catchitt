import { TextField, styled } from '@mui/material';

export const StyledTextField = styled(TextField)(({ width, height }: any) => ({
    '& .MuiInputBase-root': {
        height: height ? height : '48px',
        width: width ? width : '100%  !important',
    },
    '& fieldset': { width: '100%', height: 'auto' },
    '& input': {
        width: '100%',
        height: '100%',
        padding: 'auto 1rem',
        fontSize: '1rem',
        fontWeight: 400,
        color: '#222222',
        lineHeight: '1?.5rem',
    },
}));

export const StyledFormInput = styled('div')<any>(
    ({
        radius,
        padding,
        width,
        height,
        margin,
        theme,
        error,
        inputType,
        fontSize,
        iconMarginTop,
        textColor,
    }) => ({
        width: width,
        inputType,
        position: 'relative',
        margin: margin,
        '& input?.MuiInputBase-input': {
            width: (inputType === 'form-input' && 'fit-content') || '100%',
            color: `${theme?.text?.secondary}`,
        },
        '& .MuiInputBase-root': {
            flexWrap: inputType === 'form-input' && 'wrap',
            gap: inputType === 'form-input' && '1px 7px',
            backgroundColor: `${theme?.container?.primary} !important`,
            '& .MuiChip-label': {
                // maxWidth: '300px',
            },
            width: '100%',
            border: '1px solid red',
            minHeight: '48px',
            borderRadius:'8px',
            padding:'0px 16px'
        },
        '& .MuiInputLabel-root': {
            left: inputType === 'form-input' ? 2 : 20,
            textAlign: 'center',
            top: inputType === 'form-input' ? -10 : -7,
            fontSize: inputType === 'form-input' && 12,
            '& .MuiFormLabel-asterisk': {
                color: theme?.primaryLightColor,
            },
            [theme?.breakpoints?.down(600)]: {
                left: 10,
                top: '-8?.5px',
                fontSize: 12,
            },
        },

        '& div .MuiInputBase-multiline': {
            position: 'relative',
            '& svg': {
                top: '5px',
                position: 'absolute',
                right: '10px',
                cursor: 'pointer',
                path: {
                    fill: theme?.icon?.secondary,
                },
            },
        },
        '& label .form-input-label': {
            color: theme?.text?.primary,
            fontSize: 14,
            display: 'flex',
            marginLeft: '5px',

            '& span .aesterisk': {
                color: `${theme?.primaryBackgroundColor}`,
                marginLeft: 5,
            },
            '& div .label-icon': {
                marginRight: '7px',
                marginTop: '-1px',
            },
        },
        '& div .form-input': {
            padding: padding,
            marginTop: 3,
            width: '100%',
            borderRadius: radius,
            color: textColor ? textColor : 'unset',
            border: `1px solid ${error ? theme?.primaryRed : theme?.iconBg?.tertiaryStroke}`,
            backgroundColor: `${theme?.container?.primary}`,
            minHeight: height ? height : '41px',
            '& input[type=number]::-webkit-inner-spin-button': {
                height: height,
                marginTop: height ? iconMarginTop : '',
            },
            '& input': {
                // height: height,
            },
            '& .prefix-smile-icon': {
                maxWidth: 40,
                marginRight: 6,
                display: 'flex',
                '& div': {
                    width: '40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                },
                svg: {
                    height: 17,
                    width: 17,
                },
            },
            '& input, textarea': {
                fontSize: fontSize,
                marginRight: 5,
                color: theme?.text?.primary,
                '&::placeholder': {
                    fontSize: 12,
                    fontWeight: 300,
                },
            },
            '& textarea': {
                lineHeight: '15px',
                width: '93%',
                color: theme?.text?.primary,
            },
            '& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button':
                {
                    opacity: 1,
                },
            '&:hover': {
                border: `1px solid ${
                    error ? theme?.primaryRed + 'a0' : theme?.container?.strokeSecondary
                } !important`,
                '&::before': { borderBottom: 'none !important' },
            },
            '&:focus-within': {
                border: `1px solid ${
                    error
                        ? theme?.primaryRed
                        : // theme?.icon?.secondary + '55'
                          'transparent'
                } !important`,
            },
            '&::before': { borderBottom: 'none !important' },
            '&::after': { borderBottom: 'none !important' },
            // '&:focus': {
            // },
            '& svg': {
                // fill: `${theme?.borderOnVideoItem}`,
                cursor: 'pointer',
                transition: '0?.3s all ease',
                path: {
                    fill: theme?.icon?.variation,
                },
                circle: {
                    fill: theme?.icon?.variation,
                },
                '&:hover': {
                    transition: '0?.3s all ease',
                    transform: 'scale(1?.1)',
                },
            },
        },
        '& div .form-input-character-count': {
            fontSize: '10px',
            color: ' #222',
            position: 'absolute',
            top: '8px',
            right: '5px',
        },
        // tags input styling
        '& div .tags-form-input': {
            border: '1px solid red',
            flexWrap: 'wrap',
            borderRadius: 5,
            '& input .MuiInputBase-input': {
                width: 'fit-content',
            },
        },
    })
);

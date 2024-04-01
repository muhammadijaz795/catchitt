import { styled } from '@mui/material';
import React from 'react';

function Text(props: any) {
    const {
        text,
        fontSize = '1rem',
        fontWeight = 500,
        lineHeight = '20px',
        color = '#222222',
        ...restProps
    } = props;
    const StyledText = styled('p')(() => ({
        fontSize,
        fontWeight,
        lineHeight,
        color,
        ...restProps,
    }));
    return <StyledText>{text}</StyledText>;
}

export default Text;

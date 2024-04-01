import { Chip, styled } from '@mui/material';
import React from 'react';

function CustomChip({ ...props }) {
    const StyledChip = styled(Chip)(() => ({
        width: 'auto !important',
        height: '30px !important',
        color: '#222222',
        background: '#EAEAEA !important',
        fontWeight: 500,
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'14px',
        marginLeft:'1rem',
        '& .MuiChip-label': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }));
    return <StyledChip {...props} />;
}

export default CustomChip;

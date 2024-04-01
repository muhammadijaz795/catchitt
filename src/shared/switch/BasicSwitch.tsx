import { Switch, styled } from '@mui/material';

import React from 'react';

function BasicSwitch({ ...resProps }: any) {
    const StyledSwitch = styled(Switch)(() => ({
        '& .MuiButtonBase-root': {
            width: 'auto !important',
            height: '100% !important',
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: '#FFF !important',
            width: '20px !important',
            height: '20px !important',
            top: '10px !important',
        },
        '& .MuiSwitch-track.checked': {
            backgroundColor: '#5448B2 ',
        },
        '& .MuiSwitch-track': {
            backgroundColor: '#DFDFDF ',
            borderRedius: '10px',
            opacity: '1 !important',
        },
    }));
    return <StyledSwitch {...resProps} />;
}

export default BasicSwitch;

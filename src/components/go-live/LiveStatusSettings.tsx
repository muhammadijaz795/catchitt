import React, { useState } from "react";
import { Box, Typography, Radio, RadioGroup, FormControlLabel, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const LiveStatusSettings = ({ onBack }) => {
  const [status, setStatus] = useState("hidden");


  return (
    <Box
      sx={{
        width: 320,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "white",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top bar */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} height={65} borderBottom={'1px solid #E4E6EB'}>
        <IconButton onClick={onBack}>
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.19141 1.60938L1.19141 7.60938L7.19141 13.6094" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </IconButton>
        <Typography variant="subtitle1" fontWeight="bold">
          LIVE status setting
        </Typography>
        <IconButton>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.875 6.879C20.575 7.277 21.005 8.022 21 8.827V16.111C21 16.92 20.557 17.666 19.842 18.059L13.092 22.329C12.757 22.513 12.382 22.609 12 22.609C11.618 22.609 11.243 22.513 10.908 22.329L4.158 18.059C3.808 17.868 3.516 17.586 3.312 17.243C3.109 16.901 3.001 16.51 3 16.111V8.826C3 8.017 3.443 7.272 4.158 6.879L10.908 2.899C11.253 2.709 11.64 2.609 12.033 2.609C12.426 2.609 12.813 2.709 13.158 2.899L19.908 6.879H19.875Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 16.609V16.619" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 13.609C12.45 13.611 12.887 13.46 13.241 13.183C13.594 12.905 13.844 12.516 13.95 12.079C14.056 11.642 14.011 11.182 13.823 10.773C13.635 10.365 13.315 10.031 12.914 9.827C12.516 9.623 12.061 9.56 11.623 9.648C11.185 9.736 10.789 9.969 10.5 10.31" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>


        </IconButton>
      </Box>

        <RadioGroup
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            >
            {/* Option 1 */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                                textAlign={'left'}
                p={1.5}
                borderRadius={1.5}
                sx={{
                mb: 1,
                cursor: "pointer",
                bgcolor: status === "shown" ? "#f5f5f5" : "transparent"
                }}
                onClick={() => setStatus("shown")}
            >
                <Box>
                <Typography fontWeight={600}>Show LIVE status</Typography>
                <Typography fontSize={13} color="text.secondary">
                    Followers will see you’re LIVE when you go LIVE as a guest
                </Typography>
                </Box>
                <Radio
                checked={status === "shown"}
                value="shown"
                sx={{
                    color: '#FF2C55',
                    '&.Mui-checked': { color: '#FF2C55' },
                    p: 0.5
                }}
                />
            </Box>

            {/* Option 2 */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                textAlign={'left'}
                p={1.5}
                borderRadius={1.5}
                sx={{
                cursor: "pointer",
                bgcolor: status === "hidden" ? "#f5f5f5" : "transparent"
                }}
                onClick={() => setStatus("hidden")}
            >
                <Box>
                <Typography fontWeight={600}>Don’t show LIVE status</Typography>
                <Typography fontSize={13} color="text.secondary">
                    Followers won’t see you’re LIVE when you go LIVE as a guest
                </Typography>
                </Box>
                <Radio
                checked={status === "hidden"}
                value="hidden"
                sx={{
                    color: '#FF2C55',
                    '&.Mui-checked': { color: '#FF2C55' },
                    p: 0.5
                }}
                />
            </Box>
        </RadioGroup>

    </Box>
  );
};

export default LiveStatusSettings;

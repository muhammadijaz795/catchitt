import React, { useState } from "react";
import { Box, Typography, Button, Avatar, Stack, IconButton, keyframes } from "@mui/material";
import LiveStatusSettings from "./LiveStatusSettings";
import { useTranslation } from 'react-i18next';

// Pulse animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

interface GuestRequestCardProps {
  joinAsGuest: () => void;
}

const GuestRequestCard = ({ joinAsGuest }: GuestRequestCardProps) => {
  const [requestSent, setRequestSent] = useState(false);
 const [showSettings, setShowSettings] = useState(false);
 const { t, i18n } = useTranslation();

  if (showSettings) {
    return <LiveStatusSettings onBack={() => setShowSettings(false)} />;
  }
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
      {/* Top Bar */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} height={65} borderBottom={'1px solid #E4E6EB'}>
        <Typography variant="subtitle1" fontWeight="bold">
          {t('livestream.mutli_guest_live')}
        </Typography>
        <Box sx={{}} position={"absolute"} right={2} >
          <IconButton size="small">
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2675 1.23371C14.5946 0.401265 15.7705 0.401265 16.0976 1.23371L16.5256 2.32292L17.6103 2.75227C18.4396 3.08059 18.4396 4.25651 17.6103 4.58482L16.5256 5.01418L16.0976 6.10338C15.7705 6.93582 14.5946 6.93583 14.2675 6.10339L13.8395 5.01418L12.7548 4.58482C11.9255 4.25652 11.9255 3.08059 12.7548 2.75227L13.8395 2.32292L14.2675 1.23371ZM15.1825 1.63927L15.5973 2.69471C15.6969 2.94829 15.8972 3.14964 16.1509 3.2501L17.208 3.66854L16.1509 4.087C15.8972 4.18746 15.6969 4.3888 15.5973 4.64239L15.1825 5.69782L14.7678 4.64239C14.6682 4.3888 14.4679 4.18746 14.2141 4.087L13.1571 3.66854L14.2141 3.2501C14.4679 3.14964 14.6682 2.94829 14.7678 2.69471L15.1825 1.63927Z" fill="#111111"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.94701 2.42357C3.36594 1.00464 5.66647 1.00464 7.0854 2.42357L19.3186 14.6568C20.7375 16.0757 20.7375 18.3763 19.3186 19.7952C17.8997 21.2141 15.5991 21.2141 14.1802 19.7952L1.94701 7.56196C0.52808 6.14303 0.52808 3.8425 1.94701 2.42357ZM6.02474 3.48423C5.1916 2.65108 3.84081 2.65108 3.00767 3.48423C2.17452 4.31737 2.17452 5.66816 3.00767 6.5013L4.59395 8.08758L7.61102 5.07051L6.02474 3.48423ZM15.2409 18.7345L5.65461 9.14827L8.67171 6.13117L18.2579 15.7175C19.0911 16.5506 19.0911 17.9014 18.2579 18.7345C17.4248 19.5677 16.074 19.5677 15.2409 18.7345Z" fill="#111111"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9629 8.05596C19.6358 7.22353 18.4598 7.22353 18.1327 8.05596L17.9782 8.44924L17.5869 8.60412C16.7575 8.93243 16.7575 10.1084 17.5869 10.4367L17.9782 10.5916L18.1327 10.9849C18.4598 11.8173 19.6358 11.8173 19.9629 10.9849L20.1174 10.5916L20.5087 10.4367C21.338 10.1084 21.338 8.93243 20.5087 8.60412L20.1174 8.44924L19.9629 8.05596ZM19.0478 8.46153L18.9065 8.82103C18.8069 9.07461 18.6066 9.27597 18.3528 9.37647L17.9892 9.52037L18.3528 9.66437C18.6066 9.76487 18.8069 9.96617 18.9065 10.2198L19.0478 10.5793L19.1891 10.2198C19.2887 9.96617 19.4889 9.76487 19.7427 9.66437L20.1064 9.52037L19.7427 9.37647C19.4889 9.27597 19.2887 9.07461 19.1891 8.82103L19.0478 8.46153Z" fill="#111111"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.30065 14.2337C3.62774 13.4013 4.80369 13.4013 5.13078 14.2337L5.28532 14.627L5.6766 14.7819C6.50596 15.1102 6.50596 16.2861 5.67659 16.6144L5.28532 16.7693L5.13078 17.1626C4.80369 17.995 3.62774 17.995 3.30065 17.1626L3.14611 16.7693L2.75484 16.6144C1.92547 16.2861 1.92547 15.1102 2.75483 14.7819L3.14611 14.627L3.30065 14.2337ZM4.07445 14.9988L4.21571 14.6393L4.35698 14.9988C4.45662 15.2524 4.65688 15.4537 4.91066 15.5542L5.27435 15.6982L4.91066 15.8421C4.65688 15.9426 4.45662 16.1439 4.35698 16.3975L4.21571 16.757L4.07445 16.3975C3.97481 16.1439 3.77455 15.9426 3.52077 15.8421L3.15708 15.6982L3.52077 15.5542C3.77455 15.4537 3.97481 15.2524 4.07445 14.9988Z" fill="#111111"/>
            </svg>

          </IconButton>
          <IconButton size="small" onClick={() => setShowSettings(true)}>
           <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9382 6.20882L18.3158 5.12873C17.7893 4.21481 16.6223 3.89953 15.7071 4.42392V4.42392C15.2715 4.68055 14.7517 4.75336 14.2623 4.62629C13.7729 4.49923 13.3542 4.18272 13.0984 3.74658C12.9339 3.46935 12.8455 3.1536 12.8421 2.83124V2.83124C12.857 2.31443 12.662 1.81361 12.3016 1.44287C11.9412 1.07214 11.4461 0.863068 10.9291 0.863281H9.67509C9.16856 0.863276 8.6829 1.06512 8.32559 1.42415C7.96828 1.78318 7.76877 2.2698 7.7712 2.77632V2.77632C7.75619 3.82213 6.90407 4.66202 5.85816 4.66191C5.5358 4.65856 5.22005 4.57015 4.94283 4.40562V4.40562C4.02765 3.88122 2.8607 4.1965 2.33413 5.11042L1.66594 6.20882C1.14 7.1216 1.45099 8.28781 2.36159 8.81751V8.81751C2.95349 9.15925 3.31812 9.7908 3.31812 10.4743C3.31812 11.1577 2.95349 11.7893 2.36159 12.131V12.131C1.45215 12.6571 1.14082 13.8205 1.66594 14.7306V14.7306L2.29752 15.8198C2.54424 16.265 2.95819 16.5935 3.44778 16.7326C3.93737 16.8718 4.46223 16.8101 4.90621 16.5612V16.5612C5.34267 16.3065 5.86278 16.2368 6.35093 16.3674C6.83908 16.498 7.25483 16.8182 7.50576 17.2569C7.67029 17.5341 7.7587 17.8499 7.76205 18.1722V18.1722C7.76205 19.2288 8.61855 20.0852 9.67509 20.0852H10.9291C11.9821 20.0853 12.8371 19.2343 12.8421 18.1814V18.1814C12.8397 17.6732 13.0405 17.1852 13.3998 16.8259C13.7591 16.4666 14.2471 16.2659 14.7552 16.2683C15.0768 16.2769 15.3912 16.365 15.6705 16.5246V16.5246C16.5833 17.0505 17.7495 16.7396 18.2792 15.829V15.829L18.9382 14.7306C19.1933 14.2927 19.2634 13.7712 19.1328 13.2816C19.0022 12.7919 18.6818 12.3746 18.2426 12.1219V12.1219C17.8034 11.8692 17.483 11.4518 17.3524 10.9621C17.2218 10.4725 17.2918 9.95102 17.5469 9.51317C17.7128 9.22354 17.953 8.9834 18.2426 8.81751V8.81751C19.1477 8.2881 19.458 7.1287 18.9382 6.21797V6.21797V6.20882Z" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="10.308" cy="10.474" r="2.63616" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

          </IconButton>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        {/* Avatars */}
                 <Stack
          direction="row"
          spacing={requestSent ? 1.5 : -1.5}
          justifyContent="center"
          alignItems="center"
          mb={2}
        >
          <Avatar
            sx={{
              width: 50,
              height: 50,
              zIndex: 2,
              border: '2px solid #fff',
              position: 'relative'
            }}
            src="https://randomuser.me/api/portraits/women/1.jpg"
          />

          {/* Animated Dots (only when request is sent) */}
          {requestSent && (
            <Box display="flex" justifyContent="center" alignItems="center" gap={0.5}>
              {["#68D391", "#ED64A6", "#63B3ED"].map((color, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: color,
                    borderRadius: "50%",
                    animation: `${pulse} 1s ${index * 0.2}s infinite`
                  }}
                />
              ))}
            </Box>
          )}

          <Avatar
            sx={{
              width: 50,
              height: 50,
              zIndex: 1,
              position: 'relative'
            }}
            src="https://randomuser.me/api/portraits/women/2.jpg"
          />
        </Stack>

        
        <Typography variant="subtitle1" align="center" fontWeight={600}>
          {requestSent ? t('livestream.guest_request_sent') : t('livestream.request_to_join')}
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          {requestSent ? t('livestream.one_viewer_requesting') : t('livestream.chance_to_be_guest')}
        </Typography>
        <Typography
          variant="caption"
          align="center"
          color="text.secondary"
          display="block"
          mt={1}
          mb={2}
        >
         {t('livestream.seezitt_rewards')}
        </Typography>

        {/* Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => {setRequestSent(!requestSent); if(!requestSent){ joinAsGuest(); } }}
          sx={{
            bgcolor: requestSent ? "#f5f5f5" : "#FF2C55",
            color: requestSent ? "#000" : "#fff",
            "&:hover": {
              bgcolor: requestSent ? "#e0e0e0" : "#e0245c",
            },
            borderRadius: 0.75,
            py: 1.5,
            textTransform: 'capitalize'
          }}
        >
          {requestSent ? t('livestream.cancel_request') : t('livestream.request')}
        </Button>
      </Box>
    </Box>
  );
};

export default GuestRequestCard;
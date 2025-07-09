// components/CashBackWaveDialog.jsx
import React from "react";
import {
  Box,
  Dialog,
  Typography,
  IconButton,
  Button,
  TextField,
  Tabs,
  Tab,
  Avatar,
  Paper,
  Tooltip,
  Divider,
  CardContent,
  Card,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { modelMininon, modelDiscountDivider, logoAuthWhite, modelCoins, bgModelIcon,} from "../../icons";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

export default function CashBackWaveDialogDetails({ open , onClose }: { open: any; onClose: any;}) {
  const [tab, setTab] = React.useState(0);

  interface Languages {
    code: string;
    name: string;
    country_code: string;
  }
        
  const languages: Languages[] = [
      {
          code: 'en',
          name: 'English',
          country_code: 'gb',
      },
      {
          code: 'ar',
          name: 'العربية',
          country_code: 'sa',
      },
  ];

  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t, i18n } = useTranslation();

  return (
    
    <Dialog open={open} onClose={onClose}   disableScrollLock fullWidth maxWidth="xs"  scroll="body" PaperProps={{ sx: {   borderRadius: 3} }}>
      <Box sx={{ position: "relative", p: 0,
         background: "#fff",
         }} >
            <Box sx={{backgroundImage: `url(${bgModelIcon})`, 
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height:' 20rem',
                     backgroundSize:'100% 20rem'}}    
            >
                <img  style={{ height: '2rem', paddingTop: '0.5rem' , margin: 'auto'}} src={logoAuthWhite} alt="" />

                {/* Date Badge */}
                <Box sx={{ position: "absolute", top: 8, left: 8, backgroundColor: "#333", color: "#fff", px: 1.5, py: 0.25, borderRadius: 2, fontSize: 12 }}>
                4/23 - 4/30
                </Box>

                {/* Close Button */}
                <IconButton
                onClick={onClose}
                sx={{ position: "absolute", top: 8, right: 8, color: "#000",  }}
                >
                <CloseIcon sx={{fill: "#fff"}} />
                </IconButton>

                {/* Header */}
                <Box
                sx={{
                    pt: 4,
                    pb: 2,
                    px: 2,
                    textAlign: "center",
                    color: "#fff",
                   
                }}
                >
                <Typography variant="h6" fontWeight="bold">
                    {t('Cash Back Wave')}
                </Typography>
                <img style={{width: '20rem', margin: 'auto'}} src={modelCoins} alt="" />
                </Box>
            </Box>
        {/* Cashback Estimate Card */}
        <Paper elevation={2} sx={{ mx: 2, position: "relative", zIndex: 2, mt: -20, p: 0, borderRadius: 3,  overflow: "hidden", border: " 3px solid rgba(213, 160, 105, 1)"}} >
          <Box display="flex" alignItems="center" p={1.5}  gap={1} mb={1} sx={{
              background: "linear-gradient(135deg, #FED9AF 0%, #D59F69 55.94%)",
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1}}>
            <Avatar
              src="https://i.pravatar.cc/100"
              sx={{ width: 32, height: 32 }}
            />
            <Box >
                <Typography fontSize={12} sx={{ color: "#fff" }} fontWeight="bold">
                Estimated cash back received:
                </Typography>
                <Typography sx={{ color: "#fff" }} fontSize={16} fontWeight="bold">
                    USD0.00
                </Typography>
            </Box>
        </Box>
          {/* Referral Block */}
          <Box px={3} py={2}>
            <Typography fontWeight="bold" textAlign={"center"} fontSize={14}>
                Invite friends to recharge and <b style={{ color: "#f7931e" }}>get up to 3% cash back</b> on their Coin purchases for 7 days
            </Typography>

            {/* Code Box */}
            <Box
                sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 1,
                    py: 0.5,
                    border: "1px solid #ccc",
                    borderRadius: 7,
                    bgcolor: "#f4f4f4",
                    }}>
                <Typography fontSize={12} fontWeight="bold">483CLXVV</Typography>
                    <IconButton size="small">
                        <ContentCopyIcon fontSize="small" />
                    </IconButton>
            </Box>

            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, backgroundColor: "#f7931e", textTransform: "none", borderRadius: 5 }}>
                Share invitation link
            </Button>
          </Box>
        </Paper>

        {/* Rewards Section */}
        {/* <Box sx={{ p: 2 }}> */}
          {/* Cashback */}
          {/* <Typography fontWeight="bold" mb={1}>
            Get rewards when you recharge
          </Typography>

          <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Typography fontSize={14} fontWeight="bold">
              Get cash back when you recharge
            </Typography>
            <Typography fontSize={14} mt={1}>
              <b style={{ color: "#f7931e" }}>5%</b> - Up to USD250 back on 1 order.
            </Typography>
          </Paper> */}

          {/* Gift Unlock */}
          {/* <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Typography fontSize={14} fontWeight="bold">
              Unlock special Gifts
            </Typography>
            <Box display="flex" gap={2} mt={1}>
              <img
                src="https://www.tiktok.com/static/image.png" // Replace with actual image
                alt="Gift"
                style={{ width: 64, height: 64 }}
              />
              <Box>
                <Typography fontSize={14} fontWeight="bold">
                  Sage's Slash 🔵 399
                </Typography>
                <Typography fontSize={12}>
                  Sage could turn a single Coin into many with remarkable ease...
                </Typography>
              </Box>
            </Box>
          </Paper> */}
        {/* </Box> */}

        <Card sx={{ m: 2, borderRadius: 4, boxShadow: 3, p: 2 }}>
             <CardContent sx={{ position: "relative", pl: 0.5 }}>
                {/* Sidebar Line (Connector between locks) */}
                <Box
                sx={{
                    position: "absolute",
                    top: 80,
                    left: 16,
                    width: "2px",
                    height: "36%",
                    backgroundColor: "#E0E0E0",
                    zIndex: 0
                }}
                />

                {/* Heading */}
                <Typography textAlign="center" variant="h6" fontWeight="bold" gutterBottom>
                Get rewards when you recharge
                </Typography>

                {/* Cashback Section */}
                <Box display="flex" alignItems="flex-start" mb={3} position="relative" zIndex={1}>
                    <LockOutlinedIcon sx={{ mr: 2, mt: 0.5, backgroundColor: '#e4e6eb' , padding: 0.35, borderRadius: '50%' }} />
                <Box width={"100%"}>
                    <Typography fontWeight="500" >Get cash back when you recharge</Typography>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ backgroundImage: `url(${modelDiscountDivider})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                        borderRadius={2}
                        px={3}
                        py={2}
                        mt={1}
                    >
                    <Typography variant="h6" fontWeight="bold" color="orange">
                        5%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Up to USD250 back on 1 order.
                    </Typography>
                    </Box>
                </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Gift Unlock Section */}
                <Box display="flex" alignItems="flex-start" position="relative" zIndex={1}>
                <LockOutlinedIcon sx={{ mr: 2, mt: 0.5, backgroundColor: '#e4e6eb' , padding: 0.35, borderRadius: '50%' }}  />
                <Box>
                    <Typography fontWeight="500">Unlock special Gifts</Typography>

                    <Box display="flex" mt={1}>
                    <img
                        src={modelMininon}
                        alt="gift"
                        style={{ width: 80, height: 80, marginRight: 16 }}
                    />
                    <Box>
                        <Typography fontWeight="500" display="flex" alignItems="center">
                        Sage’s Slash
                        <Tooltip title="More info">
                            <InfoOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
                        </Tooltip>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={0.5}>
                        <span style={{ color: "#F4B400", fontWeight: 600 }}>🪙 399</span>
                        </Typography>
                        <Typography variant="caption" sx={{ lineHeight: 1.2 }} color="text.secondary">
                        Sage could turn a single Coin into many with remarkable ease, as if he were slashing one Coin and creating more.
                        </Typography>
                    </Box>
                    </Box>
                </Box>
                </Box>
            </CardContent>
        </Card>

        {/* Tabs */}
        <Box sx={{ borderTop: "1px solid #ccc", mx:3 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
            <Tab label="How it works" />
            <Tab label="Rules" />
          </Tabs>
          <Box sx={{ p: 2 }}>
            {tab === 0 ? (
              <Typography fontSize={14}>
                <ul  style={{ listStyle: "disc", padding: 10 }}>
                    <li className="pb-2">
                       Log in to unlock your invitation link and code.
                    </li>
                    <li>
                       Invite your eligible friends to recharge on
                        seezitt.com/coin. After an eligible friend completes their
                        first recharging via your invitation, you can get up to 0%
                        in cash back on their following orders over the next 7
                        days.
                    </li>
                    <li>
                       Recharge at least 1000 Coins 3 times to unlock special
                        Gifts. You can send them to the content you like.
                    </li>
                </ul>
              </Typography>
            ) : (
              <Typography fontSize={14}>
                <ul style={{ listStyle: "disc", padding: 10 }}>
                    <li className="pb-2">
                        If your eligible friends have never recharged on
                        seezitt.com/coin before the promotion, you’ll get 0% cash back on their website orders made through your
                        invitation. If they have but never recharged from the
                        home screen, you’ll get 0.0% cash back on their home
                        screen orders made through your invitation.
                    </li>
                    <li>
                        If your eligible friends have never recharged on
                        seezitt.com/coin before the promotion, you’ll get 0% cash back on their website orders made through your
                        invitation. If they have but never recharged from the
                        home screen, you’ll get 0.0% cash back on their home
                        screen orders made through your invitation.
                    </li>
                </ul>
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

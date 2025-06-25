import React from "react";
import {
  Box,
  Container,
  IconButton,
  Typography,
} from "@mui/material";

const StarCommentFaq: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        bgcolor: "white",
        p: '0 !important',
        width: 360
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          mb: 2,
          p: 1,
          borderBottom: "1px solid #eee",
        }}
      >
        <IconButton onClick={onBack} sx={{ position: "absolute", left: 0 }}>
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.69141 1.25L1.69141 7.25L7.69141 13.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> 
        </IconButton>
        <Typography fontWeight="bold" fontSize="1rem">
          FAQs
        </Typography>
      </Box>

      {/* FAQ Content */}
      <Box sx={{ px: 1 }} textAlign={'left'}>
        <Typography fontWeight="bold" mb={0.5}>
          What is Star Comment?
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Star Comment is a feature that allows viewers to activate their comments with Coins for them to be displayed at the top of the LIVE chat. Star Comment is one of the factors to assess the popularity of content. As such, you may collect Diamonds as Rewards in accordance with the{" "}
          <Typography component="span" fontWeight="bold">
            Virtual Items Policy
          </Typography>.
        </Typography>

        <Typography fontWeight="bold" mb={0.5}>
          Can you report Star Comments?
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          You, as well as any moderators designated by you, will be able to report Star Comments that you believe they violate our{" "}
          <Typography component="span" fontWeight="bold">
            Community Guidelines
          </Typography>.
        </Typography>

        <Typography fontWeight="bold" mb={0.5}>
          What happens if Star Comments are reported?
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Once reported, Star Comments will be removed.
        </Typography>

        <Typography fontWeight="bold" mb={0.5}>
          How to turn off Star Comment?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You can turn off Star Comment through{" "}
          <Typography component="span" fontWeight="bold">
            Settings › Comment settings
          </Typography>. Once you turn off this feature, viewers will not be able to send Star Comments in your LIVE videos.
        </Typography>
      </Box>
    </Container>
  );
};

export default StarCommentFaq;

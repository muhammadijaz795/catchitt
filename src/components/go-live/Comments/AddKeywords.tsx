import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Switch,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import BlockedKeywordsFAQs from "../BlockedKeywordsFaqs";
import { useTranslation } from 'react-i18next';

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#ff2d55',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  '& .MuiSwitch-track': {
    borderRadius: 12,
    backgroundColor: '#d3d3d3',
    opacity: 1,
  },
}));
const AddKeyword: React.FC<{
  onBack: () => void;
  onAddKeyword: (keyword: { keyword: string; blockSimilarVersion: boolean }) => void;
}> = ({ onBack, onAddKeyword }) => {
  const { t, i18n } = useTranslation();
  const [blockSimilar, setBlockSimilar] = useState(true);
  const [input, setInput] = useState("");
  const [showBlockKeywordFaqs, setShowBlockKeywordFaqs] = useState(false);

  if(showBlockKeywordFaqs) {
    return (
      <BlockedKeywordsFAQs
        onClose={() => {setShowBlockKeywordFaqs(false); console.log("Closed FAQs" )}}
      />
    );
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        p: '0 !important',
                width: 360, 

      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 2,
          pb: 1,
          borderBottom: '1px solid #E6E6E6'
        }}
      >
        <IconButton  onClick={onBack}>
           <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.69141 1.25L1.69141 7.25L7.69141 13.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </IconButton>
        <Typography  variant="body1" fontWeight="bold">
          {t('livestream.add_keyword')}
        </Typography>
        <Typography
          onClick={() => {
            if (input.trim()) {         
              onAddKeyword({ keyword: input.trim(), blockSimilarVersion: blockSimilar });
              onBack();
            }
          }}
          sx={{ cursor: "pointer" }}
          color="#ff2d55"
          fontWeight={600}
          fontSize="0.9rem"
        >
          {t('livestream.save')}
        </Typography>
      </Box>
        <Box px={2}>
            {/* Input Label + Info */}
            <Box textAlign={"left"} mt={1}>
                <Typography fontWeight={600} fontSize="0.9rem">
                  {t('livestream.add_word_phrase_emoji')}
                <InfoOutlinedIcon onClick={() => setShowBlockKeywordFaqs(true)}  sx={{ fontSize: 16, verticalAlign: "middle" }} />
                </Typography>
            </Box>

            {/* Input Field */}
            <Box mt={1.5}>
                <TextField
                placeholder={t('livestream.keyword_limit')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                fullWidth
                variant="filled"
                inputProps={{ maxLength: 30 }}
                InputProps={{
                    disableUnderline: true,
                    sx: {
                    backgroundColor: "#f0f0f0",
                    borderRadius: 2,
                    p: 1,
                    pt: '0 !important',
                    fontSize: 14,
                    },
                }}
                />
            </Box>

            {/* Block similar versions toggle */}
            <Box
                mt={3}
                p={2}
                display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
                sx={{ backgroundColor: "#f7f7f7", borderRadius: 2 }}
            >
                <Box textAlign={"left"} display="flex" alignItems="flex-start" gap={1.5}>
                <Typography
                    fontWeight="bold"
                    sx={{ fontSize: "1.1rem", fontFamily: "monospace" }}
                >
                    AA
                </Typography>
                <Box>
                    <Typography fontWeight={600} fontSize="0.9rem">
                      {t('livestream.block_similar_versions')}
                    </Typography>
                    <Typography
                    color="text.secondary"
                    fontSize="0.8rem"
                    mt={0.3}
                    lineHeight={1.4}
                    >
                    {t('livestream.block_similar_versions_description')}
                    </Typography>
                </Box>
                </Box>
                <StyledSwitch
                checked={blockSimilar}
                onChange={() => setBlockSimilar(!blockSimilar)}
                />
            </Box>
            {/* <Box mt={2}>
              <Typography
                variant="subtitle2"
                sx={{ color: "gray", fontWeight: 600, mb: 1, textAlign: "left" }}
              >
                Blocked Keywords
              </Typography>

              <List disablePadding>
                {blockedKeywords.map((keyword, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" sx={{ color: "#ff1744" }}>
                        <DeleteIcon />
                      </IconButton>
                    }
                    sx={{ pl: 0, py: 0.5 }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {keyword}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box> */}
        </Box>
    </Container>
  );
};

export default AddKeyword;

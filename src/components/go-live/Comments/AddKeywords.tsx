import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Switch,
  Container,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";

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
const AddKeyword: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [blockSimilar, setBlockSimilar] = useState(true);

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
          Add keyword
        </Typography>
        <Typography color="#ff2d55" fontWeight={600} fontSize="0.9rem">
          Save
        </Typography>
      </Box>
        <Box px={2}>
            {/* Input Label + Info */}
            <Box textAlign={"left"} mt={1}>
                <Typography fontWeight={600} fontSize="0.9rem">
                Add a word, phrase, or emoji{" "}
                <InfoOutlinedIcon sx={{ fontSize: 16, verticalAlign: "middle" }} />
                </Typography>
            </Box>

            {/* Input Field */}
            <Box mt={1.5}>
                <TextField
                placeholder="Keywords can be up to 30 characters"
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
                    Block similar versions
                    </Typography>
                    <Typography
                    color="text.secondary"
                    fontSize="0.8rem"
                    mt={0.3}
                    lineHeight={1.4}
                    >
                    We’ll block comments with similar versions of this keyword. For
                    example, bad blocks badness and badnesss.
                    </Typography>
                </Box>
                </Box>
                <StyledSwitch
                checked={blockSimilar}
                onChange={() => setBlockSimilar(!blockSimilar)}
                />
            </Box>
        </Box>
    </Container>
  );
};

export default AddKeyword;

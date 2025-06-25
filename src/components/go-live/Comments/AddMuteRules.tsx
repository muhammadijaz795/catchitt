import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Switch,
  Container,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Radio,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddMuteButton from './AddMuteButton'
import UnMuteButton from "./UnmuteButton";
const durations = [
  "5 seconds",
  "30 seconds",
  "1 minute",
  "5 minute",
  "Entire LIVE",
];
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
const AddMuteRulesComment: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selected, setSelected] = useState("Entire LIVE");
  const [open, setOpen] = useState(false);
  const [showAddMuteButton,setShowAddMuteButton] = useState(false)

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
  };
    if (showAddMuteButton) {
    // return <AddMuteButton onBack={() => setShowAddMuteButton(false)} />;
     return <UnMuteButton onBack={() => setShowAddMuteButton(false)} />;
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
          Add mute rule
        </Typography>
        <Box sx={{cursor: 'pointer'}} onClick={() => setShowAddMuteButton(true)}>
          <Typography color="#ff2d55" fontWeight={600} fontSize="0.9rem" >
            Save
          </Typography>
        </Box>
      </Box>
        <Box px={2}>
            {/* Input Label + Info */}
            <Box textAlign={"left"} mt={1}>
                <Typography fontWeight={600} fontSize="0.9rem">
                Mute viewers who comment
                </Typography>
            </Box>

            {/* Input Field */}
            <Box mt={1.5}>
                <TextField
                placeholder="Add word, phrase, or emoji"
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
                    lineHeight: 1.2,
                    paddingBottom: '15px !important'
                    },
                }}
                />
            </Box>
            <Box my={2} textAlign={'left'}>
              <Typography color='text.secondary' variant="body2">
                We'll only mute viewers who comment the exact phrase without additional letters or words.
              </Typography>
            </Box>
            <Box textAlign={"left"} mt={1}>
                <Typography mb={1} fontWeight={600} fontSize="0.9rem">
                  Mute Duration
                </Typography>
                 

            {/* Dropdown button */}
            <Box
              onClick={() => setOpen(!open)}
              sx={{
                backgroundColor: "#f2f2f2",
                px: 2,
                py: 0.75,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Typography fontSize="0.95rem">{selected}</Typography>
              <IconButton size="small">
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            {/* Dropdown options */}
            <Collapse in={open}>
              <List disablePadding>
                {durations.map((option) => (
                  <ListItem
                    key={option}
                    button
                    onClick={() => handleSelect(option)}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 2,
                      py: 1.2,
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography fontSize="0.95rem">{option}</Typography>
                      }
                    />
                    <Radio
                      checked={selected === option}
                      value={option}
                      disableRipple
                      sx={{
                        color: "#d3d3d3",
                        "&.Mui-checked": {
                          color: "#ff2d55",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 22,
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
      
            </Box>

        </Box>
    </Container>
  );
};

export default AddMuteRulesComment;

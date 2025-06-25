import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Radio,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const WhoCanSend: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selected, setSelected] = useState("everyone");

  const options = [
    { label: "Who can seet his post?", value: "everyone" },
    { label: "Selected gifter levels", value: "gifters" },
    { label: "Selected team member levels", value: "team" },
  ];

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
          borderBottom: "1px solid #eee",
          p: 1,
        }}
      >
        <IconButton onClick={onBack} sx={{ position: "absolute", left: 8 }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography fontWeight="bold">Who can send</Typography>
      </Box>

      {/* List of Options */}
      <List disablePadding sx={{              mt: 1,
}}>
        {options.map((opt) => (
          <ListItem
            key={opt.value}
            button
            onClick={() => setSelected(opt.value)}
            sx={{
              px: 2,
              py: 0.75,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ListItemText
              primary={
                <Typography fontSize="0.95rem" fontWeight={600}>
                  {opt.label}
                </Typography>
              }
            />
            <Radio
              checked={selected === opt.value}
              onChange={() => setSelected(opt.value)}
              value={opt.value}
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
    </Container>
  );
};

export default WhoCanSend;

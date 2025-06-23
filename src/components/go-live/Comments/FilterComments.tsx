import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Switch,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import NoFilteredComments from "./NoFIlterComments";

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


interface FilterCommentsProps {
  onBack: () => void;
}

const FilterComments: React.FC<FilterCommentsProps> = ({ onBack }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    "Spam comments",
    "Potentially unkind comments",
    "Community-flagged comments",
  ]);

  const [showInFeed, setShowInFeed] = useState(false);

  const toggleFilter = (label: string) => {
    setSelectedFilters((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const filters = [
    {
      label: "Spam comments",
      description: "These comments are disruptive or repetitive.",
    },
    {
      label: "Potentially unkind comments",
      description:
        "These comments are suggestive, mean-spirited, or stereotyping towards another group.",
    },
    {
      label: "Community-flagged comments",
      description:
        "These comments are similar to those our community has previously flagged, but don’t violate our Community Guidelines.",
    },
  ];

  return (
    <>
            {filteredComments?.length === 0 ? (
        <NoFilteredComments />
        ) : (
    <Box
      sx={{
        maxHeight: "calc(100vh - 9rem)",
        overflowY: "auto",
        bgcolor: "white",
        borderRadius: 2,
        mx: "auto",
        width: "100%",
        maxWidth: 360,
        position: 'relative'
      }}
    >

      <Box
        sx={{
          borderBottom: "1px solid #e0e0e0",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: 'center'
        }}
      >
        <IconButton onClick={onBack} sx={{ position: "absolute", left: 1 }} size="small">
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography fontWeight="bold" fontSize="1.1rem" sx={{ ml: 1 }}>
          Filter comments
        </Typography>
      </Box>

      <List dense>
        {filters.map(({ label, description }) => (
        <ListItem
            key={label}
            button
            alignItems="flex-start"
            onClick={() => toggleFilter(label)}
            sx={{ px: 2, py: 1 }}
        >
            <ListItemText
            primary={<Typography fontWeight="bold">{label}</Typography>}
            secondary={
                <Typography variant="body2" color="text.secondary">
                {description}
                </Typography>
            }
            />

            {selectedFilters.includes(label) ? (
            <ListItemSecondaryAction>
                <CheckCircleIcon sx={{ color: "#ff2d55" }} />
            </ListItemSecondaryAction>
            ) : (
            <ListItemSecondaryAction>
  {selectedFilters.includes(label) ? (
    <CheckCircleIcon sx={{ color: "#ff2d55" }} />
  ) : (
            <Box
            sx={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            >
            <CheckCircleIcon sx={{ color: "#fff", fontSize: 16 }} />
            </Box>
        )}
        </ListItemSecondaryAction>

                    )}
        </ListItem>
        ))}

        <ListItem button sx={{ px: 2 }}>
          <ListItemText
            primary={
              <Typography fontWeight="bold">
                Review community-flagged comments
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="text.secondary">
                Turn this on to let creators and moderators approve community-flagged comments during LIVE.
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem sx={{ px: 2 }}>
          <ListItemText
            primary={
              <Typography fontWeight="bold">
                Show filtered comments in feed
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="text.secondary">
                Community-flagged comments will be visible to you during the LIVE.
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <StyledSwitch
              edge="end"
              checked={showInFeed}
              onChange={() => setShowInFeed((prev) => !prev)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Box>
  )}
  </>
  );
};

export default FilterComments;

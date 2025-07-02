import React from "react";
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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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

interface FilterCommentsProps {
  onBack: () => void;
  onUpdate: (filterComments: {
    spamComments?: boolean;
    unkindComments?: boolean;
    communityFlaggedComments?: boolean;
    showInFeed?: boolean;
  }) => void;
  filterSettings?: {
    spamComments?: boolean;
    unkindComments?: boolean;
    communityFlaggedComments?: boolean;
    showInFeed?: boolean;
  };
}

const FilterComments: React.FC<FilterCommentsProps> = ({ 
  onBack, 
  onUpdate,
  filterSettings = {
    spamComments: false,
    unkindComments: false,
    communityFlaggedComments: false,
    showInFeed: false
  }
}) => {
  // Derive selected filters from props
  const getSelectedFilters = () => {
    const filters = [];
    if (filterSettings.spamComments) filters.push("Spam comments");
    if (filterSettings.unkindComments) filters.push("Potentially unkind comments");
    if (filterSettings.communityFlaggedComments) filters.push("Community-flagged comments");
    return filters;
  };

  const selectedFilters = getSelectedFilters();
  const showInFeed = filterSettings.showInFeed || false;

  const toggleFilter = (label: string) => {
    const updatedFilters = selectedFilters.includes(label)
      ? selectedFilters.filter((item) => item !== label)
      : [...selectedFilters, label];

    // Map selected filters to boolean values for parent
    onUpdate({
      spamComments: updatedFilters.includes("Spam comments"),
      unkindComments: updatedFilters.includes("Potentially unkind comments"),
      communityFlaggedComments: updatedFilters.includes("Community-flagged comments"),
      showInFeed // Keep existing showInFeed value
    });
  };

  const handleToggleShowInFeed = () => {
    const newValue = !showInFeed;
    onUpdate({
      ...filterSettings,
      showInFeed: newValue
    });
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
        "These comments are similar to those our community has previously flagged, but don't violate our Community Guidelines.",
    },
  ];

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          borderBottom: "1px solid #e0e0e0",
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: 'center'
        }}
      >
        <IconButton onClick={onBack} sx={{ position: "absolute", left: 1 }} size="small">
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.69141 1.25L1.69141 7.25L7.69141 13.25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </IconButton>
        <Typography fontWeight="bold" variant="body1" sx={{ ml: 1 }}>
          Filter comments
        </Typography>
      </Box>

      <List dense sx={{ 
        maxHeight: "calc(100vh - 9rem)",
        overflowY: "auto",
        bgcolor: "white",
        borderRadius: 2,
        mx: "auto",
        width: "100%",
        maxWidth: 360,
      }}>
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
              onChange={handleToggleShowInFeed}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Box>
  );
};

export default FilterComments;
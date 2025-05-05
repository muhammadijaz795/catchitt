import React from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const dash = '–';                
const value = 70;               

const PlaceholderLinear = ({ value }: { value: number }) => (
  <LinearProgress
    variant="determinate"
    value={value}
    sx={{
      height: 8,
      borderRadius: 4,
      backgroundColor: 'action.hover',
      '& .MuiLinearProgress-bar': {
        borderRadius: 4,
        backgroundColor: 'primary.main',
      },
    }}
  />
);
const ArcGauge = ({ percent = 0 }: { percent?: number }) => {
  const size = 150;              // full diameter
  const half = size / 2;         // height = half for clipping

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: half,
        overflow: 'hidden',      // <‑‑ hides lower half
      }}
    >
      {/* grey track */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        sx={{ color: 'action.hover', transform: 'rotate(180deg)' }}
      />
      {/* coloured value */}
      <CircularProgress
        variant="determinate"
        value={percent}
        size={size}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'primary.main',
          transform: 'rotate(180deg)',
        }}
      />
    </Box>
  );
};


// const ArcGauge = () => {
//   // simple half‑circle gauge with CircularProgress
//   const theme = useTheme();
//   return (
//     <Box sx={{ position: 'relative', width: 120, height: 60, mx: 'auto', my: 3 }}>
//       <CircularProgress
//         variant="determinate"
//         value={100}
//         size={120}
//         sx={{
//           color: 'action.hover',
//           transform: 'rotate(180deg)',
//         }}
//       />
//       <CircularProgress
//         variant="determinate"
//         value={0}                                // 0 for placeholder
//         size={120}
//         sx={{
//           position: 'absolute',
//           left: 0,
//           top: 0,
//           color: theme.palette.primary.main,
//           transform: 'rotate(180deg)',
//         }}
//       />
//     </Box>
//   );
// };

const CardHeader = ({ title }: { title: string }) => (
  <Box
    sx={{
      py: 1,
      px: 2,
      borderBottom: 1,
      borderColor: 'divider',
      display: 'flex',
      alignItems: 'center',
      gap: 0.5,
    }}
  >
    <Typography fontSize={15} fontWeight={600}>
      {title}
    </Typography>
    <Tooltip
        title="Your hint text"

        placement="top"
        slotProps={{
          tooltip: {
            sx: {
              bgcolor: '#000',
              fontSize: '1rem',
              color: '#fff',
            },
          },
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: 14, cursor: 'help', color: 'text.secondary' }} />
      </Tooltip>

  </Box>
);

const ViewersTab = ({postAnalyticsDetails, isDarkTheme}: any) => {
  return (
    <Box sx={{ width: 'calc(100% - 14rem)', textAlign: 'left', px: 3, mt: 4 }}>
      <Grid container spacing={3}>
        {/* --- Left column -------------------------------------------------- */}
        <Grid item xs={12} md={6}>
          {/* Total viewers */}
          <Paper variant="outlined" sx={{ mb: 3 }}>
            <CardHeader title="Total viewers" />
            <Box sx={{ p: 2 }}>
              <Typography color="text.secondary" fontSize={14}>
                You’ll be able to see this information once there’s enough data for analysis.
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography>{dash}</Typography>
                <Typography>{dash}</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Viewer types */}
          <Paper variant="outlined" sx={{ mb: 3 }}>
            <CardHeader title="Viewer types" />
            <Box sx={{ p: 2 }}>
              <Typography color="text.secondary" fontSize={14} mb={2}>
                You’ll be able to see this information once there’s enough data for analysis.
              </Typography>

              {/* Returning vs new */}
              <Box mb={3}>
                <Box display="flex" justifyContent="space-between">
                  <Typography>{postAnalyticsDetails?.details?.viewerTypePercentages?.returning_viewer}</Typography>
                  <Typography>{postAnalyticsDetails?.details?.viewerTypePercentages?.new_viewer}</Typography>
                </Box>
                <PlaceholderLinear value={parseInt(postAnalyticsDetails?.details?.viewerTypePercentages?.returning_viewer)} />
                <Box display="flex" justifyContent="space-between" mt={0.5}>
                  <Typography fontSize={13}>Returning viewers</Typography>
                  <Typography fontSize={13}>New viewers</Typography>
                </Box>
              </Box>

              {/* Followers vs non‑followers */}
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>{postAnalyticsDetails?.details?.viewerTypePercentages?.follower}</Typography>
                  <Typography>{postAnalyticsDetails?.details?.viewerTypePercentages?.non_follower}</Typography>
                </Box>
                <PlaceholderLinear value={parseInt(postAnalyticsDetails?.details?.viewerTypePercentages?.follower)} />
                <Box display="flex" justifyContent="space-between" mt={0.5}>
                  <Typography fontSize={13}>Followers</Typography>
                  <Typography fontSize={13}>Non‑followers</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Age */}
          <Paper variant="outlined">
            <CardHeader title="Age" />
            <Box sx={{ p: 2 }}>
              <Typography color="text.secondary" fontSize={14} mb={2}>
                You’ll be able to see this information once there’s enough data for analysis.
              </Typography>

              {Array.from({ length: 6 }).map((_, i) => (
                <Box key={i} mb={2}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>{dash}</Typography>
                    <Typography>‑%</Typography>
                  </Box>
                  <PlaceholderLinear value={0} />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* --- Right column ------------------------------------------------- */}
        <Grid item xs={12} md={6}>
          {/* Gender */}
          <Paper variant="outlined" sx={{ mb: 3 }}>
            <CardHeader title="Gender" />
            {/* <Typography color="text.secondary" fontSize={14} m={2}>
                Data will show when video views reach 100
              </Typography> */}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 3, mt: 2, p: 3 }}>
              <ArcGauge percent={0} />
              {/* legend */}
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1 }}>
              {[
                { label: "Male", value: postAnalyticsDetails?.details?.genderPercentages?.male, color: 'primary.dark' },
                { label: "Female", value: postAnalyticsDetails?.details?.genderPercentages?.female, color: 'primary.main' },
                { label: "Other", value: postAnalyticsDetails?.details?.genderPercentages?.other, color: 'primary.light' }
              ].map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1,  }}>
                    <Box sx={{
                        width: 8,
                        height: 8,
                        borderRadius: 1,
                        bgcolor: item.color,
                          }}
                    />
                    <Typography fontSize={14}>{item.label}</Typography>
                    <Typography sx={{ ml: 8 }} fontSize={14}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>

          {/* Locations */}
          <Paper variant="outlined">
            <CardHeader title="Locations" />
            <Box sx={{ p: 2 }}>
            {(!postAnalyticsDetails?.details?.countryPercentages || Object.values(postAnalyticsDetails.details.countryPercentages).every(p => p === "0%")) && (
              <Typography color="text.secondary" fontSize={14} mb={2}>
                You’ll be able to see this information once there’s enough data for analysis.
              </Typography>
              )}
              {Object.entries(postAnalyticsDetails?.details?.countryPercentages).map(([country, percentage]) => (
                <Box key={country} mb={2}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>{country.charAt(0).toUpperCase() + country.slice(1).replace(/_/g, ' ')}</Typography>
                    <Typography>{percentage}</Typography>
                  </Box>
                  <PlaceholderLinear value={parseFloat(percentage)} />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ViewersTab
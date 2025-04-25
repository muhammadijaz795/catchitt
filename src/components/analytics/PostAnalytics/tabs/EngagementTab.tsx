import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const dash = '–';

/* ---------- helper components ------------------------------------ */

interface CardHeaderProps {
  title: string;
  isDark: boolean;
}

const CardHeader = ({ title, isDark }: CardHeaderProps) => (
  <Box
    sx={{
      py: 1,
      px: 2,
      borderBottom: 1,
      borderColor: isDark ? 'divider' : 'divider',
      display: 'flex',
      alignItems: 'center',
      gap: 0.5,
    }}
  >
    <Typography
      fontSize={15}
      fontWeight={600}
      color={isDark ? 'grey.300' : 'text.primary'}
    >
      {title}
    </Typography>

    <Tooltip
      title="You’ll see data here once enough interactions are recorded."
      placement="top"
      slotProps={{
        tooltip: {
          sx: { bgcolor: '#000', fontSize: '1rem', color: '#fff' },
        },
      }}
    >
      <InfoOutlinedIcon
        sx={{
          fontSize: 14,
          cursor: 'help',
          color: isDark ? 'grey.400' : 'text.secondary',
        }}
      />
    </Tooltip>
  </Box>
);

const PlaceholderLine = ({ isDark }: { isDark: boolean }) => (
  <Box
    sx={{
      height: 6,
      width: '100%',
      borderRadius: 2,
      bgcolor: isDark ? 'grey.800' : 'action.hover',
    }}
  />
);

/* ---------- main tab component ----------------------------------- */

interface EngagementTabProps {
  /** '' for light theme or dark‑theme class string from parent */
  isDarkTheme: string;
}

const EngagementTab: React.FC<EngagementTabProps> = ({ isDarkTheme }) => {
  /* derive booleans & colours */
  const isDark = Boolean(isDarkTheme);
  const bgPaper = isDark ? '#181818' : '#fff';

  return (
    <Box sx={{ width: 'calc(100% - 14rem)', textAlign: 'left', px: 3, mt: 4 }}>
      <Grid container spacing={3}>
        {/* Likes card -------------------------------------------------- */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ bgcolor: bgPaper }} variant="outlined">
            <CardHeader title="Likes" isDark={isDark} />

            <Box sx={{ p: 2 }}>
              <Typography
                color={isDark ? 'grey.400' : 'text.secondary'}
                fontSize={14}
              >
                You’ll be able to see this information once there’s enough data
                for analysis.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Top words card -------------------------------------------- */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ bgcolor: bgPaper }} variant="outlined">
            <CardHeader
              title="Top words used in comments"
              isDark={isDark}
            />

            <Box sx={{ p: 2 }}>
              <Typography
                color={isDark ? 'grey.400' : 'text.secondary'}
                fontSize={14}
                mb={2}
              >
                You’ll be able to see this information once there’s enough data
                for analysis.
              </Typography>

              {Array.from({ length: 5 }).map((_, i) => (
                <Box
                  key={i}
                  mb={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    fontSize={14}
                    color={isDark ? 'grey.300' : 'text.primary'}
                  >
                    {dash}
                  </Typography>

                  <Box sx={{ flexGrow: 1, mx: 2 }}>
                    <PlaceholderLine isDark={isDark} />
                  </Box>

                  <Typography
                    fontSize={14}
                    color={isDark ? 'grey.300' : 'text.primary'}
                  >
                    ‑%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EngagementTab;



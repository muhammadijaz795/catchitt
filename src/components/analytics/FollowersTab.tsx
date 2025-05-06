import React, { useState } from 'react'
import { Card, CardContent, Typography, LinearProgress, Box, Grid, Tab,Tabs, IconButton, Tooltip, Avatar, Paper, CircularProgress,
   CardHeader } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,  ResponsiveContainer, BarChart, Bar,Cell, Area} from 'recharts';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

  const newViewersData = [
    { date: 'Apr 6', viewers: 30 },
    { date: 'Apr 7', viewers: 15 },
    { date: 'Apr 8', viewers: 8 },
    { date: 'Apr 9', viewers: 3 },
    { date: 'Apr 10', viewers: 0 },
    { date: 'Apr 11', viewers: 0 },
    { date: 'Apr 12', viewers: 0 },
    { date: 'Apr 13', viewers: 0 },
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  
const creators = [
    // {
    //   name: "Paityn Saris",
    //   followers: "983k followers",
    //   avatar: "https://via.placeholder.com/64", 
    // },
    // {
    //   name: "Kaylynn",
    //   followers: "983k followers",
    //   avatar: "https://via.placeholder.com/64", 
    // },
    // {
    //   name: "Ahmad Stanton",
    //   followers: "983k followers",
    //   avatar: "https://via.placeholder.com/64", 
    // },
  ];

  const posts = [
    {
      id: 1,
      thumbnail: "https://via.placeholder.com/60x100", // Replace with your actual image URL
      duration: "00:11",
      title: "Gym_workout_Bellyfat",
      code: "9ad564vd_6d",
      creatorName: "Al Hilal",
      creatorAvatar: "https://via.placeholder.com/24", // Replace with actual creator avatar URL
    },
  ];

function FollowersTab({analyticsDetails, selectedPeriod}: any) {
  const value = 70;
  const [tabIndex, setTabIndex] = useState(0);
  const [tab, setTab] = useState(0);

  const handleChangetimeTabs = (event: any, newValue: any) => {
    setTab(newValue);
  };

  const handleChange = (event: any, newValue: any) => {
    setTabIndex(newValue);
  }
  const chartData = tabIndex === 0 ? analyticsDetails.details.allFollowersGraph : analyticsDetails.details.netFollowersGraph;
  const [monthIndex, setMonthIndex] = useState(3); // April is index 3

  const [dayData, setDayData] = useState<any>(
    [...Array(selectedPeriod)].map((_, i) => ({
      date: new Date(Date.now() - (6 - i) * 864e5).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      activity: 0
    }))
  );

  const [hourData, setHourData] = useState<any>(
    [...Array(12)].map((_, i) => ({
      hour: new Date(Date.now() - (11 - i) * 3600000).toLocaleTimeString('en-US', {hour: 'numeric', hour12: true}),
      value: 0
    }))
  );

  const handlePrevMonth = () => {
    setMonthIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setMonthIndex((prev) => (prev < months.length - 1 ? prev + 1 : prev));
  };



  
  const dash = '–';                
  
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
  return (
    <div className='mt-3'>
    <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 0 }}>
            {/* Tabs */}
            <Tabs
            value={tabIndex}
            onChange={handleChange}
            variant="fullWidth"
            TabIndicatorProps={{
                sx: {
                top: 0,
                height: 3,
                backgroundColor: "#1976d2",
                },
            }}
            sx={{
                minHeight: "48px",
                "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                fontSize: "1rem",
                color: "#4B5563",
                minHeight: "48px",
                },
                "& .Mui-selected": {
                color: "#000",
                fontWeight: 700,
                },
                "& .MuiTabs-flexContainer": {
                borderBottom: "none",
                },
            }}
            >
            <Tab label="Total followers" />
            <Tab label="Net followers" />
            </Tabs>

            {/* Top Section */}
            <Box display="flex" sx={{ borderBottom: "1px solid #E5E7EB" }}>
            <Box flex={1} px={2} pb={2} textAlign="center" borderRight="1px solid #E5E7EB">
                <Typography variant="body1" fontSize={'1.5rem'} 
                        color={tabIndex === 0 ? "#1976d2" : "inherit"} fontWeight="bold" lineHeight={1}>
                0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                0 (-- )
                </Typography>
            </Box>
            <Box flex={1} p={2} textAlign="center">
                <Typography variant="body1" fontSize={'1.5rem'} 
                        color={tabIndex === 0 ? "#1976d2" : "inherit"} fontWeight="bold" lineHeight={1}>
                0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                0 (-- )
                </Typography>
            </Box>
            </Box>

            {/* Chart */}
            <Box height={250} pl={5}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis orientation="right" fontSize={12} axisLine={false} tickLine={false} />
                {/* <Tooltip /> */}

                {/* Light blue Area under Line */}
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="none"
                    fill="rgba(25, 118, 210, 0.1)" // Light blue transparent
                />

                {/* Main Line */}
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1976d2"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
                </LineChart>
            </ResponsiveContainer>
            </Box>
        </CardContent>
    </Card>

  <Grid container spacing={3}>

        {/* --- left column ------------------------------------------------- */}
      <Grid item xs={12} md={5}>
        {/* <Card variant="outlined" sx={{ p: 0, my: 3, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" mb={2} className='py-2 px-4 border-b mb-4 text-left'>
                <Typography fontSize={'15px'} fontWeight="bold" mr={1}>
                Creators your viewers also watched
                </Typography>
                <Tooltip title="Shows when your viewers are most active." arrow>
                <IconButton size="small" sx={{ p: 0.5 }}>
                <InfoOutlinedIcon sx={{ fontSize: 14, cursor: 'help', color: 'text.secondary' }} />
                </IconButton>
                </Tooltip>
            </Box>

            <Box display="flex" gap={4} justifyContent="center">
                {creators.map((creator, index) => (
                <Box key={index} display="flex" flexDirection="column" alignItems="center">
                    <Avatar
                    src={creator.avatar}
                    alt={creator.name}
                    sx={{ width: 64, height: 64, mb: 1 }}
                    />
                    <Typography variant="body1" fontWeight="500" textAlign="center">
                    {creator.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                    {creator.followers}
                    </Typography>
                </Box>
                ))}
            </Box>
        </Card>  */}
          {/* Gender */}
          <Paper variant="outlined" sx={{ my: 3 }}>
            <CardHeader title="Gender" />
            {/* <Typography color="text.secondary" fontSize={14} m={2}>
                Data will show when video views reach 100
              </Typography> */}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 3, mt: 2, p: 3 }}>
              <ArcGauge percent={0} />
              {/* legend */}
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1 }}>
                {[
                  { label: "Male", value: analyticsDetails?.details?.followerGenderPercentages?.male, color: 'primary.dark' },
                  { label: "Female", value: analyticsDetails?.details?.followerGenderPercentages?.female, color: 'primary.main' },
                  { label: "Other", value: analyticsDetails?.details?.followerGenderPercentages?.other, color: 'primary.light' }
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
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>

          {/* Locations */}
          <Paper variant="outlined" sx={{ mb: 3 }}>
            <CardHeader title="Locations" />
            <Box sx={{ p: 2 }}>
              {(!analyticsDetails?.details?.followerCountryPercentages || Object.values(analyticsDetails.details.followerCountryPercentages).every(p => p === "0%")) && (
              <Typography color="text.secondary" fontSize={14} mb={2}>
                You’ll be able to see this information once there’s enough data for analysis.
              </Typography>
              )}
              {Object.entries(analyticsDetails?.details?.followerCountryPercentages).map(([country, percentage]) => (
                <Box key={country} mb={2}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>{country.charAt(0).toUpperCase() + country.slice(1).replace(/_/g, ' ')}</Typography>
                    <Typography>{percentage as number}%</Typography>
                  </Box>
                  <PlaceholderLinear value={parseFloat(percentage as string)} />
                </Box>
              ))}
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
      {/* --- right column -------------------------------------------------- */}
      <Grid item xs={12} md={7}>
          <Card variant="outlined" sx={{ borderRadius: 3, my:3,  p: 0 }}>
              <CardContent sx={{p:0}}>
                  <Box display="flex" alignItems="center" mb={2} className='py-2 px-4 border-b mb-4 text-left'>
                      <Typography fontSize={'15px'} fontWeight="bold" mr={1}>
                      Most active times
                      </Typography>
                      <Tooltip title="Shows when your viewers are most active." arrow>
                      <IconButton size="small" sx={{ p: 0.5 }}>
                          <InfoOutlinedIcon sx={{ fontSize: 14, cursor: 'help', color: 'text.secondary' }} />
                      </IconButton>
                      </Tooltip>
                  </Box>

                  <Box className="pl-5">
                  <Tabs
                      value={tab}
                      onChange={handleChangetimeTabs}
                      variant="standard"
                      TabIndicatorProps={{ style: { display: 'none' } }} // hide underline
                      sx={{
                      minHeight: '32px',
                      '& .MuiTab-root': {
                          minHeight: '32px',
                          textTransform: 'none',
                          fontSize: '14px',
                          paddingX: 1,
                          paddingY: 1,
                          borderRadius: '5px',
                          backgroundColor: '#0000000D',
                          color: '#0000007A',
                          marginRight: '0.5rem',
                          marginBottom: '1rem'

                      },
                      '& .Mui-selected': {
                          backgroundColor: '#0075DC1A',
                          color: '#0075DB',
                      },
                      }}
                  >
                      <Tab label="Hour" />
                      <Tab label="Day" />
                  </Tabs>
                  {tab === 1 ? (
                  // Day View
                  <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                      data={dayData}
                      barSize={16}
                      barCategoryGap={20}
                      margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                  >
                      <CartesianGrid vertical={false} stroke="#f0f0f0" />
                      <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={{ stroke: "#e0e0e0" }}
                      tick={{ fontSize: 11, fill: "#757575" }}
                      />
                      <YAxis
                          orientation="right"
                          allowDecimals={false}
                          domain={[0, 4]}
                          ticks={[1, 2, 3, 4]}
                          tickLine={false}
                          axisLine={false} // <--- remove border
                          tick={{ fontSize: 11, fill: "#757575" }}
                          />

                      {/* <Tooltip
                      contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #ddd",
                          fontSize: "12px",
                          borderRadius: "4px",
                      }}
                      cursor={{ fill: "rgba(25, 118, 210, 0.1)" }}
                      /> */}
                      <Bar dataKey="activity" radius={[4, 4, 0, 0]}>
                      {dayData.map((entry: any, index: number) => (
                          <Cell
                          key={`cell-${index}`}
                          fill={entry.date === "Apr 2" ? "#1976d2" : "#e3f2fd"}
                          />
                      ))}
                      </Bar>
                  </BarChart>
                  </ResponsiveContainer>
                  ) : (
                  // Hour View
                      <Box>
                          {/* <Typography
                          variant="body2"
                          sx={{ textAlign: "center", mb: 3 }}
                          >
                          In the last 7 days, your viewers were most active on Apr 4,
                          between 0am to 1am
                          </Typography> */}
                          {/* Month Slider */}
                          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                                      <IconButton size="small" onClick={handlePrevMonth} disabled={monthIndex === 0}>
                                          <ChevronLeft fontSize="small" />
                                      </IconButton>
                                      <Typography variant="body2" mx={1}>
                                          {months[monthIndex]}
                                      </Typography>
                                      <IconButton size="small" onClick={handleNextMonth} disabled={monthIndex === months.length - 1}>
                                          <ChevronRight fontSize="small" />
                                      </IconButton>
                          </Box>
                          <ResponsiveContainer width="100%" height={120}>
                          <BarChart data={hourData} barCategoryGap={5}>
                              <XAxis 
                              dataKey="hour" 
                              tickLine={false} 
                              axisLine={{ stroke: "#e0e0e0" }}
                              interval={0}
                              style={{ fontSize: 10 }}
                              />
                              <YAxis hide />
                              {/* <Tooltip /> */}
                              <Bar 
                              dataKey="value" 
                              fill="#1976d2" 
                              radius={[4, 4, 0, 0]}
                              barSize={8} // <-- Make bars slim
                              />
                          </BarChart>
                      </ResponsiveContainer>

                              </Box>
                              )}
                  </Box>
              </CardContent>
          </Card>
      </Grid>
      
  </Grid>
</div>
  )
}

export default FollowersTab
import React, { useState } from 'react'
import { Card, CardContent, Typography, LinearProgress, Box, Grid, Tab,Tabs, IconButton, Tooltip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,  ResponsiveContainer, BarChart, Bar,Cell} from 'recharts';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";


const totalViewersData = [
    { date: 'Apr 6', viewers: 55 },
    { date: 'Apr 7', viewers: 20 },
    { date: 'Apr 8', viewers: 10 },
    { date: 'Apr 9', viewers: 5 },
    { date: 'Apr 10', viewers: 0 },
    { date: 'Apr 11', viewers: 0 },
    { date: 'Apr 12', viewers: 0 },
    { date: 'Apr 13', viewers: 0 },
  ];
  
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
  const dayData = [
    { date: "Mar 31", activity: 0 },
    { date: "Apr 1", activity: 0 },
    { date: "Apr 2", activity: 4 },
    { date: "Apr 3", activity: 3 },
    { date: "Apr 4", activity: 2 },
    { date: "Apr 5", activity: 0 },
    { date: "Apr 6", activity: 0 },
  ];
  
  const hourData = [
    { hour: "0a", value: 1 },
    { hour: "2a", value: 0 },
    { hour: "4a", value: 0 },
    { hour: "6a", value: 0 },
    { hour: "8a", value: 0 },
    { hour: "10a", value: 0 },
    { hour: "12p", value: 0 },
    { hour: "2p", value: 0 },
    { hour: "4p", value: 0 },
    { hour: "6p", value: 0 },
    { hour: "8p", value: 0 },
    { hour: "10p", value: 0 },
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

function ViewersTab({isDarkThemes}: any) {
  const value = 70;
  const [tabIndex, setTabIndex] = useState(0);
  const [tab, setTab] = useState(0);

  const handleChangetimeTabs = (event, newValue) => {
    setTab(newValue);
  };

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  }
  const chartData = tabIndex === 0 ? totalViewersData : newViewersData;
  const [monthIndex, setMonthIndex] = useState(3); // April is index 3


  const handlePrevMonth = () => {
    setMonthIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setMonthIndex((prev) => (prev < months.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className='mt-3'>
          <Card elevation={3} >
            <CardContent sx={{ p: 0 }}>
                <Tabs value={tabIndex} onChange={handleChange} 
                TabIndicatorProps={{
                    sx: {
                    top: 0,            // Move indicator to top
                    height: 3,         // Make it a little thicker (optional)
                    backgroundColor: '#1976d2', // Indicator color
                    },
                }}
                variant="fullWidth"
                sx={{
                    '& .MuiTabs-flexContainer': {
                    position: 'relative',
                    },
                    '& .MuiTab-root': {
                    textTransform: 'initial',
                    fontWeight: 500,
                    fontSize: '1rem',
                    color: '#4B5563', // gray-700
                    paddingBottom: '12px',
                    
                    },
                    '& .Mui-selected': {
                    color: '#000 !important',
                    fontWeight: 700,
                    },
                }}
                >
                <Tab label="Total viewers" />
                <Tab label="New viewers" />
                </Tabs>

                <Box sx={{ mt: 4, display: 'flex' }} >
                <Typography variant="body2" align="center" width={'50%'} color="primary">
                    0
                </Typography>
                <Typography variant="body2" align="center" width={'50%'} color="textSecondary">
                    0 (--)
                </Typography>
                </Box>

                <Box height={250} mt={4} mr={2}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="viewers" stroke="#1976d2" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                </ResponsiveContainer>
                </Box>
            </CardContent>
           </Card>
            <div className="grid grid-cols-2 mt-3 gap-4">
            <Card variant="outlined" sx={{ borderRadius: 3, p: 2 }}>
      <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold" mr={1}>
            Most active times
            </Typography>
            <Tooltip title="Shows when your viewers are most active." arrow>
            <IconButton size="small" sx={{ p: 0.5 }}>
                <InfoOutlinedIcon fontSize="small" />
            </IconButton>
            </Tooltip>
        </Box>


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
                paddingY: 0,
                borderRadius: '5px',
                backgroundColor: '#0000000D',
                color: '#0000007A'
            },
            '& .Mui-selected': {
                backgroundColor: '#0075DC1A',
                color: '#0075DB',
                fontWeight: 'bold',
            },
            }}
        >
            <Tab label="Hour" />
            <Tab label="Day" />
        </Tabs>



        {tab === 1 ? (
          // Day View
          <ResponsiveContainer width="100%" height={200}>

            <BarChart data={dayData}>
              <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: "#e0e0e0" }} />
              <YAxis
                allowDecimals={false}
                domain={[0, 4]}
                ticks={[1, 2, 3, 4]}
                tickLine={false}
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <Tooltip />
              <Bar dataKey="activity" radius={[4, 4, 0, 0]}>
                {dayData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.date === "Apr 2" ? "#1976d2" : "#90caf9"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          // Hour View
          <Box>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", mb: 3 }}
            >
              In the last 7 days, your viewers were most active on Apr 4,
              between 0am to 1am
            </Typography>
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
    <Tooltip />
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
      </CardContent>
    </Card>
                <div className={`${isDarkThemes?'bg-[#181818]':'bg-white'} shadow-sm rounded`}>
                    <div className='py-2 px-4 border-b mb-4 text-left'>
                        <span className={`${isDarkThemes?'text-gray-300':'text-black'} text-[15px] font-semibold`}>Retention rate</span>
                    </div>
                    {/* <p className="text-gray-400 text-sm">
                        Most viewers stopped watching at 0:04. play the video below to see when they lost interest.
                    </p> */}
                    <div className="mt-4 space-y-2 px-4 pb-4 ">
                        {/* <video onLoadedMetadata={getMediaInfo} className='w-44 h-80 m-auto' controls src={post?.reducedVideoUrl?.length > 0? post?.reducedVideoUrl: post?.originalUrl} /> */}
                    </div>
                </div>
                <div className={`${isDarkThemes?'bg-[#181818]':'bg-white'} shadow-sm text-left rounded`}>
                    <div className='py-2 px-3 border-b mb-4 '>
                        <span className={`${isDarkThemes?'text-gray-300':'text-black'} text-[15px] font-semibold mb-2`}>Traffic source</span>
                    </div>
                    <p className="text-gray-400 px-3 text-sm">
                        Data will show when video views reach 100
                    </p>
                    <ul className="mt-4 space-y-2 px-4 pb-4">
                        <li className=" text-black text-sm">
                            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <span>-</span>
                                <span>{value}%</span>
                            </Box>
                            <Box sx={{ width: '100%', position: 'relative', py: 1 }}>
                                <LinearProgress
                                    sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: '#f5f5f5',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 4,
                                        backgroundColor: '#3B82F6',
                                    },
                                    }}
                                variant="determinate" value={value} />
                            </Box>
                        </li>
                        <li className="flex justify-between text-black text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                        <li className="flex justify-between text-black text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                        <li className="flex justify-between text-black text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                        <li className="flex justify-between text-black text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                    </ul>
                </div>
            </div>
    </div>
  )
}

export default ViewersTab
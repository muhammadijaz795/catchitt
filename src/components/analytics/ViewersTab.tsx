import React, { useState } from 'react'
import { Card, CardContent, Typography, LinearProgress, Box, Grid, Tab,Tabs } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

function ViewersTab({isDarkThemes}: any) {
  const value = 70;
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  }
  const chartData = tabIndex === 0 ? totalViewersData : newViewersData;


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
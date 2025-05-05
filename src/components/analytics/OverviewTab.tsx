import React, { useEffect, useState } from 'react'
import { STATISTICSTABS } from '../../utils/constants'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,  Legend, ResponsiveContainer } from 'recharts';
import {
    Box,
    Grid,
    Paper,
    Typography,
  } from '@mui/material';
  import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
  
  const CardHeader = ({
    title,
    isDark,
    tooltipText,
  }: {
    title: string;
    isDark: boolean;
    tooltipText: string;
  }) => (
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
      <Typography
        fontSize={15}
        fontWeight={600}
        color={isDark ? 'grey.300' : 'text.primary'}
      >
        {title}
      </Typography>
      {/* <Tooltip
        title={tooltipText}
        placement="top"
        slotProps={{
          tooltip: {
            sx: {
              bgcolor: isDark ? '#fff' : '#000',
              color: isDark ? '#000' : '#fff',
              fontSize: '1rem',
            },
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
      </Tooltip> */}
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
  
// {
//     "status": 200,
//     "message": "",
//     "data": {
//       "videoViews": 0,
//       "profileViews": 0,
//       "likes": 0,
//       "comments": 0,
//       "shares": 0,
//       "viewsGraph": {},
//       "profileViewsGraph": {},
//       "likesGraph": {},
//       "commentsGraph": {},
//       "sharesGraph": {}
//     }
//   }
        var themeColor = window.localStorage.getItem('theme');
        var isDarkTheme = themeColor == 'dark';
        
const isDark = Boolean(isDarkTheme); // optional if using inside helper


function OverviewTab({ analyticsDetails, analyticsData, isDarkTheme }: any) {

    const [activeTab, setActiveTab] = useState(STATISTICSTABS.VIDEO_VIEWS)
    const [chartData, setChartData] = useState<any>([])

    const switchTab = (event: React.MouseEvent<HTMLDivElement>) => {
        setActiveTab(Number(event.currentTarget.id));
    }

    const convertDateFormat = (inputDate:string) => {
        const date = new Date(inputDate);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options).replace(',', '');
    };

    const possibleGraphs = ['viewsGraph', 'profileViewsGraph', 'likesGraph', 'commentsGraph', 'sharesGraph']

    const prepareData = (data: any) => {
        const yAxisLabel = possibleGraphs[activeTab].replace('Graph', '')
        const result = data.map((item: any) => {

            const obj = { date: convertDateFormat(item.date), [yAxisLabel]: item.count }

            return obj
        })
        return result
    }

    useEffect(() => {
        if (analyticsData && activeTab) setChartData(prepareData(analyticsData[possibleGraphs[activeTab]]));
    }, [analyticsData, activeTab])

    return (
        <div className=' mx-auto mt-8  overflow-hidden'>
            {/* statistics card */}
            <div className={`${isDarkTheme ? 'bg-[#181818]' : 'bg-white'} rounded shadow-sm`}>
                <div className='inline-flex w-full ' >
                    <div onClick={switchTab} id={STATISTICSTABS.VIDEO_VIEWS.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.VIDEO_VIEWS ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} rounded-tl-md`}>Video views <br /><span className={`${activeTab === STATISTICSTABS.VIDEO_VIEWS ? 'text-blue-500' : ''} text-2xl font-semibold`}>{analyticsData.videoViews || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.PROFILE_VIEWS.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.PROFILE_VIEWS ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} border-x`}>Profile views <br /> <span className={`${activeTab === STATISTICSTABS.PROFILE_VIEWS ? 'text-blue-500' : ''} text-2xl font-semibold`}>{analyticsData.profileViews || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.LIKES.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.LIKES ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} border-x`}>Likes <br /> <span className={`${activeTab === STATISTICSTABS.LIKES ? 'text-blue-500' : ''} text-2xl font-semibold`}>{analyticsData.likes || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.COMMENTS.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.COMMENTS ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} border-x`}>Comments <br /> <span className={`${activeTab === STATISTICSTABS.COMMENTS ? 'text-blue-500' : ''} text-2xl font-semibold`}>{analyticsData.comments || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.SHARES.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.SHARES ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} rounded-tr-md`}>Shares <br /> <span className={`${activeTab === STATISTICSTABS.SHARES ? 'text-blue-500' : ''} text-2xl font-semibold`}>{analyticsData.shares || 0}</span></div>
                </div>
                {/* Chart Section */}
                <div className="m-4 border-t pt-6 mb-6 ">
                    <div className={`${chartData.length ? 'h-64' : 'h-32'} flex items-center justify-center text-gray-400`}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                {chartData.length && <CartesianGrid strokeDasharray="3 3" />}
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {(() => {
                                    switch (activeTab) {
                                        case STATISTICSTABS.VIDEO_VIEWS:
                                            return <Line type="monotone" dataKey="views" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                        case STATISTICSTABS.PROFILE_VIEWS:
                                            return <Line type="monotone" dataKey="profileViews" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                        case STATISTICSTABS.LIKES:
                                            return <Line type="monotone" dataKey="likes" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                        case STATISTICSTABS.COMMENTS:
                                            return <Line type="monotone" dataKey="comments" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                        case STATISTICSTABS.SHARES:
                                            return <Line type="monotone" dataKey="shares" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                        default:
                                            return <Line type="monotone" dataKey="views" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                    }
                                })()}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
            {/* Bottom Metrics Section */}
            <Box sx={{ my: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                    <Paper sx={{ bgcolor: isDarkTheme ? '#181818' : '#fff' }} variant="outlined">
                    <CardHeader
                        title="Traffic source"
                        isDark={isDarkTheme}
                        tooltipText="It shows the places where your viewers discover your posts. The main source types on Seezitt are the For You feed, the feed, pages, profile pages, search pages, and direct messages. The other types are grouped into 'Other'."
                        />                        
                        <Box sx={{ p: 2 }}>
                        {/* <Typography color={isDarkTheme ? 'grey.400' : 'text.secondary'} fontSize={14}>
                            You’ll be able to see this information once there’s enough data for analysis.
                        </Typography> */}
                        {analyticsDetails?.details?.trafficSourcePercentages && Object.entries(analyticsDetails?.details?.trafficSourcePercentages).map(([key, value]) => (
                            <Box
                            key={key}
                            mt={2}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            >
                            <Typography fontSize={14} color={isDarkTheme ? 'grey.300' : 'text.primary'}>
                                {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Typography>
                            <Box sx={{ flexGrow: 1, mx: 2 }}>
                                <PlaceholderLine isDark={isDarkTheme} />
                            </Box>
                            <Typography fontSize={14} color={isDarkTheme ? 'grey.300' : 'text.primary'}>
                                {value as React.ReactNode}%
                            </Typography>
                            </Box>
                        ))}
                        </Box>
                    </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                    <Paper sx={{ bgcolor: isDarkTheme ? '#181818' : '#fff' }} variant="outlined">
                    <CardHeader
                        title="Search queries"
                        isDark={isDarkTheme}
                        tooltipText="These are search queries from viewers that led them to your post. Data is displayed for the last 90 days only."
                        />
                        <Box sx={{ p: 2 }}>
                        <Typography color={isDarkTheme ? 'grey.400' : 'text.secondary'} fontSize={14}>
                            You’ll be able to see this information once there’s enough data for analysis.
                        </Typography>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Box
                            key={i}
                            mt={2}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            >
                            <Typography fontSize={14} color={isDarkTheme ? 'grey.300' : 'text.primary'}>
                                –
                            </Typography>
                            <Box sx={{ flexGrow: 1, mx: 2 }}>
                                <PlaceholderLine isDark={isDarkTheme} />
                            </Box>
                            <Typography fontSize={14} color={isDarkTheme ? 'grey.300' : 'text.primary'}>
                                –%
                            </Typography>
                            </Box>
                        ))}
                        </Box>
                    </Paper>
                    </Grid>
                </Grid>
                </Box>

        </div>
    )
}

export default OverviewTab
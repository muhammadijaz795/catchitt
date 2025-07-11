import React, { useEffect, useState } from 'react'
import { STATISTICSTABS } from '../../utils/constants'
import { LineChart, Area, Line, XAxis, YAxis,  CartesianGrid , Legend, ResponsiveContainer } from 'recharts';
import {
    LinearProgress,
    Box,
    Grid,
    Paper,
    Typography,
    Tooltip
  } from '@mui/material';
  import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
  import dayjs from 'dayjs'; // If you want date formatting
import { useTranslation } from 'react-i18next';
  
    
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
    <Tooltip
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
    const { t: translate } = useTranslation();
    const [activeTab, setActiveTab] = useState(STATISTICSTABS.VIDEO_VIEWS)
    const [chartData, setChartData] = useState<any>(
      [...Array(7)].map((_, i) => ({
        date: new Date(Date.now() - (6 - i) * 864e5).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: 0
      }))
    );

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
      const selectedChartData = analyticsDetails?.details?.[['dailyViewsGraph','dailyProfileViewsGraph','dailyLikesGraph','dailyCommentsGraph','dailyRepostsGraph'][activeTab]];
      selectedChartData && setChartData(selectedChartData);
    }, [analyticsData, activeTab, analyticsDetails])

    return (
        <div className=' mx-auto mt-8  overflow-hidden'>
            {/* statistics card */}
            <div className={`${isDarkTheme ? 'bg-[#181818]' : 'bg-white'} rounded shadow-sm`}>
                <div className='inline-flex w-full ' >
                    <div onClick={switchTab} id={STATISTICSTABS.VIDEO_VIEWS.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.VIDEO_VIEWS ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} rounded-tl-md`}>{translate('Video views')} <br /><span className={`${activeTab === STATISTICSTABS.VIDEO_VIEWS ? 'text-blue-500' : ''} text-2xl font-semibold`}>{analyticsDetails?.details?.totalViewers || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.PROFILE_VIEWS.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.PROFILE_VIEWS ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} border-x`}>{translate('Profile views')} <br /> <span className={`${activeTab === STATISTICSTABS.PROFILE_VIEWS ? 'text-blue-500' : ''} text-2xl font-semibold`}>{analyticsDetails?.details?.profileViews || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.LIKES.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.LIKES ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} border-x`}>{translate('Likes')} <br /> <span className={`${activeTab === STATISTICSTABS.LIKES ? 'text-blue-500' : ''} text-2xl font-semibold`}>{analyticsDetails?.details?.totalLikes || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.COMMENTS.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.COMMENTS ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} border-x`}>{translate('Comments')} <br /> <span className={`${activeTab === STATISTICSTABS.COMMENTS ? 'text-blue-500' : ''} text-2xl font-semibold`}>{analyticsDetails?.details?.totalComments || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.SHARES.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.SHARES ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} rounded-tr-md`}>{translate('Shares')} <br /> <span className={`${activeTab === STATISTICSTABS.SHARES ? 'text-blue-500' : ''} text-2xl font-semibold`}>{analyticsDetails?.details?.repostCounts || 0}</span></div>
                </div>
                {/* Chart Section */}
                <div className="m-4 border-t pt-6 mb-6">
  <div className={`${chartData.length ? 'h-64' : 'h-32'} flex items-center justify-center text-gray-400`}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 0, left: 20, bottom: 5 }}
      >
        {chartData.length > 0 && <CartesianGrid strokeDasharray="3 3" />}
        <defs>
          <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00b0ff" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#00b0ff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
  dataKey="date"
  tickFormatter={(str) => dayjs(str).format('MMM D')}
  tick={({ x, y, payload, index }) => {
    return (
      <text
        x={x}
        y={y + 10}
        textAnchor="middle"
        fontSize={12}
        fill={isDarkTheme ? '#ccc' : '#666'}
      >
        {dayjs(payload.value).format('MMM D')}
      </text>
    );
  }}
  interval={0}
/>

         <YAxis
          orientation="right"
          tick={{ fill: '#666' }}
          axisLine={false}
          tickLine={false}
        />
        {/* <Tooltip /> */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#00b0ff"
          strokeWidth={2}
          dot={{ stroke: '#00b0ff', strokeWidth: 2, fill: 'white', r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="none"
          fill="url(#colorBlue)"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

            </div>
            {location.pathname.startsWith('/analytics') &&
              <>
            {/* Bottom Metrics Section */}
            <Box sx={{ my: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                    <Paper sx={{ bgcolor: isDarkTheme ? '#181818' : '#fff' }} variant="outlined">
                    <CardHeader
                        title={translate('Traffic source')}
                        isDark={isDarkTheme}
                        tooltipText={translate("It shows the places where your viewers discover your posts. The main source types on Seezitt are the For You feed, the feed, pages, profile pages, search pages, and direct messages. The other types are grouped into 'Other'.")}
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
                                <LinearProgress variant="determinate" value={value as number} sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: '#f5f5f5',
                                    '& .MuiLinearProgress-bar': {
                                      borderRadius: 4,
                                      backgroundColor: '#3B82F6',
                                    },
                                  }} />
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
                        title={translate('Search queries')}
                        isDark={isDarkTheme}
                        tooltipText={translate('These are search queries from viewers that led them to your post.')}
                        />
                        <Box sx={{ p: 2 }}>
                        <Typography color={isDarkTheme ? 'grey.400' : 'text.secondary'} fontSize={14}>{translate("You’ll be able to see this information once there’s enough data for analysis.")}</Typography>
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
              </>
            }

        </div>
    )
}

export default OverviewTab
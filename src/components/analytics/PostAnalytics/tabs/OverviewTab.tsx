import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { POSTSTATISTICSTABS } from '../../../../utils/constants';
import { commentOutline, commentOutlineWhite, filledComment, filledCommentWhite, filledHeart, filledHeartWhite, filledSave, filledSaveWhite, filledShare, filledShareWhite, heartOutline, heartOutlineWhite, play, playOutline, playOutlineWhite } from '../../../../icons';
import { Box, LinearProgress } from '@mui/material';

// {
//     "status": 200,
//     "message": "",
//     "data": {
//       "views": 0,
//       "comments": 0,
//       "likes": 0,
//       "shares": 0,
//       "saves": 0,
//       "watchedFullVideo": {
//         "percentage": 0,
//         "yesterday": 0
//       },
//       "reachedAudience": {
//         "count": 0,
//         "yesterday": 0
//       },
//       "viewsGraph": {}
//     }
//   }

function OverviewTab({ postAnalyticsDetails, postAnalytics, post, isDarkTheme }: any) {

    const [activeTab, setActiveTab] = useState(POSTSTATISTICSTABS.VIDEO_VIEWS);
    const [chartData, setChartData] = useState<any>(
        [...Array(7)].map((_, i) => ({
            date: new Date(Date.now() - (6 - i) * 864e5)
              .toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            viewers: 0
          }))
    )
    const [totalPlayTime, setTotalPlayTime] = useState('0s')
    const switchTab = (event: React.MouseEvent<HTMLDivElement>) => {
        setActiveTab(Number(event.currentTarget.id));
    }
    const value = 70;
    const possibleGraphs = ['viewsGraph', 'playtimeGraph', 'watchtimeGraph', 'fullwatchedGraph', 'newfollowersGraph']

    const convertDateFormat = (inputDate:string) => {
        const date = new Date(inputDate);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options).replace(',', '');
    };

    const prepareData = (data: any) => {
        const yAxisLabel = possibleGraphs[activeTab].replace('Graph', '')
        const result = data.map((item: any) => {

            // const obj = { date: item.date, [yAxisLabel]: item.count } 
            // convert date in this format 12 Jan 2021 in above line
            const obj = { date: convertDateFormat(item.date), [yAxisLabel]: item.count }

            return obj
        })
        console.log('result🤖🤖🤖', result)
        return result
    }

    const formatDate = (date: number) => {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    const getMediaInfo = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const videoElement = (event.target as HTMLVideoElement);
        const duration = videoElement.duration;
        if (duration < 60) {
            setTotalPlayTime(`0:${Math.floor(duration)}s`);
        } else if (duration >= 60 && duration < 3600) {
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            setTotalPlayTime(`${minutes}m:${seconds}s`);
        } else {
            const hours = Math.floor(duration / 3600);
            const minutes = Math.floor((duration % 3600) / 60);
            const seconds = Math.floor(duration % 60);
            setTotalPlayTime(`${hours}h:${minutes}m:${seconds}s`);
        }
    }

    useEffect(() => {
        // if(postAnalytics && activeTab) setChartData(prepareData(postAnalytics[possibleGraphs[activeTab]]));
    }, [activeTab])

    return (
        <div className='w-[calc(100%-14rem)] px-3 mt-8  overflow-hidden'>
            {/* post data card  */}
            <div className={`${isDarkTheme?'bg-[#181818]':'bg-white'} rounded shadow-sm flex items-center justify-between p-3 mb-4`}>
                <div className='flex items-center space-x-4'>
                    <div className="w-14 h-24 bg-gray-200 rounded overflow-hidden">
                        <img src={post?.thumbnailUrl || 'https://placehold.co/56x96'} className='w-full h-full' alt="post-thumbnail" />
                    </div>
                    <div>
                        <span>{post?.description?.length > 30 ? post?.description?.slice(0, 30) + '...' : ''}</span>
                        <div className="text-gray-400 text-xs text-left ">Posted on {formatDate(post?.createdTime)} </div>
                    </div>
                </div>
                <div className='flex gap-12 mr-3'>
                    <div className="text-gray-400 flex-col text-sm"><img className='w-5 invert' src={isDarkTheme ? playOutlineWhite : play} alt="like" /> <span>{postAnalyticsDetails?.details?.videoViews || 0}</span></div>
                    <div className="text-gray-400 flex-col text-sm"><img className='w-5 invert' src={isDarkTheme ? filledHeartWhite : filledHeart} alt="like" /> <span>{postAnalyticsDetails?.details?.likesCount || 0}</span></div>
                    <div className="text-gray-400 flex-col text-sm"><img className='w-5 invert' src={isDarkTheme ? filledCommentWhite : filledComment} alt="like" /> <span>{postAnalyticsDetails?.details?.commentsCount || 0}</span></div>
                    <div className="text-gray-400 flex-col text-sm"><img className='w-5 invert' src={isDarkTheme ? filledShareWhite : filledShare} alt="like" /> <span>{postAnalyticsDetails?.details?.sharesCount || 0}</span></div>
                    <div className="text-gray-400 flex-col text-sm"><img className='w-5 invert' src={isDarkTheme ? filledSaveWhite : filledSave} alt="like" /> <span>{postAnalyticsDetails?.details?.savesCount || 0}</span></div>
                </div>
            </div>
            {/* statistics card */}
            <div className={`${isDarkTheme?'bg-[#181818]':'bg-white'} rounded shadow-sm mb-4`}>
                <div className='inline-flex w-full ' >
                    <div onClick={switchTab} id={POSTSTATISTICSTABS.VIDEO_VIEWS.toString()} className={`cursor-pointer w-1/5 py-16 font-semibold ${activeTab === POSTSTATISTICSTABS.VIDEO_VIEWS ? 'border-t-blue-500 border-t-4' : 'border-t border-b rounded-bl-md'} rounded-tl-md`}>Video views <br /><span className={`${activeTab === POSTSTATISTICSTABS.VIDEO_VIEWS ? 'text-blue-500' : ''} text-2xl font-semibold`}>{postAnalyticsDetails?.details?.videoViews || 0}</span></div>
                    <div onClick={switchTab} id={POSTSTATISTICSTABS.TOTAL_PLAY_TIME.toString()} className={`cursor-pointer w-1/5 py-16 font-semibold ${activeTab === POSTSTATISTICSTABS.TOTAL_PLAY_TIME ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} border-x`}>Total play time <br /> <span className={`${activeTab === POSTSTATISTICSTABS.TOTAL_PLAY_TIME ? 'text-blue-500' : ''} text-2xl font-semibold`}>{postAnalyticsDetails?.details?.videoWatchTime || "0h:0m:0s"}</span></div>
                    <div onClick={switchTab} id={POSTSTATISTICSTABS.AVERAGE_WATCH_TIME.toString()} className={`cursor-pointer w-1/5 py-16 font-semibold ${activeTab === POSTSTATISTICSTABS.AVERAGE_WATCH_TIME ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} border-x`}>Average watch time <br /> <span className={`${activeTab === POSTSTATISTICSTABS.AVERAGE_WATCH_TIME ? 'text-blue-500' : ''} text-2xl font-semibold`}>{postAnalyticsDetails?.details?.averageWatchTime || "0s"}</span></div>
                    <div onClick={switchTab} id={POSTSTATISTICSTABS.FULL_WATCH_PERCENTAGE.toString()} className={`cursor-pointer w-1/5 py-16 font-semibold ${activeTab === POSTSTATISTICSTABS.FULL_WATCH_PERCENTAGE ? 'border-t-blue-500 border-t-4' : 'border-t border-b'} border-x`}>Watched full video <br /> <span className={`${activeTab === POSTSTATISTICSTABS.FULL_WATCH_PERCENTAGE ? 'text-blue-500' : ''} text-2xl font-semibold`}>{postAnalyticsDetails?.details?.watchedFullPercentage || "0%"}</span></div>
                    <div onClick={switchTab} id={POSTSTATISTICSTABS.NEW_FOLLOWERS.toString()} className={`cursor-pointer w-1/5 py-16 font-semibold ${activeTab === POSTSTATISTICSTABS.NEW_FOLLOWERS ? 'border-t-blue-500 border-t-4' : 'border-t border-b rounded-br-md'} rounded-tr-md`}>New followers <br /> <span className={`${activeTab === POSTSTATISTICSTABS.NEW_FOLLOWERS ? 'text-blue-500' : ''}  text-2xl font-semibold`}>{postAnalyticsDetails?.details?.newFollowers || 0}</span></div>
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
                                        case POSTSTATISTICSTABS.VIDEO_VIEWS:
                                            return <Line type="monotone" dataKey="views" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                        case POSTSTATISTICSTABS.TOTAL_PLAY_TIME:
                                            return <Line type="monotone" dataKey="playtime" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                        case POSTSTATISTICSTABS.AVERAGE_WATCH_TIME:
                                            return <Line type="monotone" dataKey="watchtime" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                        case POSTSTATISTICSTABS.FULL_WATCH_PERCENTAGE:
                                            return <Line type="monotone" dataKey="fullwatched" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                        case POSTSTATISTICSTABS.NEW_FOLLOWERS:
                                            return <Line type="monotone" dataKey="newfollowers" stroke="#82ca9d" activeDot={{ r: 8 }} />
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
            <div className="grid grid-cols-2 gap-4">
                <div className={`${isDarkTheme?'bg-[#181818]':'bg-white'} shadow-sm rounded`}>
                    <div className='py-2 px-4 border-b mb-4 text-left'>
                        <span className={`${isDarkTheme?'text-gray-300':'text-black'} text-[15px] font-semibold`}>Retention rate</span>
                    </div>
                    <p className="text-gray-400 text-sm text-left px-4">You’ll be able to see this information once there’s enough data for analysis.</p>
                    {/* <p className="text-gray-400 text-sm">
                        Most viewers stopped watching at 0:04. play the video below to see when they lost interest.
                    </p> */}
                    {/* <div className="mt-4 space-y-2 px-4 pb-4 ">
                        <video onLoadedMetadata={getMediaInfo} className='w-44 h-80 m-auto' controls src={post?.reducedVideoUrl?.length > 0? post?.reducedVideoUrl: post?.originalUrl} />
                    </div> */}
                </div>
                <div className={`${isDarkTheme?'bg-[#181818]':'bg-white'} shadow-sm text-left rounded`}>
                    <div className='py-2 px-3 border-b mb-4 '>
                        <span className={`${isDarkTheme?'text-gray-300':'text-black'} text-[15px] font-semibold mb-2`}>Traffic source</span>
                    </div>
                    {/* <p className="text-gray-400 px-3 text-sm">
                        Data will show when video views reach 100
                    </p> */}
                    <ul className="mt-4 space-y-2 px-4 pb-4">
                        {postAnalyticsDetails?.details?.trafficSourcePercentages && Object.entries(postAnalyticsDetails?.details?.trafficSourcePercentages).map(([key, value]) => (
                        <li className=" text-black text-sm">
                            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <span>{key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                                <span>{value as React.ReactNode}%</span>
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
                                variant="determinate" value={value as number} />
                            </Box>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OverviewTab
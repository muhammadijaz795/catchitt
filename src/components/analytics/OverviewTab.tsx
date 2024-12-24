import React, { useEffect, useState } from 'react'
import { STATISTICSTABS } from '../../utils/constants'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

function OverviewTab({ analyticsData, isDarkTheme }: any) {

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
        <div className='max-w-5xl mx-auto mt-8  overflow-hidden'>
            {/* statistics card */}
            <div className={`${isDarkTheme ? 'bg-[#181818]' : 'bg-white'} rounded shadow-sm`}>
                <div className='inline-flex w-full ' >
                    <div onClick={switchTab} id={STATISTICSTABS.VIDEO_VIEWS.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.VIDEO_VIEWS ? 'border-t-red-500 border-t-4' : 'border-t border-b'} rounded-tl-md`}>Video views <br /><span className='text-2xl font-semibold'>{analyticsData.videoViews || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.PROFILE_VIEWS.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.PROFILE_VIEWS ? 'border-t-red-500 border-t-4' : 'border-t border-b'} border-x`}>Profile views <br /> <span className='text-2xl font-semibold'>{analyticsData.profileViews || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.LIKES.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.LIKES ? 'border-t-red-500 border-t-4' : 'border-t border-b'} border-x`}>Likes <br /> <span className='text-2xl font-semibold'>{analyticsData.likes || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.COMMENTS.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.COMMENTS ? 'border-t-red-500 border-t-4' : 'border-t border-b'} border-x`}>Comments <br /> <span className='text-2xl font-semibold'>{analyticsData.comments || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.SHARES.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.SHARES ? 'border-t-red-500 border-t-4' : 'border-t border-b'} rounded-tr-md`}>Shares <br /> <span className='text-2xl font-semibold'>{analyticsData.shares || 0}</span></div>
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
            <div className="grid grid-cols-2 gap-4">
                <div className={`${isDarkTheme ? 'bg-[#181818]' : 'bg-white'} shadow-sm rounded`}>
                    <div className='py-2 px-4 border-b mb-4 text-left'>
                        <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-sm`}>Traffic source</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        You'll be able to see this information once there’s enough data for
                        analysis.
                    </p>
                    <ul className="mt-4 space-y-2 px-4 pb-4">
                        <li className="flex justify-between text-gray-400 text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                        <li className="flex justify-between text-gray-400 text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                        <li className="flex justify-between text-gray-400 text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                        <li className="flex justify-between text-gray-400 text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                        <li className="flex justify-between text-gray-400 text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                    </ul>
                </div>
                <div className={`${isDarkTheme ? 'bg-[#181818]' : 'bg-white'} shadow-sm rounded`}>
                    <div className='py-2 px-3 border-b mb-4 text-left'>
                        <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-sm mb-2`}>Search queries</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        You'll be able to see this information once there’s enough data for
                        analysis.
                    </p>
                    <ul className="mt-4 space-y-2 px-4 pb-4">
                        <li className="flex justify-between text-gray-400 text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                        <li className="flex justify-between text-gray-400 text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                        <li className="flex justify-between text-gray-400 text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                        <li className="flex justify-between text-gray-400 text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                        <li className="flex justify-between text-gray-400 text-sm">
                            <span>-</span>
                            <span>-%</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OverviewTab
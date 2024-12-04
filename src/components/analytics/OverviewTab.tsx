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

function OverviewTab({ analyticsData }: any) {

    const [activeTab, setActiveTab] = useState(STATISTICSTABS.VIDEO_VIEWS)
    const [yAxisLabel, setYAxisLabel] = useState('profileViews')
    const [chartData, setChartData] = useState<any>([])

    const switchTab = (event: React.MouseEvent<HTMLDivElement>) => {
        setActiveTab(Number(event.currentTarget.id));
    }

    const possibleGraphs = [ 'viewsGraph', 'profileViewsGraph', 'likesGraph', 'commentsGraph', 'sharesGraph' ]

    const prepareData = (data: any) => {
        // data in format like { 5: 1, 20: 6, 29: 1} { date: value }
        const dataArr = Object.entries(data)
        if (dataArr.length === 0) return []
        const yAxisLabelKey = possibleGraphs[activeTab].replace('Graph', '')
        setYAxisLabel(yAxisLabel);
        const result = dataArr.map(([key, value]) => {
            const obj: { date: string; [key: string]: any } = { date: key }
            obj[yAxisLabelKey as string] = value;
            return obj
        })
        console.log('result🤖🤖🤖', result)
        return result
    }

    useEffect(() => {
        if(analyticsData && activeTab) setChartData(prepareData(analyticsData[possibleGraphs[activeTab]]));
    }, [activeTab])

    return (
        <div className='max-w-4xl mx-auto mt-8  overflow-hidden'>
            {/* statistics card */}
            <div className='bg-white rounded shadow-sm'>
                <div className='inline-flex w-full ' >
                    <div onClick={switchTab} id={STATISTICSTABS.VIDEO_VIEWS.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.VIDEO_VIEWS ? 'border-t-red-500 border-t-4' : 'border-t border-b'} rounded-tl-md`}>Video views <br /><span className='text-2xl font-semibold'>{analyticsData.videoViews || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.PROFILE_VIEWS.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.PROFILE_VIEWS ? 'border-t-red-500 border-t-4' : 'border-t border-b'} border-x`}>Profile views <br /> <span className='text-2xl font-semibold'>{analyticsData.profileViews || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.LIKES.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.LIKES ? 'border-t-red-500 border-t-4' : 'border-t border-b'} border-x`}>Likes <br /> <span className='text-2xl font-semibold'>{analyticsData.likes || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.COMMENTS.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.COMMENTS ? 'border-t-red-500 border-t-4' : 'border-t border-b'} border-x`}>Comments <br /> <span className='text-2xl font-semibold'>{analyticsData.comments || 0}</span></div>
                    <div onClick={switchTab} id={STATISTICSTABS.SHARES.toString()} className={`cursor-pointer w-1/5 py-16 ${activeTab === STATISTICSTABS.SHARES ? 'border-t-red-500 border-t-4' : 'border-t border-b'} rounded-tr-md`}>Shares <br /> <span className='text-2xl font-semibold'>{analyticsData.shares || 0}</span></div>
                </div>
                {/* Chart Section */}
                <div className="m-4 border-t pt-6 mb-6 ">
                    <div className={`${chartData.length?'h-64':'h-32'} flex items-center justify-center text-gray-400`}>
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
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey={yAxisLabel} stroke="#82ca9d" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
            {/* Bottom Metrics Section */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white shadow-sm rounded">
                    <div className='py-2 px-4 border-b mb-4 text-left'>
                        <span className="text-gray-600 text-sm">Traffic source</span>
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
                <div className="bg-white shadow-sm rounded">
                    <div className='py-2 px-3 border-b mb-4 text-left'>
                        <span className="text-gray-600 text-sm mb-2">Search queries</span>
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


// return (<div className="p-6 bg-gray-100 min-h-screen">
//     {/* Top Metrics Section */}
//     <div className="grid grid-cols-5 gap-4 mb-6">
//         <div className="bg-white shadow rounded p-4 text-center">
//             <p className="text-gray-600 text-sm">Video views</p>
//             <p className="text-2xl font-bold">0</p>
//             <p className="text-gray-400 text-sm">0 (--)</p>
//         </div>
//         <div className="bg-white shadow rounded p-4 text-center">
//             <p className="text-gray-600 text-sm">Profile views</p>
//             <p className="text-2xl font-bold">0</p>
//             <p className="text-gray-400 text-sm">0 (--)</p>
//         </div>
//         <div className="bg-white shadow rounded p-4 text-center">
//             <p className="text-gray-600 text-sm">Likes</p>
//             <p className="text-2xl font-bold">0</p>
//             <p className="text-gray-400 text-sm">0 (--)</p>
//         </div>
//         <div className="bg-white shadow rounded p-4 text-center">
//             <p className="text-gray-600 text-sm">Comments</p>
//             <p className="text-2xl font-bold">--</p>
//             <p className="text-gray-400 text-sm">0 (--)</p>
//         </div>
//         <div className="bg-white shadow rounded p-4 text-center">
//             <p className="text-gray-600 text-sm">Shares</p>
//             <p className="text-2xl font-bold">0</p>
//             <p className="text-gray-400 text-sm">0 (--)</p>
//         </div>
//     </div>

// </div>
// )     
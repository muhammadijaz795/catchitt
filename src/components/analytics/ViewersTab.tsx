import React from 'react'
import { Box, LinearProgress } from '@mui/material';

function ViewersTab({isDarkThemes}: any) {
  const value = 70;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
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
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { isValidDocId } from '../../../../utils/helpers';
import Layout from '../../../../shared/layout';
import { filledComment, filledCommentWhite, filledHeart, filledHeartWhite, filledSave, filledSaveWhite, filledShare, filledShareWhite, play, playOutlineWhite } from '../../../../icons';
import { API_KEY } from '../../../../utils/constants';
import RenderComments from './RenderComments';

function CommentAnalytics() {

    const { postId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [post, setPost] = useState<any>();
    
    const fetchPost = async () => {
        try {
            const response = await fetch(`${API_KEY}/media-content/videos/${postId}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.data);
                setPost(responseData.data);
            } else {
                console.log('error', response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!isValidDocId(postId)) navigate('/');
        // getPostAnalytics();
        fetchPost();
    }, [postId]);

    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setIsDarkTheme(true);
        }
    });


    return (
        <Layout>
            <div className="p-4 min-h-screen overflow-y-auto h-full no-scrollbar" id="analyticsComments">
                {/* Back to posts */}
                <div className="flex items-center mb-4">
                    <button onClick={()=>navigate('/analytics')} className="flex items-center text-lg font-bold border-none">
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to posts
                    </button>
                </div>
                {/* Post Section */}
                <div className={`${isDarkTheme?'bg-[#181818]':'bg-white'} rounded-lg shadow p-4`}>
                    {/* Post Thumbnail */}
                    <div className="flex space-x-4 mb-4">
                        <div className={`w-44 h-80 ${isDarkTheme?'bg-gray-800':'bg-gray-200'} rounded overflow-hidden`}>
                            <img
                                src={post?.thumbnailUrl || 'https://placehold.co/176x320'}
                                alt="Video thumbnail"
                                className="object-cover h-full w-full"
                            />
                        </div>
                        <div className='space-y-4 pt-3 flex-1'>
                            <p className="text-sm text-gray-700 font-medium text-left">{post?.description?.length > 30 ? post?.description?.slice(0, 30) + '...' : ''}</p>
                            <div className='flex gap-12 mr-3'>
                                <div className="text-gray-400 flex-col"><img className='w-6' src={isDarkTheme ? playOutlineWhite : play} alt="like" /> <span>{post?.views || 0}</span></div>
                                <div className="text-gray-400 flex-col"><img className='w-6' src={isDarkTheme ? filledHeartWhite : filledHeart} alt="like" /> <span>{post?.likes || 0}</span></div>
                                <div className="text-gray-400 flex-col"><img className='w-6' src={isDarkTheme ? filledCommentWhite : filledComment} alt="like" /> <span>{post?.comments.length || 0}</span></div>
                                <div className="text-gray-400 flex-col"><img className='w-6' src={isDarkTheme ? filledShareWhite : filledShare} alt="like" /> <span>{post?.shares || 0}</span></div>
                                <div className="text-gray-400 flex-col"><img className='w-6' src={isDarkTheme ? filledSaveWhite : filledSave} alt="like" /> <span>{post?.savesCount || 0}</span></div>
                            </div>
                            <p className="text-sm text-gray-500 text-left">11/3</p>
                            {/* Comment Input */}
                            {/* <textarea
                                className={`float-left w-4/5 ${isDarkTheme?'':'bg-gray-50'} p-3 border rounded focus:outline-none mt-4`}
                                rows={3}
                                placeholder="Reply to comment"
                                defaultValue={""}
                            /> */}
                        </div>
                    </div>

                    
                    {/* Filters */}
                    {/* <div className="flex flex-wrap gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Search for comment or username"
                            className={`${isDarkTheme?'':'bg-gray-50'} flex-1 p-2 border rounded focus:outline-none`}
                        />
                        <select className={`${isDarkTheme?'':'bg-gray-50'} p-2 border rounded focus:outline-none`}>
                            <option>Sort by latest comments</option>
                            <option>Sort by oldest comments</option>
                        </select>
                        <select className={`${isDarkTheme?'':'bg-gray-50'} p-2 border rounded focus:outline-none`}>
                            <option>All comments</option>
                            <option>Only my comments</option>
                        </select>
                        <select className={`${isDarkTheme?'':'bg-gray-50'} p-2 border rounded focus:outline-none`}>
                            <option>Posted by all</option>
                            <option>Posted by me</option>
                        </select>
                        <select className={`${isDarkTheme?'':'bg-gray-50'} p-2 border rounded focus:outline-none`}>
                            <option>All follower counts</option>
                            <option>Less than 100</option>
                            <option>100+</option>
                        </select>
                    </div> */}
                    {/* Date Filter */}
                    <div className="flex items-center mb-4 justify-end">
                        <label htmlFor="date-filter" className="mr-2 text-sm text-gray-500">
                            Comment date:
                        </label>
                        <input
                            type="text"
                            id="date-filter"
                            defaultValue="11/4/2024 - 12/4/2024"
                            className={`${isDarkTheme?'':'bg-gray-50'} p-2 border rounded focus:outline-none`}
                        />
                    </div>
                    {/* No Results */}
                    <RenderComments postId={postId} isDarkTheme={isDarkTheme}  />
                    {/* <div className="text-center text-gray-500 mt-6">
                        
                        <p>No results found</p>
                        <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Clear all
                        </button>
                    </div> */}
                </div>
            </div>
        </Layout>
    )
}

export default CommentAnalytics
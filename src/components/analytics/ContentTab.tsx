import React, { useEffect, useRef, useState } from 'react'
import { API_KEY } from '../../utils/constants';
import { analyticsOutline, analyticsOutlineWhite, commentOutline, commentOutlineDark, commentOutlineWhite, deleteVideoIcon, deleteVideoIconWhite, heartOutline, heartOutlineWhite, moreBlack, moreInWhite, pencilOutline, pencilOutlineWhite, playOutline, playOutlineWhite } from '../../icons';
// import { CircularProgress } from '@mui/material';
import style from './contentTab.module.scss';
import { formatCustomDate } from '../../utils/helpers';
import ReactPaginate from 'react-paginate';
import PopupForDeleteVideo from '../profile/popups/popupForDeleteVideo';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';


function ContentTab({ isDarkTheme }: any) {

  const abortController = useRef<AbortController | null>(null);

  const [posts, setPosts] = useState<any>({ items: [], page: 1, pageSize: 10, totalItems: 0, isLoading: true });
  const [mediaToDelete, setMediaToDelete] = useState<any>(null)

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  
  const navigate = useNavigate();

  const deletePost = (post:any) => {
    setMediaToDelete(post);
  }

  const fetchPosts = async () => {
    try {
      const controller = new AbortController();
      abortController.current = controller;
      const response = await fetch(
        `${API_KEY}/profile/${userId}/videos?page=${posts.page}&pageSize=${posts.pageSize}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        })
        .then((res) => res.json())
        .then((data) => {
          setPosts((prev: any) => ({
            ...prev,
            items: [...data.data.data],
            totalItems: data.data.total,
            isLoading:false
          }));
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    } finally {
      abortController.current = null;
    }
  }

  useEffect(() => {
    fetchPosts();
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    }
  }, [posts.page]);

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage your posts</h1>
        {/* <input
          type="text"
          placeholder="Search for post description"
          className={`border border-gray-300 rounded-lg p-2 w-64 ${isDarkTheme?'':'bg-white'}`}
        /> */}
      </div>
      {/* Filters */}
      {/* <div className="flex space-x-4 mb-4">
        <select className={`border border-gray-300 rounded-lg p-2 ${isDarkTheme?'':'bg-white'}`}>
          <option>Sort by</option>
        </select>
        <select className={`border border-gray-300 rounded-lg p-2 ${isDarkTheme?'':'bg-white'}`}>
          <option>All video views</option>
        </select>
        <select className={`border border-gray-300 rounded-lg p-2 ${isDarkTheme?'':'bg-white'}`}>
          <option>All comments</option>
        </select>
        <select className={`border border-gray-300 rounded-lg p-2 ${isDarkTheme?'':'bg-white'}`}>
          <option>All likes</option>
        </select>
        <select className={`border border-gray-300 rounded-lg p-2 ${isDarkTheme?'':'bg-white'}`}>
          <option>All privacy</option>
        </select>
      </div> */}
      {/* Posts Table */}
      <div className={`${isDarkTheme?'bg-[#181818]':'bg-white'} shadow rounded-lg`}>
        <table className="w-full text-left">
          <thead className="border-b text-gray-400">
            <tr>
              <th className="p-4">Posts</th>
              <th className="p-4">Time posted</th>
              <th className="p-4">Privacy</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.isLoading === false ? posts.items.map((post: any, index: number) => (
              <tr key={index} className={`border-b ${isDarkTheme?'hover:bg-gray-900':'hover:bg-gray-50'}`}>
                <td className="p-4 flex items-center space-x-4">
                  <div className="w-14 h-24 bg-gray-200 rounded overflow-hidden">
                    <img src={post.thumbnailUrl||'https://placehold.co/67x67'} className='w-full h-full' alt="post-thumbnail" />
                  </div>
                  <div>
                    <span>{post.description.length > 30 ? post.description.slice(0, 30) + '...' : ''}</span>
                    <div className='flex gap-4'>
                      <div className="text-gray-400 inline-flex"><img src={isDarkTheme ? playOutlineWhite : playOutline} alt="like" /> &nbsp; {post.views}</div>
                      <div className="text-gray-400 inline-flex"><img src={isDarkTheme ? heartOutlineWhite : heartOutline} alt="like" /> &nbsp; {post.likes}</div>
                      <div className="text-gray-400 inline-flex"><img src={isDarkTheme ? commentOutlineWhite : commentOutline} alt="like" /> &nbsp; {post.comments.length}</div>
                    </div>
                  </div>
                </td>
                {/* <td className="p-4">Nov 3, 2024, 9:57 PM</td> */}
                {/* write down td in with post createdTime in above time format */}
                <td className="p-4">{formatCustomDate(post.createdTime)}</td>
                <td className="p-4">
                  <span className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3c3.5 0 7 2.5 7 6s-3.5 6-7 6-7-2.5-7-6 3.5-6 7-6z"
                        />
                      </svg>
                    </span>
                    Everyone
                  </span>
                </td>
                <td className="p-4">
                  <div className='h-full flex items-center space-x-6'>
                    <img onClick={()=>deletePost(post)} className='cursor-pointer h-5' src={isDarkTheme ? deleteVideoIconWhite : deleteVideoIcon} alt="edit" />
                    <img onClick={()=>navigate(`/analytics/post/${post.mediaId}`)} className='cursor-pointer' src={isDarkTheme ? analyticsOutlineWhite : analyticsOutline} alt="analytics" />
                    <img onClick={()=>navigate(`/analytics/comment/${post.mediaId}`)} className='cursor-pointer w-5' src={isDarkTheme ? commentOutlineWhite : commentOutlineDark} alt="comments" />
                  </div>
                </td>
              </tr>
            )):
            <tr>
              <td colSpan={4} className="text-center p-4"><CircularProgress /></td>
            </tr>
            }
          </tbody>
        </table>
        <div className='py-4'>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(posts.totalItems / posts.pageSize)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(data) => {
              setPosts((prev: any) => ({ ...prev, page: data.selected + 1, isLoading: true }))
            }}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
      <PopupForDeleteVideo
        openBlock={Boolean(mediaToDelete)}
        onBlockClose={() => setMediaToDelete(null)}
        info={mediaToDelete}
        darkTheme={!!isDarkTheme}
        // @ts-ignore
        userId={{ id: userId, name: '' }}
      />
    </div>
  )
}

export default ContentTab
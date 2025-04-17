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
    <div className="py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-base d-flex font-semibold">Recent posts 
        <svg className='ml-1' width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.4758 8.83939C0.376032 8.75408 0.294046 8.64994 0.234525 8.53293C0.175004 8.41593 0.139114 8.28834 0.128904 8.15746C0.118694 8.02658 0.134363 7.89498 0.175018 7.77016C0.215673 7.64533 0.280516 7.52974 0.365846 7.42998L2.80783 4.58117L0.366846 1.73336C0.277126 1.63436 0.208162 1.51839 0.164027 1.39229C0.119893 1.26619 0.101485 1.13252 0.109891 0.99919C0.118297 0.865855 0.153347 0.735557 0.212969 0.615999C0.27259 0.496441 0.355574 0.390048 0.457015 0.303108C0.558456 0.216168 0.676297 0.150445 0.803571 0.109824C0.930846 0.0692029 1.06497 0.0545083 1.19802 0.066608C1.33107 0.0787077 1.46035 0.117356 1.57821 0.18027C1.69607 0.243183 1.80012 0.329086 1.88421 0.432899L4.60408 3.60657C4.83691 3.8783 4.96488 4.22434 4.96488 4.58217C4.96488 4.94 4.83691 5.28604 4.60408 5.55776L1.88521 8.73144C1.71262 8.93264 1.46717 9.05704 1.20286 9.07729C0.938552 9.09754 0.677022 9.01196 0.4758 8.83939Z" fill="black"/>
            </svg>
        </h1>
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
          {/* <thead className="border-b text-gray-400">
            <tr>
              <th className="p-4">Posts</th>
              <th className="p-4">Time posted</th>
              <th className="p-4">Privacy</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead> */}
          <tbody>
            {posts.isLoading === false ? posts.items.map((post: any, index: number) => (
              <tr key={index} className={`border-b ${isDarkTheme?'hover:bg-gray-900':'hover:bg-gray-50'}`}>
                
                <td className="p-4 flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden">
                    <img src={post.thumbnailUrl||'https://placehold.co/67x67'} className='w-full h-full' alt="post-thumbnail" />
                  </div>
                  <div className="p-4 w-full">
                    <p>No description</p>
                    <span>{formatCustomDate(post.createdTime)}</span>
                  </div>
                  <div>
                    <span>{post.description.length > 30 ? post.description.slice(0, 30) + '...' : ''}</span>
                    <div className='flex justify-between gap-4 w-60 pr-10'>
                      <div className="text-gray-400 flex flex-column align-items-center "><img src={isDarkTheme ? playOutlineWhite : playOutline} alt="like" /> {post.views}</div>
                      <div className="text-gray-400 flex flex-column align-items-center"><img src={isDarkTheme ? heartOutlineWhite : heartOutline} alt="like" /> {post.likes}</div>
                      <div className="text-gray-400 flex flex-column align-items-center"><img src={isDarkTheme ? commentOutlineWhite : commentOutline} alt="like" /> {post.comments.length}</div>
                    </div>
                  </div>
                </td>
                {/* <td className="p-4">Nov 3, 2024, 9:57 PM</td> */}
                {/* write down td in with post createdTime in above time format */}
                
                {/* <td className="p-4">
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
                </td> */}
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
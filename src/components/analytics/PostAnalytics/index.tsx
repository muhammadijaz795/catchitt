import { useEffect, useState } from 'react';
import Layout from '../../../shared/layout';
// import whiteRightArrow from './svg-components/whiteRightArrow.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { POSTANALYTICSTABS } from '../../../utils/constants';
import styles from './style.module.scss'
import OverviewTab from './tabs/OverviewTab';
import ViewersTab from './tabs/ViewersTab';
import EngagementTab from './tabs/EngagementTab';
import { isValidDocId } from '../../../utils/helpers';

const PostAnalytics = () => {
    const [currentTab, setCurrentTab] = useState(POSTANALYTICSTABS.OVERVIEW);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    const [postAnalytics, setPostAnalytics] = useState<any>('');
    const [postData, setPostData] = useState();

    const navigate = useNavigate();
    const { postId } = useParams();


    const switchTab = (event:React.MouseEvent<HTMLAnchorElement>) => {
        setCurrentTab(Number(event.currentTarget.id));
    }

    const getPostAnalytics = async () => {
        try {
            const response = await fetch(
                `${API_KEY}/analytics/media?mediaId=${postId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            const data = res?.data;
            setPostAnalytics(data);
        } catch (error) {
            console.log('error trendinghashtags', error);
        }
    };

    
    const fetchPost = async () => {
        try {
            const response = await fetch(`${API_KEY}/media-content/videos/${postId}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const responseData = await response.json();
                setPostData(responseData.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!isValidDocId(postId)) navigate('/');
        getPostAnalytics();
        fetchPost();
    }, [postId]);

    const [darkTheme, setdarkTheme] = useState<any>('');

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);
        }
    });

    return (
        <Layout>
            <header className="text-gray-600 body-font bg-white border-b px-4">
                <div className="flex flex-wrap flex-col md:flex-row items-center justify-between">
                    <nav className="flex flex-wrap items-center text-base text-gray-400">
                        <a onClick={switchTab} className={`${currentTab===POSTANALYTICSTABS.OVERVIEW?'text-gray-600 border-b border-gray-800':''} py-3 mr-5 hover:text-gray-900 cursor-pointer`} id={POSTANALYTICSTABS.OVERVIEW.toString()}>Overview</a>
                        <a onClick={switchTab} className={`${currentTab===POSTANALYTICSTABS.VIEWERS?'text-gray-600 border-b border-gray-800':''} py-3 mr-5 hover:text-gray-900 cursor-pointer`} id={POSTANALYTICSTABS.VIEWERS.toString()}>Viewers</a>
                        <a onClick={switchTab} className={`${currentTab===POSTANALYTICSTABS.ENGAGEMENT?'text-gray-600 border-b border-gray-800':''} py-3 hover:text-gray-900 cursor-pointer`} id={POSTANALYTICSTABS.ENGAGEMENT.toString()}>Engagement</a>
                    </nav>
                    <div className="inline-flex lg:justify-end ml-5 lg:ml-0 my-2">
                        {/* <button className="inline-flex mx-2 items-center bg-gray-100  border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded-full text-sm">Last 7 Days &#129087;</button> */}
                        <button onClick={()=>navigate('/upload')} className="inline-flex gap-1 items-center bg-gray-100  border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded-full text-sm">
                            Upload
                        </button>
                    </div>
                </div>
            </header>

            {(()=>{
                switch(currentTab){
                    case POSTANALYTICSTABS.OVERVIEW:
                        return <OverviewTab postAnalytics={postAnalytics} post={postData} isDarkTheme={darkTheme} />    
                    case POSTANALYTICSTABS.VIEWERS:
                        return <ViewersTab />
                    case POSTANALYTICSTABS.ENGAGEMENT:
                        return <EngagementTab />
                    default:
                        return <OverviewTab postAnalytics={postAnalytics} />
                }
            })()}
        </Layout>
    )
};

export default PostAnalytics;

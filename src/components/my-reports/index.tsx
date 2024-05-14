import Layout from '../../shared/layout';
import arrowBack from './svg-components/arrow-back.svg';
import giraffe from './svg-components/giraffe.svg';
import womenAvatar from './svg-components/women-avatar-reports.svg';
import { useNavigate } from 'react-router-dom';

const MyReports = () => {
    const API_KEY = process.env.VITE_API_URL;
    const navigate = useNavigate();
    // const activityEndPoint = '/notification';
    // const token = localStorage.getItem('token');

    // const getMyReports = async () => {
    //     try {
    //         const response = await fetch(
    //             `${API_KEY}/analytics/user?startDate=${startDate}&endDate=${endDate}`,
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-type': 'application/json',
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         const res = await response.json();
    //         const data = res?.data;
    //     } catch (error) {
    //         console.log('error trendinghashtags', error);
    //     }
    // };

    // useEffect(() => {
    // getMyReports();
    // }, []);

    return (
        <Layout>
            <div className="p-2 flex flex-col mt-6 ml-32 items-start">
                <div
                    onClick={() => navigate(-1)}
                    className="flex flex-row justify-center items-center gap-3 cursor-pointer"
                >
                    <img src={arrowBack} height={7} width={14} />
                    <h4 className="font-semibold text-xl text-[#222222]">My Reports</h4>
                </div>
                <div className="w-[37.563rem] h-[5.875rem] gap-3 rounded-lg px-3 py-4.5 flex flex-row items-center bg-white mt-4">
                    <img src={giraffe} height={62} width={62} className="rounded" />
                    <div className="flex flex-col items-start justify-between">
                        <p className="font-medium text-base text-[#222222]">JaneDoe's video</p>
                        <p className="font-normal text-sm text-[#999999] mt-1">
                            Report under review
                        </p>
                    </div>
                </div>
                <div className="w-[37.563rem] h-[5.875rem] gap-3 rounded-lg px-3 py-4.5 flex flex-row items-center bg-white mt-3">
                    <img src={womenAvatar} height={62} width={62} className="rounded" />
                    <div className="flex flex-col items-start justify-between">
                        <p className="font-medium text-base text-[#222222]">JaneDoe's video</p>
                        <p className="font-normal text-sm text-[#0D8678] mt-1">Report resolved</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MyReports;

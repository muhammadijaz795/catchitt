import Layout from '../../shared/layout';
import arrowBack from './svg-components/arrow-back.svg';
import giraffe from './svg-components/giraffe.svg';
import womenAvatar from './svg-components/women-avatar-reports.svg';
import { useNavigate } from 'react-router-dom';
import React,{ useEffect, useState } from "react";

const MyReports = () => {
    const API_URL = process.env.VITE_API_URL;
    const navigate = useNavigate();
    // const activityEndPoint = '/notification';
    const token = localStorage.getItem('token');
    const [myReports, setMyReports] = useState<any[]>([])
    const getMyReports = async () => {
        try {
            const response = await fetch(
                `${API_URL}/media-content/reports`,
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
            setMyReports(res?.data);
            console.log('error reports',res,data,myReports);
        } catch (error) {
            console.log('error trendinghashtags', error);
        }
    };

    useEffect(() => {
    getMyReports();
    }, []);

    const [darkTheme, setdarkTheme] = useState('');
    const [headingColor, setHeadingColor] = useState('#222222');
    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setdarkTheme("#222");
            setHeadingColor("white");
        }else{
            setdarkTheme("white");
            setHeadingColor("#222222");
        }
    });

    return (
        <Layout>
            <div className="p-2 flex flex-col mt-6 ml-32 items-start">
                <div
                    onClick={() => navigate(-1)}
                    className="flex flex-row justify-center items-center gap-3 cursor-pointer"
                >
                    <img src={arrowBack} height={7} width={14} />
                    <h6 className={`font-semibold text-xl text-[${headingColor}]`}>My Reports</h6>
                </div>
                { myReports.map((ele:any) => (
                    <div  className="w-[37.563rem] h-[5.875rem] gap-3 rounded-lg px-3 py-4.5 flex flex-row items-center mt-4">
                        <img src={ele.media.thumbnail?ele.media.thumbnail:womenAvatar} height={62} width={62} className="rounded" />
                        <div className="flex flex-col items-start justify-between">
                            <p className="font-medium text-base text-[#222222]">Video Id: {ele.media._id }</p>
                            <p className="font-normal text-sm text-[#999999] mt-1">Reason: {ele.reason }</p>
                            <p className="font-normal text-sm text-[#999999] mt-1">
                                {ele.isResolved ? "Report resolved": "Report under review" }
                            </p>
                        </div>
                    </div> 
                )) 
                 } 
                {/* <div style={{background:darkTheme }} className="w-[37.563rem] h-[5.875rem] gap-3 rounded-lg px-3 py-4.5 flex flex-row items-center mt-3">
                    <img src={womenAvatar} height={62} width={62} className="rounded" />
                    <div className="flex flex-col items-start justify-between">
                        <p className="font-medium text-base text-[#222222]">JaneDoe's video</p>
                        <p className="font-normal text-sm text-[#0D8678] mt-1">Report resolved</p>
                    </div>
                </div> */}
            </div>
        </Layout>
    );
};

export default MyReports;

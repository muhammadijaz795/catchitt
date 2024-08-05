import { useParams } from 'react-router-dom';
import Layout from '../../shared/layout';

const VideoPage = () => {
    const { videoId } = useParams();

    return (
        <Layout>
            <div className="flex flex-col h-full justify-center items-center bg-gray-100">
                <video
                    className="h-[31.875rem] w-[49.875rem] object-contain rounded-md shadow-xl"
                    loop={true}
                    controls={true}
                    autoPlay={true}
                    width="300px"
                    preload="auto"
                    playsInline
                    src={`https://d1qomu2i6h2trq.cloudfront.net/output/videos/${videoId}/reduced/${videoId}-reduced.mp4`}
                />
            </div>
        </Layout>
    );
};

export default VideoPage;

import { BASE_URL_FRONTEND } from '../../utils/constants';

const VideoBlockquote = ({ videoId, username, caption, tags, musicTitle, musicLink }: any) => {
    const videoUrl = `${BASE_URL_FRONTEND}/video/${videoId}`;
    const userUrl = `${BASE_URL_FRONTEND}/@${username}?refer=embed`;

    return (
        <blockquote
            className="your-embed-class"
            cite={videoUrl}
            data-video-id={videoId}
            style={{ maxWidth: '509px', minWidth: '325px' }}
        >
            <section>
                <a target="_blank" rel="noopener noreferrer" title={`@${username}`} href={userUrl}>
                    @{username}
                </a>
                {caption}
                {tags.map((tag: string, index: number) => (
                    <a
                        key={index}
                        title={tag}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://stagingweb.seezitt.com/tag/${tag}?refer=embed`}
                    >
                        #{tag}
                    </a>
                ))}
                <a target="_blank" rel="noopener noreferrer" title={musicTitle} href={musicLink}>
                    ♬ {musicTitle}
                </a>
            </section>
        </blockquote>
    );
};

export default VideoBlockquote;

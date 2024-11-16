import { useNavigate } from 'react-router-dom';

const HashtagText = ({ text }: { text: string }) => {
    const navigate = useNavigate();

  const navigateToHashtag = (hashtag: string) => {
    navigate(`/discover/${hashtag}`);
  };

  const parseTextWithHashtags = (text:string) => {
    return text.split(/(\#[a-zA-Z0-9_]+)/g).map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span
            key={index}
            style={{ cursor: 'pointer' }}
            onClick={() => navigateToHashtag(part.substring(1))}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return <div>{parseTextWithHashtags(text)}</div>;
};

export default HashtagText;

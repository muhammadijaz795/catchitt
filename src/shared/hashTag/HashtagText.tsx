import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HashtagText = ({ text, maxLength }: { text: string, maxLength: number }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const navigateToHashtag = (hashtag: string) => {
    navigate(`/discover/${hashtag}`);
  };

  const isTruncated = text?.length > maxLength;

  const displayDesc = (text:string) => {
    if (text?.length < maxLength || isExpanded) return text
    return text?.substring(0, maxLength) + "...";
  }

  const parseTextWithHashtags = (text: string) => {
    return text?.split(/(\#[a-zA-Z0-9_]+)/g).map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span
            key={index}
            style={{ cursor: 'pointer', textShadow:'2px 2px 2px rgb(0 0 0 / 50%)' }}
            onClick={() => navigateToHashtag(part.substring(1))}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return <div>{parseTextWithHashtags(displayDesc(text))} {isTruncated&&<span className="cursor-pointer float-right" style={{textShadow:'2px 2px 2px rgb(0 0 0 / 50%)'}} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded?'less':'more'}</span>}</div>
};

export default HashtagText;

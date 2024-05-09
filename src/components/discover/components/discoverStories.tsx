import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { get } from '../../../axios/axiosClient';
import styles from './discover-stories.module.scss';

function DiscoverStories({ showStories }: any) {


const mockStories = [
  {
    stories: [
      {
        thumbnailUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/thumbnail/6436660cacee813edc53be2a-thumbnail.jpg",

        reducedVideoUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/reduced/6436660cacee813edc53be2a-reduced.mp4",
        user: {
          name: "John Doe",
          username: "john_doe",
          avatar: "https://seezitt-videos-source-bucket.s3.amazonaws.com/1671036058694-3Cc3SHjbOh.jpg",
        }
      }
    ]
  },

  {
    stories: [
      {
        thumbnailUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/thumbnail/6436660cacee813edc53be2a-thumbnail.jpg",

        reducedVideoUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/reduced/6436660cacee813edc53be2a-reduced.mp4",
        
        user: {
          name: "Jane Smith",
          username: "jane_smith",
          avatar: "https://seezitt-videos-source-bucket.s3.amazonaws.com/1671036058694-3Cc3SHjbOh.jpg",
        }
      }
    ]
  },
  {
    stories: [
      {
        thumbnailUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/thumbnail/6436660cacee813edc53be2a-thumbnail.jpg",

        reducedVideoUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/reduced/6436660cacee813edc53be2a-reduced.mp4",
        
        user: {
          name: "Jane Smith",
          username: "jane_smith",
          avatar: "https://seezitt-videos-source-bucket.s3.amazonaws.com/1671036058694-3Cc3SHjbOh.jpg",
        }
      }
    ]
  },
  {
    stories: [
      {
        thumbnailUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/thumbnail/6436660cacee813edc53be2a-thumbnail.jpg",

        reducedVideoUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/reduced/6436660cacee813edc53be2a-reduced.mp4",
        
        user: {
          name: "Jane Smith",
          username: "jane_smith",
          avatar: "https://seezitt-videos-source-bucket.s3.amazonaws.com/1671036058694-3Cc3SHjbOh.jpg",
        }
      }
    ]
  },
  {
    stories: [
      {
        thumbnailUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/thumbnail/6436660cacee813edc53be2a-thumbnail.jpg",

        reducedVideoUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/reduced/6436660cacee813edc53be2a-reduced.mp4",
        
        user: {
          name: "Jane Smith",
          username: "jane_smith",
          avatar: "https://seezitt-videos-source-bucket.s3.amazonaws.com/1671036058694-3Cc3SHjbOh.jpg",
        }
      }
    ]
  },
  {
    stories: [
      {
        thumbnailUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/thumbnail/6436660cacee813edc53be2a-thumbnail.jpg",

        reducedVideoUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/reduced/6436660cacee813edc53be2a-reduced.mp4",
        
        user: {
          name: "Jane Smith",
          username: "jane_smith",
          avatar: "https://seezitt-videos-source-bucket.s3.amazonaws.com/1671036058694-3Cc3SHjbOh.jpg",
        }
      }
    ]
  },
  // Add more stories data as needed
];



    const [stories, setStories] = useState(mockStories);
    const sliderRef: any = useRef(null);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    const [sliderIndex, setSliderIndex] = useState(0);
    useEffect(() => {
        get('/media-content/stories')
            .then((data:any) => {
                // setStories(data?.data?.data);
            })
            .catch((err) => {
                console.log('collectons error', err);
            });
    }, []);

    const nextSlide = () => {
        // Check if the slider reference exists
        if (sliderRef.current) {
            // Use the slickNext method to move to the next slide
            sliderRef.current.slickNext();
        }
    };
    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
    const settings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        // afterChange: (currentSlide: any) => {
        //     setSliderIndex(currentSlide)
        //     console.log(currentSlide);
        // }
    };
    return (
        <>
            
             
            {/* {
                sliderIndex > 0 ?
                    <img className={styles.prevArrow} onClick={prevSlide} src="../../../public/images/icons/nextArrow.svg" alt="" />
                    : null

            }
            {
                sliderIndex < 2 ?
                    <img className={styles.nextArrow} onClick={nextSlide} src="../../../public/images/icons/nextArrow.svg" alt="" />
                    : null
            } */}

            <Slider className={styles.slider} ref={sliderRef} {...settings}>
                  
                 
 
                {stories.map((storyGroup: any, index: number) => {
                   console.log('afking stories',storyGroup?.stories[0]?.thumbnailUrl)
                   return (
                        <div key={index} onClick={showStories} className={styles.story}>
                            <img src={storyGroup?.stories[0]?.thumbnailUrl} alt="" />
                        </div>
                    )
                }
                        
                    
                )}
            </Slider>
        </>
    );
}


export default DiscoverStories;
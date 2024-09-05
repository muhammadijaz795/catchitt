import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { get } from '../../../axios/axiosClient';
import styles from './stories.module.scss';

function Stories({ showStories }: any) {
    const [stories, setStories] = useState([]);
    const sliderRef: any = useRef(null);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    const [sliderIndex, setSliderIndex] = useState(0);
    useEffect(() => {
        get('/media-content/stories')
            .then((data: any) => {
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
                    return (
                        <div key={index} onClick={showStories} className={styles.story}>
                            <img src={storyGroup?.stories[0]?.thumbnailUrl} alt="" />
                        </div>
                    );
                })}
            </Slider>
        </>
    );
}

export default Stories;

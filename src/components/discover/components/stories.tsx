import React, { useEffect, useRef, useState } from 'react';
import styles from './stories.module.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useAuthStore } from '../../../store/authStore';

export default function Stories({videomodal}:any) {
    const [stories, setStories] = useState([])
    const sliderRef: any = useRef(null);
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);

    const [sliderIndex, setSliderIndex] = useState(0)
    useEffect(() => {
        fetch(`${API_KEY}/media-content/stories`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        }).then((res) => res.json()).then((data) => {
            setStories(data?.data[0]?.stories)
            console.log("stories", data);
        }).catch((err) => {
            console.log('collectons error', err);
        })

    }, [])

    const nextSlide = () => {
        // Check if the slider reference exists
        if (sliderRef.current) {
            // Use the slickNext method to move to the next slide
            sliderRef.current.slickNext();
        }

    };
    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev()
        };

    };
    const settings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        afterChange: (currentSlide: any) => {
            setSliderIndex(currentSlide)
            console.log(currentSlide);

        }
    };
    return (
        <>
            {
                sliderIndex > 0 ?
                    <img className={styles.prevArrow} onClick={prevSlide} src="../../../public/images/icons/nextArrow.svg" alt="" />
                    : null

            }
            {
                sliderIndex < 2 ?
                    <img className={styles.nextArrow} onClick={nextSlide} src="../../../public/images/icons/nextArrow.svg" alt="" />
                    : null
            }

            <Slider ref={sliderRef}  {...settings}>
                {
                    stories.map((story: any) => {
                        return (
                            <div onClick={()=>videomodal(story)} className={styles.story}>
                                <img src={story?.thumbnailUrl} alt="" />
                            </div>
                        )
                    })
                }
            </Slider>
        </>
    );
}

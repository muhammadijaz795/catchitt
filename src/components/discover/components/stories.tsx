import React, { useRef, useState } from 'react';
import styles from './stories.module.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Stories() {
    const sliderRef: any = useRef(null);
    const [sliderIndex, setSliderIndex] = useState(0)

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
                <div className={styles.story}>
                    <img src="../../../../public/images/Rectangle 28250.png" alt="" />
                </div>
                <div className={styles.story}>
                    <img src="../../../../public/images/Rectangle 28250.png" alt="" />
                </div>
                <div className={styles.story}>
                    <img src="../../../../public/images/Rectangle 28250.png" alt="" />
                </div>
                <div className={styles.story}>
                    <img src="../../../../public/images/Rectangle 28250.png" alt="" />
                </div>
                <div className={styles.story}>
                    <img src="../../../../public/images/Rectangle 28250.png" alt="" />
                </div>
                <div className={styles.story}>
                    <img src="../../../../public/images/Rectangle 28250.png" alt="" />
                </div>
                <div className={styles.story}>
                    <img src="../../../../public/images/Rectangle 28250.png" alt="" />
                </div>
                <div className={styles.story}>
                    <img src="../../../../public/images/Rectangle 28250.png" alt="" />
                </div>
                <div className={styles.story}>
                    <img src="../../../../public/images/Rectangle 28250.png" alt="" />
                </div>
                <div className={styles.story}>
                    <img src="../../../../public/images/Rectangle 28250.png" alt="" />
                </div>
            </Slider>
        </>
    );
}

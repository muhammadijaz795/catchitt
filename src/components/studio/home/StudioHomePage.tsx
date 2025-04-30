import Navbar from '../../../shared/navbar';
import UploadsHome from '../../analytics/UploadsHome';
import style from './index.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { academyOutlineDark, academyOutlineWhite, analyticsOutline, analyticsOutlineWhite, bulbOutlineDark, bulbOutlineWhite, commentOutlineDark, commentOutlineWhite, commentWhite, feedbackQuestionDark, feedbackQuestionWhite, hamburger, hamburgerDark, homeDark, homeIcon } from '../../../icons';


function StudioHomePage() {
    const navigate = useNavigate();

    const [darkTheme, setdarkTheme] = useState('');

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        setdarkTheme('');
        // if (themeColor == 'dark') {
        //     setdarkTheme(style.darkTheme);
        // } else {
        // }
    }, []); 

    return (
        <div className={`flex flex-col ${darkTheme}`}>
            <Navbar />
            <div className={`w-56 h-[100vh] fixed top-0 left-0 ${darkTheme === '' ? 'bg-white' : 'bg-[#181818a8]'} pt-[80px] pb-3 px-3 flex flex-col`}>
                <button className={`${darkTheme === '' ? 'bg-[#FE2C55] hover:bg-[#FE2C69]' : 'bg-[#FE2C55]'} w-full ring-0 hover:border-transparent rounded-md my-3 py-1.5 text-white opacity-80 d-flex`} > 
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75473 3.46875C9.21443 3.46875 9.58752 3.84184 9.58752 4.30154V8.13238H13.4184C13.6392 8.13238 13.8511 8.22012 14.0072 8.3763C14.1634 8.53248 14.2512 8.74431 14.2512 8.96518C14.2512 9.18605 14.1634 9.39787 14.0072 9.55405C13.8511 9.71023 13.6392 9.79797 13.4184 9.79797H9.58752V13.6288C9.58752 13.8497 9.49978 14.0615 9.3436 14.2177C9.18742 14.3739 8.9756 14.4616 8.75473 14.4616C8.53386 14.4616 8.32203 14.3739 8.16585 14.2177C8.00967 14.0615 7.92193 13.8497 7.92193 13.6288V9.79797H4.09109C3.87022 9.79797 3.6584 9.71023 3.50222 9.55405C3.34604 9.39787 3.2583 9.18605 3.2583 8.96518C3.2583 8.74431 3.34604 8.53248 3.50222 8.3763C3.6584 8.22012 3.87022 8.13238 4.09109 8.13238H7.92193V4.30154C7.92193 3.84184 8.29502 3.46875 8.75473 3.46875Z" fill="white"/>
                    </svg> 
                    Upload
                </button>
                <h5 className='text-sm font-semibold text-left text-[#00000057]'>Manage</h5>
                <ul className='text-sm space-y-6 mt-3 text-left mx-2'>
                    <li className='cursor-pointer flex gap-2'>
                        <Link to="/studio" reloadDocument={false} style={{ textDecoration: 'none' }} className='cursor-pointer flex gap-2'>
                            <img className='w-5 inline-block' src={darkTheme===''?homeDark:homeIcon} alt="" />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/studio/posts')}>
                        <img className='w-4 inline-block' src={darkTheme===''?hamburgerDark :hamburger} alt="" />
                        <span>&nbsp;Posts</span>
                    </li>
                    <li className='cursor-pointer flex gap-2'>
                        <Link to="/studio/comment" reloadDocument={false} style={{ textDecoration: 'none' }} className='cursor-pointer flex gap-2'>
                            <img className='w-5 inline-block' src={darkTheme===''?commentOutlineDark:commentOutlineWhite} alt="" />
                            <span>Comments</span>
                        </Link>
                    </li>
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/analytics')}>
                        <img className='w-5 inline-block' src={darkTheme===''?analyticsOutline:analyticsOutlineWhite} alt="" />
                        <span>Analytics</span>
                    </li>
                    {/* <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?bulbOutlineDark:bulbOutlineWhite} alt="" />
                        <span>Inspirations</span>
                    </li>
                    <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?academyOutlineDark :academyOutlineWhite} alt="" />
                        <span>Creator Academy</span>
                    </li> */}
                </ul>
                <h5 className='text-sm font-semibold text-left text-[#00000057] mt-4'>Tools</h5>
                <ul className='text-sm space-y-6 mt-3 text-left mx-2'>
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/home')}>
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.10255 0.410156C4.71094 0.410156 3.37632 0.962972 2.3923 1.94699C1.40828 2.93101 0.855469 4.26563 0.855469 5.65724C0.855469 7.12567 1.26399 8.00044 2.16724 9.0536L2.40111 9.3347C2.93406 9.9561 3.10422 10.2949 3.10422 10.9043V12.4035C3.10422 13.1987 3.42011 13.9613 3.98241 14.5236C4.54471 15.0859 5.30734 15.4018 6.10255 15.4018C6.89776 15.4018 7.6604 15.0859 8.22269 14.5236C8.78499 13.9613 9.10089 13.1987 9.10089 12.4035V10.9043C9.10089 10.2949 9.27104 9.9561 9.804 9.3347C9.84147 9.29122 9.99589 9.10308 10.0379 9.0536C10.9411 8.00044 11.3496 7.12567 11.3496 5.65724C11.3496 4.26563 10.7968 2.93101 9.8128 1.94699C8.82878 0.962972 7.49416 0.410156 6.10255 0.410156ZM6.10255 1.90932C7.09656 1.90932 8.04986 2.30419 8.75273 3.00706C9.4556 3.70993 9.85047 4.66323 9.85047 5.65724C9.85047 6.71865 9.60311 7.2651 8.91349 8.07015C8.87451 8.11512 8.69611 8.30402 8.65563 8.35124C8.12118 8.9749 7.8101 9.53558 7.67443 10.1592C6.72396 10.1592 5.4789 10.163 4.52843 10.163C4.3935 9.53858 4.08392 8.9749 3.54947 8.35124C3.50899 8.30402 3.33059 8.11512 3.29161 8.07015C2.602 7.2651 2.35464 6.71865 2.35464 5.65724C2.35464 4.66323 2.7495 3.70993 3.45237 3.00706C4.15525 2.30419 5.10854 1.90932 6.10255 1.90932ZM6.10255 3.40849C5.50615 3.40849 4.93417 3.64541 4.51245 4.06713C4.09072 4.48886 3.8538 5.06083 3.8538 5.65724C3.8538 5.85604 3.93278 6.0467 4.07335 6.18727C4.21392 6.32785 4.40458 6.40682 4.60339 6.40682C4.80219 6.40682 4.99285 6.32785 5.13342 6.18727C5.27399 6.0467 5.35297 5.85604 5.35297 5.65724C5.35297 5.45844 5.43194 5.26778 5.57252 5.1272C5.71309 4.98663 5.90375 4.90766 6.10255 4.90766C6.30135 4.90766 6.49201 4.82868 6.63259 4.68811C6.77316 4.54753 6.85214 4.35687 6.85214 4.15807C6.85214 3.95927 6.77316 3.76861 6.63259 3.62804C6.49201 3.48746 6.30135 3.40849 6.10255 3.40849ZM4.60339 11.6539H7.60172V12.4035C7.60172 12.8011 7.44377 13.1824 7.16262 13.4636C6.88147 13.7447 6.50016 13.9027 6.10255 13.9027C5.70495 13.9027 5.32363 13.7447 5.04248 13.4636C4.76133 13.1824 4.60339 12.8011 4.60339 12.4035V11.6539Z" fill="black" fill-opacity="0.65"/>
                        </svg>
                        <span>Inspirations</span>
                    </li>
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/analytics/content')}>
                    <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        >
                        <path
                            d="M7.82993 5.1239L7.23414 6.39417L5.89943 6.59651C5.71582 6.62349 5.6791 6.75539 5.81174 6.89103L6.77775 7.88626L6.54917 9.26745C6.5177 9.4593 6.63161 9.54248 6.79498 9.4518L7.98956 8.78857L9.16615 9.4518C9.32952 9.54248 9.44344 9.4593 9.41196 9.26745L9.18339 7.88626L10.1494 6.89103C10.2828 6.75614 10.2453 6.62424 10.0617 6.59651L8.72699 6.39417L8.1297 5.12315C8.04876 4.94853 7.91237 4.94853 7.83143 5.12315"
                            fill="currentColor"
                            fillOpacity="0.65"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.35673 1.62109C4.56152 1.62109 3.79889 1.93699 3.23659 2.49929C2.67429 3.06158 2.3584 3.82422 2.3584 4.61943V13.9892C2.3584 14.685 2.63481 15.3523 3.12682 15.8443C3.61883 16.3364 4.28613 16.6128 4.98194 16.6128H15.0938C15.2946 16.6128 15.4872 16.533 15.6292 16.391C15.7711 16.249 15.8509 16.0565 15.8509 15.8557V5.37651C15.8509 5.27709 15.8313 5.17864 15.7933 5.08678C15.7552 4.99493 15.6995 4.91147 15.6292 4.84117C15.5589 4.77087 15.4754 4.7151 15.3835 4.67706C15.2917 4.63901 15.1932 4.61943 15.0938 4.61943H13.6021V2.37817C13.6021 2.27875 13.5826 2.1803 13.5445 2.08845C13.5065 1.9966 13.4507 1.91314 13.3804 1.84284C13.3101 1.77254 13.2266 1.71677 13.1348 1.67872C13.0429 1.64068 12.9445 1.62109 12.8451 1.62109H5.35673ZM4.98194 15.1136C4.68374 15.1136 4.39775 14.9951 4.18689 14.7843C3.97603 14.5734 3.85757 14.2874 3.85757 13.9892C3.85757 13.691 3.97603 13.405 4.18689 13.1942C4.39775 12.9833 4.68374 12.8648 4.98194 12.8648H12.8451C13.0459 12.8648 13.2384 12.7851 13.3804 12.6431C13.5224 12.5011 13.6021 12.3086 13.6021 12.1078V6.11859H14.3517V15.1136H4.98194ZM12.103 11.3657H4.98194C4.57941 11.3657 4.19863 11.4556 3.85757 11.6183V4.61943C3.85757 4.22182 4.01551 3.8405 4.29666 3.55936C4.57781 3.27821 4.95913 3.12026 5.35673 3.12026H12.103V11.3657Z"
                            fill="currentColor"
                            fillOpacity="0.65"
                        />
                        </svg>

                        <span>&nbsp;Creator Academy</span>
                    </li>
                    {/* <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?commentOutlineDark:commentOutlineWhite} alt="" />
                        <span>Comments</span>
                    </li> */}
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/analytics')}>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4831 0.842248L5.98562 1.59183C5.62432 1.6518 5.35297 1.97412 5.35297 2.34141L5.34548 10.233C4.8937 9.96743 4.37783 9.83055 3.8538 9.83725C3.26079 9.83725 2.68109 10.0131 2.18802 10.3426C1.69495 10.672 1.31064 11.1403 1.0837 11.6882C0.856768 12.236 0.797391 12.8389 0.913082 13.4205C1.02877 14.0021 1.31434 14.5364 1.73366 14.9557C2.15299 15.375 2.68724 15.6606 3.26886 15.7763C3.85048 15.892 4.45334 15.8326 5.00122 15.6057C5.54909 15.3787 6.01737 14.9944 6.34683 14.5014C6.67629 14.0083 6.85214 13.4286 6.85214 12.8356L6.86188 5.9679L10.7125 5.31576C10.7979 5.30227 10.9928 5.24005 11.1622 5.05865C11.2237 4.99744 11.2721 4.92431 11.3043 4.84375C11.3365 4.76319 11.3519 4.6769 11.3496 4.59016V1.59183C11.3496 1.12859 10.9396 0.76579 10.4831 0.842248ZM9.83923 2.46884L9.84297 3.94777L6.85214 4.44924L6.85514 2.96282L9.83923 2.46884ZM3.8538 11.3364C4.05345 11.3319 4.25198 11.3673 4.43775 11.4406C4.62352 11.5139 4.79277 11.6235 4.93558 11.7631C5.07839 11.9027 5.19188 12.0694 5.26937 12.2534C5.34687 12.4375 5.38681 12.6351 5.38686 12.8348C5.38691 13.0345 5.34707 13.2322 5.26966 13.4163C5.19226 13.6004 5.07886 13.7671 4.93612 13.9068C4.79338 14.0464 4.62418 14.1562 4.43844 14.2295C4.25271 14.3029 4.0542 14.3384 3.85455 14.334C3.45695 14.334 3.07563 14.1761 2.79448 13.8949C2.51333 13.6138 2.35539 13.2324 2.35539 12.8348C2.35539 12.4372 2.51333 12.0559 2.79448 11.7748C3.07563 11.4936 3.45695 11.3357 3.85455 11.3357" fill="black" fill-opacity="0.65"/>
                    </svg>

                        <span>Unlimited sounds</span>
                    </li>
                    {/* <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?bulbOutlineDark:bulbOutlineWhite} alt="" />
                        <span>Inspirations</span>
                    </li>
                    <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?academyOutlineDark :academyOutlineWhite} alt="" />
                        <span>Creator Academy</span>
                    </li> */}

                </ul>
                <h5 className='text-sm font-semibold text-left text-[#00000057] mt-4'>Others</h5>
                <ul>
                <li className='cursor-pointer flex gap-2 mt-3' onClick={() => navigate('/contactus')}>
                    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.60722 0.527344C2.81201 0.527344 2.04937 0.843239 1.48708 1.40554C0.924782 1.96783 0.608887 2.73047 0.608887 3.52568V9.52234C0.608887 10.3176 0.924782 11.0802 1.48708 11.6425C2.04937 12.2048 2.81201 12.5207 3.60722 12.5207H12.6022C13.3974 12.5207 14.1601 12.2048 14.7224 11.6425C15.2847 11.0802 15.6006 10.3176 15.6006 9.52234V3.52568C15.6006 2.73047 15.2847 1.96783 14.7224 1.40554C14.1601 0.843239 13.3974 0.527344 12.6022 0.527344H3.60722ZM3.60722 2.02651H12.6022C13.3578 2.02651 13.9822 2.5812 14.0856 3.3083C13.3675 3.97768 12.3001 4.79922 11.5948 5.30594C9.97193 6.47154 8.54398 7.27359 8.10472 7.27359C7.66546 7.27359 6.23751 6.47154 4.61466 5.30594C3.95516 4.8312 3.31428 4.3311 2.69348 3.80677C2.5163 3.65679 2.34453 3.50053 2.17851 3.33828C2.28196 2.61119 2.85164 2.02651 3.60722 2.02651ZM2.11555 5.2902C4.01799 6.82909 6.80569 8.76377 8.10472 8.77276C8.951 8.77876 10.3984 7.97071 11.8751 6.95052C12.639 6.42207 13.489 5.79467 14.1021 5.27895L14.1014 9.52234C14.1014 9.91995 13.9434 10.3013 13.6623 10.5824C13.3811 10.8636 12.9998 11.0215 12.6022 11.0215H3.60722C3.20962 11.0215 2.8283 10.8636 2.54715 10.5824C2.266 10.3013 2.10805 9.91995 2.10805 9.52234L2.11555 5.2902Z" fill="black" fill-opacity="0.65"/>
                        </svg>

                        <span>Feedback</span>
                </li>
                </ul>
                <div className='mt-auto w-full text-left'>
                    <button className='w-full ring-0 hover:border-transparent text-sm font-semibold px-0 text-left py-2 d-flex justify-start' onClick={() => navigate('/home')}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.83712 3.06017C8.95293 3.16229 9.02351 3.30618 9.03334 3.46028C9.04318 3.61437 8.99147 3.76607 8.88958 3.88208L6.1522 6.99486L8.89074 10.1076C8.94308 10.1648 8.98347 10.2319 9.00957 10.3049C9.03566 10.3779 9.04693 10.4554 9.04271 10.5328C9.0385 10.6102 9.01888 10.686 8.98501 10.7558C8.95114 10.8255 8.9037 10.8878 8.84546 10.939C8.78723 10.9901 8.71937 11.0292 8.64585 11.0538C8.57234 11.0785 8.49465 11.0882 8.41734 11.0824C8.34002 11.0766 8.26463 11.0555 8.19558 11.0203C8.12653 10.985 8.06521 10.9363 8.0152 10.8771L5.2242 7.70485C5.0511 7.50885 4.95557 7.25636 4.95557 6.99486C4.95557 6.73336 5.0511 6.48087 5.2242 6.28487L8.0152 3.11205C8.06578 3.05453 8.1272 3.00754 8.19595 2.97377C8.2647 2.94 8.33943 2.92012 8.41587 2.91524C8.49231 2.91037 8.56896 2.92061 8.64144 2.94538C8.71392 2.97015 8.78081 3.00896 8.83828 3.05959" fill="black" fill-opacity="0.65"/>
                        </svg> Back to Seezitt
                    </button>
                    {/* <hr/>
                    <div className='text-xs opacity-60 mt-2 flex flex-col gap-2'>
                        <span className='cursor-pointer' onClick={() => navigate('/about/terms-conditions')}>Terms of Service</span>
                        <span className='cursor-pointer' onClick={() => navigate('/about/privacy-policy')}>Privacy Policy</span>
                        <span className='cursor-pointer'>Copyright &copy; {(new Date()).getFullYear()} Seezitt</span>
                    </div> */}
                </div>
            </div>
            <div className='w-[calc(100%-14rem)] ml-auto px-4'>
                        <UploadsHome/>
            </div>
        </div>
    );
}

export default StudioHomePage;

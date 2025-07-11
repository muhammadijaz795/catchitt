import Navbar from '../../shared/navbar';
import backArrow from './svg-components/arrow-left-icon.svg';
import emailMsg from './svg-components/email-msg-icon.svg';
import callUs from './svg-components/call-icon.svg';
import location from './svg-components/gps-icon.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from './index.module.scss';
import {
    showToastSuccess,
} from '../../utils/constants';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
    const navigate = useNavigate();
    const [darkTheme, setdarkTheme] = useState('');
    const { t: translate } = useTranslation();

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(style.darkTheme);
            // setlightDarkTheme(style.lightdarkTheme);
            // setDarkWhiteTheme('');
        }
        // else{
        //     setDarkWhiteTheme('hover:bg-slate-100');
        // }
    });

    const handleContact = () => {
        console.log("Message sent successfully.");
        showToastSuccess(translate('Message sent successfully.'));
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    };
    
    return (
        <div>
            <Navbar />
            <div className={`py-6 px-32 mt-20 ${darkTheme}`}>
                <div
                    onClick={() => navigate('/')}
                    className="flex flex-row items-center gap-4 cursor-pointer p-4"
                >
                    <img
                        className="object-contain"
                        height={7}
                        width={14}
                        src={backArrow}
                        alt="back-arrow-icon"
                    />
                    <p className="font-semibold text-xl text-[#222222]">{translate('Contact Us')}</p>
                </div>
                <div className="mt-8 flex flex-row items-center">
                    <div className="text-center w-[38.563rem] h-[35.813rem] py-8 px-10 rounded-ss-2xl rounded-es-2xl bg-[#EFEDFF]">
                        <p className="font-medium text-lg text-[#222222] mt-2">{translate('Contact Us')}</p>
                        <p className="font-bold text-4xl text-[#222222] mt-4">{translate('Keep in Touch')}</p>
                        <p className="font-normal text-base text-[#222222] mt-4">
                            {translate('Our team is always happy to hear from you and get back to you. Reach out to us whenever you wish, your opinion greatly matters.')}
                        </p>
                        <div className="flex flex-row items-center gap-10 mt-14">
                            <img src={emailMsg} height={24} width={26.67} alt="email" />
                            <p className="font-medium text-lg text-[#222222]">
                                info@poshenterpriseinc.com
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-10 mt-14">
                            <img src={callUs} height={25.33} width={25.86} alt="email" />
                            <p className="font-medium text-lg text-[#222222]">+1 (408)-807-6383</p>
                        </div>
                        <div className="flex flex-row items-center gap-10 mt-8">
                            <img src={location} height={24} width={20} alt="email" />
                            <div className="mt-3">
                                <p className="font-medium text-lg text-[#222222]">
                                    305 Vineyard Town Center #325
                                </p>
                                <p className="font-medium text-lg text-[#222222] text-left">
                                    Morgan Hill, CA 95037, USA
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[37.563rem] h-[35.813rem] rounded-se-2xl rounded-ee-2xl bg-white px-6 py-8">
                        <h3 className="font-semibold text-xl text-[#222222] mt-2">{translate('Contact us')}</h3>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder={translate('Name')}
                            className={`px-4 rounded-md  mt-4 border h-12 w-full ${darkTheme!==''?'text-white':'bg-[#F7F7F7] '}`}
                        />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder={translate('Email Address')}
                            className={`px-4 rounded-md  mt-4 border h-12 w-full ${darkTheme!==''?'text-white':'bg-[#F7F7F7] '}`}
                        />
                        <textarea
                            name="message"
                            id="message"
                            className={`h-[13.5rem] rounded-md  mt-4 border w-full resize-none p-3 ${darkTheme!==''?'text-white':'bg-[#F7F7F7] '}`}
                            placeholder={translate('Your message')}
                        ></textarea>
                        <button onClick={handleContact} className=" bg-custom-primary rounded-md px-4 h-12 text-white font-semibold text-base w-full mt-4">
                            {translate('Send message')}
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
        
    );
};

export default ContactUs;

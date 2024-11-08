import React,{ useEffect,useState } from 'react';
import { MENU_POPUP_OPTIONS } from '../../../utils/constants';
import './switch.scss';
import { useDispatch } from 'react-redux';
import style from './index.module.scss';
import CreatorTools from './svgComponents/CreatorTools';
import Translation from './svgComponents/Translation';
import FeedHelp from './svgComponents/FeedHelp';
import Dark from './svgComponents/Dark';

const MenuDropdownPopup = ({
    menuPopupStatusToggler,
    menuPopupStatus,
    menuItemClickHandler,
}: any) => {
    // const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [darkThemeWhite, setdarkThemeWhite] = useState('');
    const [darkTheme, setdarkTheme] = useState('');
    const [themeColor, setThemeColor] = useState('');

    const handleToggle = (e: any) => {
        // e.stopPropagation();
        // console.log("target",e.target.checked);
        // console.log("checked 1",prevState);
        // // if(e.target.checked ==true){
        // //     setChecked(true);
        // // }else{
        // //     setChecked(false);
        // // }
        // setChecked(checked => !checked)
        // // setChecked(e.target.checked);
        setChecked((prevState) => !prevState)

        // localStorage.setItem('items', JSON.stringify(items));
        if(e.target.checked == true){
            window.localStorage.setItem('theme', "dark");
            window.location.reload();
        }else{
            window.localStorage.setItem('theme', "light");
            window.location.reload();
        }
        
    };


    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if(themeColor == "dark"){ 
            setChecked(true);
            setdarkThemeWhite(style.darkThemeWhite);
            setdarkTheme(style.darkTheme);
            setThemeColor(themeColor);
        }else{
            setChecked(false);
            setdarkThemeWhite('');
            setdarkTheme('');
            setThemeColor('');
        } 
    },[]);

   
    return (
        <div
            onClick={menuPopupStatusToggler}
            className="flex flex-col justify-center items-center gap-1 p-2 cursor-pointer -m-4"
        >
            <div className={`h-1 w-1 rounded-full bg-black ${darkThemeWhite} `} />
            <div className={`h-1 w-1 rounded-full bg-black ${darkThemeWhite} `} />
            <div className={`h-1 w-1 rounded-full bg-black relative ${darkThemeWhite} `}>
                <div
                    className={themeColor == "dark" ? `absolute mt-2 w-56 ${darkTheme} shadow-md rounded-md top-2 -right-4 ${menuPopupStatus}`: `absolute mt-2 w-56 bg-white shadow-md rounded-md top-2 -right-4 ${menuPopupStatus}`}
                >
                    <div className="relative -z-10">
                        <div className={themeColor == "dark" ? `absolute -top-1 shadow-inner left-[91%] transform -translate-x-1/2 w-3 h-3 ${darkTheme} rotate-45`:`absolute -top-1 shadow-inner left-[91%] transform -translate-x-1/2 w-3 h-3 bg-white  rotate-45`}></div>
                    </div>
                    <ul className="">
                        {MENU_POPUP_OPTIONS?.map((menuItem, index) => (
                            <div
                                onClick={() => menuItemClickHandler(menuItem)}
                                className={`flex flex-row items-center justify-between ${themeColor == "dark" ? 'hover:gray': 'hover:bg-gray-100'} py-2 ${
                                    index === 0 ? 'rounded-t-md' : ''
                                } ${
                                    index === MENU_POPUP_OPTIONS?.length - 1 ? 'rounded-b-md' : ''
                                }`}
                            >
                                <div className="flex flex-row items-center gap-2 px-3">
                                    {/* <img className="h-2 w-2 object-contain" alt="menuOption" /> */}
                                    {(() => {
                                        switch(menuItem?.imageUrl){
                                            case "CreatorTools": return (<CreatorTools isInDark={Boolean(darkTheme)} />);
                                            case "Translation": return (<Translation isInDark={Boolean(darkTheme)} />);
                                            case "FeedHelp": return (<FeedHelp isInDark={Boolean(darkTheme)} />);
                                            case "Dark": return (<Dark isInDark={Boolean(darkTheme)} />);
                                            default: return null;
                                        }
                                    })()}
                                    <li>
                                        <a
                                            href="https://help.seezitt.com" target="blank"
                                            className={themeColor == "dark" ?  `block px-2 py-2 ${style.white} text-sm font-bold`: `block px-2 py-2 text-gray-800 text-sm font-bold`}
                                        >
                                            {menuItem?.menuOption}
                                        </a>
                                    </li>
                                </div>
                                {index === MENU_POPUP_OPTIONS?.length - 1 && (
                                    <label  className="switchToggler mr-2">
                                        <input type="checkbox" onClick={handleToggle} checked={checked} />
                                        <span className="sliderForSwitch switchRound"></span>
                                    </label>
                                )}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MenuDropdownPopup;

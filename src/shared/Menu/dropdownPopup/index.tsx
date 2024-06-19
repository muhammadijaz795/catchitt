import React from 'react';
import { MENU_POPUP_OPTIONS } from '../../../utils/constants';
import './switch.scss';
import { useDispatch } from 'react-redux';

const MenuDropdownPopup = ({
    menuPopupStatusToggler,
    menuPopupStatus,
    menuItemClickHandler,
}: any) => {
    const dispatch = useDispatch();

    const handleToggle = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
    };
    return (
        <div
            onClick={menuPopupStatusToggler}
            className="flex flex-col justify-center items-center gap-1 p-2 cursor-pointer -m-4"
        >
            <div className="h-1 w-1 rounded-full bg-black" />
            <div className="h-1 w-1 rounded-full bg-black" />
            <div className="h-1 w-1 rounded-full bg-black relative">
                <div
                    className={`absolute mt-2 w-56 bg-white shadow-md rounded-md top-2 -right-4 ${menuPopupStatus}`}
                >
                    <div className="relative -z-10">
                        <div className="absolute -top-1 shadow-inner left-[91%] transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
                    </div>
                    <ul className="">
                        {MENU_POPUP_OPTIONS?.map((menuItem, index) => (
                            <div
                                onClick={() => menuItemClickHandler(menuItem)}
                                className={`flex flex-row items-center justify-between hover:bg-gray-100 py-2 ${
                                    index === 0 ? 'rounded-t-md' : ''
                                } ${
                                    index === MENU_POPUP_OPTIONS?.length - 1 ? 'rounded-b-md' : ''
                                }`}
                            >
                                <div className="flex flex-row items-center gap-2 px-3">
                                    <img className="h-2 w-2 object-contain" alt="menuOption" />
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-2 py-2 text-gray-800 text-sm font-bold"
                                        >
                                            {menuItem?.menuOption}
                                        </a>
                                    </li>
                                </div>
                                {index === MENU_POPUP_OPTIONS?.length - 1 && (
                                    <label onClick={handleToggle} className="switchToggler mr-2">
                                        <input type="checkbox" />
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

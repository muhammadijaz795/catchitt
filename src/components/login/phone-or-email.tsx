import { APP_TEXTS, LOGIN_OPTIONS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const PhoneOrEmail = (props: any) => {
    const navigate = useNavigate();

    return (
        <div className="h-screen">
            <div className="flex flex-row justify-between items-center p-3">
                <h3 className="font-bold text-4xl">Seezitt</h3>
                <div className="flex flex-row justify-center items-center gap-3">
                    <p>?</p>
                    <p className="hover:underline cursor-pointer">{APP_TEXTS.FEEDBACK}</p>
                </div>
            </div>
            <div className="w-[22.688rem] mx-auto mt-14 h-auto">
                <div className="overflow-auto">
                    <h2 className="font-bold text-3xl">Log in</h2>
                    <div className="flex flex-row justify-between items-center mt-3.5">
                        <p className="font-medium text-[0.938rem]">Phone</p>
                        <p className="font-medium text-xs text-gray-600">
                            Log in with email or username
                        </p>
                    </div>
                    <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5">
                        <div className="flex flex-row items-center gap-2 flex-1 cursor-pointer">
                            <p>AL +335</p>
                            <p className="text-gray-400 "> | </p>
                        </div>
                        <input
                            className="w-2/3 bg-gray-100"
                            type="phone"
                            placeholder="Phone number"
                            name=""
                            id=""
                        />
                    </div>
                    <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md py-2.5 px-3">
                        <input
                            className="w-2/3 bg-gray-100"
                            type="password"
                            placeholder="Enter 6-digit code"
                            name=""
                            id=""
                        />
                        <div className="flex flex-row justify-center items-center gap-2 flex-1">
                            <p className="text-gray-400 "> | </p>
                            <p>Send code</p>
                        </div>
                    </div>
                    <p className="font-medium text-left text-xs text-gray-600 mt-2.5">
                        Log in with password
                    </p>
                    <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-4 rounded-md py-2.5 px-3 cursor-pointer">
                        <div className="flex flex-row justify-center items-center gap-2 flex-1">
                            <p>Log in</p>
                        </div>
                    </div>
                    {/* To be contiubed..... */}
                    {/* <div className='flex flex-row'></div>
                    <p>Go </p> */}
                </div>
            </div>
            <div className="absolute w-full bottom-0">
                <div className="border-t border-custom-1 text-center p-4">
                    <h3 className="font-normal text-[0.938rem] flex flex-row items-center justify-center gap-1">
                        {APP_TEXTS.NO_ACCOUNT}{' '}
                        <span className="text-danger-1 font-semibold hover:underline cursor-pointer">
                            {APP_TEXTS.SIGN_UP}
                        </span>
                    </h3>
                </div>
                <div className="bg-black flex flex-row justify-between items-center py-8 px-32">
                    <div className="border border-custom-2 pl-2 rounded-sm w-[10rem] cursor-pointer">
                        <p className="text-white text-left p-2 font-normal text-sm">English</p>
                    </div>
                    <p className="font-normal text-sm text-white">© 2024 Seezitt</p>
                </div>
            </div>
        </div>
    );
};

export default PhoneOrEmail;

import { SIGNUP_APP_TEXTS } from '../../../utils/constants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './mobile.module.scss';
import { back, checkCountryCode, chevronDown, search } from '../../../icons';

const Mobile = (props: any) => {
    const [countryModelOpened, setCountryModelOpened] = useState(false);
    const [countryCodes, setCountryCodes] = useState([]);
    const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);

    // Input Values
    const [phoneNumber, setPhoneNumber] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('');

    const navigate = useNavigate();



    const countryCodeModelHandler = () => {
        setCountryModelOpened(!countryModelOpened);
    };

    const modelClickHandler = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
    };

    // Filter country codes based on search query
    const filteredCountryCodes = countryCodes?.filter((countryItem) =>
        countryItem?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const countryItemClickHandler = (
        countryItem: { name: string; code: string },
        index: number
    ) => {
        setSelectedCountryIndex(index);
        setCountryCode(countryItem?.code);
        countryCodeModelHandler();
    };

    const menuClickHandler = () => {
        if (countryModelOpened) {
            countryCodeModelHandler();
        }
    };

    const fetchCountriesList = async () => {
        try {
            const response: any = await fetch(`${API_KEY}/util/countries`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            });
            const { data }: any = await response.json();
            setCountryCode(data?.countries[0]?.code);
            setCountryCodes(data?.countries);
        } catch (error) {
            console.log('error fetching country codes : ', error);
        }
    };

    const goBackHandler = () => {
        navigate(-1);
    };

    useEffect(() => {
        fetchCountriesList();
    }, []);

    return (
        <div className="h-screen">
            <div className="flex flex-row justify-between items-center p-3">
                <h3 className="font-bold text-4xl">Seezitt</h3>
                <div className="flex flex-row justify-center items-center gap-3">
                    <p>?</p>
                    <p className="hover:underline cursor-pointer">{SIGNUP_APP_TEXTS.FEEDBACK}</p>
                </div>
            </div>
            <div className="w-[22.688rem] mx-auto mt-14 h-auto">
                <div className="overflow-auto">
                    <h2 className="font-bold text-3xl">Sign up</h2>
                    <div className="flex flex-row justify-between items-center mt-3.5">
                        <p className="font-medium text-[0.938rem]">When’s your birthday?</p>
                    </div>
                    {/* <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5"> */}
                        {/* <input
                            className="w-2/3 bg-gray-100"
                            type="phone"
                            placeholder="Phone number"
                            name=""
                            id=""
                        /> */}
                        <div className='flex flex-row p-2'>
                        <select className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5" >
                            <option>Month</option>
                            <option>January</option>
                            <option>Febuary</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                        </select>

                        <select className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5" >
                            <option>Month</option>
                            <option>January</option>
                            <option>Febuary</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                        </select>

                        <select className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5" >
                            <option>Month</option>
                            <option>January</option>
                            <option>Febuary</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                        </select>
                        </div>
                    {/* </div> */}

                    <div>
                        <div className="flex flex-row justify-between items-center mt-3.5">
                            <p className="font-medium text-[0.938rem]">Phone</p>
                            <p className="font-medium text-xs text-gray-600">
                                Sign up with Email
                            </p>
                        </div>
                        <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5">
                            <div
                                    onClick={countryCodeModelHandler}
                                    className="flex flex-row items-center gap-2 flex-1 cursor-pointer relative"
                                >
                                    <p>{countryCode}</p>
                                    <img
                                        className={`object-contain h-2.5 w-2.5 chevron ${
                                            countryModelOpened ? 'rotate' : ''
                                        }`}
                                        src={chevronDown}
                                    />
                                    <p className="text-gray-400 "> | </p>
                                    {countryModelOpened && (
                                        <div
                                            onClick={modelClickHandler}
                                            className={`absolute ${
                                                filteredCountryCodes.length === 0 ? 'h-fit' : 'h-80'
                                            }  w-80 bg-white top-11 -left-2.5 rounded-md shadow-md cursor-default z-10`}
                                        >
                                            <div className="flex flex-row items-center p-2 gap-2">
                                                <img
                                                    className="object-contain h-3 w-3 m-2"
                                                    src={search}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Search"
                                                    className="w-full text-sm font-normal caret-red-500"
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
                                                />
                                            </div>
                                            <div className="w-full h-[1px] bg-gray-300" />
                                            <div
                                                className={`overflow-y-auto ${
                                                    filteredCountryCodes.length === 0
                                                        ? 'h-fit'
                                                        : 'max-h-[17.188rem]'
                                                } `}
                                            >
                                                {filteredCountryCodes.map((countryItem, index) => (
                                                    <div
                                                        onClick={() =>
                                                            countryItemClickHandler(
                                                                countryItem,
                                                                index
                                                            )
                                                        }
                                                        key={index}
                                                        className={`flex flex-row justify-between items-center p-2.5 cursor-pointer mb-2 rounded-b-md ${
                                                            selectedCountryIndex === index
                                                                ? 'bg-gray-50'
                                                                : ''
                                                        }`}
                                                    >
                                                        <p className="font-normal text-black text-left text-xs hover:bg-gray-50">
                                                            {countryItem?.name}
                                                        </p>
                                                        {selectedCountryIndex === index && (
                                                            <img
                                                                className="h-4 w-4 object-contain"
                                                                alt="check-mark"
                                                                src={checkCountryCode}
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                                {filteredCountryCodes.length === 0 && (
                                                    <p className="font-normal text-gray-400 text-xs hover:bg-gray-50 my-2">
                                                        No result found
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                            <input
                                className="w-2/3 bg-gray-100"
                                type="phone"
                                placeholder="Phone number"
                                name=""
                                id=""
                            />
                    </div>

                       
                    </div>
                    

                   
                   
                    <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-4 rounded-md py-2.5 px-3 cursor-pointer">
                        <div className="flex flex-row justify-center items-center gap-2 flex-1">
                            <p className='font-bold text-1xl text-gray-400'>NEXT</p>
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
                        {SIGNUP_APP_TEXTS.ALREADY_ACCOUNT}{' '}
                        <span className="text-danger-1 font-semibold hover:underline cursor-pointer">
                            {SIGNUP_APP_TEXTS.LOGIN}
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

export default Mobile;

import { SIGNUP_APP_TEXTS } from '../../../utils/constants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './mobile.module.scss';
import {  checkCountryCode, chevronDown, search } from '../../../icons';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Mobile = (props: any) => {
    const [countryModelOpened, setCountryModelOpened] = useState(false);
    const [countryCodes, setCountryCodes] = useState([]);
    const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
    const API_KEY = process.env.VITE_API_URL;

    // Input Values
    const [phoneNumber, setPhoneNumber] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('');
    const [isoCode, setIsoCode] = useState<string>('');
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState('');

    const handleMonthChange = (event: SelectChangeEvent) => {
        setMonth(event.target.value as string);
        buttonClickHandler();
    };

    const handleDateChange = (event: SelectChangeEvent) => {
        setDate(event.target.value as string);
        buttonClickHandler();
    };

    const handleYearChange = (event: SelectChangeEvent) => {
        setYear(event.target.value as string);
        buttonClickHandler();
    };

    const handleMobileNumberChange = (event: SelectChangeEvent) => {
        setPhoneNumber(event.target.value as string);
        buttonClickHandler();
    };

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
        setIsoCode(countryItem?.iso);
        countryCodeModelHandler();
    };

    const menuClickHandler = () => {
        if (countryModelOpened) {
            countryCodeModelHandler();
        }
    };

    const buttonClickHandler = () => {
        if (date && month && year && countryCode && phoneNumber) {
            console.log("enter");
        }else{
            console.log("no enter");
        }
    };

    const nextClickHandler = () => {
       
    };

    // const fetchCountriesList = async () => {
    //     try {
    //         const response: any = await fetch(`${API_KEY}/util/countries`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-type': 'application/json',
    //             },
    //         });
    //         const { data }: any = await response.json();
    //         setCountryCode(data?.countries[0]?.code);
    //         setCountryCodes(data?.countries);
    //     } catch (error) {
    //         console.log('error fetching country codes : ', error);
    //     }
    // };

    const fetchCountriesList = async () => {
        try {
            const response: any = await fetch(`${API_KEY}/util/countries`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            });
            const { data }: any = await response.json();

            // Set first country as initial country code
            setCountryCode(data?.countries[0]?.code);

            // Set first isoCode as initial country iso code
            setIsoCode(data?.countries[0]?.iso);

            // Setting all values to countryCodes state
            setCountryCodes(data?.countries);
        } catch (error) {
            console.log('🚀 ~ fetchCountriesList ~ error:', error);
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
                <div className="overflow-visible">
                    <h2 className="font-bold text-3xl">Sign up</h2>
                    <div className="flex flex-row justify-between items-center mt-3.5">
                        <p className="font-medium text-[0.938rem] p-0.5">When’s your birthday? </p>
                        
                    </div>
                    {/* <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5"> */}
                        {/* <input
                            className="w-2/3 bg-gray-100"
                            type="phone"
                            placeholder="Phone number"
                            name=""
                            id=""
                        /> */}
                        
                        <div className='flex flex-row'>
                            <FormControl fullWidth className='dobselectbox p-1'>
                            <InputLabel id="demo-simple-select-label">Month</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={month}
                                label="Month"
                                onChange={handleMonthChange}
                            >
                                <MenuItem value={1}>January</MenuItem>
                                <MenuItem value={2}>Febuary</MenuItem>
                                <MenuItem value={3}>March</MenuItem>
                                <MenuItem value={4}>April</MenuItem>
                                <MenuItem value={5}>May</MenuItem>
                                <MenuItem value={6}>June</MenuItem>
                                <MenuItem value={7}>July</MenuItem>
                                <MenuItem value={8}>August</MenuItem>
                                <MenuItem value={9}>September</MenuItem>
                                <MenuItem value={10}>October</MenuItem>
                                <MenuItem value={11}>November</MenuItem>
                                <MenuItem value={12}>December</MenuItem>
                            
                            </Select>
                            </FormControl>

                            <FormControl fullWidth className='p-1'>
                            <InputLabel id="demo-simple-select-label">Date</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={date}
                                label="Month"
                                onChange={handleDateChange}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={13}>13</MenuItem>
                                <MenuItem value={14}>14</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={16}>16</MenuItem>
                                <MenuItem value={17}>17</MenuItem>
                                <MenuItem value={18}>18</MenuItem>
                                <MenuItem value={19}>19</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={21}>21</MenuItem>
                                <MenuItem value={22}>22</MenuItem>
                                <MenuItem value={23}>23</MenuItem>
                                <MenuItem value={24}>24</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={26}>26</MenuItem>
                                <MenuItem value={27}>27</MenuItem>
                                <MenuItem value={28}>28</MenuItem>
                                <MenuItem value={29}>29</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                                
                            
                            </Select>
                            </FormControl>

                            <FormControl fullWidth className='p-1'>
                            <InputLabel id="demo-simple-select-label">Year</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={year}
                                label="Month"
                                onChange={handleYearChange}
                            >
                            {(function (rows, i, len) {
                                    while (--i >= len) {
                                    rows.push(<MenuItem value={i}>{i}</MenuItem>)
                                    }
                                    return rows;
                                })([], 2025, 1900)}
                              
                            </Select>
                            </FormControl>
                            
                        </div>

                    <div>
                        <div className="flex flex-row justify-between items-center mt-3.5">
                            <p className="font-medium text-[0.938rem]">Phone</p>
                            <p className="font-medium text-xs text-gray-600">
                                Sign up with Email
                            </p>
                        </div>
                        <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5">
                            {/* <div
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
                            </div> */}
                            <div
                                    onClick={countryCodeModelHandler}
                                    className="flex flex-row border-r-2 items-center gap-1 flex-auto cursor-pointer relative"
                                >
                                    <p>{isoCode + ' ' + countryCode}</p>
                                    <img
                                        className={`object-contain h-2.5 w-2.5 chevron ${
                                            countryModelOpened ? 'rotate' : ''
                                        }`}
                                        src={chevronDown}
                                    />
                                    {/* <p className="text-gray-400 "> | </p> */}
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
                                                    className="w-full text-sm font-normal caret-red-500 bg-white"
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
                                                {filteredCountryCodes.map(
                                                    (countryItem: any, index: number) => (
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
                                                                {countryItem?.name +
                                                                    ' ' +
                                                                    countryItem?.code}
                                                            </p>
                                                            {selectedCountryIndex === index && (
                                                                <img
                                                                    className="h-4 w-4 object-contain"
                                                                    alt="check-mark"
                                                                    src={checkCountryCode}
                                                                />
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                                {filteredCountryCodes.length === 0 && (
                                                    <p className="font-normal text-gray-400 text-xs hover:bg-gray-50 my-2">
                                                        {APP_TEXTS.NO_RESULT_FOUND}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            <input
                                className=" gap-1 w-2/3 bg-gray-100"
                                type="phone"
                                placeholder="Phone number"
                                name=""
                                id=""
                                value={phoneNumber}
                                onChange={handleMobileNumberChange}
                            />
                    </div>

                       
                    </div>
                    

                   
                   
                    <div className="flex flex-row items-center border border-gray-500 bg-red-500 mt-4 rounded-md py-2.5 px-3 cursor-pointer"
                    onClick={nextClickHandler}
                    >
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

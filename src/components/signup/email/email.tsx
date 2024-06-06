import { SIGNUP_APP_TEXTS } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import './email.module.scss';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const PhoneOrEmail = (props: any) => {
    const navigate = useNavigate();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [month, setMonth] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };

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
                        <div className='flex flex-row p-0.5'>
                        <FormControl fullWidth className='p-0.5'>
                        <InputLabel id="demo-simple-select-label">Month</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={month}
                            label="Month"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>January</MenuItem>
                            <MenuItem value={2}>Febuary</MenuItem>
                            <MenuItem value={3}>March</MenuItem>
                            <MenuItem value={4}>April</MenuItem>
                            <MenuItem value={5}>May</MenuItem>
                            <MenuItem value={6}>June</MenuItem>
                            <MenuItem value={7}>July</MenuItem>
                            <MenuItem value={8}>August</MenuItem>
                          
                        </Select>
                        </FormControl>

                        <FormControl fullWidth className='p-0.5'>
                        <InputLabel id="demo-simple-select-label">Month</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={month}
                            label="Month"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>January</MenuItem>
                            <MenuItem value={2}>Febuary</MenuItem>
                            <MenuItem value={3}>March</MenuItem>
                            <MenuItem value={4}>April</MenuItem>
                            <MenuItem value={5}>May</MenuItem>
                            <MenuItem value={6}>June</MenuItem>
                            <MenuItem value={7}>July</MenuItem>
                            <MenuItem value={8}>August</MenuItem>
                          
                        </Select>
                        </FormControl>

                        <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Month</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={month}
                            label="Month"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>January</MenuItem>
                            <MenuItem value={2}>Febuary</MenuItem>
                            <MenuItem value={3}>March</MenuItem>
                            <MenuItem value={4}>April</MenuItem>
                            <MenuItem value={5}>May</MenuItem>
                            <MenuItem value={6}>June</MenuItem>
                            <MenuItem value={7}>July</MenuItem>
                            <MenuItem value={8}>August</MenuItem>
                          
                        </Select>
                        </FormControl>
                        {/* <select className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5" >
                            <option>Month</option>
                            <option>January</option>
                            <option></option>
                            <option></option>
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
                        </select> */}
                        </div>
                    {/* </div> */}

                    <div>
                        <div className="flex flex-row justify-between items-center mt-3.5">
                            <p className="font-medium text-[0.938rem]">Email</p>
                            <p className="font-medium text-xs text-gray-600">
                                Sign up with phone
                            </p>
                        </div>
                        <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5">
                            <input
                                className="w-2/3 bg-gray-100"
                                type="email"
                                placeholder="Email address"
                                name=""
                                id=""
                            />
                        </div>

                        <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5">
                            <input
                                className="w-2/3 bg-gray-100"
                                type="password"
                                placeholder="Password"
                                name=""
                                id=""
                            />
                        </div>
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
                    <div className="font-medium text-left text-xs text-gray-600 mt-2.5">
                    {/* <FormGroup> */}
                        <FormControlLabel
                            control={
                            <Checkbox  name="gilad" style={{ padding:'0px', width: '30%'}}/>
                            }
                            label="Get trending content, newsletters, promotions, recommendations, and account updates sent to your email"
                        />
                    {/* </FormGroup> */}
                    
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

export default PhoneOrEmail;

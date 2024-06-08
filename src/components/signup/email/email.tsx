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
                            <MenuItem value={9}>September</MenuItem>
                            <MenuItem value={10}>October</MenuItem>
                            <MenuItem value={11}>November</MenuItem>
                            <MenuItem value={12}>December</MenuItem>
                          
                        </Select>
                        </FormControl>

                        <FormControl fullWidth className='p-0.5'>
                        <InputLabel id="demo-simple-select-label">Date</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={month}
                            label="Month"
                            onChange={handleChange}
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

                        <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Year</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={month}
                            label="Month"
                            onChange={handleChange}
                        >
                           {(function (rows, i, len) {
                                while (++i <= len) {
                                rows.push(<MenuItem value={i}>{i}</MenuItem>)
                                }
                                return rows;
                            })([], 1900, 2024)}
                            {/* <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2023}>2023</MenuItem>
                            <MenuItem value={2022}>2022</MenuItem>
                            <MenuItem value={2021}>2021</MenuItem>
                            <MenuItem value={2020}>2020</MenuItem>
                            <MenuItem value={2019}>2019</MenuItem>
                            <MenuItem value={2018}>2018</MenuItem>
                            <MenuItem value={2017}>2017</MenuItem>
                            <MenuItem value={2016}>2016</MenuItem>
                            <MenuItem value={2019}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem> */}
                           
                          
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

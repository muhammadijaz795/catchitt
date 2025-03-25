import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const SleepReminder: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [time, setTime] = useState("00:00");

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  function saveChanges()
  {
    let [hours, minutes] = time.split(":").map(Number);
    let sleepReminderPayload =
    {
      hours: hours % 12 || 12,
      minutes,
      amPmValue: hours >= 12 ? "PM" : "AM"
    };

    let endpoint = process.env.VITE_API_URL + '/profile/v2/screen-times'
    let payload =
    {
      method: 'PATCH',
      headers:
      {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token'),
      },
      body: JSON.stringify({ sleepReminderPayload }),
    };

    fetch(endpoint, payload)
    .catch(error => console.error('Failed to update screen time:', error));
  }

  return (
    <div className="w-100 p-3">
      <div className="border-top">
        <div className='text-left d-flex mt-3'>
          <span className="pt-1">
            <AccessTime className="text-gray-600 mr-2" />
          </span>
          <div>
            <p className='d-flex mb-1'>Set your sleep time</p>
            <span className='text-xs text-[#16182399]'>You’ll get reminded if you reach your sleep time</span>
          </div>
        </div>
      </div>

      <Typography className="border-top pt-3 mt-3">
        <div className="d-flex justify-between">
          <div>
            <p className='text-base'>Set up sleep reminders</p>
          </div>
          <label className="toggle-switch !left-1">
            <input 
              type="checkbox"
              className="sr-only peer"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
            />
            <b className="slider"></b>
          </label>
        </div>
      </Typography>

      {isEnabled && (
        <div className="bg-gray-100 p-4 mt-4 rounded-md">
          <p className="font-medium">Sleep reminders</p>
          <div className="flex items-center gap-3">
            <div className="relative w-[8rem]">
              <input
                type="time"
                value={time}
                onChange={handleTimeChange}
                className="w-full p-2 bg-white h-10 border border-gray-300 rounded-sm mt-2 cursor-pointer hover:border-gray-400"
              />
            </div>
            <span className="text-sm text-gray-600 mt-1 block">
              {time}–{new Date(new Date(`1970-01-01T${time}:00`).setHours(new Date(`1970-01-01T${time}:00`).getHours() + 7)).toTimeString().slice(0, 5)} , 7 hours
            </span>
          </div>
        </div>
      )}

      <div className='d-flex mt-3 justify-end'>
        <button className="bg-[#FE2C55] text-white font-semibold px-4 rounded-sm text-sm" onClick={() => saveChanges()}>
          Done
        </button>
      </div>
    </div>
  );
};

export default SleepReminder;

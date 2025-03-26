import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import moment from "moment";

const TimeSpentChart = () => {
  var themeColor = window.localStorage.getItem('theme');

  // Generate the next 7 days dynamically with sample data
  const generateDates = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      date: moment().add(i, "days").format("ddd D"), // Mon 25, Tue 26, etc.
      dayTime: Math.floor(Math.random() * 50) + 5, // Random between 5m-50m
      nightTime: Math.floor(Math.random() * 50) + 5, // Random between 5m-50m
    }));
  };

  const data = generateDates();

  // Calculate total times
  const totalDayTime = data.reduce((acc, item) => acc + item.dayTime, 0);
  const totalNightTime = data.reduce((acc, item) => acc + item.nightTime, 0);
  const totalTime = totalDayTime + totalNightTime;

  return (
    <Card sx={{
      backgroundColor: themeColor === 'dark' ? 'transparent' : '',
      maxWidth: 800,
      margin: "auto",
      mt: 4,
      p: 2
    }}>
      <Grid container spacing={2}>
        {/* Left Side: Chart */}
        <Grid item xs={8}>
          <Typography variant="h6" fontWeight="bold" sx={{
            color: themeColor === 'dark' ? 'white' : ''
          }}>
            Time spent
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 60]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar  dataKey="dayTime" fill="#4CAF50" name="Day Time" />
              <Bar dataKey="nightTime" fill="#FF5722" name="Night Time" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        {/* Right Side: Stats */}
        <Grid item xs={4}>
          <Box>
            <Typography variant="body1" fontWeight="bold" sx={{color: themeColor === 'dark' ? 'white' : ''}}>
              Day time 🕒
            </Typography>
            <Typography variant="h6" style={{ color: themeColor === 'dark' ? 'white' : ''}}>{totalDayTime}m</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="body1" fontWeight="bold" sx={{color: themeColor === 'dark' ? 'white' : ''}}>
              Night time 🌙
            </Typography>
            <Typography variant="h6" style={{ color: themeColor === 'dark' ? 'white' : ''}}>{totalNightTime}m</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="body1" fontWeight="bold" sx={{color: themeColor === 'dark' ? 'white' : ''}}>
              Total ⏳
            </Typography>
            <Typography variant="h6" style={{ color: themeColor === 'dark' ? 'white' : ''}}>{totalTime}m</Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TimeSpentChart;

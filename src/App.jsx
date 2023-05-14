import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { BiChevronDown } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { WiDegrees } from 'react-icons/wi';
import { BiMenuAltLeft } from 'react-icons/bi';
import ToggleSwitch from './components/ToggleSwitch';
import cloud from './Images/weather-app1.png';
import humidity from './Images/drop.png';
import clouds from './Images/weather-cloud.png';
import logo from './Images/logo.png';
import wind from './Images/wind.png';
import axios from 'axios';
// import { classes } from './Styles';
import { makeStyles } from '@mui/styles';

function App() {

  const style = makeStyles({
    footerTitle: {
      fontSize: "1.5rem !important", fontWeight:"450", color: "white"
    },
    footerValue: {
      fontSize: "1.5rem !important", color: "white"
    }
  });

  const classes = style();


  const [value, setValue] = useState();
  const [cityName, setCityName] = useState();
  const inputRef = useRef();

  const [data, setData] = useState({
    name: 'Hyderabad',
    temperature: 9,
    windSpeed: 12,
    humidity: 10,
    description: 'Its cloudy',
    clouds: 10
  });
  

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName || 'Hyderabad'}&appid=baca9c932141ffc411892ac2ec4c522d&units=metric`;
  useEffect(() => {

    // const timer = setTimeout(()=> {
    //   if(value === inputRef.current.value)
      axios.get(apiURL).then(res => {
        setData({
          ...data,
          name: res.data.name,
          temperature: res.data.main.temp,
          description: res.data.weather[0].description,
          windSpeed: res.data.wind.speed,
          humidity: res.data.main.humidity,
          clouds: res.data.clouds.all,
        }),
        console.log(res.data)
      }).catch(error => {
        console.log(error, 'from Axios');
      })
    // }, 500)

    // return ()=>{
    //   clearTimeout(timer);
    // }

  }, [apiURL, inputRef])

  return (
    <div style={{ backgroundColor: "#0093E9", backgroundImage: "linear-gradient(160deg, #1f4037 0%, #99f2c8 100%)", height: "100%", paddingBottom: "2rem", width: "100%" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "1rem 1.5rem", backgroundImage: "linear-gradient(160deg, #C9D6FF 0%, #E2E2E2 100%)", borderBottom: "1px solid white" }}>
        <img src={logo} style={{width:"3rem", height:"3rem"}} alt="logo" />
        <TextField placeholder='Hyderabad'
        size='small'
        ref={inputRef}
        onKeyDown={(e)=>{
          if(e.keyCode === 13){
            return setCityName(value);
          }
        }} 
        onChange={(e) => setValue(e.target.value)} 
        value={value} 
        InputProps={{
          startAdornment: <InputAdornment position="start"><MdLocationOn style={{ fontSize: "1.2rem", color: "#5CD1FF" }} /></InputAdornment>,
          endAdornment: <InputAdornment position="end"><BsSearch style={{ cursor: 'pointer' }} 
          onClick={() => setCityName(value)}/></InputAdornment>
        }} />
        <ToggleSwitch />
      </div>

      <Typography style={{ display: "flex", color: "white", fontSize: "2rem", justifyContent: "center", paddingTop: "2rem", fontWeight: "400", alignItems: "flex-start" }}>Today's Report</Typography>

      <Grid container sx={{ padding: "2rem 5rem 2rem", display: "flex", justifyContent: 'center' }}>
        <Grid item lg={4} sm={6} xs={12} sx={{ display: 'flex', justifyContent: "flex-start  ", flexDirection: "column", height: "auto", alignItems: "center", padding: "5rem 0rem 2rem" }}>
          <Typography style={{ fontSize: "5rem", color: "white", height: "auto", fontWeight: "550" }}>{data.temperature}°C</Typography>
          <Typography style={{ fontSize: "2rem", color: "white", fontWeight: "550" }}>{data.name}</Typography>
        </Grid>
        <Grid item lg={4} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center", textAlign: "center", flexDirection: "column" }}>
          <Typography style={{ fontSize: "3rem", opacity: "20%", color: "white", fontWeight: "700", padding: "2.5rem" }}>{data.description}</Typography>
        </Grid>
        <Grid item lg={4} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center", alingItems: "center", }}>
          <img src={cloud} style={{ height: "15rem", padding: "2.5rem" }} alt='cloud' />
        </Grid>
      </Grid>

      <div className='footerBackground' style={{ display: 'flex', justifyContent: "space-evenly", height: "75%", width: "auto", borderTopRightRadius:"25px", borderTopLeftRadius:"25px" }}>
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "1rem" }}>
          <img src={humidity} style={{ height: "4rem", }} alt='Humidity' />
          <Typography className={classes.footerTitle}>Humidity</Typography>
          <Typography className={classes.footerValue}>{data.humidity}%</Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "1rem" }}>
          <img src={clouds} style={{ height: "4rem", }} alt='sun' />
          <Typography className={classes.footerTitle}>Clouds</Typography>
          <Typography className={classes.footerValue}>{data.clouds}</Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "1rem" }}>
          <img src={wind} style={{ height: "4rem", }} alt='Wind Speed' />
          <Typography className={classes.footerTitle}>Speed</Typography>
          <Typography className={classes.footerValue}>{data.windSpeed}/km</Typography>
        </div>
      </div>
    </div>
  )
}

export default App
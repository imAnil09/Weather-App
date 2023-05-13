import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'

const ToggleSwitch = () => {

  const [toggle, setToggle] = useState(false);

  // console.log('toggle', toggle);
  
  return (
    <div style={{ border: "1px solid #E2E2E2", width:"9rem", display:"flex", justifyContent:"space-evenly", backgroundColor:"white", borderRadius:"25px" }}>
      <Button style={{backgroundColor: !toggle ? "#E2E2E2" : '', margin:".2rem", padding:".2rem", fontWeight:"500", borderRadius:"20px"}} onClick={()=> setToggle(!toggle)}>Dark</Button>
      <Button style={{backgroundColor: toggle ? "#E2E2E2" : '', margin:".2rem", padding:".2rem", fontWeight:"500", borderRadius:"20px"}} onClick={()=> setToggle(!toggle)}>White</Button>
    </div>
  )
}

export default ToggleSwitch;
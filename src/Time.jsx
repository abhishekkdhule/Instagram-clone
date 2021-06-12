import React, { useState } from 'react';


const Time=()=>{
    const date=new Date().toLocaleTimeString();

    const [newTime,setUpdatedTime]=useState(date);

    const updateTime=()=>{
        // const date=new Date().toLocaleTimeString();
        setUpdatedTime(()=>{
            
            return new Date().toLocaleTimeString();
        })
    }
    setInterval(updateTime,1000);
    return(<div style={{margin:"10px auto",textAlign:"center",fontSize:"70px"}}>
    {newTime}<br/>
    <button onClick={updateTime}>get time</button>
    </div>);
}

export default Time;
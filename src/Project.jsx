import React,{useState} from 'react';

const Project=(props)=>{

    const date=new Date().toLocaleTimeString();

    const [newTime,setUpdatedTime]=useState(date);

    const updateTime=()=>{
        // const date=new Date().toLocaleTimeString();
        setUpdatedTime(()=>{
            
            return new Date().toLocaleTimeString();
        })
    }
    setInterval(updateTime,1000);
    return (<>
        <div style={{display:'flex',padding:'4px',backgroundColor:'black'}}>
            <div style={{width:'40%',backgroundColor:'white'}}>
                <h1>{newTime}</h1>
            </div>
            <div style={{width:'60%',backgroundColor:'gray'}}>
                <h3>{props.content}</h3>
            </div>
        </div>
    </>);
}
export default Project;
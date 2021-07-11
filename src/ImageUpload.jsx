import React,{useState} from 'react'
import { Button } from '@material-ui/core'
import {storage,db} from './firebase'
import firebase from 'firebase'
import './imageupload.css' 

function ImageUpload(props) {
    const [caption,setCaption]=useState('')
    const [image,setImage]=useState('')
    const [progress,setProgress]=useState(0)

    const uploadFile = (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const uploadPost =(e)=>{
        const uploadTask=storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                //progress function
                const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
                setProgress(progress)
            },
            (error)=>{
                //error function
                console.log(error);
                alert(error.message)
            },
            ()=>{
                //complete function ...
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        imageURL:url,
                        username:props.username
                    })
                    setProgress(0)
                    setCaption("")
                    setImage(null)
                })
            }
        )
    }
    return (
        <div className="main_div border bg-white">
        <h4 className="text-center">Add a Post!</h4>
        <progress className="progress_bar" value={progress} max="100" />
        <p className="mb-1">Caption</p>
        <input type="text" className="form-control mb-2" onChange={(e)=> setCaption(e.target.value)} value={caption} />
        <input type="file" onChange={uploadFile} /> 
        
        <button type="submit" className="btn btn-light mt-2 mx-auto" onClick={uploadPost}>Post</button>    
        </div>
    )
}

export default ImageUpload

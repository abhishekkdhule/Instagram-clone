import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import "./App.css";
import Project from "./Project";
import Post from "./Post";
import { db,auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Button,Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser]=useState(null)

  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //logged in
        setUser(authUser)
        console.log(authUser)
      }
      else{
        //logged out
        setUser(null)
      }
    })

    return ()=>{
      unsubscribe();
    }
  },[user,username])


  //Runs a piece of code based on specific  condition
  useEffect(() => {
    db.collection("posts").orderBy('timestamp','desc').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp=(e)=>{
      e.preventDefault();
      auth.createUserWithEmailAndPassword(email,password)
      .then((authUser)=>{
        return authUser.user.updateProfile({
          displayName:username
        })
      })
      .catch((error)=>alert(error))
      setOpen(false)
  }
 
  const signIn=(e)=>{
    e.preventDefault()
    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))
    setOpenSignin(false)
  }

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
          <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt
          />
          </center>

          <form className="app__signup">
          <Input
            placeholder="username"
            type="text"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
          />
          
          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />

          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />  
          <Button type="submit" onClick={signUp}>SignUp</Button>
          </form>

        </div>
      </Modal>
    {/* ------------------------------------------------------------ */}

    <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
          <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt
          />
          </center>

          <form className="app__signup">
          
          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />

          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />  
          <Button type="submit" onClick={signIn}>SignIn</Button>
          </form>

        </div>
      </Modal>


      <div className="app">
        <div className="app__header">
          <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt
          />
        </div>
      {
        user ? (
          <ImageUpload username={user.displayName}/>

        ):
        (
          <p>Make sure you are logged in!</p>
        )
      }
        {
           user ? (
            <Button onClick={() => auth.signOut()}>Logout</Button>
           ) 
           :  
           (
             <>
            <Button onClick={() => setOpen(true)}>Sign up</Button>
            <Button onClick={() => setOpenSignin(true)}>Sign In</Button>
            </>
           )
        }

        {posts.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageURL={post.imageURL}
          />
        ))}
      </div>
    </>
  );
}

export default App;

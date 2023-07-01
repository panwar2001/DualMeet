'use client'
/** Import Section Begin **/
import { useRef, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Loader from './Loader';
import cameraOFF from '../svg/cameraOFF.svg';
import cameraON from '../svg/cameraON.svg';
import microphoneOn from '../svg/microphoneOn.svg';
import microphoneOff from '../svg/microphoneOff.svg';
import endCall from '../svg/endCall.svg';
import { SideBar, SideBarButton } from './SideBar';
import { useRouter } from 'next/router';
import SimplePeer from 'simple-peer';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const { io } = require("socket.io-client");
//** Import Section End **/

const DualMeet=()=>{
  /** Declaration Section Begin **/

  const { data: session, status } = useSession();
  const [localVideoStream, setLocalVideoStream] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [audioPlaying,setAudioPlaying] = useState(true);
  const localVideoRef = useRef();
  const remoteVideoRef= useRef();
  const userImage=session?.user?session.user.image:'/person.svg';
  const [slideClass,setSlideClass] = useState("slide");
  const {asPath}=useRouter();
  const peerRef=useRef(null);
  const socket=useRef();
  const [names,setNames]=useState([]);
  // const socket=io("http://localhost:8080");
 /** Declaration Section End **/

 /**SVG SECTION begin**/
 /**SVG SECTION End**/

 /** Inline css Section Begin **/

const styleCamera={
  borderRadius:'50%',
  backgroundColor:videoPlaying?'transparent':'red',
  color:'black',
  cursor:'pointer'
}
const styleMicrophone={
    borderRadius:'50%',
    backgroundColor:audioPlaying?'transparent':'red',
    cursor:'pointer'

}
const styleEndCall={
    borderRadius:'50%',
    backgroundColor:'white'
}
const styleFooterButtons={
  display:'flex',
  position:'absolute',
  justifyContent:'center',
  bottom:'0',
  width:'100%',
  backgroundColor:'black',
}
const meetPageStyle={
  backgroundColor:'black',
  height:'100vh'
}
const userImageStyle={
  borderRadius:'50%',
  position:'absolute',
  left:'40%',
  top:'20%',
  height:'20%',
  width:'auto'
}
 /** Inline css Section End **/

 /** Functions Section Begin **/

// const VideoMedia=()=>{
//   if(videoPlaying){
//     localVideoRef.current.srcObject=null;
//       stream.getVideoTracks().forEach((track) => {
//             track.stop();
//           });
//     setStream(null);
//  }
//  else{
//    navigator.mediaDevices.getUserMedia({ audio:true, video: {
//       width: { min: 1024, ideal: 1280, max: 1920 },
//       height: { min: 576, ideal: 720, max: 1080 },
//     },}).then((stream)=>{
//       setStream(stream);
//       localVideoRef.current.srcObject=stream;    
//     })
//  }
//   setVideoPlaying(videoPlaying^true);
// }
const VideoMedia=()=>{
  localVideoStream.getVideoTracks().forEach((track)=>{
    track.enabled=videoPlaying^true;
  });
  setVideoPlaying(videoPlaying^true);
}
const AudioMedia = () => {
    localVideoStream.getAudioTracks().forEach((track) => {
      track.enabled=audioPlaying^true;
    });
    setAudioPlaying(audioPlaying^true);
};


 const handleDisconnect=()=>{
  const tracks = stream.getTracks();
  tracks.forEach(track => track.stop());
    setStream(null);
  // router.back();
 }
// router.onPopState=handleDisconnect;
 /** Functions Section Begin **/
 
/** UseEffect Section Begin **/
const startMeeting=async ()=>{
        const stream=await  navigator.mediaDevices.getUserMedia({ audio:true, video: {
          width: { min: 1024, ideal: 1280, max: 1920 },
          height: { min: 576, ideal: 720, max: 1080 },
        }});
        localVideoRef.current.srcObject = stream;
        setLocalVideoStream(stream);        
        socket.current.on("initiate",()=>{
          toast.success("Successfully joined !", {
            position: toast.POSITION.TOP_CENTER
          });
          peerRef.current = new SimplePeer({
             initiator:true,
             trickle:false,
             stream:stream
          });
        peerRef.current.on('signal', (data) => {
          socket.current.emit('call', asPath, data);
        });
        socket.current.on('response', (data) => {
          peerRef.current.signal(data);
        });  
        peerRef.current.on('stream',(stream)=>{
          remoteVideoRef.current.srcObject=stream;
        })
      });
        socket.current.on('receiver', (data) => {
            peerRef.current = new SimplePeer({
               initiator:false,
               trickle:false,
               stream:stream
            });
            peerRef.current.signal(data);
            peerRef.current.on('signal', (d) => {
            socket.current.emit('accept', asPath, d);
            }); 
            peerRef.current.on('stream',(stream)=>{
              remoteVideoRef.current.srcObject=stream;
            })
        });         
}

useEffect(()=>{
  socket.current=io("http://localhost:8080");
  socket.current.on('connect',()=>{
    socket.current.emit("join",asPath);
   });
  socket.current.on('full',(warn)=>{
    toast.warn(warn, {
      position: toast.POSITION.TOP_CENTER
    });
  });
    startMeeting();
    
  return ()=>{
    peerRef.current?.close();
  }
  }, []);

/** UseEffect Section End **/

/** Conditional rendering Section Begin **/
  if(status=='loading'){
    return <Loader/>
  }
  return <div style={meetPageStyle} >
    <ToastContainer />
    <div className='localVideo'>
        <video ref={remoteVideoRef} autoPlay  className="video1"/>
    </div>    
       <div className="posVideo2">
 <video ref={localVideoRef} autoPlay  className="video2"/>
 {!videoPlaying&&<Image src={userImage} height={150} width={150} style={userImageStyle} alt="User image"/>}
   </div>
   <SideBar names={names} slideClass={slideClass} setSlideClass={setSlideClass}/>

      <div style={styleFooterButtons}>
        <div className="operate">
          <button onClick={() => VideoMedia()} style={styleCamera}>
           <Image src={videoPlaying?cameraON:cameraOFF} alt="Web cam svg" width={50} height={50}/>
        </button>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className='operate'>
        <button onClick={() => AudioMedia()} style={styleMicrophone}>
           <Image src={audioPlaying?microphoneOn:microphoneOff} alt="Microphone svg" width={50} height={50}/>   
        </button> 
        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className='operate'>
        <button  style={styleEndCall}>
           <Image src={endCall} onClick={()=>handleDisconnect()} alt="End call svg" width={50} height={50}/>   
        </button>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div>
        <SideBarButton slideClass={slideClass} setSlideClass={setSlideClass}/>
        </div>
        </div>


        <style jsx>
        {`
            video {
              transform: scaleX(-1);
              background-color:black;
            }
            .video1{
               position:relative;
               display:flex;
               height:80vh;
               width:60vw;
            }
            .video2{
              position:relative;
              display:flex;
              height:16vh;
              width:13vw;
            }
            .localVideo{
             display:flex;
             position:absolute;
             bottom:100px;
             transform:translate(29%);
            }
            .posVideo2{
              display:flex;
              position:absolute;
              bottom:100px;
              transform:translate(29%);
             }
            .operate{
              padding-left:0%;
            }
            button{
              cursor:pointer;
            }
          `}
        </style>
    </div>
  }

export default DualMeet;
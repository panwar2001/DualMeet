'use client'
/** Import Section Begin **/
import { useRef, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import {useRouter} from "next/router";
import Loader from './Loader';
import cameraOFF from '../svg/cameraOFF.svg';
import cameraON from '../svg/cameraON.svg';
import microphoneOn from '../svg/microphoneOn.svg';
import microphoneOff from '../svg/microphoneOff.svg';
import endCall from '../svg/endCall.svg';
import { SideBar, SideBarButton } from './SideBar';
import Peer from 'peerjs';
/** Import Section End **/

const DualMeet=()=>{
  /** Declaration Section Begin **/

  const [startMeeting,setStartMeeting]=useState(false);
  const { data: session, status } = useSession();
  const [stream, setStream] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [audioPlaying,setAudioPlaying] = useState(true);
  const localVideoRef = useRef();
  const remoteVideoRef= useRef();
  const router=useRouter();
  const userImage=session?.user?session.user.image:'/person.svg';
  const [slideClass,setSlideClass] = useState("slide");
  const [meetingCreated,setMeetingCreated]=useState(false);
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

const getVideoMedia = async () => {
  try {
    const localStream = await navigator.mediaDevices.getUserMedia({ audio:true, video: {
      width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 576, ideal: 720, max: 1080 },
    },});
    setStream(localStream);
    localVideoRef.current.srcObject=localStream;
  } catch (error) {
    console.error(error);
  }
};
const StartAudioMedia = () => {
  if(!stream)return;
    stream.getAudioTracks().forEach((track) => {
      track.enabled=true;
    });
    localVideoRef.current.srcObject=stream;
};
const StopAudioMedia= ()=>{
   if(!stream)return;
    stream.getAudioTracks().forEach((track) => {
      track.enabled=false;
    });
    if(localVideoRef.current)
    localVideoRef.current.srcObject=stream;
}
const startVideoMedia=()=>{
  if(!stream)return;
  stream.getVideoTracks().forEach((track) => {
    track.enabled=true;
  });
  if(localVideoRef.current)
  localVideoRef.current.srcObject=stream;
}
const stopVideoMedia=()=>{
  if(!stream)return;
  stream.getVideoTracks().forEach((track) => {
    track.enabled=false;
  });
  if(localVideoRef.current)
  localVideoRef.current.srcObject=stream;
}

const createMeeting=()=>{
  setMeetingCreated(true);
  const peer=new Peer(meetId); 
  peer.on('open', (id) => {
    console.log("Peer Connected with ID: ", id)
   })
peer.on('call', (call) => {
    call.answer(stream);
    call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject=remoteStream;
    })  
})
}

 const handleDisconnect=()=>{
  if(stream){
  const tracks = stream.getTracks();
  tracks.forEach(track => track.stop());
    setStream(null);
  }

  router.back();
 }
 router.onPopState=handleDisconnect;
 /** Functions Section Begin **/

 
/** UseEffect Section Begin **/
useEffect(()=>{
  getVideoMedia();
},[]);

useEffect(() => {
  videoPlaying?startVideoMedia():stopVideoMedia();
  audioPlaying?StartAudioMedia():StopAudioMedia();
}, [videoPlaying,audioPlaying]);


/** UseEffect Section End **/

/** Conditional rendering Section Begin **/
  if(status=='loading'){
    return <Loader/>
  }
  return <div style={meetPageStyle} >
    <div className='localVideo'>
        <video ref={remoteVideoRef} autoPlay  className="video1"/>
    </div>    
       <div className="posVideo2">
 <video ref={localVideoRef} autoPlay  className="video2"/>
 {!videoPlaying&&<Image src={userImage} height={150} width={150} style={userImageStyle} alt="User image"/>}
   </div>
{/*  */}
   <SideBar names={[name]} slideClass={slideClass} setSlideClass={setSlideClass}/>

      <div style={styleFooterButtons}>
        <div className="operate">
       <button onClick={() => setVideoPlaying(videoPlaying^true)} style={styleCamera}  >
           <Image src={videoPlaying?cameraON:cameraOFF} alt="Web cam svg" width={50} height={50}/>
        </button>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className='operate'>
        <button onClick={() => setAudioPlaying(audioPlaying^true)} style={styleMicrophone}>
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
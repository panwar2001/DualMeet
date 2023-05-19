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
import NavigationMeet from './navigation/NavigationMeet';
//import Peer from "peerjs";

/** Import Section End **/

const DualMeet=({join,meetId})=>{
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
  const [name,setName]=useState('ayush');
  
 /** Declaration Section End **/

 /**SVG SECTION begin**/
 /**SVG SECTION End**/

 /** Inline css Section Begin **/

const styleCamera={
  borderRadius:'50%',
  backgroundColor:videoPlaying?'transparent':'red',
  color:'black',
}
const styleMicrophone={
    borderRadius:'50%',
    backgroundColor:audioPlaying?'transparent':'red',
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
const styleJoin={
  height:'4%',
  backgroundColor:'#1a73e8',
  color:'#fff',
  fontWeight:'bold',
  cursor:'pointer',
  fontSize:'1em'
};

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
  import('peerjs').then(({ default: Peer }) => {
  if(!stream)return;
  stream.getVideoTracks().forEach((track) => {
    track.enabled=false;
  });
  if(localVideoRef.current)
  localVideoRef.current.srcObject=stream;
});
}

const createMeeting=()=>{
  import('peerjs').then(({ default: Peer }) => {
  const peer=new Peer('panwar2001'); 
  peer.on('open', (id) => {
    console.log("Peer Connected with ID: ", id)
   })
peer.on('call', (call) => {
    call.answer(stream);
    call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject=remoteStream;
    })  
})
  });

}
const joinMeeting=()=>{
  const peer=new Peer();
  console.log('joining...')
  peer.on('open', (id) => {
        let call = peer.call('panwar2001', stream)
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject=remoteStream;
        })
    })
}

const handleJoin=()=>{
  if(name.trim()===''){
    alert('Please Enter your name');    
    return;
  }
    setStartMeeting(true);
    join?joinMeeting():createMeeting();
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
  if(startMeeting){
  return <div style={meetPageStyle} >
    <div className='localVideo'>
        <video ref={localVideoRef} autoPlay muted className="video1"/>
       {!videoPlaying&&<Image src={userImage} height={150} width={150} style={userImageStyle} alt="User image"/>}
    </div>    
       <div className="posVideo2">
 <video ref={remoteVideoRef} autoPlay muted className="video2"/>
   </div>
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
  /** Conditional rendering Section End **/
    return (<>
    <NavigationMeet email={session?.user?.email} image={session?.user?.image}/>
    <div style={{display:'flex'}}>
    <div style={{paddingTop:'3%',paddingLeft:'3%'}}>
       <div>
      <video ref={localVideoRef} autoPlay muted />
      </div>
      <button onClick={() => setVideoPlaying(videoPlaying^true)} style={styleCamera}>
         <Image src={videoPlaying?cameraON:cameraOFF} alt="Web cam svg" width={50} height={50}/>
      </button>
      <button onClick={() => setAudioPlaying(audioPlaying^true)} style={styleMicrophone}>
         <Image src={audioPlaying?microphoneOn:microphoneOff} alt="Microphone svg" width={50} height={50}/>   
      </button> 
      <style jsx> {`
      video{
          transform:scaleX(-1);
          height:77.5vh;
          width:46vw;
        }
      `}
      </style>
    </div>
    {session?.user?(<div style={{paddingLeft:'15%',paddingTop:'10%',fontSize:'3em'}}> Ready to join?
    <div>
    <button type="button" style={styleJoin} onClick={handleJoin}>
    Join Now   
   </button>
    </div>
    </div>):
    (<div style={{paddingLeft:'15%',paddingTop:'10%',fontSize:'3em'}}><label>What&apos;s your name</label>
    <input type="text" onChange={(e)=>setName(e.target.value)}  maxLength={60} style={{backgroundColor:'#edebe6',border:'none',fontSize:'.5em'}} placeholder='your name' />
    <div>
    <button type="button" style={styleJoin} onClick={handleJoin}>
    Join Now   
   </button>
    </div>
    </div>)} 
     </div>
    </>);
}

export default DualMeet;
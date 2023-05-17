/** Import Section Begin **/
import { useRef, useState, useEffect } from 'react';
import NavigationBar  from "./NavigationBar";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Peer from "peerjs";
import {useRouter} from "next/router";
/** Import Section End **/

const DualMeet=()=>{
  /** Declaration Section Begin **/

  const [startMeeting,setStartMeeting]=useState(false);
  const [name,setName]=useState('');
  const { data: session, status } = useSession();
  const styleJoin={height:'4%',backgroundColor:'#1a73e8',color:'#fff',fontWeight:'bold',cursor:'pointer',fontSize:'1em'};
  const [stream, setStream] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [audioPlaying,setAudioPlaying] = useState(true);
  const localVideoRef = useRef();
  const remoteVideoRef= useRef();
  const router=useRouter();
  const meetingId=router.pathname;
  const userImage=session?.user?session.user.image:'/person.svg';
 /** Declaration Section End **/


 /** Inline css Section Begin **/

const styleCamera={
  position:'absolute',
  marginTop:'-5%',
  height:'10%',
  width:'5%',
  left:'18%',
  borderRadius:'50%',
  backgroundColor:videoPlaying?'transparent':'red',
  color:'red'
}
const styleMicrophone={
    position:'absolute',
    marginTop:'-5%',
    height:'10%',
    width:'5%',
    left:'18%',
    marginLeft:'10%',
    borderRadius:'50%',
    backgroundColor:audioPlaying?'transparent':'red',
}
const styleEndCall={
    position:'absolute',
    height:'11%',
    width:'4.8%',
    left:'18%',
    marginLeft:'20%',
    borderRadius:'50%',
    backgroundColor:'white'
}
 /** Inline css Section Begin **/

 /** Functions Section Begin **/

const getVideoMedia = async () => {
  try {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true,audio:true});
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
}
const joinMeeting=()=>{
  const peer=new Peer();
  peer.on('open', (id) => {
        let call = peer.call('panwar2001', stream)
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject=remoteStream;
        })
    })
}

const handleJoin=()=>{
    name.trim()!==''?setStartMeeting(true):alert('Please Enter your name');
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

/** Conditional Section Begin **/
  if(status=='loading'){
    return <>Loading ...</>;
  }
  if(startMeeting){
  return <>
    <div style={{backgroundColor:'black',height:'100vh'}}>
        <video ref={localVideoRef} autoPlay muted className="video1" />
        {!videoPlaying&&<Image src={userImage} height={150} width={150} style={{borderRadius:'50%',marginLeft:'33%',marginTop:'-18%',transform: 'translate(-50%, -50%)',backgroundColor:'white'}} alt="User image"/>}
        {videoPlaying&&<Image src={userImage} height={150} width={150} style={{borderRadius:'50%',marginLeft:'33%',marginTop:'-18%',backgroundColor:'white'}} alt="User image"/>}
        <div className="posVideo2">
       <video ref={remoteVideoRef} autoPlay muted className="video2"/>
       <div>
       <button onClick={() => setVideoPlaying(videoPlaying^true)} style={styleCamera}>
           <Image src={videoPlaying?'webcam/cameraON.svg':'webcam/cameraOFF.svg'} alt="Web cam svg" width={50} height={50}/>
        </button>
        <button onClick={() => setAudioPlaying(audioPlaying^true)} style={styleMicrophone}>
           <Image src={audioPlaying?'microphone/microphoneOn.svg':'microphone/microphoneOff.svg'} alt="Microphone svg" width={50} height={50}/>   
        </button> 
        <button  style={styleEndCall}>
           <Image src={'endCall.svg'} onClick={()=>handleDisconnect()} alt="End call svg" width={50} height={50}/>   
        </button>
        <button onClick={()=>createMeeting()}>
          create
        </button>
        <button onClick={()=>joinMeeting()}>
          join
        </button>
        </div> 
       </div>
        <style jsx>
        {`
            video {
              transform: scaleX(-1);
            }
            .video1{
              height:77.5vh;
              width:46vw;
              margin-left:10%;
              margin-top:2%;
              background-color:black;
            }
            .video2{
              width:30%;
              height:30%;
              background-color:black;
            }
            .posVideo2{
               padding-left:60%;
            }
          `}
        </style>
      </div>
    </>
  }
  /** Conditional Section End **/
    return (<>
    <NavigationBar email={session?.user?.email} image={session?.user?.image}/>
    <div style={{display:'flex'}}>
    <div style={{paddingTop:'3%',paddingLeft:'3%'}}>
       <div>
      <video ref={localVideoRef} autoPlay muted />
      </div>
      <button onClick={() => setVideoPlaying(videoPlaying^true)} style={styleCamera}>
         <Image src={videoPlaying?'webcam/cameraON.svg':'webcam/cameraOFF.svg'} alt="Web cam svg" width={50} height={50}/>
      </button>
      <button onClick={() => setAudioPlaying(audioPlaying^true)} style={styleMicrophone}>
         <Image src={audioPlaying?'microphone/microphoneOn.svg':'microphone/microphoneOff.svg'} alt="Microphone svg" width={50} height={50}/>   
      </button> 
      <style jsx> {`
      video{
          transform:scaleX(-1);
          background-color:black;
          height:77.5vh;
          width:46vw;
        }
      `}
      </style>
    </div>
    {session?.user?(<div style={{paddingLeft:'15%',paddingTop:'10%',fontSize:'3em'}}> Ready to join?
    <div>
    <button type="button" style={styleJoin} onClick={()=>setStartMeeting(true)}>
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
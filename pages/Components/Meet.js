import Peer from "peerjs";
import Image from "next/image";
import { useRef, useState, useEffect } from 'react';
import {useRouter} from "next/router";
const Meet =  ({userImage}) => {
  const [stream, setStream] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [audioPlaying,setAudioPlaying] = useState(true);
  const localVideoRef = useRef();
  const remoteVideoRef= useRef();
  const router=useRouter();
  const styleCamera={
    position:'absolute',
    height:'10%',
    width:'5%',
    left:'18%',
    borderRadius:'50%',
    backgroundColor:videoPlaying?'transparent':'red',
    color:'red'
  }
  const styleMicrophone={
      position:'absolute',
      height:'10%',
      width:'5%',
      left:'18%',
      marginLeft:'10%',
      borderRadius:'50%',
      backgroundColor:videoPlaying?'transparent':'red',
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
      localVideoRef.current.srcObject=stream;
  }
  const startVideoMedia=()=>{
    if(!stream)return;
    stream.getVideoTracks().forEach((track) => {
      track.enabled=true;
    });
    localVideoRef.current.srcObject=stream;
  }
  const stopVideoMedia=()=>{
    if(!stream)return;
    stream.getVideoTracks().forEach((track) => {
      track.enabled=false;
    });
    localVideoRef.current.srcObject=stream;
  }
  
  useEffect(()=>{
    getVideoMedia();
  },[]);

  useEffect(() => {
    videoPlaying?startVideoMedia():stopVideoMedia();
    audioPlaying?StartAudioMedia():StopAudioMedia();
    return ()=>{StopAudioMedia();stopVideoMedia();} //clean up on component unmount
  }, [videoPlaying,audioPlaying]);



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
         <Image src={'endCall.svg'} onClick={()=>router.replace('/')} alt="End call svg" width={50} height={50}/>   
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
  )
  </>
};

export default Meet;

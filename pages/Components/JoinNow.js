import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
const JoinNow = () => {
  const [stream, setStream] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [audioPlaying,setAudioPlaying] = useState(true);
  const localVideoRef = useRef();
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
    return ()=>{StopAudioMedia();startVideoMedia();} //clean up on component unmount
  }, [videoPlaying,audioPlaying]);

  return (<div style={{paddingTop:'3%',paddingLeft:'3%'}}>
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
  );
};

export default JoinNow;
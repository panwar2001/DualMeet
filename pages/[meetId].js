'use client'
import { useRouter} from 'next/router';
import NavigationBar from './Components/MeetNow/NavigationBar';
import Copy from './Components/MeetNow/Copy';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';
import Image from 'next/image';
import styles from './meetId.module.css';

const MeetingLink=()=>{
const router=useRouter();
const meetId=router.query.meetId;
const [name,setName]=useState('');
const [videoPlaying, setVideoPlaying] = useState(true);
const [audioPlaying,setAudioPlaying] = useState(true);
const { data: session, status } = useSession();
const localVideoRef = useRef();
const [stream, setStream] = useState(null);
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
  const AudioMedia = () => {
      stream.getAudioTracks().forEach((track) => {
        track.enabled=audioPlaying^true;
      });
      setAudioPlaying(audioPlaying^true);
      localVideoRef.current.srcObject=stream;
  };

  const VideoMedia=()=>{
    
    if(videoPlaying){
       localVideoRef.current.srcObject=null;
       stream.getVideoTracks().forEach((track) =>track.stop());
      }
   else{
     navigator.mediaDevices.getUserMedia({ audio:true, video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
      },}).then((stream)=>{
        setStream(stream);
        localVideoRef.current.srcObject=stream;    
      })
   }
    setVideoPlaying(videoPlaying^true);
  }
const handleJoin=()=>{
    if(session?.user){
      setName(session.user.name);
    }
   else if(name.trim()===''){
      alert('Please Enter your name');    
      return;
    }
    router.push({
      pathname:'./Components/DualMeet/DualMeet',
      query: {name:name},
    }, `/${meetId}`);
}
useEffect(()=>{
  getVideoMedia()
  return ()=>{    
    if(stream){
    stream.getVideoTracks().forEach((track) =>track.stop());
    setStream(null);
    }
  }
},[]);
  
return (<>
    <NavigationBar email={session?.user?.email} image={session?.user?.image}/>
    <Copy text={meetId}/>
    <div className={styles.Align}>
        <div className={styles.AlignContent} >
           <div>            
              <video ref={localVideoRef} autoPlay muted/>
              <div className={styles.posButton}>
                  <button onClick={() => VideoMedia()} style={styleCamera}>
                    <Image src={videoPlaying?'/cameraON.svg':'/cameraOFF.svg'} alt="Web cam svg" width={50} height={50}/>
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   <button onClick={() => AudioMedia()} style={styleMicrophone}>
                     <Image src={audioPlaying?'/microphoneOn.svg':'/microphoneOff.svg'} alt="Microphone svg" width={50} height={50}/>   
                   </button> 
              </div>
           </div>
        </div>
    {session?.user?(<div className={styles.styleJoin}> Ready to join?
    <div>
    <button type="button" className={styles.styleJoin} onClick={handleJoin}>
    Join Now   
   </button>
    </div>
    </div>):
    (<div className={styles.join}><label>What&apos;s your name</label>
    <input type="text" onChange={(e)=>setName(e.target.value)}  maxLength={60} style={{backgroundColor:'#edebe6',border:'none',fontSize:'.5em'}} placeholder='your name' />
    <div>
    <button type="button" className={styles.styleJoin} onClick={handleJoin}>
    Join Now   
   </button>
    </div>
    </div>)} 
     </div>
    </>);
}
export default MeetingLink;
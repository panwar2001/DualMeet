'use client'
import { useRouter} from 'next/router';
import NavigationMeet from './Components/navigation/NavigationMeet';
import Copy from './Components/Copy';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';
import Image from 'next/image';
import cameraOFF from './svg/cameraOFF.svg';
import cameraON from './svg/cameraON.svg';
import microphoneOn from './svg/microphoneOn.svg';
import microphoneOff from './svg/microphoneOff.svg';

const MeetingLink=()=>{
const router=useRouter();
const meetId=router.query.meetId;
const [name,setName]=useState('user name');
const [videoPlaying, setVideoPlaying] = useState(true);
const [audioPlaying,setAudioPlaying] = useState(true);
const { data: session, status } = useSession();
const localVideoRef = useRef();
const [stream, setStream] = useState(null);

const styleJoin={
    height:'4%',
    backgroundColor:'#1a73e8',
    color:'#fff',
    fontWeight:'bold',
    cursor:'pointer',
    fontSize:'1em'
  };
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
    router.push('/Components/DualMeet',`/${meetId}`);
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
    <NavigationMeet email={session?.user?.email} image={session?.user?.image}/>
    <Copy text={meetId}/>
    <div className="Align">
        <div className="AlignContent" >
           <div>            
              <video ref={localVideoRef} autoPlay muted/>
              <div className='posButton'>
                  <button onClick={() => VideoMedia()} style={styleCamera}>
                    <Image src={videoPlaying?cameraON:cameraOFF} alt="Web cam svg" width={50} height={50}/>
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   <button onClick={() => AudioMedia()} style={styleMicrophone}>
                     <Image src={audioPlaying?microphoneOn:microphoneOff} alt="Microphone svg" width={50} height={50}/>   
                   </button> 
              </div>
           </div>
        </div>
    {session?.user?(<div className='join'> Ready to join?
    <div>
    <button type="button" style={styleJoin} onClick={handleJoin}>
    Join Now   
   </button>
    </div>
    </div>):
    (<div className='join'><label>What&apos;s your name</label>
    <input type="text" onChange={(e)=>setName(e.target.value)}  maxLength={60} style={{backgroundColor:'#edebe6',border:'none',fontSize:'.5em'}} placeholder='your name' />
    <div>
    <button type="button" style={styleJoin} onClick={handleJoin}>
    Join Now   
   </button>
    </div>
    </div>)} 
     </div>
     <style jsx> {`
      video{
          transform:scaleX(-1);
          height:60.5vh;
          width:45vw;
          background-color:black;
        }
        .posButton{
          position:relative;
          bottom:12vh;
          transform:translate(38%)
        }
        .Align{
          display:flex;
        }
        .join{
          padding-left:15%;
          padding-top:10%;
          font-size:3em;
        }
        .AlignContent{
          padding-top:3%;
          padding-left:3%;
        }

        @media(max-width:960px){
          .Align{
            display:block;
            margin-top:-35%;
          }
          video{
            position:relative;
            height:90vh;
            width:95vw;
            justify-content:center;
            align-content:center;
          } 
          .posButton{
            transform:translate(34%,-80%)
          } 
           .join{
            display:block;
          position:relative;
          padding-left:15%;
          margin-top:-60%;
          font-size:3em;
        }
        }
      `}
      </style>
    </>);
}
export default MeetingLink;
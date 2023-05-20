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
import { SideBar, SideBarButton } from './SideBar';

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
  const [name,setName]=useState('df');
  const [slideClass,setSlideClass] = useState("slide");
  /** MATTER OF CONCERN **/
  // if(session?.user) setName(session.user.name);
  /** MATTER OF CONCERN **/

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
  if(!stream)return;
  stream.getVideoTracks().forEach((track) => {
    track.enabled=false;
  });
  if(localVideoRef.current)
  localVideoRef.current.srcObject=stream;
}

const createMeeting=()=>{
  import('peerjs').then(({ default: Peer }) => {
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
  });

}
const joinMeeting=()=>{
  import('peerjs').then(({ default: Peer }) => {
  const peer=new Peer();
  console.log('joining...')
  peer.on('open', (id) => {
        let call = peer.call(meetId, stream)
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject=remoteStream;
        })
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
        <video ref={remoteVideoRef} autoPlay muted className="video1"/>
    </div>    
       <div className="posVideo2">
 <video ref={localVideoRef} autoPlay muted className="video2"/>
 {!videoPlaying&&<Image src={userImage} height={150} width={150} style={userImageStyle} alt="User image"/>}
   </div>

   <SideBar names={['ayush','arjun','aman','aniket','anshu','alen','amar']} slideClass={slideClass} setSlideClass={setSlideClass}/>

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
  /** Conditional rendering Section End **/
    return (<>
    <NavigationMeet email={session?.user?.email} image={session?.user?.image}/>
    <div className="Align">
        <div className="AlignContent" >
           <div>            
              <video ref={localVideoRef} autoPlay muted/>
              <div className='posButton'>
                  <button onClick={() => setVideoPlaying(videoPlaying^true)} style={styleCamera}>
                    <Image src={videoPlaying?cameraON:cameraOFF} alt="Web cam svg" width={50} height={50}/>
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   <button onClick={() => setAudioPlaying(audioPlaying^true)} style={styleMicrophone}>
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
          height:77.5vh;
          width:46vw;
        }
        .posButton{
          position:relative;
          bottom:20vh;
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

export default DualMeet;
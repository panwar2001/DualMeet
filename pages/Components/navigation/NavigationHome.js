import Image from 'next/image';
import Login from "../GoogleAuth.js/Login";
import Logout from '../GoogleAuth.js/logout';
import { useRouter } from 'next/router';
const NavigationHome=({isAuth})=>{
const headerRowAlign={
    display:'flex',
    position:'relative',
    backgroundColor:'black'
}

const joinButtonStyle={
    height:'40px',
    backgroundColor:'white',
    color:'#1a73e8',
    fontWeight:'bold',
    cursor:'pointer',
    border:'2px solid #eee',
    fontSize:'15px',
}
const startMeetingDiv={
    position:'relative',
    
}
const startMeetingButton={
    position:'relative',
    height:'40px',
    backgroundColor:'#1a73e8',
    color:'#fff',
    fontWeight:'bold',
    cursor:'pointer',
    border:'2px solid #eee',
    fontSize:'15px'
}
const DualMeet={
color:'white',
fontSize:'1.0em'
}

const router=useRouter();
const generateUniqueId=()=>{
  const time=Date.now();
  return time.toString(16);
}
const Meeting=()=>{
  router.push(`/${generateUniqueId()}`);
}

return (<div style={headerRowAlign}>
<Image src='cam.svg' alt="CamRecorder" height={40} width={70} />
<b style={DualMeet}>DualMeet</b>
<div style={{position:'absolute',right:'0'}}> 
   <div className='PosRight'>
     {isAuth?(<Login />):(<Logout/>)}
   </div>
   <div className='PosRight'>
     <button style={joinButtonStyle} onClick={()=>Meeting()}>Join a meeting</button>
   </div>
    <div className='PosRight'>
      <button type="button" style={startMeetingButton} onClick={()=>Meeting()}>
        Start a meeting
      </button>
     </div>
</div>
<style>{`
.PosRight{
    float:right;
}
`}</style>
</div>)
};

export default NavigationHome;
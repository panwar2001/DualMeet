import Image from 'next/image';
import Login from "../GoogleAuth.js/Login";
import Logout from '../GoogleAuth.js/logout';
const NavigationHome=({isAuth})=>{
const headerRowAlign={
    display:'flex',
    backgroundColor:'black'
}
const auth={
    position:'absolute',
    right:'0',
    marginRight:'25%'
}    
const meetButtonDiv={
    position:'absolute',
    right:'0',
    marginRight:'15%'
}
const joinButtonStyle={
    height:'40px',
    backgroundColor:'white',
    color:'#1a73e8',
    fontWeight:'bold',
    cursor:'pointer',
    border:'2px solid #eee',
    fontSize:'15px'
}
const startMeetingDiv={
    position:'absolute',
    right:'0',
    marginRight:'5%'
}
const startMeetingButton={
    height:'40px',
    backgroundColor:'#1a73e8',
    color:'#fff',
    fontWeight:'bold',
    cursor:'pointer',
    border:'2px solid #eee',
    fontSize:'15px'
}
return (<div style={headerRowAlign}>
<Image src='cam.svg' alt="CamRecorder" height={40} width={70} />
<b style={{color:'white',fontSize:'1.3em'}}>DualMeet</b>
<div style={auth}>
{isAuth?(<Login />):(<Logout/>)}
</div>
<div style={meetButtonDiv}>
<button style={joinButtonStyle}>Join a meeting</button>
</div>
<div style={{position:'absolute',right:'0',marginRight:'5%'}}>
<button type="button" style={startMeetingButton}>
    Start a meeting
</button>
</div>
</div>);
};

export default NavigationHome;
import Image from 'next/image';
import Login from "./GoogleAuth.js/Login";
import Logout from './GoogleAuth.js/logout';
const Header=({isAuth})=>{
const css={
    display:'flex',
    backgroundColor:'black'
}
return (<div style={css}>
<Image src='cam.svg' alt="CamRecorder" height={40} width={70} />
<b style={{color:'white',fontSize:'1.3em'}}>DualMeet</b>
<div style={{position:'absolute',right:'0',marginRight:'25%'}}>
{isAuth?(<Login />):(<Logout/>)}
</div>
<div style={{position:'absolute',right:'0',marginRight:'15%'}}>
<button style={{height:'40px',backgroundColor:'white',color:'#1a73e8',fontWeight:'bold',cursor:'pointer',border:'2px solid #eee',fontSize:'15px'}}>Join a meeting</button>
</div>
<div style={{position:'absolute',right:'0',marginRight:'5%'}}>
<button type="button" style={{height:'40px',backgroundColor:'#1a73e8',color:'#fff',fontWeight:'bold',cursor:'pointer',border:'2px solid #eee',fontSize:'15px'}}>
    Start a meeting
</button>
</div>
</div>);
};

export default Header;
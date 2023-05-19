import Image from 'next/image';
import Login from "../GoogleAuth.js/Login";
import Logout from '../GoogleAuth.js/logout';
const NavigationDashboard=({isAuth})=>{
const headerRowAlign={
    display:'flex',
    backgroundColor:'black'
}
const auth={
    right:'0',
}    
return (<div style={headerRowAlign}>
<Image src='cam.svg' alt="CamRecorder" height={40} width={70} />
<b style={{color:'white',fontSize:'1.3em'}}>DualMeet</b>
<div style={auth}>
{isAuth?(<Login />):(<Logout/>)}
</div>
</div>);
};

export default NavigationDashboard;
import Image from 'next/image';
import Login from "./GoogleAuth.js/Login";
import Logout from './GoogleAuth.js/logout';
 const NavigationBar = ({email,image}) => {
    const css = {
        display: 'flex',
        backgroundColor: 'black',
    }
        if (email) {
        return (<><div style={css}>
            <Image src='cam.svg' alt="CamRecorder" height={40} width={70} />
            <b style={{ color: 'white',fontSize:'1.3em' }}>DualMeet</b>
            <div style={{ paddingLeft: '60%' }}>
                <Logout />
            </div>
            <div style={{ color: 'white', marginLeft: 'auto', marginRight: '0' }}>
                {email}
            </div>
            <div style={{ marginLeft: 'auto', marginRight: '0' }}>
                <Image src={image} alt="user profile image" style={{ borderRadius: '50%' }} height={40} width={40} />
            </div>
        </div>
        </>);
    }
    return (<div style={css}>
        <Image src='cam.svg' alt="CamRecorder" height={40} width={70} />
        <b style={{ color: 'white' ,fontSize:'2em'}}>Meet</b>
        <div style={{ marginLeft: 'auto', marginRight: '5%' }}>
           <Login />
        </div>
    </div>);
}
export default NavigationBar;
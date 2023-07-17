import Image from 'next/image';
import Login from "../GoogleAuth/Login";
import Logout from '../GoogleAuth/logout';
import cam from '@/public/cam.svg'
 const NavigationMeet = ({email,image}) => {
    const joinStyle = {
        display: 'flex',
        backgroundColor: 'black',
    }
    const DualMeet={ 
        color: 'white',
        fontSize:'1.3em'
     }
     const Info={
        display:'flex',
        position:'absolute',
        right:'0'
     }
    const profile={
        position:'relative'
     }
     const circularImage={
        borderRadius:'50%'
     }
        if (email) {
        return (<><div style={joinStyle}>
            <div>
              <Image src={cam} alt="CamRecorder" height={40} width={70} />
            </div>
            <div>
            <b style={DualMeet}>DualMeet</b>
            </div>
            <div style={Info}>
               <div >
                  <Logout />
                  &nbsp;&nbsp;
               </div>
               <div className="email">
                  {email}
                </div>
                <div style={profile}>
                   <Image src={image} alt="user profile image" style={circularImage} height={40} width={40} />
                </div>
             </div>
        </div>
        <style jsx>{`
        @media(max-width:944px){
               .email{
                display:none;
               }
            }
            .email{
                position:relative;
                color: white;   
            }
        `}</style>
        </>);
    }
    return (<div style={joinStyle}>
        <div>
          <Image src={cam} alt="CamRecorder" height={40} width={70} />
        </div>
        <div>
           <b style={DualMeet}>DualMeet</b>
        </div>
        <div style={Info}>
           <Login />
            &nbsp;&nbsp;
        </div>
    </div>);
}
export default NavigationMeet;
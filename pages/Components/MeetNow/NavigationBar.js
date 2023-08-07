import Image from 'next/image';
import Login from "../GoogleAuth/Login";
import Logout from '../GoogleAuth/logout';
import styles from "./NavigationBar.module.css";
 const NavigationBar=({email,image}) => {
        return <div className={styles.joinStyle}>
              <Image src='/cam.svg' alt="CamRecorder" height={40} width={70} />
               <b >DualMeet</b>
               <div className={styles.Info}>
                  { email?<><Logout />
                     &nbsp; &nbsp;
                   <div className={styles.email}>
                      {email}
                   </div>
                   <div className={styles.profile}>
                       <Image src={image} alt="user profile image" className={styles.circularImage} height={40} width={40} />
                   </div></>:
                   <><Login/></>}
              </div>
          </div>
}
export default NavigationBar;
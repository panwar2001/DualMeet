import Image from 'next/image';
import Login from "../GoogleAuth/Login";
import { useRouter } from 'next/router';
import styles from './NavigationBar.module.css';
const NavigationBar= ()=>{
const router=useRouter();
const Meeting=()=>{
  router.push(`/${Date.now().toString(16)}`);
}
return <div className={styles.headerRowAlign}>
<Image src='cam.svg' alt="CamRecorder" height={40} width={70} />
<b className={styles.DualMeet}>DualMeet</b>
<div style={{position:'absolute',right:'0'}}> 
     <Login  className={styles.PosRight}/>
      <button className={styles.joinButtonStyle}  onClick={()=>Meeting()}>
        Join a meeting
      </button>
      <button type="button" className={styles.startMeetingButton}  onClick={()=>Meeting()}>
        Start a meeting
      </button>
</div>
</div>
};

export default NavigationBar;
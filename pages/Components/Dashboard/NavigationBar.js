import Image from 'next/image';
import Logout from '../GoogleAuth/logout';
import styles from './NavigationBar.module.css';
const NavigationBar=()=>{    
return (<div class={styles.headerRowAlign}>
<Image src='cam.svg' alt="CamRecorder" height={40} width={70} />
<b className={styles.dualmeet}>DualMeet</b>
<div className={styles.auth}>
<Logout/>
</div>
</div>);
};

export default NavigationBar;
import Image from 'next/image';
import Logout from '../GoogleAuth/logout';
import styles from './NavigationBar.module.css';
export default ()=>(
<div className={styles.headerRowAlign}>
<Image src='cam.svg' alt="CamRecorder" height={40} width={70} />
<b className={styles.dualmeet}>DualMeet</b>
<div className={styles.auth}>
<Logout/>
</div>
</div>
);
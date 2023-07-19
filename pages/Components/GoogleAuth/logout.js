import {signOut} from 'next-auth/react';
import styles from "./auth.module.css";
export default ()=>(
<button onClick={()=>signOut()} className={styles.auth}>
  Sign out
</button>
);
import {signOut} from 'next-auth/react';
import styles from "./auth.module.css";
const Logout=()=>(
<button onClick={()=>signOut()} className={styles.auth}>
  Sign out
</button>
);
export default Logout;
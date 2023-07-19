import {signIn} from 'next-auth/react';
import styles from "./auth.module.css";
export default ()=>(
  <button onClick={()=>signIn('google')} className={styles.auth}>
    Sign In
  </button>
);
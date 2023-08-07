import {signIn} from 'next-auth/react';
import styles from "./auth.module.css";
const Login= ()=>(
  <button onClick={()=>signIn('google')} className={styles.auth}>
    Sign In
  </button>
);
export default Login;
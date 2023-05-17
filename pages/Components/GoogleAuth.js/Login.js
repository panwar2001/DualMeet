import {signIn} from 'next-auth/react';
export default function Login(){
    return (
      <>
    <button onClick={()=>signIn('google')} style={{fontWeight:'bold',cursor:'pointer',border:'2px solid #fff',fontSize:'15px',height:'40px'}}>Sign In</button>
    </>);
}
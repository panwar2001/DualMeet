import {signIn} from 'next-auth/react';
export default function Login(){
  const LoginButtonStyle={
    fontWeight:'bold',
    cursor:'pointer',
    border:'2px solid #fff',
    fontSize:'15px',
    height:'40px'
   }
    return (<>
    <button onClick={()=>signIn('google')} style={LoginButtonStyle}>Sign In</button>
    </>);
}
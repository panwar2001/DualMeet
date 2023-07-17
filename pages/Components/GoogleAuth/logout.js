import {signOut} from 'next-auth/react';
export default function Logout(){
  const logoutButtonStyle={
    fontWeight:'bold',
    cursor:'pointer',
    border:'2px solid #fff',
    fontSize:'15px',
    height:'40px'
  }
   return (<>
       <button onClick={()=>signOut()} style={logoutButtonStyle}>Sign out</button>
    </>);
}
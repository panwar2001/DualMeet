import {signOut} from 'next-auth/react';

export default function Logout(){
    return (<>
        <button onClick={()=>signOut()} style={{fontWeight:'bold',cursor:'pointer',border:'2px solid #fff',fontSize:'15px',height:'40px'}}>Sign out</button>
      </>);
}
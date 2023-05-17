import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";
import NavigationBar  from "./Components/NavigationBar";
import { useSession } from 'next-auth/react';
const JoinNow = dynamic(()=> import('./Components/JoinNow'),{ssr:false});
const Meet = dynamic(() => import('./Components/Meet'), { ssr: false });
export default function MeetingLink(){
  const [startMeeting,setStartMeeting]=useState(false);
  const [name,setName]=useState('');
  const router=new useRouter();
   const { data: session, status } = useSession();
   if(status=='loading'){
     return <>Loading ...</>;
   }
  const styleJoin={height:'4%',backgroundColor:'#1a73e8',color:'#fff',fontWeight:'bold',cursor:'pointer',fontSize:'1em'};
  const meetingId=router.query.meetingId;
  const handleJoin=()=>{
    name.trim()!==''?setStartMeeting(true):alert('Please Enter your name');
  }
  if(startMeeting){
    return <Meet userName={session?.user?session.user.name:name} userImage={session?.user?session.user.image:'./person.svg'} meetId={meetingId}/>
  }
    return (<>
    <NavigationBar email={session?.user?.email} image={session?.user?.image}/>
    <div style={{display:'flex'}}>
    <JoinNow />
    {session?.user?(<div style={{paddingLeft:'15%',paddingTop:'10%',fontSize:'3em'}}> Ready to join?
    <div>
    <button type="button" style={styleJoin} onClick={()=>setStartMeeting(true)}>
    Join Now   
   </button>
    </div>
    </div>):
    (<div style={{paddingLeft:'15%',paddingTop:'10%',fontSize:'3em'}}><label>What&apos;s your name</label>
    <input type="text" onChange={(e)=>setName(e.target.value)}  maxLength={60} style={{backgroundColor:'#edebe6',border:'none',fontSize:'.5em'}} placeholder='your name' />
    <div>
    <button type="button" style={styleJoin} onClick={handleJoin}>
    Join Now   
   </button>
    </div>
    </div>)} 
     </div>
    </>);
}
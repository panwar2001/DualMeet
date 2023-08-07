import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from "./JoinMeeting.module.css";
const JoinMeeting=()=>{
  const [MeetingId,setMeetingId]=useState('');
  const router=useRouter();
  const Meeting=()=>{
    router.push(`/${Date.now().toString(16)}`);
  }
  const joinMeeting=()=>{
    setMeetingId(MeetingId.trim());
    if(MeetingId.length<8||(/[^a-zA-Z0-9]/.test(MeetingId))){
      toast.warn('Invalid DualMeet ID', {
        position: toast.POSITION.TOP_CENTER
      });
    }else{
      router.push(`/${MeetingId}`);
    }
  }
    return <>
     <ToastContainer />
     <div className={styles.connect}>
       <h1>Connect with anyone, anywhere with video calls and meetings.</h1>
       <h3>
          Enjoy seamless, secure, high-quality video meetings and calls with DualMeet - the video conferencing service that&apos;s available on any device.
       </h3>
    </div>
    <div className={styles.CreateOrJoin}>
          <button  onClick={()=>Meeting()} className={styles.createNewMeetingButton}>
             <Image src='/cam.svg' alt='Brand logo' height={30} width={40}/>
              new meeting
          </button>
          OR
          <input type='text' name="join" onChange={(e)=>setMeetingId(e.target.value)} placeholder='Enter a code or link' />
          <button  type='button' className={styles.joinButton } onClick={()=>joinMeeting()} > 
              Join
          </button>
     </div>   
    </>;
}
export default JoinMeeting;
import NavigationBar from './NavigationBar'
import Image from 'next/image';
import ImageSlider from './ImageSlider';
import {useRouter} from 'next/router'; 
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from "./Dashboard.module.css";

const Dashboard=()=>{
  const [MeetingId,setMeetingId]=useState('');
  const generateUniqueId=()=>{
    const time=Date.now();
    return time.toString(16);
  }
  const router=useRouter();
  const Meeting=()=>{
    router.push(`/${generateUniqueId()}`);
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
               <NavigationBar/>
               <div className={styles.sliderResponsive}>
                  <div className={styles.positionContent}>
                  <strong className={styles.styleMeetingText}>
                     Enjoy top-tier video meetings <br/>at no cost.
                  </strong>
                   <p >Designed  secure business meeting service, DualMeet<br/> to make it free and accessible to everyone. <br/></p>
                   <div className={styles.CreateOrJoin}>
                     <div>
                       <button  onClick={()=>Meeting()} className={styles.createNewMeetingButton}><table><tbody><tr><td><Image src='/cam.svg' alt='Brand logo' height={30} width={40}/></td><td> new meeting</td></tr></tbody></table></button>
                     </div>
                      &nbsp;&nbsp;
                      <div>
                         <input type='text' name="join" onChange={(e)=>setMeetingId(e.target.value)} placeholder='Enter a code or link' maxLength={20}/>
                         <button onClick={()=>joinMeeting()} type='button' className={styles.joinButton}> Join</button>
                      </div>
                   </div>
                </div>
              <div className={styles.slider}>
              <ImageSlider style={{paddingLeft:'50%'}}/>
              </div>
            </div>
      </>
  }
  export default Dashboard;
import Header from './Header'
import Image from 'next/image';
import ImageSlider from './ImageSlider';
import {useRouter} from 'next/router'; 
import { useState } from 'react';
export default function Dashboard() {
  const [MeetingId,setMeetingId]=useState('');
  const generateUniqueId=()=>{
    const time=Date.now();
    return time.toString(16);
  }
  const router=useRouter();
  const createNewMeeting=()=>{
    router.push(`/${generateUniqueId()}`);
  }
  const joinNewMeeting=()=>{
    router.push(`/${MeetingId.trim()}`)
  }
    return (<>
              <Header/>
              <div style={{display:'flex'}}>
              <div style={{paddingTop:'3%',marginLeft:'5%',width:'70%'}}>
                <h1 style={{fontSize:'2.7em',lineHeight:'.5'}}>
                 Enjoy top-tier video meetings 
                </h1>
                <h1 style={{fontSize:'2.7em',lineHeight:'.5'}}>
                 at no cost.
                 </h1>
                <p style={{color:'grey'}}>Designed  secure business meeting service, DualMeet<br/> to make it free and accessible to everyone. <br/></p>
                <div style={{display:'flex',paddingTop:'5%'}}>
                 <div>
                  <button  onClick={createNewMeeting} style={{height:'40px',backgroundColor:'#1a73e8',color:'#fff',fontWeight:'bold',cursor:'pointer',border:'2px solid #eee',fontSize:'20px',display:'flex'}}><Image src='/cam.svg' alt='Brand logo' height={30} width={40}/> new meeting</button>
                </div>
                <div>
                 or 
                <input type='text' name="join" onChange={(e)=>setMeetingId(e.target.value)} placeholder='Enter a code or link' style={{fontSize:'1.3em'}}/>
                <button onClick={joinNewMeeting} type='button' style={{fontSize:'1.3em',backgroundColor:'transparent',color:'blue',cursor:'pointer '}}> Join</button>
                 </div>
                </div>
              </div>
              <div style={{paddingTop:'5%',paddingRight:'4%'}}>
              <ImageSlider style={{paddingLeft:'50%'}}/>
              </div>
              </div>
      </>
    )
  }
  
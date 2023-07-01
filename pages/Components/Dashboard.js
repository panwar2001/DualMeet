import NavigationDashboard from './navigation/NavigationDashboard'
import Image from 'next/image';
import ImageSlider from './ImageSlider';
import {useRouter} from 'next/router'; 
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
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
  const styleMeetingText={
    fontSize:'2.7em',
    lineHeight:'1'
  }
  const createNewMeetingButton={
    backgroundColor:'#1a73e8',
    color:'#fff',
    fontWeight:'bold',
    cursor:'pointer',
    border:'2px solid #eee',
    fontSize:'20px'
  }
  const joinButton={
  fontSize:'1.5em',
  backgroundColor:'transparent',
  color:'blue',
  cursor:'pointer'
  }
    return (<>
               <ToastContainer />
               <NavigationDashboard/>
              <div className='sliderResponsive'>
                <div style={{paddingTop:'3%',marginLeft:'5%',width:'70%'}}>
                <h1 style={styleMeetingText}>
                 Enjoy top-tier video meetings <br/>at no cost.
                </h1>
                <p >Designed  secure business meeting service, DualMeet<br/> to make it free and accessible to everyone. <br/></p>
                <div className="CreateOrJoin">
                 <div>
                  <button  onClick={()=>Meeting()} style={createNewMeetingButton}><table><tbody><tr><td><Image src='/cam.svg' alt='Brand logo' height={30} width={40}/></td><td> new meeting</td></tr></tbody></table></button>
                </div>
                &nbsp;&nbsp;
                <div>
                <input type='text' name="join" onChange={(e)=>setMeetingId(e.target.value)} placeholder='Enter a code or link' maxLength={20}/>
                <button onClick={()=>joinMeeting()} type='button' style={joinButton}> Join</button>
                 </div>
                </div>
              </div>
              <div className="slider" >
              <ImageSlider style={{paddingLeft:'50%'}}/>
              </div>
              </div>
              <style jsx>{`
                .sliderResponsive{
                  display:flex;
                }
                .CreateOrJoin{
                  display:flex;
                  padding-top:5%;
                }
              @media(max-width:960px){
                .sliderResponsive{
                  display:block;
                  text-align:center;
                  align-content:center;
                  justify-content:center;
                }
                .CreateOrJoin{
                  display:block;
                  padding-top:5%;
                }
              }
              .slider{
                padding-top:5%;
                padding-right:4%;
              }
              p{
                color:grey;
              }
              input{
               font-size:1.5em;
               width:60%;
              }
              `}</style>
      </>
    )
  }
  
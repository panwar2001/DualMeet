import Image from 'next/image';
export default function Banner(){
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
    return (
    <>
    <h1 style={{paddingLeft:'5%',paddingRight:'5%'}}><b>Connect with anyone, anywhere with video calls and meetings.</b></h1>
    <h3 style={{color:'grey',paddingLeft:'5%'}}>Enjoy seamless, secure, high-quality video meetings and calls with DualMeet - the video conferencing service that&apos;s available on any device.</h3>
    <div className="CreateOrJoin">
       <div>
          <button   style={createNewMeetingButton}><table><tbody><tr><td><Image src='/cam.svg' alt='Brand logo' height={30} width={40}/></td><td> new meeting</td></tr></tbody></table></button>
       </div>
        &nbsp;<b>or</b>&nbsp;
       <div>
          <input type='text' name="join" onChange={(e)=>setMeetingId(e.target.value)} placeholder='Enter a code or link' />
          <button  type='button' style={joinButton}> Join</button>
       </div>
     </div>
     <style jsx>{`
     .CreateOrJoin{
      display:flex;
      padding-top:5%;
      } 
      @media(max-width:700px){
        .CreateOrJoin{
          display:block;
          padding-top:5%;
          justify-content:center;
          text-align:center;
        }
      }
      input{
        font-size:1.5em;
        width:60%;
       }
     `}</style>
    </>);
}
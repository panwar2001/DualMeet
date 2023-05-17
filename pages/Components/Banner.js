import Image from 'next/image';
export default function Banner(){
    return (
    <>
    <h1 style={{paddingLeft:'5%',paddingRight:'5%'}}><b>Connect with anyone, anywhere with video calls and meetings.</b></h1>
    <h3 style={{color:'grey',paddingLeft:'5%'}}>Enjoy seamless, secure, high-quality video meetings and calls with DualMeet - the video conferencing service that&apos;s available on any device.</h3>
    <form >
      <fieldset >
        <div style={{display:'flex'}}>
        <div>
         <button style={{height:'40px',backgroundColor:'#1a73e8',color:'#fff',fontWeight:'bold',cursor:'pointer',border:'2px solid #eee',fontSize:'20px',display:'flex'}}><Image src='/cam.svg' alt='Brand logo' height={30} width={40}/> Join a meeting</button>
         </div>
         <div>
          or 
         <input type='text' name="join" placeholder='Enter meeting code' style={{fontSize:'1.3em'}}/>
         <button type='button' style={{fontSize:'1.3em'}}> Join</button>
         </div>
         </div>
       </fieldset>
    </form>
  
    </>);
}
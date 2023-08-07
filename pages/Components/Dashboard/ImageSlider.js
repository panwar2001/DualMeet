 import { useState } from "react";
 import Image from "next/image";
const ImageSlider=()=>{
    const [index,setIndex]=useState(0);
    const leftSlide=()=>index>0?setIndex(index-1):0;
    const rightSlide=()=>index<2?setIndex(index+1):0;
    const images=['/user1.svg','/user2.svg','/user3.svg'];
    const title=[
       <div key={0}><div style={{fontSize:'1.5rem'}}>Get a link you can share </div><div style={{fontSize:'.8rem'}}>Click <b>New Meeting</b> to get a link you can send to people</div><div style={{fontSize:'.8rem'}}>you want to meet with</div></div>,
       <div key={1}><div style={{fontSize:'1.5rem'}}>Plan ahead</div><div style={{fontSize:'.8rem'}}>Click <b>New Meeting</b> to schedule meetings in Google</div><div style={{fontSize:'.8rem'}}>Calender and send invites to participants</div></div>,
       <div key={2}><div style={{fontSize:'1.5rem'}}>Your meeting is safe</div><div style={{fontSize:'.8rem'}}>No one can join a meeting unless invited or admitted by</div><div style={{fontSize:'0.8rem'}}>the host</div></div>
               ];
    const arrowLeft={
        width:'50px',
        height:'50px',
        borderRadius:'150%',
        opacity:index===0?'0.3':'1'
        }
        const pos={
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }
    const arrowRight={
        width:'50px',
        height:'50px',
        borderRadius:'100%',
        opacity:index===2?'0.3':'1'
    }
    return (
        <div style={{display:'flex',flexDirection:'column'}}>
    <div style={pos}>
        <div style={{padding:'3%'}}>
      <button onClick={()=>leftSlide()} style={arrowLeft} className='Left'>
       &#10094;
      </button>
      </div>
      <div>
      <Image src={images[index]} alt='sliding images' width={350} height={350} style={{height:"auto"}} />
      </div>
      <div style={{padding:'2%'}}>
      <button onClick={()=>rightSlide()} style={arrowRight} className='Right'>
      &#10095;
     </button>    
     </div>
     </div>
     <div style={{textAlign:'center'}}>
     {title[index]}
     <div >
        <span className="dot dot1"></span>
        <span className="dot dot2"></span>
        <span className="dot dot3"></span>
     </div>
     </div>
     <style jsx>{`
     button{
            background-color:rgba(0,0,0,0);
            border:rgba(0,0,0,0);
        }
    .Right:hover{
       background-color:${index!==2?'lightgrey':'white'};
       cursor:${index!==2?'pointer':'auto'};
    }
    .Left:hover{
        background-color:${index!==0?'lightgrey':'white'};
        cursor:${index!==0?'pointer':'auto'};
     }
     .dot{
        display:inline-block;
        margin:2px;
        width:7px;
        height:7px;
        border-radius:50%
     }
     .dot1{
        background-color:${index==0?'blue':'lightgrey'}
     }
     .dot2{
        background-color:${index==1?'blue':'lightgrey'}
     }
     .dot3{
        background-color:${index==2?'blue':'lightgrey'}
     }
    ` }
    </style>
     </div>
    );
}

export default ImageSlider;
import { useState ,React} from "react";
import group from '../svg/group.svg';
import Image from "next/image";
export const SearchIcon=()=>{
    const search={transform: "rotate(-90deg)",fontSize:'2em'};
   return <div style={search}>&#8981;</div>
}
export  const SideBar = ({names=[],slideClass,setSlideClass}) => {
  const [inputName,setInputName]=useState('');
  let i,len,key=0;
    const styleInput={
        fontSize:'2em',
        border:'none',
        outline:'none',
        width:'15vw',
        backgroundColor:'black',
        color:'white'
    }
    const searchStyle={
        border:'1px solid black',
        width:'100%',
        display:'flex'
    }
    const handleChange=(e)=>{
        key=0;
        setInputName(e.target.value.trim());
    }
  return (
    <>
      <div className={slideClass} >
           <div style={{display:'flex'}} >
               <div className="people">
                 People
               </div>
            <div className="X" onClick={ ()=>setSlideClass("slide")}>
                &#10060;
            </div>

     </div>
        <p >in call</p>
        <div style={searchStyle}>
        <SearchIcon/>
       <div>
         <input type="text"  placeholder="search ..." style={styleInput} onChange={handleChange} />
       </div>
       </div>
         {names.map((n)=>{
            for(i=0,len=Math.min(inputName.length,n.length);i<len;i++){
                if(inputName[i]!==n[i])
                    return;
            }
            return <h3 key={key++}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{n}</h3>
         })}
      </div>
      <style jsx>{`
         .people{
          font-size:1.5em;
         }
         .X{
            position:absolute;
            font-size:1.5em;
            right:0;
            padding-right:3%;
            cursor:pointer;
         }
        .slide {
          position:absolute;
          right:0;
          border-radius:10px;
          height: 70vh;
          width: 0vw;
          transition: width 0.5s ease-in-out;
          padding-right:10vw;
          visibility:hidden; 
          overflow-y:scroll;
        }
        .click {
          width: 20vw;
          height:70vh;
          visibility:visible; 
          display:block;  
          color:white;
        }
        p{
            padding:20px;
        }
      `}</style>
      
    </>
    
  );
};



export const SideBarButton=({slideClass,setSlideClass})=>{
  const styleButton={
    borderRadius:'50%'
  }
return <button onClick={() => slideClass=== "slide click" ? setSlideClass("slide") : setSlideClass("slide click")} style={styleButton}>
            <Image src={group}  alt="End call svg" width={50} height={50}/>    
       </button>
}
export default function Home(){
  return <></>
}
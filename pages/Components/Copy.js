import copy from 'copy-to-clipboard';
const Copy = ({text}) => {
    return <>
    <div className="Box" title="Your meeting id ">
    <input type='text' value={text} readOnly />
    <button onClick={()=>copy(text)}>
    &#128203;
    </button>
    </div>
    <style jsx>{`
     input{
        font-size:2em;
        border:none;
        outline:none;
        width:21vw;
        background-color:transparent;
     }
     button{
        font-size:2em;
        border:none;
     }
     div{
        background-color:lightgrey;
        width:24.42vw;
     }
    `}</style>
    </>
};

export default Copy;

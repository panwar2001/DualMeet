import styles from "./Copy.module.css";
const Copy= ({text}) =>
   <div className={styles.Box} title="Your meeting id ">
       <text>{text}</text>
       <button onClick={()=>navigator.clipboard.writeText(text)}>
           &#128203;
       </button>
    </div>

export default Copy;